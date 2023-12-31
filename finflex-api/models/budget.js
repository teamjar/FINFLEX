"use strict"

// const { use } = require("../app");
const db = require("../db")
const { BadRequestError, UnauthorizedError } = require("../utils/errors")

class Budget {
    static async add(creds) {
        const {userId, earnings, budget} = creds;
        const requiredCreds = ['userId', 'earnings', 'budget', 'balance'];

        const result = await db.query(
        `INSERT INTO budget (
            userid,
            earnings,
            budget
        ) 
        VALUES ($1, $2, $3)
        RETURNING 
                userid,
                earnings,
                budget`, 
            [userId, earnings, budget]
        );

        const budge = result.rows[0];

        return budge;
    }

    static async getAllUsers() {
        const result = await db.query(
            `SELECT
                userid,
                earnings,
                budget
            FROM budget`);

        const user = result.rows;

        return user;
    }

    static async fetchById(id) {
        const result = await db.query(
            `SELECT
                userid,
                earnings,
                budget
            FROM budget
            WHERE userid = $1`,
            [id]
        );

        const user = result.rows;

        return user;
    }

    static async totalEarnings(id) {
        const result = await db.query(
            `SELECT SUM(earnings)
            FROM budget
            WHERE userid = $1`,
            [id]
        );

        const user = result.rows;

        return user;
    }

    static async totalBudget(id) {
        const result = await db.query(
            `SELECT SUM(budget)
            FROM budget
            WHERE userid = $1`,
            [id]
        );

        const user = result.rows;

        return user;
    }

    static async subtract(creds) {
        const {userId, subtract} = creds;
        const result = await db.query(
            `UPDATE budget 
            SET budget = (SELECT SUM(budget) FROM budget)  - $1
            WHERE userid = $2`,
            [subtract, userId]
        )
    }

    static async weeklyAdd(id) {
        const result = await db.query(
        `INSERT INTO budget (earnings, budget)
        SELECT earnings, budget
        FROM budget
        WHERE userid = $1`, 
        [id]
        );

        const budge = result.rows[0];

        return budge;
    }

}

module.exports = Budget