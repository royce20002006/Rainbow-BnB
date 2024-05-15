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
    .withMessage('Please provide your first name with a minimum length of 3 characters.'),
    check('lastName')
    .isAlpha()
    .isLength({min: 3 })
    .withMessage('Please provide your last name with a minimum of 3 characters.'),
    check('email')
    .exists({ checkFalsy: true })
    .isEmail()
    .withMessage('Please provide a valid email'),
    check('username')
    .exists({ checkFalsy: true })
    .isLength({min: 4 })
    .withMessage('Please provide a username with at least 4 characters.'),
    check('username')
    .not()
    .isEmail()
    .withMessage('Username cannot be an email.'),
    check('password')
    .exists({ checkFalsy: true})
    .isLength({min: 6 })
    .withMessage('Password must be 6 characters or more.'),
    handleValidationErrors
];

const router = express.Router();

router.post('/', validateSignup, async (req, res) => {
    const { firstName, lastName, email, password, username } = req.body;
    const hashedPassword = bcrypt.hashSync(password);
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
});



module.exports = router;