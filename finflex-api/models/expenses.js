"use strict"

// const { use } = require("../app");
const db = require("../db")
const { BadRequestError, UnauthorizedError } = require("../utils/errors")

class Expense {
    static async add(creds) {
        const {userId, pName, pDesc, pPrice, pDate, category} = creds;
        //const requiredCreds = ['userId', 'pName', 'pDesc', 'pPrice', 'category'];

        const result = await db.query(
            `INSERT INTO expense (
                userid,
                pname,
                pdescription,
                pprice,
                pdate,
                category
            )
            VALUES ($1, $2, $3, $4, $5, $6)
            RETURNING
                userid,
                pname,
                pdescription,
                pprice,
                pdate,
                category`,
            [userId, pName, pDesc, pPrice, pDate, category]
        );

        const expenses = result.rows[0];

        return expenses;
    }

    static async fetchById(id) {
        const result = await db.query(
            `SELECT
                userid,
                pname,
                pdescription,
                pprice,
                pdate,
                category
            FROM expense
            WHERE userid = $1`,
            [id]
        );

        const user = result.rows;

        return user;
    }

    static async totalSpent(id) {
        const result = await db.query(
            `SELECT SUM(pprice)
            FROM expense
            WHERE userid = $1`,
            [id]
        );

        const user = result.rows;

        return user;
    }

    static async totalCategorySpent(category, id, startDate, endDate) {
        const result = await db.query(
            `SELECT SUM(pprice)
            FROM expense
            WHERE userid = $1 AND category = $2 AND pdate >= $3 AND pdate <= $4`,
            [id, category, startDate, endDate]
        );
    
        const user = result.rows;
    
        return user;
    }
    
    
}

module.exports = Expense;