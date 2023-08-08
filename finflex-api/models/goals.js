"use strict"

// const { use } = require("../app");
const db = require("../db")
const { BadRequestError, UnauthorizedError } = require("../utils/errors")

class Goals {
    static async add(creds) {
        const {userId, gName, gDesc, target, dateDue, category, towardsGoal} = creds;
        const requiredCreds = ['userId', 'gName', 'gDesc', 'target', 'dateDue', 'category'];

        const result = await db.query(
            `INSERT INTO goals (
                userid,
                gname,
                gdesc,
                target,
                datedue,
                category, 
                towardsgoal
            )
            VALUES ($1, $2, $3, $4, $5, $6, $7)
            RETURNING
                userid,
                gname,
                gdesc,
                target,
                datecreated,
                datedue,
                category,
                towardsgoal`,
            [userId, gName, gDesc, target, dateDue, category, 0]
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
                category,
                towardsgoal
            FROM goals
            WHERE userid = $1`,
            [id]
        );

        const user = result.rows;

        return user;
    }

    static async changeTowardsGoal(creds) {
        const {userId, category, towardsGoal} = creds;

        const result = await db.query(
            `UPDATE goals
            SET towardsgoal = $1
            WHERE userid = $2 AND category = $3`,
            [towardsGoal, userId, category]
        );

        const user = result.rows;

        return user;
    }

    static async deleteGoal(userId, gName, gDesc, category) {
        const result = db.query(
            `DELETE FROM goals
            WHERE userid = $1 AND gname = $2 AND gdesc = $3 AND category = $4`, 
            [userId, gName, gDesc, category]
        );
    }

    static async delete(id) {
        const result = db.query(
            `DELETE FROM goals
            WHERE userid = $1 AND target >= towardsgoal AND datedue = CURRENT_DATE
            RETURNING *`, 
            [id]
        );
        
        const user = result.rows;
   
        return user;
    }
    
}

module.exports = Goals;