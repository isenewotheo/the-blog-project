require('dotenv').config();
const mongoose = require('mongoose');
const path = require('path');
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

}

module.exports = QueryComments;