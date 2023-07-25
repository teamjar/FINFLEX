"use strict"

const { use } = require("../app");
const db = require("../db")
const { BadRequestError, UnauthorizedError } = require("../utils/errors")

class Goals {
    static async add(creds) {
        const {userId, gName, gDesc, target, dateDue, category} = creds;
        const requiredCreds = ['userId', 'gName', 'gDesc', 'target', 'dateDue', 'category'];

        const result = await db.query(
            `INSERT INTO goals (
                userid,
                gname,
                gdesc,
                target,
                datedue,
                category
            )
            VALUES ($1, $2, $3, $4, $5, $6)
            RETURNING
                userid,
                gname,
                gdesc,
                target,
                datecreated,
                datedue,
                category`,
            [userId, gName, gDesc, target, dateDue, category]
        );

        const goals = result.rows[0];

        return goals;
    }

    static async fetchById(id) {
        const result = await db.query(
            `SELECT
                userid,
                gname,
                gdesc,
                target,
                datecreated,
                datedue,
                category
            FROM goals
            WHERE userid = $1`,
            [id]
        );

        const user = result.rows;

        return user;
    }
    
}

module.exports = Goals;