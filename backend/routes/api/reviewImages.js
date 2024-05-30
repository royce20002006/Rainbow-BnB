// imports
const express = require('express');
const { requireAuth } = require('../../utils/auth');
const { Spot, User, Review, SpotImage, ReviewImage
} = require('../../db/models');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { Op, Model, ValidationError } = require('sequelize');
// set up the express router
const router = express.Router();

router.delete('/:imageId', requireAuth, async (req, res, next) => {
    try {

        const { user } = req;
        const { imageId } = req.params;

        if (user) {


            const reviewImage = await ReviewImage.findByPk(imageId);

            if (reviewImage) {
                const review = await reviewImage.getReview();
                if (review.id === reviewImage.reviewId && review.userId === user.id) {

                    await reviewImage.destroy();
                    res.json({ message: 'Successfully deleted' });
                } else if (review.id === reviewImage.reviewId && review.userId !== user.id) {
                    const err = new Error('Forbidden');
                    err.status = 403;
                    return next(err);
                }




            } else {
                const err = new Error("Review Image couldn't be found");
                err.status = 404;
                return next(err);
            };




        };
    } catch (error) {
        next(error);
    };
});

module.exports = router;