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

    static async update() {
        const result = await db.query(`
            WITH balance_updates AS (
                SELECT userId, COALESCE(SUM(exp.pPrice), 0) - COALESCE(SUM(bud.earnings), 0) AS new_balance
                FROM expense exp
                LEFT JOIN budget bud ON exp.userId = bud.userId
                GROUP BY exp.userId
            )
            UPDATE balance AS b
            SET balance = bu.new_balance
            FROM balance_updates bu
            WHERE b.userId = bu.userId
            RETURNING b.*
        `);
    
        const users = result.rows;
        return users;
    }
    
}

module.exports = Balance;