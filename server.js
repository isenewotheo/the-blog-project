require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path');
const QueryPosts = require('./db/postsQuery')
const db = new QueryPosts();
const PORT = process.env.PORT;
let api = require('./api-routes');

app.use('/', (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*")
    next();
});

app.use('/api', api);

app.use('/public', express.static(path.join(__dirname, './public')));


function getPage(pathTo) {
    return path.join(__dirname, `views/${pathTo}`)
}

// Get all 
app.get('/posts', async (req, res) => {
    res.sendFile(getPage('posts.htm'));
});


// Get one
app.get('/posts/:id', (req, res) => {
    res.sendFile(getPage('post.htm'));
});

// Get posts in a day
app.get('/posts/date/:date', (req, res) => {
    res.sendFile(getPage('postDate.htm'));
});


app.get('/', (req, res) => {
    res.sendFile(getPage('index.htm'));
});


app.get('/about', (req, res) => {
    res.sendFile(getPage('about.htm'));
});
app.get('/contact', (req, res) => {
    res.sendFile(getPage('contact.htm'));
});


app.listen(PORT, console.log(`Server started on port ${PORT}`));