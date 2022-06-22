const Joi = require('joi').extend(require('@joi/date'));
module.exports = {

    paymentSchema: {
        body: Joi.object({
            card_type: Joi.string().min(6).required(),
            card_number: Joi.string().min(12).required(),
            expiry_date: Joi.string().max(10).required(),
            name_on_card: Joi.string().min(10).max(100).required(),
            security_code: Joi.string().alphanum().max(3)
        })
    },

};


