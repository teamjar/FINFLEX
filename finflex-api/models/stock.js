"use strict"

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
                     stockprice = COALESCE(stockprice, $3),
                     timestamp = CURRENT_TIMESTAMP
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
                    LAST_VALUE(stockprice) OVER (PARTITION BY ticker ORDER BY timestamp ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW),
                    quantity,
                    change,
                    balance,
                    investment,
                    logo,
                    timestamp
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

    //Created for Portfolio Chart
    static async changeStockPrice(creds) {
        const {userId, ticker, stockPrice} = creds;
        const result = await db.query(
            `UPDATE stocks
             SET stockprice = COALESCE(stockprice, $1),
                timestamp = CURRENT_TIMESTAMP
            WHERE userid = $2 AND ticker = $3
            RETURNING *
            `,
            [stockPrice, userId, ticker]
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

    static async changeStockPrice(creds) {
        const {userId, ticker, stockPrice} = creds;

        const result = await db.query(
            `UPDATE stocks
            SET stockprice = $1
            WHERE userid = $2 AND ticker = $3`,
            [stockPrice, userId, ticker]
        );

        const user = result.rows;

        return user;
    }

    static async sell(creds) {
        const { userId, ticker, quantity, sellingPrice } = creds;
        let existingStock = await this.findByUserAndTicker(userId, ticker);
     
        if (existingStock && existingStock.quantity >= quantity) {
            const newQuantity = existingStock.quantity - quantity;
            const newInvestment = existingStock.investment - (sellingPrice * quantity);  // Adjusted the formula to get the total selling price
    
            if (newQuantity === 0) {
                // If the new quantity is 0, delete the record
                await db.query(
                    `DELETE FROM stocks
                     WHERE userid = $1 AND ticker = $2`,
                    [userId, ticker]
                );
                // return null;  // You can return null or a custom message here
                return { message: "Stock sold and record removed as quantity reached zero." };
            } else {
                const result = await db.query(
                    `UPDATE stocks
                     SET quantity = $1,
                         investment = $2,
                         timestamp = CURRENT_TIMESTAMP
                     WHERE userid = $3 AND ticker = $4
                     RETURNING *`,
                    [newQuantity, newInvestment, userId, ticker]
                );
                return result.rows[0];
            }
        } else {
            throw new BadRequestError("Not enough stocks to sell or stock doesn't exist");
        }
    }

    static async getStockQuantityBySymbol(userId, ticker) {
        const result = await db.query(
            `SELECT quantity
             FROM stocks
             WHERE userid = $1 AND ticker = $2`,
            [userId, ticker]
        );
        const stock = result.rows[0];
        return stock ? stock.quantity : 0;
    }
    
    
     
    
}





module.exports = Stock;


