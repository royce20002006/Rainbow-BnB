const express = require('express');
const bcrypt = require('bcryptjs');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Spot, User, Review, SpotImage
} = require('../../db/models');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { Model } = require('sequelize');

const router = express.Router();
const validateNewSpot = [
    check('address')
        .exists({ checkFalsy: true })
        .isLength({ min: 5 })
        .withMessage('Street address is required'),
        .exists({ checkFalsy: true })
        .isLength({ min: 5 })
        .withMessage('Street address is required'),
    check('city')
        .exists({ checkFalsy: true })
        .isLength({ min: 3 })
        .withMessage('City is required'),
        .exists({ checkFalsy: true })
        .isLength({ min: 3 })
        .withMessage('City is required'),
    check('state')
        .exists({ checkFalsy: true })
        .isLength({ min: 3 })
        .withMessage('State is required'),
        .exists({ checkFalsy: true })
        .isLength({ min: 3 })
        .withMessage('State is required'),
    check('country')
        .exists({ checkFalsy: true })
        .isLength({ min: 3 })
        .withMessage('Country is required'),
        .exists({ checkFalsy: true })
        .isLength({ min: 3 })
        .withMessage('Country is required'),
    check('lat') //research this spot because cannot figure it out
        .exists({ checkFalsy: true })
        .isDecimal()
        .withMessage('Latitude is not valid'),
        .exists({ checkFalsy: true })
        .isDecimal()
        .withMessage('Latitude is not valid'),
    check('lng') //research
        .exists({ checkFalsy: true })
        .isDecimal()
        .withMessage('Longitude is not valid'),
        .exists({ checkFalsy: true })
        .isDecimal()
        .withMessage('Longitude is not valid'),
    check('name')
        .exists({ checkFalsy: true })
        .isLength({ max: 50 })
        .withMessage('Name must be less than 50 characters'),
        .exists({ checkFalsy: true })
        .isLength({ max: 50 })
        .withMessage('Name must be less than 50 characters'),
    check('description')
        .exists({ checkFalsy: true })
        .isLength({ min: 5, max: 255 })
        .withMessage('Description is required'),
        .exists({ checkFalsy: true })
        .isLength({ min: 5, max: 255 })
        .withMessage('Description is required'),
    check('price') //research
        .exists({ checkFalsy: true })
        .isDecimal()
        .withMessage('Price per day is required'),
        .exists({ checkFalsy: true })
        .isDecimal()
        .withMessage('Price per day is required'),
    handleValidationErrors
];

router.get('/', async (_req, res, next) => {
    try {
        let spots = await Spot.findAll({
            include: [{ model: Review, attributes: [] }]
        });
        // let starRatingSum = await Review.sum("avgRating",{

        //     where: {
        //         id: spots.id
        //     }
        // });
        if (spots) {
            let spotFormatting = [];
            
            for (let spot of spots) {
                
                
                let sum = 0;
                let previewImages = '';
                let reviews = await spot.getReviews()
                let images = await spot.getSpotImages();
                for (let review of reviews) {
                    sum += review.stars
                }
                sum /= reviews.length
                
                
                for(let image of images) {
                    console.log(image.preview)
                    if (image.preview === true) {
                        previewImages += image.url
                        
                    }
                }
                console.log(previewImages)
                
                spotFormatting.push({
                    id: spot.id,
                    ownerId: spot.ownerId,
                    address: spot.address,
                    city: spot.city,
                    state: spot.state,
                    country:spot.country,
                    lat: spot.lat,
                    lng: spot.lng,
                    name: spot.name,
                    description: spot.description,
                    price: spot.price,
                    createdAt: spot.createdAt,
                    updatedAt: spot.updatedAt,
                    avgRating: sum,
                    previewImage: previewImages
                   
                    
                })
            }
            
            res.json({
                Spots: spotFormatting
            })
        }
        
        // console.log(starRatingSum);


        
    } catch (error) {
        console.log(error);
    }
});

