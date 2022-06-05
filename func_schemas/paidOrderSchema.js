const Joi = require('joi').extend(require('@joi/date'));

module.exports = {
    orderSchema: {
        body: Joi.object({
            user_id: Joi.string().required(),
            created_at: Joi.date().format('DD/MM/YYYY').utc(),
            modified:Joi.date().format('DD/MM/YYYY').utc(),
            customerId: Joi.string().required(),
            products: Joi.array().required(),
            subtotal: Joi.number().required(),
            total: Joi.number().required(),
            shipping: Joi.object().required(),
            delivery_status: Joi.string().default('PENDING'),
            payment_status: Joi.string().required(),
        })
    }
}