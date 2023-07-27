"use strict"

const { use } = require("../app");
const db = require("../db")
const { BadRequestError, UnauthorizedError } = require("../utils/errors")

class Stock {
    static async add(creds) {
        const {userId, ticker, companyName, stockPrice, quantity, change} = creds;
        const requiredCreds = ['userId', 'ticker', 'companyName', 'stockPrice', 'quantity', 'change'];

        const result = await db.query(
            `INSERT INTO stocks (
                userid,
                ticker,
                companyname,
                stockprice, 
                quantity,
                change
            )
            VALUES ($1, $2, $3, $4, $5, $6)
            RETURNING
                    userid,
                    ticker,
                    companyname,
                    stockprice,
                    quantity,
                    change
                    `,
                    [userId, ticker, companyName, stockPrice, quantity, change]
        );

        const stock = result.rows[0];

        return stock;
    }

    static async fetchById(id) {
        const result = await db.query(
            `SELECT userid,
                    ticker,
                    companyname,
                    stockprice, 
                    quantity,
                    change
                FROM stocks
                WHERE userid = $1`,
                [id]
        );

        const user = result.rows;

        return user;
    }

}

module.exports = Stock;