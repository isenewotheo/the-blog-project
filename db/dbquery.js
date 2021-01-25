const mongoose = require('mongoose');
const path = require('path');
const users = require(path.join(__dirname, '../models/users'));
console.log
mongoose.connect('mongodb://localhost/users', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
});
const db = mongoose.connection;
db.on('error', (error) => console.log('there was an error'));
db.once('open', () => console.log('successfully connected to db'));