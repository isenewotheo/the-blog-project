const express = require('express');
const router = express.Router();
const path = require('path');
const dbQuery = require('../db/postsQuery');
const db = new dbQuery()


function getPage(pathTo) {
    return path.join(__dirname, `../views/${pathTo}`)
}


router.get('/', async (req, res) => {
    let posts = await db.getTags();
    res.json(posts);
});

router.get('/:tag', async (req, res) => {
    let posts = await db.getTagPosts(req.params.tag)
    res.json(posts);
});


module.exports = router