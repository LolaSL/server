const Joi = require('joi').extend(require('@joi/date'));

module.exports = {
    orderSchema:
    {
        body: Joi.object({
            id: Joi.String().required(),
            user_id: Joi.String().required(),
            status: Joi.String().required(),
            created_at: Joi.Date().required(),
            total_price: Joi.Number().required(),
            modified: Joi.Date().required(),
            products: [
                {
                    order_items: Joi.String().required(),
                    product_id: Joi.String(),
                    quantity: Joi.Number().min(1),

                }
            ],

        }
        )
    }
}

