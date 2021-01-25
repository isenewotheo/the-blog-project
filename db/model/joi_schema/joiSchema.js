const Joi = require('joi');

const loginSchema = Joi.object({
    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),

    password: Joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
});
const signupSchema = Joi.object({
    firstName: Joi.string()
        .alphanum()
        .min(3)
        .max(20),

    userName: Joi.string()
        .alphanum()
        .min(3)
        .max(20)
        .required(),

    password: Joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),

    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
})


module.exports = {loginSchema, signupSchema};