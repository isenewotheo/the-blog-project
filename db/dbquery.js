require('dotenv').config();
const mongoose = require('mongoose');
const path = require('path');
const users = require(path.join(__dirname, './models/schema/usersSchema'));
const posts = require(path.join(__dirname, './models/schema/postsSchema'));
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




class QueryUsers {
    // get user with a username
    async getUserByUserName(userName){
        try {
            let user = await users.find({userName: userName});
            return user
        } catch (error) {
            return error
        }
    }
    // get user with a specific email
    async getUserByEmail(email){
        try {
            let user = await users.findOne({email: email});
            return user
        } catch (error) {
            return error
        }
    }
    // get user with a specific id
    async getUserByID(id){
        try {
            let user = await users.findOne({_id: id});
            return user
        } catch (error) {
            return null;
        }
    }

    // gets all users
    async getUsers(){
        try {
            let _users = await users.find();
            return _users    
        } catch (error) {
            return error
        }
    }
    // adds a new user to the database
    async addUser(userDetail){
        let {name, userName, password, email} = userDetail
        let user = new users({
            name,
            userName,
            password,
            email
        });
        try {
            const newUser = await user.save();
            return newUser;
        } catch (error) {
            console.log(error);
            return 'error';
        }
    }
    
}
class QueryPosts {
}
class QueryComments {
}

module.exports = {
    QueryUsers,
    QueryPosts,
    QueryComments
}