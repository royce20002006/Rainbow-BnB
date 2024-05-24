const express = require('express');

const { requireAuth } = require('../../utils/auth');
const { Spot, User, Review, SpotImage
} = require('../../db/models');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { Op, Model, ValidationError } = require('sequelize');

const router = express.Router();
const validateNewSpot = [
    check('address')
        .exists({ checkFalsy: true })
        .isLength({ min: 5 })
        .withMessage('Street address is required'),
    check('city')
        .exists({ checkFalsy: true })
        .isLength({ min: 3 })
        .withMessage('City is required'),
    check('state')
        .exists({ checkFalsy: true })
        .isLength({ min: 3 })
        .withMessage('State is required'),
    check('country')
        .exists({ checkFalsy: true })
        .isLength({ min: 3 })
        .withMessage('Country is required'),
    check('lat') //research this spot because cannot figure it out
        .exists({ checkFalsy: true })
        .isDecimal()
        .withMessage('Latitude is not valid'),
    check('lng') //research
        .exists({ checkFalsy: true })
        .isDecimal()
        .withMessage('Longitude is not valid'),
    check('name')
        .exists({ checkFalsy: true })
        .isLength({ max: 50 })
        .withMessage('Name must be less than 50 characters'),
    check('description')
        .exists({ checkFalsy: true })
        .isLength({ min: 5, max: 255 })
        .withMessage('Description is required'),
    check('price') //research
        .exists({ checkFalsy: true })
        .isDecimal()
        .isCurrency()
        .withMessage('Price per day is required'),
    handleValidationErrors
];

const queryParams = [
    check('page')
        .optional()
        .isInt({ min: 1 })
        .withMessage("Page must be greater than or equal to 1"),
    check('size')
        .optional()
        .isInt({ min: 1 })
        .withMessage('Size must be greater than or equal to 1'),
    check('maxLat')
        .optional()
        .isDecimal()
        .withMessage('Maximum latitude is invalid'),
    check('minLat')
        .optional()
        .isDecimal()
        .withMessage('Minimum latitude is invalid'),
    check('maxLng')
        .optional()
        .isDecimal()
        .withMessage('Maximum longitude is invalid'),
    check('minLng')
        .optional()
        .isDecimal()
        .withMessage('Minimum longitude is invalid'),
    check('minPrice')
        .optional()
        .isCurrency({ min: 1.00 })
        .optional()
        .withMessage('Minimum price must be greater than or equal to 0'),
    check('maxPrice')
        .optional()
        .isCurrency({ min: 1.00 })
        .withMessage('Maximum price must be greater than or equal to 0'),

    handleValidationErrors
];


