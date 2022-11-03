const orderRouter = require('express').Router();
const Order = require('../models/OrderModel');
const { checkAuthentication } = require('../config/passportConfig');
const orderInstance = new Order();
const { ensureToken,  isAdmin } = require("../utils/ensureToken");

//Create order object
orderRouter.post('/create', checkAuthentication, async (req, res) => {

    try {
        const { order } = req.body.order;
        const savedOrder= await orderInstance.create(order);
        if (result.length === 0) return res.status(400).send('No order  created');
        // res.json(result);
        res.status(200).send(savedOrder);
    } catch (err) {
        res.status(400).send(err);
    }
})
//Get all orders
orderRouter.get('/',  checkAuthentication, async (req, res) => {

    try {
        const { id } = req.user;
        const result = await orderInstance.getAllOrders(id);
        if (result.length === 0) return res.status(400).send('No orders found');
        res.json(result);
    } catch (err) {
        res.status(400).send(err);
    }
})
//Check order id
orderRouter.get('/:id',   checkAuthentication,  async (req, res, next) => {
    try {   
        let id = req.params.id;
        const order = await orderInstance.getOrderById(id); 
        if (!order) return res.status(400).send('No order found');
        if (order.user_id !== req.user.id) return res.status(400).send('No order found');
         res.json(order);
        next();
    } catch (err) {
        res.status(400).send(err);
    }
})


 module.exports = orderRouter;