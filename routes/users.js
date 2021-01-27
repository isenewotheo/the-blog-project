const express = require('express');
const router = express.Router();
const {QueryUsers} = require('../db/dbquery')
const db = new QueryUsers();
const {validateSignUp} = require('../src/validate')
router.use(express.json());

// Get all users

router.get('/', async (req, res) => {
    const users = await db.getUsers();
    res.json({users});
});

function findUser(email) {
    try {
        if(db.getUser(email) != null){
            return true;
        }else {
            return false
        }
    } catch (err) {
        console.log(err)
    }
}
// Add new user
router.post('/', validateSignUp, async (req, res) => {
    if (findUser(req.user.email)){
        return res.json({message: `user with the email: ${req.user.email} already exist`});
    }
    let user = await db.addUser(req.user);
     res.status(201).json({message: 'Successful'});
});


// Get a user by username
router.get('/search', async (req, res) => {
    console.log(req.query.username)
    let user = await db.getUserByUserName(req.query.username);
    if (user === null){
        return res.status(403).json({user: null,message: "user does not exist"});
    }
    res.status(200).json({user});
});
// Get a user by id
router.get('/:id', async (req, res) => {
    console.log(req.params.id)
    let user = await db.getUserByID(req.params.id);
    if (user === null){
        return res.status(403).json({user: null,message: "user does not exist"});
    }
    res.status(200).json({user});
});

// Edit a user
router.patch('/:id', (req, res) => {
});

// Remove a user
router.delete('/:id', (req, res) => {
});



module.exports = router