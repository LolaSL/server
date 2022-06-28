const express = require('express');
const { paymentSchema } = require('../func_schemas/paymentSchema')
const { validate, ValidationError } = require('express-validation');
const PaymentService = require('../service/paymentService');
const PaymentServiceInstance = new PaymentService;

const paymentRouter = express.Router();

//get payment data by customer id 
paymentRouter.get('/data/:customerId', validate(paymentSchema), async (req, res, next) => {
    try {
        const response = await PaymentServiceInstance.getPaymentDetails(req.params.customerId);
        res.json(response);
    } catch (err) {
        next(err);
    }
})

//create payment data

paymentRouter.post('/data/new/:customerId', validate(paymentSchema), async (req, res, next) => {
    try {
        const response = await PaymentServiceInstance.createPaymentDetails(req.params.customerId, body);
        res.json(response);
    } catch (err) {
        next(err);
    }
})

//amend payment data
paymentRouter.put('/data/amend/:customerId', validate(paymentSchema), async (req, res, next) => {
    try {
        const response = await PaymentServiceInstance.amendPaymentDetails(req.params.customerId, req.body);
        res.json(response);
    } catch (err) {
        next(err);
    }
})
//Catch validation errors
paymentRouter.use((err, req, res, next) => {
    if (err instanceof ValidationError) return res.status(err.statusCode).json(err);
    next();
});
module.exports = paymentRouter;