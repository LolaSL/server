const Joi = require('joi').extend(require('@joi/date'));

module.exports ={
paymentSchema: {
    body: Joi.object({
        url: Joi.string(),
        // card_type: Joi.string().min(6),
        // card_number: Joi.string().min(6).required(),
        // expiry_date: Joi.date().required(),
        // name_on_card: Joi.string().min(10).max(100).required(),
        // security_code: Joi.string().min(6).required()
    })
}

}
