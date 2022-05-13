const pool = require('../DB/db')
module.exports = class Productmodel {


    async createProducts() {
        console.log(req.body);
        try {
            const results = await pool.query("INSERT INTO products (id,  name, author, price, description, category, image_url, status) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) returning *",
                [req.body.id, req.body.name, req.body.author, req.body.price, req.body.description, req.body.category, req.body.image_url, req.body.status])
            console.log(results)
            res.status(201).json({
                status: "success",
                data: {
                    product: results.rows[0]
                }
            });
        }
        catch (err) {
            console.log(err.message);
        }

    }

    // async createProducts(data) {
    //     try {
    //         const text = await pool.query("INSERT INTO products ( id, name, author, price, description, category, image_url, status) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) returning *",
    //             [req.body.data])

    //         const inputs = [data];
    //         const result = await pool.query(text, inputs);
    //         return result.rows[0];
    //     } catch (err) {
    //         throw err.stack;
    //     }
    // }

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