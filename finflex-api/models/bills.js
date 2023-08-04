"use strict"

// const { use } = require("../app");
const db = require("../db")
const { BadRequestError, UnauthorizedError } = require("../utils/errors")

class Bill {
    static async add(creds) {
        const {userId, billName, billDesc, due, status, price} = creds;
        //const requiredCreds = ['userId', 'billName', 'due', 'status', 'price'];

        const result = await db.query(
            `INSERT INTO bills (
                userid,
                billname,
                billdesc,
                due,
                status,
                price,
                towardsBill
            )
            VALUES ($1, $2, $3, $4, $5, $6, $7)
            RETURNING
                    userid,
                    billname,
                    billdesc,
                    due,
                    status,
                    price,
                    towardsBill
            `, [userId, billName, billDesc, due, status, price, 0]
        );

        const bill = result.rows[0];

        return bill;
    }

    static async fetchById(id) {
        const result = await db.query(
            `SELECT userid,
                    billname,
                    billdesc,
                    due,
                    status,
                    price,
                    towardsBill
                FROM bills
                WHERE userid = $1`,
                [id]
        );

        const user = result.rows;

        return user;
    }

    static async totalDue(id) {
        const result = await db.query(
            `SELECT SUM(price)
            FROM bills
            WHERE userid = $1`,
            [id]
        );

        const user = result.rows;

        return user;
    }

    static async changeTowardsBill(creds) {
        const {userId, billName, towardsBill} = creds;

        const result = await db.query(
            `UPDATE bills
            SET towardsBill = $1
            WHERE userid = $2 AND billname = $3`,
            [towardsBill, userId, billName]
        );

        const user = result.rows;

        return user;
    }

    static async changeStatus(creds) {
        const {userId, billName, status} = creds;

        const result = await db.query(
            `UPDATE bills
            SET status = $1
            WHERE userid = $2 AND billname = $3`,
            [status, userId, billName]
        );

        const user = result.rows;

        return user;
    }

    static async notification(id) {
        const result = await db.query(`
        SELECT userid,
            billname,
            billdesc,
            due,
            status,
            price,
            towardsBill
        WHERE price > towardsBill AND due > CURRENT_DATE AND userid = $1`,
        [id]);

        const user = result.rows;
   
        return user;
    }

    static async delete(id) {
        const result = await db.query(
            `DELETE FROM bills
            WHERE userid = $1 AND due < CURRENT_DATE AND towardsBill = price
            RETURNING
                    userid,
                    billname,
                    billdesc,
                    due,
                    status,
                    price,
                    towardsBill`, 
            [id]
        );
        
        const user = result.rows;
   
        return user;
    }

    
    
}

module.exports = Bill;