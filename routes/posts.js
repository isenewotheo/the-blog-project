const express = require('express');
const router = express.Router();
const dbQuery = require('../db/usersQuery')


// Get all 
router.get('/posts', (req, res) => {
});

// Post one
router.post('/posts', (req, res) => {
});

// Get one
router.get('/posts/:id', (req, res) => {
});

// Delete one
router.delete('/posts/:id', (req, res) => {
});

// Patch one
router.patch('/posts/:id', (req, res) => {
});

module.exports = router