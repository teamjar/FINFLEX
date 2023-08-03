"use strict"

// const { use } = require("../app");
const db = require("../db")
const { BadRequestError, UnauthorizedError } = require("../utils/errors")

class Stock {
    static async add(creds) {
        const {userId, ticker, companyName, stockPrice, quantity, change, investment, logo} = creds;
 
        let existingStock = await this.findByUserAndTicker(userId, ticker);
 
        let stock;
 
        if (existingStock) {
            const newQuantity = existingStock.quantity + quantity;
            const newInvestment = existingStock.investment + investment;
 
            const result = await db.query(
                `UPDATE stocks
                 SET quantity = $1,
                     investment = $2,
                     stockprice = $3
                 WHERE userid = $4 AND ticker = $5
                 RETURNING *
                 `,
                [newQuantity, newInvestment, stockPrice, userId, ticker]
            );
 
            stock = result.rows[0];
        } else {
            const result = await db.query(
                `INSERT INTO stocks (
                    userid,
                    ticker,
                    companyname,
                    stockprice,
                    quantity,
                    change,
                    investment,
                    logo
                )
                VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
                RETURNING *
                `,
                [userId, ticker, companyName, stockPrice, quantity, change, investment, logo]
            );
 
            stock = result.rows[0];
        }
 
        return stock;
    }
 

    static async fetchById(id) {
        const result = await db.query(
            `SELECT userid,
                    ticker,
                    companyname,
                    stockprice, 
                    quantity,
                    change,
                    balance,
                    investment,
                    logo
                FROM stocks
                WHERE userid = $1`,
                [id]
        );

        const user = result.rows;

        return user;
    }

    static async addInvestment(id) {
        const result = await db.query(
            `SELECT SUM(investment)
            FROM stocks
            WHERE userid = $1`,
            [id]
        );

        const user = result.rows;

        return user;
    }

    static async getSumBalance(id) {
        const result = await db.query(
            `SELECT SUM(balance)
            FROM stocks
            WHERE userid = $1`,
            [id]
        );
 
        // const sumBalance = result.rows[0];
 
        // return sumBalance;

        const user = result.rows;

        return user;
    }

    static async changeStockChange(creds) {
        const {userId, ticker, change} = creds;

        const result = await db.query(
            `UPDATE stocks
            SET change = $1
            WHERE userid = $2 AND ticker = $3`,
            [change, userId, ticker]
        );

        const user = result.rows;

        return user;
    }

    static async findByUserAndTicker(id, ticker) {
        const result = await db.query(
            `SELECT *
             FROM stocks
             WHERE userid = $1 AND ticker = $2`,
            [id, ticker]
        );
 
        const stock = result.rows[0];
 
        return stock;
    }


 
 

}



module.exports = Stock;