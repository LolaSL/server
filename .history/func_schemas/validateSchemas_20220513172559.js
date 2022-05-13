
const BaseJoi = require('joi');
const JoiDate = require('@joi/date');
const Joi = BaseJoi.extend(JoiDate);
// const Joi = require('joi')
//     .extend(require('@joi/date'));
module.exports = {

    registerSchema: {
        body: Joi.object({
            email: Joi.string().min(6).email(),
            password: Joi.string().min(6).alphanum().required(),
            first_name: Joi.string().alphanum().min(3).max(30).required(),
            last_name: Joi.string().alphanum().min(3).max(30).required(),
            address: Joi.string().trim().required(),
            postcode: Joi.string().required(),
            city: Joi.string().alphanum().min(3).max(30).required(),
            country: Joi.string().trim().alphanum().required(),
            date_joined: Joi.date().format('YYYY-MM-DD').utc(),
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
            password: Joi.string().min(6).alphanum().required(),
            first_name: Joi.string().alphanum().min(3).max(30).required(),
            last_name: Joi.string().alphanum().min(3).max(30).required(),
            address: Joi.string().trim().required(),
            postcode: Joi.string().required(),
            city: Joi.string().alphanum().min(3).max(30).required(),
            country: Joi.string().trim().alphanum().required(),
            date_joined: Joi.date().format('YYYY-MM-DD').utc(),
            active: Joi.boolean().required(),
            user_role: Joi.string().required()
        })
    }
};