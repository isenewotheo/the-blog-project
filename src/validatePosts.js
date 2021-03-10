const Joi = require('joi');
const {postsSchema, postDateSchema} = require('../joi-schemas/postsJoiSchema');



async function validatePost(req, res, next) {
    let posts = req.body;
    try {
        let post = await postsSchema.validateAsync(posts);
        req.post = post;
        next()
    } catch (error) {
        res.status(400).json('message: ' + error.message);
    }
}
async function validatePostDate(req, res, next) {
    // new Date(req.params.date + 'T00:00:00.000Z')
    let _date = {date: new Date(req.params.date + 'T00:00:00.000Z')};
    try {
        let date = await postDateSchema.validateAsync(_date);
        req.date = date.date;
        next()
    } catch (error) {
        res.status(400).json('message: ' + error.message);
    }
}



module.exports = {validatePost, validatePostDate};