const Joi = require('joi');
const {loginSchema, signupSchema} = require('../joi-schemas/loginSignUpSchema');
const {patchUserNameSchema, patchEmailSchema, patchPasswordSchema} = require('../joi-schemas/usersPatchSchema');

async function validateSignUp(req, res, next) {
    let users = req.body;
    try {
        let user = await signupSchema.validateAsync(users);
        req.user = user;
        next()
    } catch (error) {
        res.status(400).json('message: ' + error.message);
    }
}


async function validatePatchUserNameSchema(req, res, next) {
    try {
        let data = await patchUserNameSchema.validateAsync(req.details);
        next()
    } catch (error) {
        res.status(400).json(error.message);
    }

}
async function validatePatchEmailSchema(req, res, next) {
    try {
        await patchEmailSchema.validateAsync(req.details);
        next()
    } catch (error) {
        res.status(400).json(error.message);
    }

}
async function validatePatchPasswordSchema(req, res, next) {
    try {
        let data = await patchPasswordSchema.validateAsync(req.details);
        next()
    } catch (error) {
        res.status(400).json(error.message);
    }

}

module.exports = {validateSignUp, validatePatchUserNameSchema, validatePatchEmailSchema, validatePatchPasswordSchema};