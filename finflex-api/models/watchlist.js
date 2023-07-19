"use strict"

const { use } = require("../app");
const db = require("../db")
const { BadRequestError, UnauthorizedError } = require("../utils/errors")

class Watchlist {
    static async add(creds) {
        const {userId, ticker, companyName, stockPrice, quantity, lastPrice, marketCap, exchange, lastDate} = creds;
        const requiredCreds = ['userId', 'ticker', 'companyName', 'stockPrice', 'quantity', 'lastPrice', 'marketCap', 'exchange', 'lastDate'];

        try {
            validateFields({ required: requiredCreds, obj: creds })
        } catch (err) {
            throw err
        }

        const result = db.query(
            `INSERT INTO stocks (
                userid,
                ticker,
                companyname,
                stockprice, 
                quantity,
                lastprice,
                marketcap,
                exchange,
                lastdate
            )
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
            RETURNING
                    userid,
                    ticker,
                    companyname,
                    stockprice,
                    quantity,
                    lastprice,
                    marketcap,
                    exchange,
                    lastdate
                    `,
                    [userId, ticker, companyName, stockPrice, quantity, lastPrice, marketCap, exchange, lastDate]
        );

        const stock = result.rows[0];

        return stock;
    }

    static async fetchById(id) {
        const result = db.query(
            `SELECT userid,
                    ticker,
                    companyname,
                    stockprice, 
                    quantity,
                    lastprice,
                    marketcap,
                    exchange,
                    lastdate
                FROM stocks
                WHERE userid = $1`,
                [id]
        );

        const user = result.rows;

        return user;
    }

}

module.exports = Watchlist;