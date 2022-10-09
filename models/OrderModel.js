const { query } = require('../DB/db');


module.exports = class Order {

    async create(data) {
        const text = 'INSERT INTO orders (user_id, status, created_at, modified_at, total_price) VALUES ($1, $2, current_timestamp,current_timestamp, $5 ) RETURNING id;';
        const inputs = [data, 'PENDING'];
        try {
            return await query(text, inputs);
        } catch (err) {
            throw err.stack;
        }
    }


    async addProduct(data) {
        const text = 'INSERT INTO order_items (order_id, product_id, quantity, price ) VALUES ($1, $2, $3, (SELECT price FROM products WHERE id = $2));';
        const inputs = [data.order_id, data.product_id, data.price, data.quantity, data.id];
        try {
            return await query(text, inputs);
        } catch (err) {
            throw err.stack;
        }
    }

    async getOrderProducts(data) {
        const text = 'SELECT order_items, product_id , quantity FROM products JOIN order_items ON id = product_id WHERE order_id = $1;';
        const inputs = [data];
        try {
            const products = await query(text, inputs);
            return products.rows;
        } catch (err) {
            throw err.stack;
        }
    }

    async getAllOrders(data) {
        const text = 'SELECT * FROM orders WHERE user_id = $1';
        const inputs = [data];
        try {
            const orders = await query(text, inputs);
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
            const order = await query(text, inputs);
            if (!order.rows[0]) return order.rows[0];
            order.rows[0].products = products;
            return order.rows[0];
        } catch (err) {
            throw err.stack;
        }
    }


}
