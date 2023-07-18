"use strict"

const db = require("../db")
const { BadRequestError, UnauthorizedError } = require("../utils/errors")

class Stock {
    static async add(creds) {
        const {userId, ticker} = creds;
    }

}

module.exports = Stock;