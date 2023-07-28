"use strict"

// const { use } = require("../app");
const db = require("../db")
const { BadRequestError, UnauthorizedError } = require("../utils/errors")

class Budget {
    static async add(creds) {
        const {userId, earnings, budget} = creds;
        const requiredCreds = ['userId', 'earnings', 'budget'];

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
}

module.exports = Budget