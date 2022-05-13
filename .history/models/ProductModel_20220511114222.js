const pool = require('../DB/db')
module.exports = class Productmodel {

    async createProducts(data) {
        try {
            const results = await pool.query("INSERT INTO products ( name, author, price, description, category, image_url, status) VALUES ($1, $2, $3, $4, $5, $6, $7) returning *", [])
            console.log(result);
            const inputs = [data];
            const result = await pool.query(text, inputs);
            return results.rows[0];
        } catch (err) {
            throw err.stack;
        }
    }

    async getAllProducts() {
        try {
            const result = await pool.query('SELECT * FROM products', []);
            console.log(result);
            return result.rows;
        } catch (err) {
            throw err.stack;
        }
    }

    async getProductById(data) {
        try {
            const text = 'SELECT * FROM products WHERE id = $1';
            const inputs = [data];
            const result = await pool.query(text, inputs);
            return result.rows[0];
        } catch (err) {
            throw err.stack;
        }
    }

    async getProductsByCategory(data) {
        try {
            const text = 'SELECT * FROM products WHERE category = $1;';
            const inputs = [data];
            const result = await pool.query(text, inputs);
            return result.rows;
        } catch (err) {
            throw err.stack;
        }
    }
}