const express = require('express');
const router = express.Router();
const users = require('./routes/users');
const posts = require('./routes/posts');
const tags = require('./routes/tags');
const comments = require('./routes/comments');

router.use('/users', users);
router.use('/posts', posts);
router.use('/tags', tags);
router.use('/comments', comments);

module.exports = router;