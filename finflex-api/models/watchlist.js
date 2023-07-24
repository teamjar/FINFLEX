"use strict"

const { use } = require("../app");
const db = require("../db")
const { BadRequestError, UnauthorizedError } = require("../utils/errors")

class Watchlist {
    static async add(creds) {
        const {userId, ticker, companyName, stockPrice, quantity} = creds;
        const requiredCreds = ['userId', 'ticker', 'companyName', 'stockPrice', 'quantity'];

        const result = await db.query(
            `INSERT INTO watchlist (
                userid,
                ticker,
                companyname,
                stockprice, 
                quantity
            )
            VALUES ($1, $2, $3, $4, $5)
            RETURNING
                    userid,
                    ticker,
                    companyname,
                    stockprice,
                    quantity
                    `,
                    [userId, ticker, companyName, stockPrice, quantity]
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
                    quantity
                FROM watchlist
                WHERE userid = $1`,
                [id]
        );

        const user = result.rows;

        return user;
    }

}

module.exports = Watchlist;