const Joi = require('joi')
    .extend(require('@joi/date'));
module.exports = {

    registerSchema: {
        body: Joi.object({

            email: Joi.string().email().lowercase().required(),
            password: Joi.string().min(8).regex(/^[a-zA-Z0-9]{3,30}$/).required(),
            // first_name: Joi.string().alphanum().min(3).max(30),
            // last_name: Joi.string().alphanum().min(3).max(30),
            first_name: Joi.string().trim().alphanum().required(),
            last_name: Joi.string().trim().alphanum().required(),
            address: Joi.string(),
            postcode: Joi.string().required(),
            city: Joi.string().alphanum().min(3).max(30).required(),
            country: Joi.string().trim().alphanum().required(),
            date_joined: Joi.date(Date.now()).raw().iso().required(),
            active: Joi.boolean().required(),
            user_role: Joi.string().required()
        })
    },
    loginSchema: {
        body: Joi.object({
            email: Joi.string().min(6).email().required(),
            password: Joi.string().min(6).required()
        })
    },
    updateSchema: {
        body: Joi.object({
            email: Joi.string().min(6).email(),
            password: Joi.string().min(6).regex(/^[a-zA-Z0-9]{3,30}$/).required(),
            first_name: Joi.string().alphanum().min(3).max(30).required(),
            last_name: Joi.string().alphanum().min(3).max(30).required(),
            address: Joi.string(),
            postcode: Joi.string().required(),
            city: Joi.string().alphanum().min(3).max(30).required(),
            country: Joi.string().trim().alphanum().required(),
            date_joined: Joi.date(Date.now()).raw().iso().required(),
            active: Joi.boolean().required(),
            user_role: Joi.string().required()
        })
    }
};