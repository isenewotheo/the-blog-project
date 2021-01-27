const mongoose = require('mongoose');

const commentsSchema = new mongoose.Schema({
    // comment_id
    // likes
    // posted_on
    // last_modified
    // user { userid userName }
});


module.exports = mongoose.model('comments', commentsSchema);