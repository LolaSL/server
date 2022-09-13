const Joi = require('joi').extend(require('@joi/date'));
// const OrderModel = require('../models/OrderModel')
module.exports = {
    orderSchema:
    {
        body: Joi.object({
            userId: Joi.String().required(),
            products: [
                { productId: Joi.String(), quantity: Joi.Number().min(1) }
            ],
            subtotal: Joi.Number().required(),
            total: Joi.Number().required(),
            shipping: Joi.Object().required(),
            delivery_status: Joi.String().default("PENDING"),
            payment_status: Joi.String().required(),
            timestamps:  Joi.date().format('YYYY-MM-DD').utc(),
        },
    
        )
    }
}

// const Order = OrderModel("Order", orderSchema);
// exports.Order = Order;