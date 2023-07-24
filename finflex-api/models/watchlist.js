"use strict"

const { use } = require("../app");
const db = require("../db")
const { BadRequestError, UnauthorizedError } = require("../utils/errors")

class Watchlist {
    static async add(creds) {
        const {userId, ticker, companyName, stockPrice, quantity, lastPrice, marketCap, exchange, lastDate} = creds;
        const requiredCreds = ['userId', 'ticker', 'companyName', 'stockPrice', 'quantity', 'lastPrice', 'marketCap', 'exchange', 'lastDate'];

        const result = await db.query(
            `INSERT INTO watchlist (
                userid,
                ticker,
                companyname,
                stockprice, 
                quantity,
                lastprice,
                market_cap,
                exchange,
                last_date
            )
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
            RETURNING
                    userid,
                    ticker,
                    companyname,
                    stockprice,
                    quantity,
                    lastprice,
                    market_cap,
                    exchange,
                    last_date
                    `,
                    [userId, ticker, companyName, stockPrice, quantity, lastPrice, marketCap, exchange, lastDate]
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
                    lastprice,
                    market_cap,
                    exchange,
                    last_date
                FROM watchlist
                WHERE userid = $1`,
                [id]
        );

        const user = result.rows;

        return user;
    }

}

module.exports = Watchlist;