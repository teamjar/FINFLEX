"use strict"

// const { use } = require("../app");
const db = require("../db")
const { BadRequestError, UnauthorizedError } = require("../utils/errors")

class Watchlist {
    static async add(creds) {
        const {userId, ticker} = creds;
        const requiredCreds = ['userId', 'ticker', 'companyName', 'stockPrice', 'quantity', 'change'];

        const result = await db.query(
            `INSERT INTO watchlist (
                userid,
                ticker
            )
            VALUES ($1, $2)
            RETURNING
                    userid,
                    ticker,
                    companyname,
                    stockprice,
                    change
                    `,
                    [userId, ticker]
        );

        const stock = result.rows[0];

        return stock;
    }

    static async fetchById(id) {
        const result = await db.query(
            `SELECT userid,
                    ticker
                FROM watchlist
                WHERE userid = $1`,
                [id]
        );

        const user = result.rows;

        return user;
    }

}

module.exports = Watchlist;