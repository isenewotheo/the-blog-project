const Joi = require('joi');
const userQuery = require('../db/usersQuery');
const postQuery = require('../db/postsQuery');
const userDB = new userQuery()
const postDB = new postQuery()
const {commentsSchema, updateCommentSchema} = require('../joi-schemas/commentsJoiSchema');

async function confirmPost(postID) {
    let post = await postDB.getPost(postID);
    if (post === null) {
        return false;
    }else {
        return true;
    }
}
async function confirmUser(userID) {
    let user = await userDB.getUserByID(userID);
    if (user === null) {
        return false;
    }else {
        return user;
    }
}

async function validateComment(req, res, next) {
    let comments = req.body;
    try {
        let comment = await commentsSchema.validateAsync(comments);
        let post = await confirmPost(comment.postID);
        let user = await confirmUser(comment.userID);
        if (!post) {
            throw  {message: "post does not exit"};
        }

        if (!user) {
            throw {message: "user does not exit"};
        }else {
            comment.userName = user.userName;
        }

        req.comment = comment;
        next()
    } catch (error) {
        res.status(400).json({message: error.message});
    }
}

async function validateUpdateComment(req, res, next) {
    let commentBody = req.body;
    try {
        commentBody = await updateCommentSchema.validateAsync(commentBody)
        req.comment = commentBody.body;
        next()
    } catch (error) {
        return res.status(400).json({message: error.message})
    }
} 


module.exports = {validateComment, validateUpdateComment};