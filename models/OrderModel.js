const pool = require('../DB/db');


module.exports = class Ordermodel {

    async create(data) {
        const text = 'INSERT INTO orders (user_id, status, created_at) VALUES ($1, $2, current_timestamp) RETURNING *;';
        const inputs = [data, 'PENDING'];
        try {
            return await pool.query(text, inputs);
        } catch (err) {
            throw err.stack;
        }
    }

    async addProduct(data) {
        const text = 'INSERT INTO order_items (order_id, product_id,   quantity, price, ) VALUES ($1, $2, $3,(SELECT price FROM products WHERE id = $2),  $4) RETURNING id;';
        const inputs = [data.order_id, data.product_id, data.quantity, data.price, data.id];
        try {
            return await pool.query(text, inputs);
        } catch (err) {
            throw err.stack;
        }
    }

    async getOrderProducts(data) {
        const text = 'SELECT quantity FROM products JOIN order_items ON id = product_id WHERE order_id = $1;';
        const inputs = [data];
        try {
            const products = await pool.query(text, inputs);
            return products.rows;
        } catch (err) {
            throw err.stack;
        }
    }

    async getAllOrders(data) {
        const text = 'SELECT * FROM orders WHERE user_id = $1';
        const inputs = [data];
        try {
            const orders = await pool.query(text, inputs);
            return orders.rows;
        } catch (err) {
            throw err.stack;
        }
    }

    async getOrderById(data) {
        const text = 'SELECT * FROM orders WHERE id = $1';
        const inputs = [data];
        try {
            const products = await this.getOrderProducts(data);
            const order = await pool.query(text, inputs);
            if (!order.rows[0]) return order.rows[0];
            order.rows[0].products = products;
            return order.rows[0];
        } catch (err) {
            throw err.stack;
        }
    }

    async calculateOrderAmount(data) {
        // Get price from carts in db but not from items (for now)
        const cart = await (data)
        const totalPrice = cart.reduce((acc, item) =>
            acc + parseFloat(item.products.price) * parseInt(item.quantity, 10), 0)
        return totalPrice * 100 //Return price in cents
    }

}