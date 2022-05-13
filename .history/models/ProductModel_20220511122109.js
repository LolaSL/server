const pool = require('../DB/db')
module.exports = class Productmodel {

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
    async deleteProductById() {
        let id = req.params.id;
        try {
            const text = (`DELETE FROM products WHERE id = $1`, [id])
            const inputs = [];
            const result = await pool.query(text, inputs);
            return result.rows;
        } catch (err) {
            throw err.stack;
        }
    }

}
