const express = require('express');
const router = express.Router();
const path = require('path');
const QueryPosts = require('../db/postsQuery')
const db = new QueryPosts();
const {validatePost} = require('../src/validatePosts');

router.use(express.json());

function getPage(pathTo) {
    return path.join(__dirname, `../views/${pathTo}`)
}


// Get all 
router.get('/', async (req, res) => {
    let posts = await db.getPosts();
    res.json(posts);
});


// Get one
router.get('/:id', async (req, res) => {
    let post = await db.getPost(req.params.id)
    res.json(post);
});

// Get posts in a day
router.get('/date/:date', (req, res) => {
    res.sendFile(getPage('post.htm'));
});

// Post one
router.post('/', validatePost, async (req, res) => {
    req.post.date = Date.now();
    let post = await db.addPost(req.post);
    res.json(post);
});

//////////////////////////////////////////////////////////////////////////////
// This function is use to update only the given field.
// It works by getting the post with the ID and putting
// it in an object "A".
// The field to be updated will be object "B".
// then it create a new object "C" with the the field 
// to be updated spreaded in it,
// then loop through the object "B" then replace the  
// empty field with the values from object "A"
async function patching(req, res, next) {
    let post = await db.getPost(req.params.id);
    let replace = req.body;
    post = post.toObject()
    delete post._id;
    delete post.date;
    delete post.modified;
    delete post.__v;
    let newPost = {...post};
    let deleteable = {}
    for (const prop in post) {
        for (const innerProp in replace) {
            if (replace.hasOwnProperty(prop)) {
                newPost[innerProp] = replace[innerProp];
            }else if (!post.hasOwnProperty(innerProp)) {
                // this is added to check if a wrong replace field
                // is added.
                // Then add the it to the deletable object
                deleteable[innerProp] = replace[innerProp]
            }
        }
    }
    // loop through deletable and remove all key value pair  
    // in it from newPost
    for (const prop in deleteable) {
        delete newPost[prop]
    }
    req.body = newPost;
    next()
}

// Patch one
router.patch('/:id', patching, validatePost, async (req, res) => {
    req.post.modified = Date.now();
    let post = await db.updatePost(req.params.id, req.post);
    res.json(post);
});



//////////////////////////////////////////////////////////////////////////////
// Delete one
router.delete('/:id', async (req, res) => {
    let delet = await db.deletePost(req.params.id);
    res.json(delet);
});
module.exports = router