const { Joi } = require('express-validation');

module.exports = {
    productInputSchema: {
        body: Joi.object({
            product_id: Joi.number().max(100).required(),
            quantity: Joi.number().required().min(1)
        })
    },

    productQtySchema: {
        body: Joi.object({
            quantity: Joi.number().required().min(1)
        })
    }


}