require('dotenv').config();
const mongoose = require('mongoose');
const path = require('path');
// const postQuery = require('../db/postsQuery');
// const post = new postQuery();
// const posts = require(path.join(__dirname, './models/schema/postsSchema'));
const comments = require(path.join(__dirname, './models/schema/commentsSchema'));
mongoose.connect(process.env.DATA_BASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
});
const db = mongoose.connection;
db.on('error', (error) => console.log('there was an error'));
db.once('open', () => console.log('successfully connected to db'));

class QueryComments {
    // GEt all comments 
    async getcom(){
        try {
            let _comments = await comments.find({});
            return _comments
        } catch (error) {
            return error;
        }
    }

    // GET all the comments from a post 
    async getComments(postID){
        try {
            let _comments = await comments.find({postID});
            return _comments 
        } catch (error) {
            return error
        }
    }


    // GET a comment
    async getComment(commentID){
        try {
            let comment = await comments.find({_id: commentID})
            return comment;
        } catch (error) {
            return error;
        }
    }

    // Post a comment   ////////////////////////////////////
    async addComment(newComment) {
        let comment = new comments({...newComment})
        try {
            const result = await comment.save();
            return result;
        } catch (error) {
            return error.message
        }
    }


    // Update a comment 
    async updateComment(id, value){
        try {
            const result = await comments.updateOne({_id: id}, {
                $set: {
                    body: value
                }
            });
            return result;
        } catch (error) {
            return error;
        }
    }

    
    // Delete a comment
    async deleteComment(_id) {
        try {
            let deleted = await comments.deleteOne({_id});
            return deleted;
        } catch (error) {
            return error
        } 
    }
}

// let q = new QueryComments()
// q.getComments('kdjfdkfjdifieierefj').then(data => console.log(data))

module.exports = QueryComments;