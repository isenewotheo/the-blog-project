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

const postDateSchema = Joi.object({
    date: Joi.date()
})

module.exports = {postsSchema, postDateSchema};