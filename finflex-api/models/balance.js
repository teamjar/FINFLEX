"use strict"

// const { use } = require("../app");
const db = require("../db")
const { BadRequestError, UnauthorizedError } = require("../utils/errors")

class Balance {
    static async add(creds) {
        const {userId, balance} = creds;
        const requiredCreds = ['userId', 'earnings', 'budget', 'balance'];

        const result = await db.query(
        `INSERT INTO balance (
            userid,
            balance
        ) 
        VALUES ($1, $2)
        RETURNING 
                userid,
                balance`, 
            [userId, balance]
        );

        const budge = result.rows[0];

        return budge;
    }

    static async fetchById(id) {
        const result = await db.query(
            `SELECT
                userid,
                balance
            FROM balance
            WHERE userid = $1`,
            [id]
        );

        const user = result.rows;

        return user;
    }

    static async subtract(creds) {
        const {userId, price} = creds;
        const result = await db.query(`
            UPDATE balance
            SET balance = balance - $1
            WHERE userid = $2
        `, [price, userId]);
    
        const users = result.rows;
        return users;
    }

    static async plus(creds) {
        const {userId, price} = creds;
        const result = await db.query(`
            UPDATE balance
            SET balance = balance + $1
            WHERE userid = $2
        `, [price, userId]);
    
        const users = result.rows;
        return users;
    }
    
}

module.exports = Balance;