const orderRouter = require('express').Router();
const Order = require('../models/OrderModel');
const { checkAuthentication } = require('../config/passportConfig');
const orderInstance = new Order();

//Check order id
orderRouter.use('/:id',   checkAuthentication,  async (req, res, next) => {
    try {
        const order = await orderInstance.getOrderById(req.params.id);
        if (!order) return res.status(400).send('No order found');
        if (order.user_id !== req.user.id) return res.status(400).send('No order found');
        req.orders = order;
        next();
    } catch (err) {
        res.status(400).send(err.message);
    }
})
// createOrder is fired by stripe webhook
// example endpoint

orderRouter.post("/",  async (req, res) => {
    const orderInstance = new Order(req.body);
  
    try {
      const savedOrder = await orderInstance.save();
      res.status(200).send(savedOrder);
    } catch (err) {
      res.status(500).send(err.message);
    }
});

  
//Get all orders
orderRouter.get('/',  checkAuthentication, async (req, res) => {

    try {
        const result = await orderInstance.getAllOrders(req.user.id);
        if (result.length === 0) return res.status(400).send('No orders found');
        res.json(result);
    } catch (err) {
        res.status(400).send(err);
    }
})

//Get order by id
orderRouter.get('/:id',  async (req, res) => {
    res.json(req.order);
})


module.exports = orderRouter;