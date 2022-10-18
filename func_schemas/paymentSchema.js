const Joi = require('joi').extend(require('@joi/date'));

module.exports ={
paymentSchema: {
    body: Joi.object({
        url: Joi.string().required(),
    })
}

}
