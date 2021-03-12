const express = require('express');
const router = express.Router();
const bc = require('bcrypt');
const QueryUsers = require('../db/usersQuery')
const db = new QueryUsers();
const {validateSignUp, validatePatchPasswordSchema, validatePatchEmailSchema, validatePatchUserNameSchema} = require('../src/validateUsers')
router.use(express.json());

// Get all users
router.get('/', async (req, res) => {
    const users = await db.getUsers();
    res.json({users});
});



// Add new user///////////////////////////////////////////////////////////
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
    res.status(201).json({message: 'Successful', user: newUser});
});
////////////////////////////////////////////////////////////////////////////




// Get a user by username///////////////////////////////////////////
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
///////////////////////////////////////////////////////////////////////






// Checks if user with the id exist/////////////////////////////////////
async function userExists(req, res, next) {
    let user = await db.getUserByID(req.params.id);
    if (user === null) {
        return res.status(400).json({message: "user does not exist"});
    } else {
        req.details = req.body;
        next();
    }
}
async function hashPassword(req, res, next) {
    let hashedPassword = bc.hashSync(req.details.password, 10);
    req.details.password = hashedPassword;
    next()
}
// Edit a user's password//////////////////////////////////////////////
// Check if user exist then
// validate the patch details
router.patch('/updatepassword/:id', userExists, validatePatchPasswordSchema, hashPassword, async (req, res) => {
    db.updateUserPassword(req.params.id, req.details.password);
    res.status(201).json({message: `Password was updated`});
});

// Edit a user's Email
router.patch('/updateemail/:id', userExists, validatePatchEmailSchema, async (req, res) => {
    db.updateUserEmail(req.params.id, req.details.email);
    res.status(201).json({message: `Email was updated to: ${req.details.email}`});
});

// Edit a user name and userName
router.patch('/updateusername/:id', userExists, validatePatchUserNameSchema, async (req, res) => {
    db.updateUserUserName(req.params.id, req.details.userName);
    res.status(201).json({message: `Username was updated to: ${req.details.userName}`});
});
////////////////////////////////////////////////////////////////////////







// Remove a user//////////////////////////////////////////////////////////
router.delete('/:id', async (req, res) => {
    // Checks if user exits
    if (await db.getUserByID(req.params.id) === null){
        // if userexit send bad request
        return res.status(400).json({message: "user does not exist"});
    }
    // then send successful message
    let result = await db.deleteUser(req.params.id);
    res.status(202).json(result);
});
/////////////////////////////////////////////////////////////////////////////////


module.exports = router