const express = require('express');
const bcrypt = require('bcryptjs');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Spot, User } = require('../../db/models');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { Model } = require('sequelize');
const router = express.Router();

router.get('/', async (_req, res, next) => {
    try {
        let spots = await Spot.findAll();

        

        res.json({spots});
    } catch (error) {
        console.log(error);
    }
});

router.get('/current', requireAuth,async (req, res, next) => {
    try {
        const { user } = req;
        if (user) {
            const spots = await Spot.findAll({
                where: {
                    ownerId: user.id
                }
            });
            res.json({
                spots
            })
        }
        
    } catch (error) {
        console.log(error)
    }
})


module.exports = router;