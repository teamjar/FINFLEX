"use strict"

/** Express app for LifeTracker */

require("dotenv").config()

const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
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

const app = express();
const cron = require('node-cron');

// enable cross-origin resource sharing for all origins for all requests
// NOTE: in production, we'll want to restrict this to only the origin
// hosting our frontend.
app.use(cors());

// parse incoming requests with JSON payloads
app.use(express.json());
// log requests info
app.use(morgan("tiny"));

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

app.post("/login", async function (req, res, next) {
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
  
app.post("/register", async function (req, res, next) {
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

app.post("/stocks", async function (req, res, next) {
    try {
        const user = await Stock.add(req.body);
        return res.status(201).json({user});
    } catch(err) {
        next(err);
    }
});

app.put("/stocks", authenticateToken, async function (req, res, next) {
  try {
    const user = await Stock.changeStockChange(req.body);
    return res.status(201).json({user});
  } catch(err) {
    next(err);
  }
})

app.put("/stocks/price", authenticateToken, async function (req, res, next) {
  try {
    const user = await Stock.changeStockPrice(req.body);
    return res.status(201).json({user});
  } catch(err) {
    next(err);
  }
})

app.get("/stocks/:id", authenticateToken, async function (req, res, next) {
    const userId = req.params.id;

    // if (req.user && req.user.user.id !== userId) {
    //   return res.status(403).json({ message: 'You are not authorized to access this resource.' });
    // }

    const stock = await Stock.fetchById(userId);
    return res.status(200).json({ database : stock })
})

app.get("/stocks/investment/:id", authenticateToken, async function (req, res, next) {
  const userId = req.params.id;

  // if (req.user && req.user.user.id !== userId) {
  //   return res.status(403).json({ message: 'You are not authorized to access this resource.' });
  // }

  const stock = await Stock.addInvestment(userId);
  return res.status(200).json({ database : stock })
})

app.post("/watchlist", async function (req, res, next) {
    try {
        const user = await Watchlist.add(req.body);
        return res.status(201).json({user});
    } catch(err) {
        next(err);
    }
});

app.get("/watchlist/:id", authenticateToken, async function (req, res, next) {
    const userId = req.params.id;

    // if (req.user && req.user.user.id !== userId) {
    //   return res.status(403).json({ message: 'You are not authorized to access this resource.' });
    // }

    const watchlist = await Watchlist.fetchById(userId);
    return res.status(200).json({ database : watchlist })
})

app.post("/bills", async function (req, res, next) {
    try {
        const user = await Bill.add(req.body);
        return res.status(201).json({user});
    } catch(err) {
        next(err);
    }
});

app.put("/toward/bills", async function (req, res, next) {
  try {
    const user = await Bill.changeTowardsBill(req.body);
    return res.status(201).json({user});
  } catch(err) {
    next(err);
  }
})

app.put("/status/bills", async function (req, res, next) {
  try {
    const user = await Bill.changeStatus(req.body);
    return res.status(201).json({user});
  } catch(err) {
    next(err);
  }
})

app.get("/bills/:id", async function (req, res, next) {
    const userId = req.params.id;

    // if (req.user && req.user.user.id !== userId) {
    //   return res.status(403).json({ message: 'You are not authorized to access this resource.' });
    // }

    const bills = await Bill.fetchById(userId);
    return res.status(200).json({ database : bills })
})

app.delete("/bills/:id", authenticateToken, async function (req, res, next) {
  const userId = req.params.id;
  const bills = await Bill.delete(userId);
  return res.status(200).json({ database : bills })
})

app.get("/bills/due/:id", authenticateToken, async function (req, res, next) {
  const userId = req.params.id;
  const bills = await Bill.totalDue(userId);
  return res.status(200).json({ database : bills })
})

app.post("/expenses", async function (req, res, next) {
    try {
        const user = await Expenses.add(req.body);
        return res.status(201).json({user});
    } catch(err) {
        next(err);
    }
});

app.get("/expenses/:id",authenticateToken, async function (req, res, next) {
    const userId = req.params.id;

    // if (req.user && req.user.user.id !== userId) {
    //   return res.status(403).json({ message: 'You are not authorized to access this resource.' });
    // }

    const expenses = await Expenses.fetchById(userId);
    return res.status(200).json({ database : expenses })
})

app.get("/expense/spent/:id", authenticateToken, async function (req, res, next) {
  const userId = req.params.id;

  // if (req.user && req.user.user.id !== userId) {
  //   return res.status(403).json({ message: 'You are not authorized to access this resource.' });
  // }

  const expenses = await Expenses.totalSpent(userId);
  return res.status(200).json({ database : expenses })
})

app.get("/expense/spent/:category/:id", authenticateToken, async function (req, res, next) {
  const userId = req.params.id;
  const category = req.params.category;
  const expenses = await Expenses.totalCategorySpent(category, userId);
  return res.status(200).json({ database : expenses })
})

app.post("/goals", async function (req, res, next) {
    try {
        const user = await Goals.add(req.body);
        return res.status(201).json({user});
    } catch(err) {
        next(err);
    }
});

app.put("/goals", async function (req, res, next) {
  try {
    const user = await Goals.changeTowardsGoal(req.body);
    return res.status(201).json({user});
  } catch(err) {
    next(err);
  }
})

app.delete("/goals/:id", authenticateToken, async function (req, res, next) {
  const userId = req.params.id;
  const goals = await Goals.delete(userId);
  return res.status(200).json({ database : goals })
})

app.get("/goals/:id", authenticateToken, async function (req, res, next) {
    const userId = req.params.id;

    // if (req.user && req.user.user.id !== userId) {
    //   return res.status(403).json({ message: 'You are not authorized to access this resource.' });
    // }

    const goals = await Goals.fetchById(userId);
    return res.status(200).json({ database : goals })
})

app.post("/help", async function (req, res, next) {
    try {
        const user = await Help.add(req.body);
        return res.status(201).json({user});
    } catch(err) {
        next(err);
    }
});

app.get("/help/:id", authenticateToken, async function (req, res, next) {
    const userId = req.params.id;

    // if (req.user && req.user.user.id !== userId) {
    //   return res.status(403).json({ message: 'You are not authorized to access this resource.' });
    // }

    const help = await Help.fetchById(userId);
    return res.status(200).json({ database : help })
});

app.post("/budget", async function (req, res, next) {
  try {
      const user = await Budget.add(req.body);
      return res.status(201).json({user});
  } catch(err) {
      next(err);
  }
});

app.get("/budget/:id", authenticateToken, async function (req, res, next) {
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

app.get("/budget/earnings/:id", authenticateToken, async function (req, res, next) {
  const userId = req.params.id;

  // if (req.user && req.user.user.id !== userId) {
  //   return res.status(403).json({ message: 'You are not authorized to access this resource.' });
  // }

  const budget = await Budget.totalEarnings(userId);
  return res.status(200).json({ database : budget })
});

app.get("/budget/total/:id",authenticateToken, async function (req, res, next) {
  const userId = req.params.id;

  // if (req.user && req.user.user.id !== userId) {
  //   return res.status(403).json({ message: 'You are not authorized to access this resource.' });
  // }
  
  const budget = await Budget.totalBudget(userId);
  return res.status(200).json({ database : budget })
});

app.put("/subtract/budget", authenticateToken, async function (req, res, next) {
  const user = await Budget.subtract(req.body);
  return res.status(200).json({ database : user });
})

app.post("/balance", authenticateToken, async function (req,res,next) {
  try {
    const user = await Balance.add(req.body);
    return res.status(201).json({user});
} catch(err) {
    next(err);
}
} )

app.get("/balance/:id", authenticateToken, async function (req, res, next) {
  const userId = req.params.id;
  const balance = await Balance.fetchById(userId);
  return res.status(200).json({ database : balance })
})

app.put("/subtract/balance", authenticateToken, async function (req, res, next) {
  const balance = await Balance.subtract(req.body);
  return res.status(200).json({ database : balance })
})

app.put("/plus/balance", authenticateToken, async function (req, res, next) {
  const balance = await Balance.plus(req.body);
  return res.status(200).json({ database : balance })
})

app.post('/api/chat', async (req, res) => {
  const prompt = req.body.prompt;
  const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: prompt
  });
  console.log(response)
});

app.get("/stocks/balance/:id", authenticateToken, async (req, res, next) => {
  try {
      const balance = await Stock.getSumBalance(req.params.id);
      return res.status(200).json({ balance });
  } catch (e) {
      return next(e);
  }
});

// health check
app.get("/", function (req, res) {
    return res.status(200).json({
      ping: "pong",
    })
  })
  
  /** Handle 404 errors -- this matches everything */
  app.use(function (req, res, next) {
    return next(new NotFoundError())
  })
  
  /** Generic error handler; anything unhandled goes here. */
  app.use(function (err, req, res, next) {
    if (!config.IS_TESTING) console.error(err.stack)
    const status = err.status || 500
    const message = err.message
    return res.status(status).json({
      error: { message, status },
    })
  })

module.exports = app;