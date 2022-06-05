const pool = require('../DB/db');
const format = require('pg-format');


module.exports = class Usermodel {
    async create(data) {
        let text = `INSERT INTO users(email, password, first_name, last_name, address, postcode, city, country)
        VALUES($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`;

        let inputs = [data.email, data.password, data.first_name, data.last_name, data.address, data.postcode, data.city, data.country,];
        console.log(inputs)

        try {
            if (data.password.length < 6) {
                return res.status(401).json("Password should be at least 6 characters");
            }
            return await pool.query(text, inputs);
        } catch (err) {
            throw err.stack;
        }
    }

    async getByEmail(data) {
        let text = 'SELECT * FROM users WHERE email = $1;';
        let inputs = [data];
        try {
            const result = await pool.query(text, inputs);
            return result.rows[0];
        } catch (err) {
            throw err.stack;
        }
    }

    async getById(data) {
        let text = 'SELECT * FROM users WHERE id = $1;';
        let inputs = [data];
        try {
            const result = await pool.query(text, inputs);
            return result.rows[0];
        } catch (err) {
            throw err.stack;
        }
    }

    async updateUser(data) {
        let text = format('UPDATE users SET %I = $1 WHERE email = $2;', data.column);
        let inputs = [data.value, data.email];
        try {
            return await pool.query(text, inputs);
        } catch (err) {
            throw err.stack;
        }
    }

    async deleteByEmail(data) {
        let text = 'DELETE FROM users WHERE email = $1;';
        let inputs = [data];
        try {
            return await pool.query(text, inputs);
        } catch (err) {
            throw err.stack;
        }
    }



}