router.get('/current', requireAuth, async (req, res, next) => {
router.get('/current', requireAuth, async (req, res, next) => {
    try {
        const { user } = req;
        if (user) {
            const spots = await Spot.findAll({
                where: {
                    ownerId: user.id, 
                }

            });
            if (spots) {
                let spotFormatting = [];
                
                for (let spot of spots) {
                    
                    
                    let sum = 0;
                    let previewImages = [];
                    let reviews = await spot.getReviews()
                    let images = await spot.getSpotImages();
                    for (let review of reviews) {
                        sum += review.stars
                    }
                    sum /= reviews.length
                    
                    
                    for(let image of images) {
                        console.log(image.preview)
                        if (image.preview === true) {
                            previewImages.push(image.url)
                            
                        }
                    }
                    console.log(previewImages)
                    
                    spotFormatting.push({
                        id: spot.id,
                        ownerId: spot.ownerId,
                        address: spot.address,
                        city: spot.city,
                        state: spot.state,
                        country:spot.country,
                        lat: spot.lat,
                        lng: spot.lng,
                        name: spot.name,
                        description: spot.description,
                        price: spot.price,
                        createdAt: spot.createdAt,
                        updatedAt: spot.updatedAt,
                        avgRating: sum,
                        previewImage: previewImages
                       
                        
                    })
                }
                
                res.json({
                    Spots: spotFormatting
                })
            }
        }


    } catch (error) {
        console.log(error)
    }
});

router.post('/', validateNewSpot, requireAuth, async (req, res, next) => {
    try {
        const { address, city, state,
            country, lat, lng, name,
            description, price } = req.body;


        const { user } = req;
        if (user) {
            const newSpot = await Spot.create({
                ownerId: user.id, address, city,
            const newSpot = await Spot.create({
                ownerId: user.id, address, city,
                state, country, lat, lng, name, description, price
            })


            res.json(newSpot);

        }

    } catch (error) {
        console.log(error)
    }
});

router.get('/:spotId', async (req, res, next) => {
    try {
        const { spotId } = req.params;
        const spot = await Spot.findByPk(spotId, {
            
            include: [{
                model: SpotImage,
                as: 'SpotImages',
                attributes: ['id', 'url', 'preview']
            }, {
                model: User,
                as: 'Owner',
                attributes: ['id', 'firstName', 'lastName']
            },
            {
                model: Review,
                attributes: []
            }]
        });
        if (spot) {
            let images = await spot.SpotImage;
            console.log(images)
            let reviews = await spot.getReviews();
            let count = 0;
            let sum = 0
            for (let review of reviews) {
                count++
                sum += review.stars
            }
            sum /= count
            
            const spotFormatting = {
                id: spot.id,
                ownerId: spot.ownerId,
                address: spot.address,
                city: spot.city,
                state: spot.state,
                country:spot.country,
                lat: spot.lat,
                lng: spot.lng,
                name: spot.name,
                description: spot.description,
                price: spot.price,
                createdAt: spot.createdAt,
                updatedAt: spot.updatedAt,
                numReviews: count,
                avgStarRating: sum,
                SpotImages:spot.SpotImages,
                Owner:spot.Owner
                
            }
           
            res.json(spotFormatting);

        } else {
            const err = new Error("Spot couldn't be found")
            err.status = 404;
            next(err);
        }

    } catch (error) {
        console.log(error)
    }
})

router.put('/:spotId', requireAuth, validateNewSpot, async (req, res, next) => {
    try {
        const { user } = req;
        const { user } = req;
        const { address, city, state,
            country, lat, lng, name,
            description, price } = req.body;
            description, price } = req.body;
        const spotId = req.params.spotId;
        if (user) {


            const spot = await Spot.findByPk(spotId)
            if (spot && spot.ownerId === user.id) {

                const updatedSpot = await spot.update({
                    ownerId: user.id, address, city,
                const updatedSpot = await spot.update({
                    ownerId: user.id, address, city,
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
        const { user } = req;
        const { user } = req;
        const spotId = req.params.spotId;
        if (user) {


            const spot = await Spot.findByPk(spotId)
            if (spot && spot.ownerId === user.id) {

                await spot.destroy()

                res.json({ message: 'Successfully deleted' });

                res.json({ message: 'Successfully deleted' });
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