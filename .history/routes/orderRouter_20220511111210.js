const orderRouter = require('express').Router();
const Ordermodel = require('../models/OrderModel');
const { checkAuthentication } = require('../config/passportConfig');
const orderInstance = new Ordermodel();

//Check order id
orderRouter.use('/:id', checkAuthentication, async (req, res, next) => {
    try {
        const orders = await orderInstance.getOrderById(req.params.id);
        if (!orders) return res.status(400).send('No order found');
        if (orders.user_id !== req.user.id) return res.status(400).send('No order found');
        req.orders = orders;
        next();
    } catch (err) {
        res.status(400).send(err);
    }
})

//Get all orders
orderRouter.get('/', checkAuthentication, async (req, res) => {
    try {
        const result = await orderInstance.getAllOrders(req.user.id);
        if (result.length === 0) return res.status(400).send('No orders found');
        res.json(result);
    } catch (err) {
        res.status(400).send(err);
    }
})

//Get order by id
orderRouter.get('/:id', async (req, res) => {
    res.json(req.order);
})


module.exports = orderRouter;