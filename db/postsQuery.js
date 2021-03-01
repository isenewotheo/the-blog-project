require('dotenv').config();
const mongoose = require('mongoose');
const path = require('path');
const posts = require(path.join(__dirname, './models/schema/postsSchema'));
mongoose.connect(process.env.DATA_BASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
});
const db = mongoose.connection;
db.on('error', (error) => console.log('there was an error'));
db.once('open', () => console.log('successfully connected to db'));


class QueryPosts {
    // get posts with a specific id
    async getPost(id){
        try {
            let post = await posts.findOne({_id: id});
            return post
        } catch (error) {
            return null;
        }
    }

    // gets all posts
    async getPosts(){
        try {
            let _posts = await posts.find();
            return _posts
        } catch (error) {
            return error
        }
    }
    
    // adds a new post to the database
    async addPost(_post){
        let post = new posts({..._post});
        try {
            const newPost = await post.save();
            return newPost;
        } catch (error) {
            return error.message;
        }
    }
    // Delete a post
    async deletePost(id){
        let result = await posts.deleteOne({_id: id});
        return result;
    }

////////////////////////////////////////////////
    // Update post details
    async updatePost(id, value){
        // where id = post id 
        // value is the value of the post
        try {
            let result = posts.updateOne({_id: id}, {
                $set: {
                    ...value
                }
            });
            return result;
        } catch (error) {
            console.log(error);
            return error;
        }
    }
}
// const q = new QueryPosts();
// q.addPost(

// )
module.exports = QueryPosts;