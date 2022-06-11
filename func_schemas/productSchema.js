const Joi = require('joi');

module.exports = {
    productInputSchema: {
        body: Joi.object({
            product_id: Joi.number().max(100),
            quantity: Joi.number().min(1)
        })
    },

    productQtySchema: {
        body: Joi.object({
            quantity: Joi.number().min(1)
        })
    }


}