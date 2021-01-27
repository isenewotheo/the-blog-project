const mongoose = require('mongoose');

const postsSchema = new mongoose.Schema({
    // postid
    // likes
    // posted_on
    // last_modified
});


module.exports = mongoose.model('posts', postsSchema);