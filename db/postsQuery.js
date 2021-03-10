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
    // get posts with a specific id////////////////////////////////////////////
    async getPost(id){
        try {
            let post = await posts.findOne({_id: id});
            return post
        } catch (error) {
            return null;
        }
    }

    // gets all posts/////////////////////////////////////////////////
    async getPosts(){
        try {
            let _posts = await posts.find();
            return _posts
        } catch (error) {
            return error
        }
    }


    // gets all posts in a day////////////////////////////////////////////
    async getPostsByDate(_date){
        // _date = new Date(_date + 'T00:00:00.000Z');
        let date = _date.toISOString();
        let lt = new Date(_date.setDate(_date.getDate() + 1));
        lt = lt.toISOString();
        try {
            let _posts = await posts.find({date: {$gte: date,$lt: lt}});
            return _posts
        } catch (error) {
            console.log('error')
            return 'error'
        }
    }



    ///  get dates of posts ///////////////////////////////////////////////////////
    // Am getting the dates from each post and then returning
    // them without duplicating the dates
    async getPostsDates(){
        let date = [];
        let dates = [];
        try {
            let _posts = await posts.find({});
            _posts.forEach(post => {
                let _date = post.date.toISOString()
                let slicedDate = _date.slice(0, 10)
                date.push(slicedDate)
            });
            date.forEach(element => {
                if(!dates.includes(element)){
                    dates.push(element)
                }
            });
            return dates;
        } catch (error) {
            return error
        }
    }


    
    // adds a new post to the database////////////////////////////////////////////
    async addPost(_post){
        let post = new posts({..._post});
        try {
            const newPost = await post.save();
            return newPost;
        } catch (error) {
            return error.message;
        }
    }





    // Delete a post////////////////////////////////////////////////////////
    async deletePost(id){
        try {
            let post = await this.getPost(id)
            let delet = await posts.deleteOne({_id: post._id});
            return delet;
        } catch (error) {
            console.log(error)
            return 'error \npost with the id does not exist';
        }
    }

    // Update post details ////////////////////////////////////////////////
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



    // Get all tags
    // Using the same logic I used in getPostsDates
    async getTags(){
        let tag = [];
        let tags = [];
        try {
            let _posts = await posts.find({});
            _posts.forEach(post => {
                post.tags.forEach(_tag => {
                    tag.push(_tag)
                });
            });
            tag.forEach(_tag => {
                if (!tags.includes(_tag)) {
                    tags.push(_tag)
                }
            });
            return tags;
        } catch (error) {
            return error
        }
    }



    // the all post with a tag
    async getTagPosts (tag){
        let postID = [];
        try {
            let _posts = await posts.find({});
            _posts.forEach(post => {
                if (post.tags.includes(tag)) {
                    postID.push(post._id);
                }
            });
            return postID
        } catch (error) {
            console.log(error)
        }
    }
}

// let q = new QueryPosts();
// q.getTagPosts('svelte').then(res => console.log(res))

module.exports = QueryPosts;