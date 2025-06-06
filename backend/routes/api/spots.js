// imports
const express = require('express');
const { requireAuth } = require('../../utils/auth');
const { Spot, User, Review, SpotImage, Booking
} = require('../../db/models');
const { upload } = require('../../config/cloudinary')
const {cloudinary} = require('cloudinary').v2

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { Op, Model, ValidationError } = require('sequelize');
const booking = require('../../db/models/booking');
const { formatNamedParameters } = require('sequelize/lib/utils');
const spotimage = require('../../db/models/spotimage');
const { formatDate, formatDateWithoutTime } = require('../../helperFunction/formatDate');

// set up the express router
const router = express.Router();
// validate spots and if not create error through the validator

const validateBooking = [
    check('startDate')
        .exists({ checkFalsy: true })
        .withMessage('Start date is required'),
    check('endDate')
        .exists({ checkFalsy: true })
        .withMessage('End date is required'),
    handleValidationErrors
];

const validateNewSpot = [
    check('address')
        .exists({ checkFalsy: true })
        .isLength({ min: 5 })
        .withMessage('Address is required'),
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
    check('lat')
        .exists({ checkFalsy: true })
        .isFloat({ min: -90.0000000, max: 90.0000000 })
        .withMessage('Latitude is required'),
    check('lng')
        .exists({ checkFalsy: true })
        .isFloat({ min: -180.0000000, max: 180.0000000 })
        .withMessage('Longitude is required'),
    check('name')
        .exists({ checkFalsy: true })
        .isLength({ min: 3, max: 50 })
        .withMessage('Name is required'),
    check('description')
        .exists({ checkFalsy: true })
        .isLength({ min: 5, max: 255 })
        .withMessage('Description need a minimum of 30 characters'),
    check('price')
        .exists({ checkFalsy: true })
        .isFloat({ min: 0 })
        .withMessage('Price is required'),

    handleValidationErrors
];
// validate review and if not create error through the validator
const validateReview = [
    check('review')
        .exists({ checkFalsy: true })
        .isLength({ min: 5 })
        .withMessage('Review text is required'),
    check('stars')
        .exists({ checkFalsy: true })
        .isInt({ min: 1, max: 5 })
        .withMessage('Stars must be an integer from 1 to 5'),
    handleValidationErrors
];

// validate query parameters and if not create error through the validator

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
        .isFloat({ max: 90.0000000 })
        .withMessage('Maximum latitude is invalid'),
    check('minLat')
        .optional()
        .isFloat({ min: -90.0000000 })
        .withMessage('Minimum latitude is invalid'),
    check('maxLng')
        .optional()
        .isFloat({ max: 180.0000000 })
        .withMessage('Maximum longitude is invalid'),
    check('minLng')
        .optional()
        .isFloat({ min: -180.0000000 })
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

