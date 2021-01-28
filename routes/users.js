const express = require('express');
const router = express.Router();
const bc = require('bcrypt');
const {QueryUsers} = require('../db/dbquery')
const db = new QueryUsers();
const {validateSignUp} = require('../src/validate')
router.use(express.json());

// Get all users

router.get('/', async (req, res) => {
    const users = await db.getUsers();
    res.json({users});
});

// Add new user
// validateSignUp checks if the sign up detail are correct
router.post('/', validateSignUp, async (req, res) => {
    //check if user with the email already exist
    if (await db.getUserByEmail(req.user.email) !== null){
        return res.json({message: `user with the email: ${req.user.email} already exist`});
    }


    // call bcrypt to encrypt password
    user = req.user
    let hashedPassword = bc.hashSync(user.password, 10);
    user.password = hashedPassword;


    // add user to dataBase and send a successful message
    let newUser = await db.addUser(user);
    res.status(201).json({message: 'Successful'});
});


// Get a user by username
router.get('/search', async (req, res) => {
    let users = await db.getUserByUserName(req.query.username);
    if (users === null){
        return res.status(403).json({users: null,message: "user does not exist"});
    }
    res.status(200).json({users});
});
// Get a user by id
router.get('/:id', async (req, res) => {
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
router.delete('/:id', async (req, res) => {
    let userExist = await db.getUserByID(req.params.id);
    if (userExist === null){
        return res.status(400).json({message: "user does not exist"});
    }
    let result = await db.deleteUser(req.params.id);
    res.status(202).json(result);
});



module.exports = router