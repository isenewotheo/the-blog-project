require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path');
const PORT = process.env.PORT;
let api = require('./api-routes');

app.use('/api', api);
app.use('/public', express.static(path.join(__dirname, './public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views/index.htm'));
});
app.get('/about', (req, res) => {
    res.sendFile(path.join(__dirname, 'views/about.htm'));
});
app.get('/contact', (req, res) => {
    res.sendFile(path.join(__dirname, 'views/contact.htm'));
});


app.listen(PORT, console.log(`Server started on port ${PORT}`));