// router to get all spots
router.get('/', queryParams, async (req, res, next) => {
    try {
        let { page, size, minLat, maxLat, minLng, maxLng, minPrice, maxPrice } = req.query;
        page = parseInt(page);
        size = parseInt(size);
        if (!size) {
            size = 21;
        };
        if (size > 21) {
            size = 21;
        };
        if (!page) {
            page = 1;
        };
        if (page > 10) {
            page = 10;
        };

        minPrice ? minPrice = Number(minPrice) : null;
        maxPrice ? maxPrice = Number(maxPrice) : null;
        minLat ? minLat = Number(minLat) : null;
        maxLat ? maxLat = Number(maxLat) : null;
        minLng ? minLng = Number(minLng) : null;
        maxLng ? maxLng = Number(maxLng) : null;

        let where = {};
        //price check
        if (minPrice && maxPrice) {

            where.price = { [Op.between]: [minPrice, maxPrice] };
        };
        if (minPrice && !maxPrice) {
            where.price = { [Op.gte]: minPrice };
        };
        if (maxPrice && !minPrice) {
            where.price = { [Op.lte]: maxPrice };
        };
        //latitude check
        if (minLat && maxLat) {
            where.lat = { [Op.between]: [minLat, maxLat] };
        };
        if (minLat && !maxLat) {
            where.lat = { [Op.gte]: minLat };
        };
        if (maxLat && !minLat) {
            where.lat = { [Op.lte]: maxLat };
        };
        //longitude check
        if (minLng && maxLng) {
            where.lng = { [Op.between]: [minLng, maxLng] };
        };
        if (minLng && !maxLng) {
            where.lng = { [Op.gte]: minLng };
        };
        if (maxLng && !minLng) {
            where.lng = { [Op.lte]: maxLng };
        };

        



        //get all the spots in the database
        let spots = await Spot.findAll({
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
            }],
            where,
            order: [
                ['id', 'DESC']
                ],
            limit: size,
            offset: (page - 1) * size

            
        });

    

       
        // if any spots exist in the database
        if (spots) {
            //use a array so you can format spots to look pretty in the response
            let spotFormatting = [];
            // loop through the spots to add them to the array
            for (let spot of spots) {
                
            

                // sum is for getting the average star rating
                let sum = 0;
                // preview image url will go here
                let previewImages = '';
                // find the reviews
                let reviews = await spot.getReviews();
                let images = await spot.getSpotImages({
                    order: [['id', 'ASC']]
                });

                
                //loop through the reviews so we can get the avg str rating
                let count = 0;

                for (let review of reviews) {
                    count++
                    sum += review.stars;
                };
                sum /= count;


                //loop through images to find a preview image and extract the url
                for (let image of images) {

                    if (image.preview === true) {
                        previewImages += image.url;

                    };
                };




                spotFormatting.push({
                    id: spot.id,
                    ownerId: spot.ownerId,
                    address: spot.address,
                    city: spot.city,
                    state: spot.state,
                    country: spot.country,
                    lat: Number(spot.lat),
                    lng: Number(spot.lng),
                    name: spot.name,
                    description: spot.description,
                    price: Number(spot.price),
                    createdAt: formatDate(spot.createdAt),
                    updatedAt: formatDate(spot.updatedAt),
                    numReviews: count,
                    avgStarRating: sum,
                    SpotImages: images,
                    previewImage: previewImages,
                    Owner: spot.Owner

                });
            };
            

            return res.json({
                Spots: spotFormatting,
                page,
                size
            });
        };
        




    } catch (error) {
        next(error);
    };
});

// get all spots owned by the logged in user
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

                for (i = spots.length - 1; i >= 0; i--) {
                    let spot = spots[i]

                    let sum = 0;
                    let previewImages = '';
                    let reviews = await spot.getReviews();
                    let images = await spot.getSpotImages();
                    for (let review of reviews) {
                        sum += review.stars;
                    };
                    sum /= reviews.length;


                    for (let image of images) {

                        if (image.preview === true) {
                            previewImages += image.url;

                        };
                    };


                    spotFormatting.push({
                        id: spot.id,
                        ownerId: spot.ownerId,
                        address: spot.address,
                        city: spot.city,
                        state: spot.state,
                        country: spot.country,
                        lat: Number(spot.lat),
                        lng: Number(spot.lng),
                        name: spot.name,
                        description: spot.description,
                        price: Number(spot.price),
                        createdAt: formatDate(spot.createdAt),
                        updatedAt: formatDate(spot.updatedAt),
                        avgRating: sum,
                        previewImage: previewImages


                    });
                };

                

                return res.json({
                    Spots: spotFormatting
                });
            };
        };


    } catch (error) {
        next(error);
    };
});

