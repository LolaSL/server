const Joi = require('joi').extend(require('@joi/date'));

module.exports = {
    orderSchema:
    {
        body: Joi.object({
            userId: Joi.String().required(),
            customerId: Joi.String().required(),
            paymentIntentId: Joi.String().required(),
            products: [
                { productId: Joi.String(), quantity: Joi.Number().min(1) }
            ],
            subtotal: Joi.Number().required(),
            total: Joi.Number().required(),
            shipping: Joi.Object().required(),
            payment_status: Joi.String().required(),
        },

        )
    }
}

