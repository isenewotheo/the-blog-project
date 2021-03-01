const Joi = require('joi');

const patchUserNameSchema = Joi.object({
    userName: Joi.string()
        .alphanum()
        .min(3)
        .max(20).required()
});


const patchEmailSchema = Joi.object({
        email: Joi.string()
            .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
            .required()
});

const patchPasswordSchema = Joi.object({
        password: Joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
        .required()
})

module.exports = {patchUserNameSchema, patchEmailSchema, patchPasswordSchema}