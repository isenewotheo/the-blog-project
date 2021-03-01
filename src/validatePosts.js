const Joi = require('joi');
const postSchema = require('../joi-schemas/postsJoiSchema');



async function validatePost(req, res, next) {
    let posts = req.body;
    try {
        let post = await postSchema.validateAsync(posts);
        req.post = post;
        next()
    } catch (error) {
        res.status(400).json('message: ' + error.message);
    }
}



module.exports = {validatePost};