router.get('/', queryParams, async (req, res, next) => {
    try {
        let { page, size, minLat, maxLat, minLng, maxLng, minPrice, maxPrice } = req.query;
        page = parseInt(page);
        size = parseInt(size);
        if (!size) {
            size = 20
        }
        if (size > 20) {
            size = 20
        }
        if (!page) {
            page = 1;
        }
        if (page > 10) {
            page = 10
        }
        let where = {}
        //price check
        if (minPrice && maxPrice) {
            where.price = { [Op.between]: [minPrice, maxPrice] }
        }
        if (minPrice && !maxPrice) {
            where.price = { [Op.gte]: minPrice }
        }
        if (maxPrice && !minPrice) {
            where.price = { [Op.lte]: maxPrice }
        }
        //latitude check
        if (minLat && maxLat) {
            where.lat = { [Op.between]: [minLat, maxLat] }
        }
        if (minLat && !maxLat) {
            where.lat = { [Op.gte]: minLat }
        }
        if (maxLat && !minLat) {
            where.lat = { [Op.lte]: maxLat }
        }
        //longitude check
        if (minLng && maxLng) {
            where.lng = { [Op.between]: [minLng, maxLng] }
        }
        if (minLng && !maxLng) {
            where.lng = { [Op.gte]: minLng }
        }
        if (maxLng && !minLng) {
            where.lng = { [Op.lte]: maxLng }
        }




        let spots = await Spot.findAll({
            include: [{ model: Review, attributes: [] }],
            where,
            limit: size,
            offset: (page - 1) * size
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


                for (let image of images) {
                    console.log(image.preview)
                    if (image.preview === true) {
                        previewImages += image.url

                    }
                }


                spotFormatting.push({
                    id: spot.id,
                    ownerId: spot.ownerId,
                    address: spot.address,
                    city: spot.city,
                    state: spot.state,
                    country: spot.country,
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
                Spots: spotFormatting,
                page,
                size
            })
        }

        // console.log(starRatingSum);



    } catch (error) {
        next(error);
    }
});


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
                    let previewImages = '';
                    let reviews = await spot.getReviews()
                    let images = await spot.getSpotImages();
                    for (let review of reviews) {
                        sum += review.stars
                    }
                    sum /= reviews.length


                    for (let image of images) {
                        console.log(image.preview)
                        if (image.preview === true) {
                            previewImages += image.url

                        }
                    }


                    spotFormatting.push({
                        id: spot.id,
                        ownerId: spot.ownerId,
                        address: spot.address,
                        city: spot.city,
                        state: spot.state,
                        country: spot.country,
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
        next(error)
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
                state, country, lat, lng, name, description, price
            })


            res.json(newSpot);

        }

    } catch (error) {
        next(error)
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
                country: spot.country,
                lat: spot.lat,
                lng: spot.lng,
                name: spot.name,
                description: spot.description,
                price: spot.price,
                createdAt: spot.createdAt,
                updatedAt: spot.updatedAt,
                numReviews: count,
                avgStarRating: sum,
                SpotImages: spot.SpotImages,
                Owner: spot.Owner

            }

            res.json(spotFormatting);

        } else {
            const err = new Error("Spot couldn't be found")
            err.status = 404;
            next(err);
        }

    } catch (error) {
        next(error)
    }
})

router.put('/:spotId', requireAuth, validateNewSpot, async (req, res, next) => {
    try {

        const { user } = req;
        const { address, city, state,
            country, lat, lng, name,
            description, price } = req.body;

        const spotId = req.params.spotId;
        if (user) {


            const spot = await Spot.findByPk(spotId)
            if (spot && spot.ownerId === user.id) {


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
        next(error)
    }
});

//deletes a spot by the owner
router.delete('/:spotId', requireAuth, validateNewSpot, async (req, res, next) => {
    try {

        const { user } = req;
        const spotId = req.params.spotId;
        if (user) {


            const spot = await Spot.findByPk(spotId)
            if (spot && spot.ownerId === user.id) {

                await spot.destroy()



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
        next(error)
    }
});

router.get('/:spotId/reviews', async (req, res, next) => {
    try {

        const spotId = req.params.spotId;
        const spot = await Spot.findByPk(spotId)

        if (spot) {
            let reviewFormatting = [];
            const reviews = await Review.findAll({
                where: {
                    spotId: spot.id
                },

            });

            if (reviews) {

                for (let review of reviews) {
                    let user = await review.getUser()
                    let reviewImagesArr = [];
                    let reviewImages = await review.getReviewImages();
                    for (let image of reviewImages) {
                        reviewImagesArr.push({
                            id: image.id,
                            url: image.url
                        })

                    }
                    console.log(reviewImagesArr)

                    reviewFormatting.push({
                        id: review.id,
                        userId: review.userId,
                        spotId: review.spotId,
                        review: review.review,
                        stars: review.stars,
                        createdAt: review.createdAt,
                        updatedAt: review.updatedAt,
                        User: {
                            id: user.id,
                            firstName: user.firstName,
                            lastName: user.lastName
                        },
                        ReviewImages: reviewImagesArr

                    })


                }

                return res.json({ Reviews: reviewFormatting });
            }
        } else{
            const err = new Error("Spot couldn't be found")
            err.status = 404;
            throw err;

        }
    } catch (error) {
        next(error)
    }
});







module.exports = router;