const Joi = require('joi');
const {loginSchema, signupSchema} = require('../joi-schemas/loginSignUpSchema');

async function validateSignUp(req, res, next) {
    let users = req.body;
    try {
        let user = await signupSchema.validateAsync(users);
        req.user = user;
        next()
    } catch (error) {
        console.log(error)
        res.json('message: ' + error.message);
    }


}

module.exports = {validateSignUp};