// create a new spot
router.post('/', requireAuth, upload.array('images', 4), validateNewSpot, async (req, res, next) => {

    try {
        const { address, city, state, country, lat, lng, name, description, price } = req.body;
        const { user } = req;

        if (user) {

            const newSpot = await Spot.create({
                ownerId: user.id, address, city,
                state, country, lat, lng, name, description, price
            });
            if (newSpot) {

                const imageUrls = await Promise.all(req.files.map(async (file) => {
                    const {secure_url, public_id } = await cloudinary.uploader.upload(file.path);

                    return{
                        url: file.path, // Cloudinary gives the hosted URL as 'path'
                        cloudinaryPublicId: public_id,
                        spotId: newSpot.id,
                        preview: false // or true for the first one if needed

                    }
                }));
        
                // Example: make the first image the preview
                if (imageUrls.length > 0) imageUrls[0].preview = true;


                const newImages = await SpotImage.bulkCreate(imageUrls)


                let spotFormatting = {
                    id: newSpot.id,
                    ownerId: user.id,
                    address: newSpot.address,
                    city: newSpot.city,
                    state: newSpot.state,
                    country: newSpot.country,
                    lat: Number(newSpot.lat),
                    lng: Number(newSpot.lng),
                    name: newSpot.name,
                    description: newSpot.description,
                    price: Number(newSpot.price),
                    createdAt: formatDate(newSpot.createdAt),
                    updatedAt: formatDate(newSpot.updatedAt),
                    numReviews: 0,
                    avgStarRating: 0,
                    SpotImages: newImages,
                    Owner: {
                        id: user.id,
                        firstName: user.firstName,
                        lastName: user.lastName
                    }
                };


                return res.status(201).json({ spotFormatting });
            }

        };

    } catch (error) {

        return next(error);
    };
});

//add a spotImage   
router.post('/:spotId/images', requireAuth, async (req, res, next) => {
    try {
        const { url, preview } = req.body;
        const { spotId } = req.params;


        const spot = await Spot.findByPk(spotId);

        const { user } = req;


        if (user) {
            if (spot) {
                if (spot.ownerId !== user.id) {
                    const err = new Error('Forbidden');
                    err.status = 403;
                    throw err;
                }

                const newImage = await SpotImage.create({
                    url, preview, spotId: parseInt(spotId)
                });


                const imageFormatting = {
                    id: newImage.id,
                    url: newImage.url,
                    preview: newImage.preview
                }

                return res.status(201).json(imageFormatting);

            } else {
                const err = new Error("Spot couldn't be found");
                err.status = 404;
                throw err;
            }



        };

    } catch (error) {
        next(error);
    };
});
// find the spot by its id
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
            let sum = 0;
            for (let review of reviews) {
                count++
                sum += review.stars;
            };
            sum /= count;

            const spotFormatting = {
                id: spot.id,
                ownerId: spot.ownerId,
                address: spot.address,
                city: spot.city,
                state: spot.state,
                country: spot.country,
                lat: Number(spot.lat),
                lng: Number(spot.lng),
                name: spot.name,
                description: spot.description,
                price: Number(spot.price),
                createdAt: formatDate(spot.createdAt),
                updatedAt: formatDate(spot.updatedAt),
                numReviews: count,
                avgStarRating: sum,
                SpotImages: spot.SpotImages,
                Owner: spot.Owner

            };

            return res.json(spotFormatting);

        } else {
            const err = new Error("Spot couldn't be found");
            err.status = 404;
            throw err;
        };

    } catch (error) {
        next(error);
    };
})

// update a spot by id if it is the logged in users spot
router.put('/:spotId', requireAuth, validateNewSpot, async (req, res, next) => {
    try {

        const { user } = req;
        const { address, city, state,
            country, lat, lng, name,
            description, price } = req.body;

        const spotId = req.params.spotId;
        if (user) {


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

            if (spot && spot.ownerId === user.id) {

                let sum = 0;
                const updatedSpot = await spot.update({
                    ownerId: user.id, address, city,
                    state, country, lat, lng, name, description, price
                });
                await spot.save();


                let previewImages = '';
                // find the reviews
                let reviews = await spot.getReviews();
                let images = await spot.getSpotImages();
                //loop through the reviews so we can get the avg str rating
                let count = 0;

                for (let review of reviews) {
                    count++
                    sum += review.stars;
                };
                sum /= count;


                //loop through images to find a preview image and extract the url
                for (let image of images) {

                    if (image.preview === true) {
                        previewImages += image.url;

                    };
                };

                const spotFormatting = {
                    id: updatedSpot.id,
                    ownerId: user.id,
                    address: updatedSpot.address,
                    city: updatedSpot.city,
                    state: updatedSpot.state,
                    country: updatedSpot.country,
                    lat: Number(updatedSpot.lat),
                    lng: Number(updatedSpot.lng),
                    name: updatedSpot.name,
                    description: updatedSpot.description,
                    price: Number(updatedSpot.price),
                    createdAt: formatDate(updatedSpot.createdAt),
                    updatedAt: formatDate(updatedSpot.updatedAt),
                    numReviews: count,
                    avgStarRating: sum,
                    SpotImages: updatedSpot.SpotImages,
                    previewImage: previewImages,
                    Owner: {
                        id: user.id,
                        firstName: user.firstName,
                        lastName: user.lastName
                    }

                };


                return res.json(spotFormatting);
            } else if (spot && spot.ownerId !== user.id) {
                const err = new Error('Forbidden');
                err.status = 403;
                throw err;

            } else {
                const err = new Error("Spot couldn't be found");
                err.status = 404;
                throw err;
            };




        };
    } catch (error) {
        next(error);
    };
});

