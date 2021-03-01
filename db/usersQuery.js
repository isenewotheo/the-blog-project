require('dotenv').config();
const mongoose = require('mongoose');
const path = require('path');
const users = require(path.join(__dirname, './models/schema/usersSchema'));
mongoose.connect(process.env.DATA_BASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
});
const db = mongoose.connection;
db.on('error', (error) => console.log('there was an error'));
db.once('open', () => console.log('successfully connected to db'));

// (async function() {
//     let q = await users.find({name: {$regex: /t/}}).limit(5).skip(0)
//     console.log(q)
// })()

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
        let {userName, password, email} = userDetail
        let user = new users({
            userName,
            password,
            email
        });
        try {
            const newUser = await user.save();
            return newUser;
        } catch (error) {
            return 'error';
        }
    }
    // Delete a user
    async deleteUser(id){
        let result = await users.deleteOne({_id: id});
        return result;
    }


    // Update user details
    async updateUserEmail(id, value){
        try {
            let result = users.updateOne({_id: id}, {
                $set: {
                    email: value
                }
            });
            return result;
        } catch (error) {
            console.log(error);
            return error;
        }
    }
    async updateUserPassword(id, value){
        try {
            let result = users.updateOne({_id: id}, {
                $set: {
                    password: value
                }
            });
            return result;
        } catch (error) {
            console.log(error);
            return error;
        }
    }
    async updateUserUserName(id, value){
        try {
            let result = users.updateOne({_id: id}, {
                $set: {
                    userName: value
                }
            });
            return result;
        } catch (error) {
            console.log(error);
            return error;
        }
    }
}

module.exports = QueryUsers