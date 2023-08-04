"use strict"

/** Express router for LifeTracker */

const express = require('express');
const User = require('./models/user');
const Stock = require('./models/stock');
const Expenses = require('./models/expenses');
const Goals = require('./models/goals');
const Watchlist = require('./models/watchlist');
const Help = require('./models/help');
const Bill = require("./models/bills");
const Budget = require('./models/budget');
const Balance = require('./models/balance');

const { NotFoundError } = require("./utils/errors");
const config = require("./config");
const jwt = require('jsonwebtoken');
const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const router = express.Router();
const cron = require('node-cron');

// Middleware to authenticate the JWT token
function authenticateToken(req, res, next) {
  const token = req.headers.authorization && req.headers.authorization.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Authorization token missing.' });
  }

  jwt.verify(token, config.jwtSecret, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid or expired token.' });
    }
    req.user = user;
    next();
  });
}

// routes
router.post("/login", async function (req, res, next) {
    try {
      const user = await User.authenticate(req.body)
      // Create and sign a JWT token
      const payload = {
        user: {
          id: user.id
        }
      };
      const token = jwt.sign(payload, config.jwtSecret);
      //const token = jwt.sign(payload, config.jwtSecret, { expiresIn: '1h' });
      return res.status(200).json({ user, token })
    } catch (err) {
      next(err)
    }
  })
  
router.post("/register", async function (req, res, next) {
    try {
      const user = await User.register(req.body)
      // Create and sign a JWT token
      const payload = {
        user: {
          id: user.id
        }
      };
      const token = jwt.sign(payload, config.jwtSecret);
      //const token = jwt.sign(payload, config.jwtSecret, { expiresIn: '3h' });
      return res.status(201).json({ user, token })
    } catch (err) {
      next(err)
    }
})

router.post("/stocks", async function (req, res, next) {
    try {
        const user = await Stock.add(req.body);
        return res.status(201).json({user});
    } catch(err) {
        next(err);
    }
});

router.put("/stocks", authenticateToken, async function (req, res, next) {
  try {
    const user = await Stock.changeStockChange(req.body);
    return res.status(201).json({user});
  } catch(err) {
    next(err);
  }
})

router.put("/stocks/price", authenticateToken, async function (req, res, next) {
  try {
    const user = await Stock.changeStockPrice(req.body);
    return res.status(201).json({user});
  } catch(err) {
    next(err);
  }
})

router.get("/stocks/:id", authenticateToken, async function (req, res, next) {
    const userId = req.params.id;

    // if (req.user && req.user.user.id !== userId) {
    //   return res.status(403).json({ message: 'You are not authorized to access this resource.' });
    // }

    const stock = await Stock.fetchById(userId);
    return res.status(200).json({ database : stock })
})

router.get("/stocks/investment/:id", authenticateToken, async function (req, res, next) {
  const userId = req.params.id;

  // if (req.user && req.user.user.id !== userId) {
  //   return res.status(403).json({ message: 'You are not authorized to access this resource.' });
  // }

  const stock = await Stock.addInvestment(userId);
  return res.status(200).json({ database : stock })
})

router.post("/watchlist", async function (req, res, next) {
    try {
        const user = await Watchlist.add(req.body);
        return res.status(201).json({user});
    } catch(err) {
        next(err);
    }
});

router.get("/watchlist/:id", authenticateToken, async function (req, res, next) {
    const userId = req.params.id;

    // if (req.user && req.user.user.id !== userId) {
    //   return res.status(403).json({ message: 'You are not authorized to access this resource.' });
    // }

    const watchlist = await Watchlist.fetchById(userId);
    return res.status(200).json({ database : watchlist })
})

router.post("/bills", async function (req, res, next) {
    try {
        const user = await Bill.add(req.body);
        return res.status(201).json({user});
    } catch(err) {
        next(err);
    }
});

router.put("/toward/bills", async function (req, res, next) {
  try {
    const user = await Bill.changeTowardsBill(req.body);
    return res.status(201).json({user});
  } catch(err) {
    next(err);
  }
})

router.put("/status/bills", async function (req, res, next) {
  try {
    const user = await Bill.changeStatus(req.body);
    return res.status(201).json({user});
  } catch(err) {
    next(err);
  }
})

router.get("/bills/:id", async function (req, res, next) {
    const userId = req.params.id;

    // if (req.user && req.user.user.id !== userId) {
    //   return res.status(403).json({ message: 'You are not authorized to access this resource.' });
    // }

    const bills = await Bill.fetchById(userId);
    return res.status(200).json({ database : bills })
})

router.delete("/bills/:id", authenticateToken, async function (req, res, next) {
  const userId = req.params.id;
  const bills = await Bill.delete(userId);
  return res.status(200).json({ database : bills })
})

router.get("/bills/due/:id", authenticateToken, async function (req, res, next) {
  const userId = req.params.id;
  const bills = await Bill.totalDue(userId);
  return res.status(200).json({ database : bills })
})

router.post("/expenses", async function (req, res, next) {
    try {
        const user = await Expenses.add(req.body);
        return res.status(201).json({user});
    } catch(err) {
        next(err);
    }
});