//deletes a spot by the owner
router.delete('/:spotId', requireAuth, async (req, res, next) => {
    try {

        const { user } = req;
        const spotId = req.params.spotId;

        if (user) {


            const spot = await Spot.findByPk(spotId);
            if (spot && spot.ownerId === user.id) {

                const deletedSpot = await spot.destroy();

                return res.json(spot);


            } else if (spot && spot.ownerId !== user.id) {
                const err = new Error('Forbidden');
                err.status = 403;
                return next(err);

            } else {
                const err = new Error("Spot couldn't be found");
                err.status = 404;
                return next(err);
            };




        };
    } catch (error) {
        next(error);
    };
});
// get reviews by a spot id
router.get('/:spotId/reviews', async (req, res, next) => {
    try {

        const spotId = req.params.spotId;
        const spot = await Spot.findByPk(spotId);

        if (spot) {
            let reviewFormatting = [];
            const reviews = await Review.findAll({
                where: {
                    spotId: spot.id
                },
                order: [['id', 'desc']]

            });

            if (reviews) {

                for (let review of reviews) {
                    let user = await review.getUser();
                    let reviewImagesArr = [];
                    let reviewImages = await review.getReviewImages();
                    for (let image of reviewImages) {
                        reviewImagesArr.push({
                            id: image.id,
                            url: image.url
                        });

                    };


                    reviewFormatting.push({
                        id: review.id,
                        userId: review.userId,
                        spotId: review.spotId,
                        review: review.review,
                        stars: review.stars,
                        createdAt: formatDate(review.createdAt),
                        updatedAt: formatDate(review.updatedAt),
                        User: {
                            id: user.id,
                            firstName: user.firstName,
                            lastName: user.lastName
                        },
                        ReviewImages: reviewImagesArr

                    });


                };
                
               

                return res.json({ Reviews: reviewFormatting });
            };
        } else {
            const err = new Error("Spot couldn't be found");
            err.status = 404;
            throw err;

        };
    } catch (error) {
        next(error);
    };
});

// create a review for a Spot based on the Spots Id
router.post('/:spotId/reviews', requireAuth, validateReview, async (req, res, next) => {
    try {
        const spotId = req.params.spotId;
        const { review, stars } = req.body;
        const { user } = req;
        const spot = await Spot.findByPk(spotId, {
            include: {
                model: User,
                as: 'Owner',
                attributes: ['id', 'firstName', 'lastName']
            }
        });
        if (spot) {
            
            if (user) {
                if (spot.ownerId === user.id) {
                    const err = new Error('You cannot leave a review on your own spot');
                    err.status = 403;
                    throw err;
                }
                const reviews = await spot.getReviews();
                for (let review of reviews) {
                    if (review.userId === user.id) {
                        const err = new Error("User already has a review for this spot");
                        err.status = 500;
                        throw err;
                    };
                };
            };
            const newReview = await Review.create({ userId: user.id, spotId: parseInt(spotId), review, stars });

           
        
            const newReviewFormat = {
                id: newReview.id,
                userId: newReview.userId,
                spotId: newReview.spotId,
                review: newReview.review,
                stars: newReview.stars,
                createdAt: formatDate(newReview.createdAt),
                updatedAt: formatDate(newReview.updatedAt),
                User: user
            };
            return res.status(201).json(newReviewFormat);
        } else {

            const err = new Error("Spot couldn't be found");
            err.status = 404;
            throw err;

        };



    } catch (error) {
        next(error);
    };
});


