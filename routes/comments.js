const express = require('express');
const router = express.Router();
const dbQuery = require('../db/commentsQuery');
const db = new dbQuery();
const {validateComment, validateUpdateComment} = require('../src/validateComments');

router.use(express.json());

// Get all comment from a post    ////////////////////////////////////
router.get('/', async (req, res) => {
    let comments = await db.getcom();
    console.log(comments);
    res.json(comments);
});


// Get all comment from a post    ////////////////////////////////////
router.get('/postid/:postID', async (req, res) => {
    let comments = await db.getComments(req.params.postID);
    res.json(comments);
});


// Get a comment         ////////////////////////////////////
router.get('/:commentID', async (req, res) => {
    let comment = await db.getComment(req.params.commentID);
    res.json(comment);
});

// Add new comment      ////////////////////////////////////
router.post('/', validateComment, async (req, res) => {
    req.comment.date = Date.now();
    let result = await db.addComment(req.comment);
    res.json(result);
});

// update a comment     ////////////////////////////////////
router.patch('/:id', validateUpdateComment, async (req, res) => {
    let result = await db.updateComment(req.params.id, req.comment);
    res.json(result);
});



// Delete a comment     ////////////////////////////////////
router.delete('/:id', async (req, res) => {
    let result = await db.deleteComment(req.params.id);
    res.json(result);
});


module.exports = router