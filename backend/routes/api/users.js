const express = require('express');
const bcrypt = require('bcryptjs');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const validateSignup = [
    check('firstName')
    .exists({ checkFalsy: true })
    .isAlpha()
    .isLength({min: 3})
    .withMessage('First Name is required'),
    check('lastName')
    .isAlpha()
    .isLength({min: 3 })
    .withMessage('Last Name is required'),
    check('email')
    .exists({ checkFalsy: true })
    .isEmail()
    .withMessage('Invalid email'),
    check('username')
    .exists({ checkFalsy: true })
    .isLength({min: 4 })
    .withMessage('Username is required'),
    check('username')
    .not()
    .isEmail()
    .withMessage('Username cannot be an email.'),
    handleValidationErrors
];

const router = express.Router();


router.post('/', validateSignup, async (req, res, next) => {

    try {
        const { firstName, lastName, email, password, username } = req.body;
    const hashedPassword = bcrypt.hashSync(password);
    
    const emailCheck = await User.findOne({
        where: {
            email
        }
    })
    const usernameCheck = await User.findOne({
        where: {
            username
        }
    })

    if (emailCheck) {
        const err = new Error('User already exists');
        err.errors = {email: 'User with that email already exists'};
        err.status = 500
        return next(err)
    }

    if (usernameCheck) {
        const err = new Error('User already exists');
        err.errors = {username: 'User with that username already exists'};
        err.status = 500
        return next(err)
    }
    
    const user = await User.create({ firstName, lastName, email, username, hashedPassword });
    const safeUser = {
        id: user.id,
        firstName: firstName,
        lastName: lastName,
        email: user.email,
        username: user.username
    };

    await setTokenCookie(res, safeUser);

    return res.json({
        user: safeUser
    });
        
    } catch (error) {
        next(error);
    }
    
});



module.exports = router;