// get all bookings for a spot based on spotId
router.get('/:spotId/bookings', requireAuth, async (req, res, next) => {
    try {
        const { spotId } = req.params;
        const { user } = req;
        if (user) {
            const spot = await Spot.findByPk(spotId);
            if (spot) {
                let bookingsArr = [];
                const bookings = await Booking.findAll({
                    where: {
                        spotId
                    },
                    include: [
                        {
                            model: User,
                            attributes: ['id', 'firstName', 'lastName']
                        },
                    ]
                });
                if (bookings) {
                    for (let booking of bookings) {

                        if (booking.userId !== user.id) {
                            bookingsArr.push({
                                id: booking.id,
                                spotId: booking.spotId,
                                startDate: formatDateWithoutTime(booking.startDate),
                                endDate: formatDateWithoutTime(booking.endDate)
                            });
                        } else if (booking.userId === user.id) {
                            bookingsArr.push({
                                User: booking.User,
                                id: booking.id,
                                spotId: booking.spotId,
                                userId: booking.userId,
                                startDate: formatDateWithoutTime(booking.startDate),
                                endDate: formatDateWithoutTime(booking.endDate),
                                createdAt: formatDate(booking.createdAt),
                                updatedAt: formatDate(booking.updatedAt)
                            })
                        }
                    }
                    return res.json({ Bookings: bookingsArr })
                }


            } else {
                const err = new Error("Spot couldn't be found");
                err.status = 404;
                throw err;
            }

        }
    } catch (error) {
        next(error);
    };
});


// create a booking from a spot based on spots id
router.post('/:spotId/bookings', requireAuth, validateBooking, async (req, res, next) => {
    try {
        const { user } = req;
        const { spotId } = req.params;
        const { startDate, endDate } = req.body;
        let formattedStartDate = new Date(startDate);
        let formattedEndDate = new Date(endDate)

        const currentDate = new Date()
        if (currentDate > formattedStartDate || currentDate > formattedEndDate) {
            const err = new Error("Cannot create a booking for a past date");
            err.status = 403;
            throw err;
        }

        if (user) {
            const spot = await Spot.findByPk(spotId);
            if (spot) {
                if (spot.ownerId === user.id) {
                    const err = new Error('Forbidden');
                    err.status = 403;
                    throw err;
                }
                const bookings = await Booking.findAll({
                    where: {
                        spotId
                    }
                });

                if (formattedEndDate <= formattedStartDate) {
                    const err = new Error('Bad Request');
                    err.errors = { endDate: 'endDate cannot be on or before startDate' };
                    err.status = 400;
                    throw err;
                }

                for (let booking of bookings) {



                    const errors = {};
                    let error = false;
                    if (formattedStartDate >= booking.startDate && formattedStartDate <= booking.endDate) {



                        errors.startDate = "Start date conflicts with an existing booking";

                        error = true;
                    }
                    if (formattedEndDate >= booking.startDate && formattedEndDate <= booking.endDate) {

                        errors.endDate = "End date conflicts with an existing booking";
                        error = true;

                    }

                    if (
                        (formattedStartDate < booking.startDate && formattedEndDate > booking.endDate)

                    ) {

                        errors.startDate = "Start date conflicts with an existing booking";
                        errors.endDate = "End date conflicts with an existing booking";
                        error = true;
                    }

                    if (error === true) {

                        let err = new Error('Sorry, this spot is already booked for the specified dates');
                        err.status = 403;
                        err.errors = errors
                        throw err;
                    }

                }



                let newBooking = await Booking.create({
                    spotId: parseInt(spotId),
                    userId: user.id,
                    startDate: formattedStartDate,
                    endDate: formattedEndDate

                })
                return res.status(201).json({
                    id: newBooking.id,
                    spotId: newBooking.spotId,
                    userId: newBooking.userId,
                    startDate: startDate,
                    endDate: endDate,
                    createdAt: formatDate(newBooking.createdAt),
                    updatedAt: formatDate(newBooking.updatedAt)
                });
            } else {
                const err = new Error("Spot couldn't be found");
                err.status = 404;
                throw err;
            }
        }

    } catch (error) {
        next(error);
    };
});







module.exports = router;