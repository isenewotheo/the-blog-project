const mongoose = require('mongoose');

const postsSchema = new mongoose.Schema({
    author: {
        type: String,
        required: true 
    },
    title: {
        type: String,
        required: true
    },
    tags: {
        type: Array,
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
        default: Date.now,
        required: true
    },
    completed: {
        type: Boolean,
        default: false,
        required: true
    }
});


module.exports = mongoose.model('posts', postsSchema);