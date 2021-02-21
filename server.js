require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path');
const PORT = process.env.PORT;
let api = require('./api-routes');

function getFile(path) {
    return path.join(__dirname, path)
}
console.log(getFile('kd'))

app.use('/api', api);
app.use('/public', express.static(path.join(__dirname, './public')));

app.get('/', (req, res) => {
    res.sendFile(getFile('./test.html'));
});


app.get('/post/:id', (req, res) => {
    res.sendFile(path.join(__dirname, 'views/post.htm'));
});

app.get('/posts', (req, res) => {
    res.sendFile(path.join(__dirname, 'views/posts.htm'));
});


app.get('/tags', (req, res) => {
    res.sendFile(path.join(__dirname, 'views/tags.htm'));
});





app.get('/about', (req, res) => {
    res.sendFile(path.join(__dirname, 'views/about.htm'));
});
app.get('/contact', (req, res) => {
    res.sendFile(path.join(__dirname, 'views/contact.htm'));
});


app.listen(PORT, console.log(`Server started on port ${PORT}`));