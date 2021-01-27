const express = require('express');
const router = express.Router();
const dbQuery = require('../db/dbquery')

// Get all users
router.get('/users', (req, res) => {
});


// Add new user
router.post('/users', (req, res) => {
});


// Get a user
router.get('/user/id', (req, res) => {
});

// Edit a user
router.patch('/users/:id', (req, res) => {
});

// Remove a user
router.delete('/users/:id', (req, res) => {
});




module.exports = router