"use strict"

const { use } = require("../app");
const db = require("../db")
const { BadRequestError, UnauthorizedError } = require("../utils/errors")

class Bill {
    static async add(creds) {
        const {userId, billName, due, status, price} = creds;
        const requiredCreds = ['userId', 'billName', 'due', 'status', 'price'];

        const result = await db.query(
            `INSERT INTO bills (
                userid,
                billname,
                due,
                status,
                price
            )
            VALUES ($1, $2, $3, $4, $5)
            RETURNING
                    userid,
                    billname,
                    due,
                    status,
                    price
            `, [userId, billName, due, status, price]
        );

        const bill = result.rows[0];

        return bill;
    }

    static async fetchById(id) {
        const result = await db.query(
            `SELECT userid,
                    billname,
                    due,
                    status,
                    price
                FROM bills
                WHERE userid = $1`,
                [id]
        );

        const user = result.rows;

        return user;
    }

    
}

module.exports = Bill;