
//imports
const express = require('express');
const {  requireAuth } = require('../../utils/auth');
const { Spot, User, Review, SpotImage, ReviewImage
} = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { Op, Model, ValidationError } = require('sequelize');
const reviewimage = require('../../db/models/reviewimage');

//set up express router
const router = express.Router();

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

// get reviews by the logged in user
router.get('/current', requireAuth, async (req, res, next) => {
    try {
        const { user } = req;
        if (user) {
            const reviews = await Review.findAll({
                where: {
                    userId: user.id
                },
                include: [{model: Spot, attributes: ['id', 'ownerId', 'address', 'city', 'state', 'country', 'lat', 'lng', 'name', 'price']}]
            });

            let reviewFormatting = [];
            if (reviews) {
                
                for (let review of reviews) {
                    let url = '';
                    let spot = await Spot.findByPk(review.spotId);
                    let images = await spot.getSpotImages();
                    let reviewImageArr = [];
                    for (let image of images) {
                        if (image.preview === true) {
                            url += image.url;
                        }
                    }
                    let reviewImages = await review.getReviewImages();
                    for (let image of reviewImages) {
                        reviewImageArr.push({
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
                        createdAt: review.createdAt,
                        updatedAt: review.updatedAt,
                        User: {
                            id: user.id,
                            firstName: user.firstName,
                            lastname: user.lastName
                        },
                        Spot: {
                            id: spot.id,
                            ownerId: spot.ownerId,
                            address: spot.address,
                            city: spot.city,
                            state: spot.state,
                            country: spot.country,
                            lat: spot.lat,
                            lng: spot.lng,
                            name: spot.name,
                            price: spot.price,
                            previewImage: url
                        },
                        ReviewImages: reviewImageArr
                        

                        
                            

                    });
                };
                res.json({Reviews : reviewFormatting});
            };
        };
        
    } catch (error) {
        next(error);
    };
});


// delete an existing review
router.delete('/:reviewId', requireAuth, async(req, res, next) => {
    try {
        const reviewId = req.params.reviewId;
        const {user} = req;
        const review = await Review.findByPk(reviewId);
        if (!review) {
            const err = new Error("Review couldn't be found");
                err.status = 404;
                throw err;
        };
        if(review.userId !== user.id) {
            const err = new Error('Forbidden');
                err.status = 403;
                throw err;
        };
        const deletedReview = await review.destroy();
        res.json({
            message: 'Successfully deleted'
        });


        
    } catch (error) {
        next(error);
    };
});
// update review by id
router.put('/:reviewId', validateReview, requireAuth, async (req, res, next) => {
    try {
        const { reviewId } = req.params;
        const { review, stars } = req.body;
        const { user } = req;
        const reviewToUpdate = await Review.findByPk(reviewId);
        if (user) {
            if (reviewToUpdate && reviewToUpdate.userId === user.id) {
    
                
                const newReview = await reviewToUpdate.update({ userId: user.id, spotId: reviewToUpdate.spotId, review, stars });
                const newReviewFormat = {
                    id: newReview.id,
                    userId: newReview.userId,
                    spotId: newReview.spotId,
                    review: newReview.review,
                    stars: newReview.stars,
                    createdAt: newReview.createdAt,
                    updatedAt: newReview.updatedAt
                };
                res.json(newReviewFormat);
            } else if (reviewToUpdate && reviewToUpdate.userId !== user.id) {
                const err = new Error('Forbidden');
                err.status = 403;
                return next(err);

            }else {
    
                const err = new Error("Review couldn't be found");
                err.status = 404;
                throw err;
    
            };

        }



    } catch (error) {
        next(error);
    };
});


// export the router
 module.exports = router;