router.get("/expenses/:id",authenticateToken, async function (req, res, next) {
    const userId = req.params.id;

    // if (req.user && req.user.user.id !== userId) {
    //   return res.status(403).json({ message: 'You are not authorized to access this resource.' });
    // }

    const expenses = await Expenses.fetchById(userId);
    return res.status(200).json({ database : expenses })
})

router.get("/expense/spent/:id", authenticateToken, async function (req, res, next) {
  const userId = req.params.id;

  // if (req.user && req.user.user.id !== userId) {
  //   return res.status(403).json({ message: 'You are not authorized to access this resource.' });
  // }

  const expenses = await Expenses.totalSpent(userId);
  return res.status(200).json({ database : expenses })
})

router.get("/expense/spent/:category/:id", authenticateToken, async function (req, res, next) {
  const userId = req.params.id;
  const category = req.params.category;
  const expenses = await Expenses.totalCategorySpent(category, userId);
  return res.status(200).json({ database : expenses })
})

router.post("/goals", async function (req, res, next) {
    try {
        const user = await Goals.add(req.body);
        return res.status(201).json({user});
    } catch(err) {
        next(err);
    }
});

router.put("/goals", async function (req, res, next) {
  try {
    const user = await Goals.changeTowardsGoal(req.body);
    return res.status(201).json({user});
  } catch(err) {
    next(err);
  }
})

router.delete("/goals/:id", authenticateToken, async function (req, res, next) {
  const userId = req.params.id;
  const goals = await Goals.delete(userId);
  return res.status(200).json({ database : goals })
})

router.get("/goals/:id", authenticateToken, async function (req, res, next) {
    const userId = req.params.id;

    // if (req.user && req.user.user.id !== userId) {
    //   return res.status(403).json({ message: 'You are not authorized to access this resource.' });
    // }

    const goals = await Goals.fetchById(userId);
    return res.status(200).json({ database : goals })
})

router.post("/help", async function (req, res, next) {
    try {
        const user = await Help.add(req.body);
        return res.status(201).json({user});
    } catch(err) {
        next(err);
    }
});

router.get("/help/:id", authenticateToken, async function (req, res, next) {
    const userId = req.params.id;

    // if (req.user && req.user.user.id !== userId) {
    //   return res.status(403).json({ message: 'You are not authorized to access this resource.' });
    // }

    const help = await Help.fetchById(userId);
    return res.status(200).json({ database : help })
});

router.post("/budget", async function (req, res, next) {
  try {
      const user = await Budget.add(req.body);
      return res.status(201).json({user});
  } catch(err) {
      next(err);
  }
});

router.get("/budget/:id", authenticateToken, async function (req, res, next) {
  const userId = req.params.id;

  // if (req.user && req.user.user.id !== userId) {
  //   return res.status(403).json({ message: 'You are not authorized to access this resource.' });
  // }

  const budget = await Budget.fetchById(userId);
  return res.status(200).json({ database : budget })
});

cron.schedule('0 0 * * 1', async () => {
  try {
    const users = await Budget.getAllUsers();
    for (const user of users) {
      await Budget.weeklyAdd(user.userid);
    }
  } catch (err) {
    console.error(err);
  }
})

router.get("/budget/earnings/:id", authenticateToken, async function (req, res, next) {
  const userId = req.params.id;

  // if (req.user && req.user.user.id !== userId) {
  //   return res.status(403).json({ message: 'You are not authorized to access this resource.' });
  // }

  const budget = await Budget.totalEarnings(userId);
  return res.status(200).json({ database : budget })
});

router.get("/budget/total/:id",authenticateToken, async function (req, res, next) {
  const userId = req.params.id;

  // if (req.user && req.user.user.id !== userId) {
  //   return res.status(403).json({ message: 'You are not authorized to access this resource.' });
  // }
  
  const budget = await Budget.totalBudget(userId);
  return res.status(200).json({ database : budget })
});

router.put("/subtract/budget", authenticateToken, async function (req, res, next) {
  const user = await Budget.subtract(req.body);
  return res.status(200).json({ database : user });
})

router.post("/balance", authenticateToken, async function (req,res,next) {
  try {
    const user = await Balance.add(req.body);
    return res.status(201).json({user});
} catch(err) {
    next(err);
}
} )

router.get("/balance/:id", authenticateToken, async function (req, res, next) {
  const userId = req.params.id;
  const balance = await Balance.fetchById(userId);
  return res.status(200).json({ database : balance })
})

router.put("/subtract/balance", authenticateToken, async function (req, res, next) {
  const balance = await Balance.subtract(req.body);
  return res.status(200).json({ database : balance })
})

router.put("/plus/balance", authenticateToken, async function (req, res, next) {
  const balance = await Balance.plus(req.body);
  return res.status(200).json({ database : balance })
})

router.post('/api/chat', async (req, res) => {
  const prompt = req.body.prompt;
  const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: prompt
  });
  console.log(response)
});

router.get("/stocks/balance/:id", authenticateToken, async (req, res, next) => {
  try {
      const balance = await Stock.getSumBalance(req.params.id);
      return res.status(200).json({ balance });
  } catch (e) {
      return next(e);
  }
});

module.exports = router;