const express = require('express');
const bcrypt = require('bcryptjs');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Spot, User } = require('../../db/models');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { Model } = require('sequelize');
const spot = require('../../db/models/spot');
const router = express.Router();
const validateNewSpot = [
    check('address')
    .exists({ checkFalsy: true })
    .isLength({min: 5})
    .withMessage('Street address is required'),
    check('city')
    .exists({checkFalsy: true})
    .isLength({min: 3 })
    .withMessage('City is required'),
    check('state')
    .exists({ checkFalsy: true })
    .isLength({min: 3})
    .withMessage('State is required'),
    check('country')
    .exists({ checkFalsy: true })
    .isLength({min:  3})
    .withMessage('Country is required'),
    check('lat') //research this spot because cannot figure it out
    .exists({checkFalsy: true})
    .isDecimal()
    .withMessage('Latitude is not valid'),
    check('lng') //research
    .exists({ checkFalsy: true})
    .isDecimal()
    .withMessage('Longitude is not valid'),
    check('name')
    .exists({checkFalsy: true})
    .isLength({max: 50})
    .withMessage('Name must be less than 50 characters'),
    check('description')
    .exists({checkFalsy: true})
    .isLength({min: 5, max: 255})
    .withMessage('Description is required'),
    check('price') //research
    .exists({checkFalsy: true})
    .isDecimal()
    .withMessage('Price per day is required'),
    handleValidationErrors
];

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
});

router.post('/' , validateNewSpot, requireAuth, async (req, res, next) => {
    try {
        const { address, city, state,
             country, lat, lng, name,
              description, price } = req.body;

        
        const {user } = req;
        if (user) {
            const newSpot =  await Spot.create({ ownerId: user.id, address, city,
                state, country, lat, lng, name, description, price
            })
        
            res.json(newSpot);

        }

    } catch (error) {
        console.log(error)
    }
});

router.put('/:spotId', requireAuth, validateNewSpot, async (req, res, next) => {
    try {
        const {user} = req;
        const { address, city, state,
            country, lat, lng, name,
             description, price } = req.body;
        const spotId = req.params.spotId;
        if (user) {
            
            const spot = await Spot.findByPk(spotId)
            if (spot && spot.ownerId === user.id) {

                const updatedSpot =  await spot.update({ ownerId: user.id, address, city,
                    state, country, lat, lng, name, description, price
                })
                await spot.save()
                res.json(updatedSpot);
            } else if (spot && spot.ownerId !== user.id) {
                const err = new Error('Forbidden')
                err.status = 403
                return next(err);

            } else {
                const err = new Error("Spot couldn't be found")
                err.status = 404
                return next(err)
            }
            
        
        }
    } catch (error) {
        console.error(error)
    }
});

//deletes a spot by the owner
router.delete('/:spotId', requireAuth, validateNewSpot, async (req, res, next) => {
    try {
        const {user} = req;
        const spotId = req.params.spotId;
        if (user) {
            
            const spot = await Spot.findByPk(spotId)
            if (spot && spot.ownerId === user.id) {

                await spot.destroy()
                
                res.json({message: 'Successfully deleted'});
            } else if (spot && spot.ownerId !== user.id) {
                const err = new Error('Forbidden')
                err.status = 403
                return next(err);

            } else {
                const err = new Error("Spot couldn't be found")
                err.status = 404
                return next(err)
            }
            
        
        }
    } catch (error) {
        console.error(error)
    }
})


module.exports = router;