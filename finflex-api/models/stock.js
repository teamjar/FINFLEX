"use strict"

// const { use } = require("../app");
const db = require("../db")
const { BadRequestError, UnauthorizedError } = require("../utils/errors")

class Stock {
    static async add(creds) {
        const {userId, ticker, companyName, stockPrice, quantity, change, investment, logo} = creds;

        // Log incoming values
        console.log(`New investment: ${investment}`);
        console.log(`New quantity: ${quantity}`);

        // Check if the stock already exists for the user
        const existingStock = await db.query(
            `SELECT *
             FROM stocks
             WHERE userid = $1 AND ticker = $2`,
            [userId, ticker]
        );

        if(existingStock.rows.length > 0) {
            // If the stock already exists, update it
            const updatedInvestment = parseFloat(existingStock.rows[0].investment) + investment;  // add the new investment
            const updatedQuantity = parseFloat(existingStock.rows[0].quantity) + quantity;  // add the new quantity

             // Log updated values
             console.log(`Updated investment: ${updatedInvestment}`);
             console.log(`Updated quantity: ${updatedQuantity}`);

            const updatedStock = await db.query(
                `UPDATE stocks
                 SET quantity = $1,
                     investment = $2
                 WHERE userid = $3 AND ticker = $4
                 RETURNING
                    userid,
                    ticker,
                    companyname,
                    stockprice,
                    quantity,
                    change,
                    balance,
                    investment,
                    logo
                `,
                [updatedQuantity, updatedInvestment, userId, ticker]
            );
            return updatedStock.rows[0];
        } else {
            // If the stock does not exist, add it
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
                RETURNING
                    userid,
                    ticker,
                    companyname,
                    stockprice,
                    quantity,
                    change,
                    balance,
                    investment,
                    logo
                `,
                [userId, ticker, companyName, stockPrice, quantity, change, investment, logo]
            );
            return result.rows[0];
        }
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

}


