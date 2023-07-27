"use strict"

const { use } = require("../app");
const db = require("../db")
const { BadRequestError, UnauthorizedError } = require("../utils/errors")

class Watchlist {
    static async add(creds) {
        const {userId, ticker, companyName, stockPrice} = creds;
        const requiredCreds = ['userId', 'ticker', 'companyName', 'stockPrice', 'quantity'];

        const result = await db.query(
            `INSERT INTO watchlist (
                userid,
                ticker,
                companyname,
                stockprice
            )
            VALUES ($1, $2, $3, $4)
            RETURNING
                    userid,
                    ticker,
                    companyname,
                    stockprice
                    `,
                    [userId, ticker, companyName, stockPrice]
        );

        const stock = result.rows[0];

        return stock;
    }

    static async fetchById(id) {
        const result = await db.query(
            `SELECT userid,
                    ticker,
                    companyname,
                    stockprice
                FROM watchlist
                WHERE userid = $1`,
                [id]
        );

        const user = result.rows;

        return user;
    }

}

module.exports = Watchlist;