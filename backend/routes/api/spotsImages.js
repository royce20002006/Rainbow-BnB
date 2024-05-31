// imports
const express = require('express');
const { requireAuth } = require('../../utils/auth');
const { Spot, User, Review, SpotImage
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


            const spotImage = await SpotImage.findByPk(imageId);

            if (spotImage) {
                const spot = await spotImage.getSpot();
                if (spot.id === spotImage.spotId && spot.ownerId === user.id) {

                    await spotImage.destroy();
                    res.json({ message: 'Successfully deleted' });
                } else if (spotImage && spot.id === spotImage.spotId && spot.ownerId !== user.id) {
                    const err = new Error('Forbidden');
                    err.status = 403;
                    return next(err);
                }




            } else {
                const err = new Error("Spot Image couldn't be found");
                err.status = 404;
                return next(err);
            };




        };
    } catch (error) {
        next(error);
    };
});

module.exports = router;