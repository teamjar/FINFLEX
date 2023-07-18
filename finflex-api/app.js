"use strict"

/** Express app for LifeTracker */

const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const User = require('./models/user');

const { NotFoundError } = require("./utils/errors");
const config = require("./config");
const jwt = require('jsonwebtoken');

const app = express();

// enable cross-origin resource sharing for all origins for all requests
// NOTE: in production, we'll want to restrict this to only the origin
// hosting our frontend.
app.use(cors());

// parse incoming requests with JSON payloads
app.use(express.json());
// log requests info
app.use(morgan("tiny"));

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
      return res.status(201).json({ user, token })
    } catch (err) {
      next(err)
    }
  })

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