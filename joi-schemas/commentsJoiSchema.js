const Joi = require('joi');


const commentsSchema = Joi.object({
    userID: Joi.string()
        .min(24)
        .max(24)
        .required(),
    body: Joi.string()
        .min(1)
        .required(),
    postID: Joi.string()
        .min(24)
        .max(24)
        .required(),
})

const updateCommentSchema = Joi.object({
    body: Joi.string()
        .min(1)
        .required()
})

module.exports = {commentsSchema, updateCommentSchema};