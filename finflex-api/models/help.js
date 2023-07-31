"use strict"

// const { use } = require("../app");
const db = require("../db")
const { BadRequestError, UnauthorizedError } = require("../utils/errors")

class Help {
    static async add(creds) {
        const {userId, question, answer} = creds;
        const requiredCreds = ['userId', 'question', 'answer'];

        const result = await db.query(
            `INSERT INTO help (
                userid,
                question,
                answer
            )
            VALUES ($1, $2, $3)
            RETURNING
                userid,
                question,
                answer`,
            [userId, question, answer]
        );

        const help = result.rows[0];

        return help;
    }

    static async fetchById(id) {
        const result = await db.query(
            `SELECT
                userid,
                question,
                answer
            FROM help
            WHERE userid = $1`,
            [id]
        );

        const user = result.rows;

        return user;
    }
    
}

module.exports = Help;