const orderRouter = require('express').Router();
const Order = require('../models/OrderModel');
const { checkAuthentication } = require('../passportConfig');
const orderInstance = new Order();

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