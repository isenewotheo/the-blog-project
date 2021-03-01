const express = require('express');
const router = express.Router();
const path = require('path');
const dbQuery = require('../db/usersQuery')


function getPage(pathTo) {
    return path.join(__dirname, `../views/${pathTo}`)
}


router.get('/', (req, res) => {
    res.sendFile(getPage('tags.htm'));
});

router.get('/:id', (req, res) => {
    res.sendFile(getPage('tags.htm'));
});


module.exports = router