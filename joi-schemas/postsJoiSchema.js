const Joi = require('joi');


const postsSchema = Joi.object({
    author: Joi.string()
        .min(3)
        .max(20)
        .required(),
    title: Joi.string()
        .min(3)
        .required(),
    tags: Joi.array(),
    body: Joi.string()
        .min(3)
        .required(),
    completed: Joi.boolean(),
})


module.exports = postsSchema;