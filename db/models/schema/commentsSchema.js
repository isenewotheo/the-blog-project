const mongoose = require('mongoose');

const commentsSchema = new mongoose.Schema({
    userID: {
        type: String,
        required: true
    },
    userName: {
        type: String,
        required: true 
    },
    postID: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    modified: {
        type: Date,
        default: Date.now(),
        required: true
    }
});


module.exports = mongoose.model('comments', commentsSchema);