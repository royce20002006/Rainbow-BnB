// imports
const express = require('express');
const { requireAuth } = require('../../utils/auth');
const { Spot, User, Review, SpotImage, Booking
} = require('../../db/models');
const formatDate = require('../../helperFunction/formatDate');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { Op, Model, ValidationError } = require('sequelize');
const booking = require('../../db/models/booking');
// set up the express router
const router = express.Router();

// get all bookings for current user
router.get('/current', requireAuth, async (req, res, next) => {
    try {
        const { user } = req;
        if (user) {
            const bookings = await Booking.findAll({
                where: {
                    userId: user.id,
                }

            });
            if (bookings) {
                let bookingFormat = [];
                for (let booking of bookings) {
                    let previewImageUrl = '';

                    const createdAtDate = formatDate(booking.createdAt);
                    const updatedAtDate = formatDate(booking.updatedAt);
                    const startDateformat = formatDate(booking.startDate);
                    const endDateformat = formatDate(booking.endDate);




                    const spots = await booking.getSpot();
                    const images = await spots.getSpotImages();
                    for (let image of images) {

                        if (image.preview === true) {
                            previewImageUrl += image.url;
                        };
                    };
                    let spot = {
                        id: spots.id,
                        ownerId: spots.ownerId,
                        address: spots.address,
                        city: spots.city,
                        state: spots.state,
                        country: spots.country,
                        lat: spots.lat,
                        lng: spots.lng,
                        name: spots.name,
                        price: spots.price,
                        previewImage: previewImageUrl
                    };

                    bookingFormat.push(
                        {
                            id: booking.id,
                            spotId: booking.spotId,
                            Spot: spot,
                            userId: booking.userId,
                            startDate: startDateformat,
                            endDate: endDateformat,
                            createdAt: createdAtDate,
                            updatedAt: updatedAtDate
                        }
                    );






                };
                res.json({ Bookings: bookingFormat });
            };
        };

    } catch (error) {
        next(error);
    };
});

router.put('/:bookingId', requireAuth, async (req, res, next) => {
    try {
        const { user } = req;
        const { bookingId } = req.params;
        const { startDate, endDate } = req.body;
        let formattedStartDate = new Date(startDate);
        let formattedEndDate = new Date(endDate)
        if (user) {
            const booking = await Booking.findByPk(bookingId);
            if (booking) {
                if (booking.userId !== user.id) {
                    const err = new Error('Forbidden');
                    err.status = 403;
                    throw err;
                }
                const currentDate = new Date();
                

                
                
               
                if (currentDate > booking.endDate) {
                    const err = new Error("Past bookings can't be modified");
                    err.status = 403;
                }


                
//-------------------------------------------
                if (formattedStartDate >= booking.startDate && formattedStartDate <= booking.endDate || formattedEndDate >= booking.startDate && formattedEndDate <= booking.endDate) {
                    let errors = {}
                    
                    let err = new  ValidationError('Sorry, this spot is already booked for the specified dates');
                    errors.startDate = "Start date conflicts with an existing booking";
                    errors.endDate = "End date conflicts with an existing booking";
                    err.errors = errors;
                    err.status = 403;
                    throw err;
                }

                if (endDate <= startDate) {
                    const err = new ValidationError();
                    err.errors = { endDate: 'endDate cannot be on or before startDate' };
                    err.status = 400;
                    throw err;
                }

                let newBooking = await Booking.create({
                    spotId: booking.spotId,
                    userId: user.id,
                    startDate,
                    endDate

                })
                res.json(newBooking);
            } else {
                const err = new Error("Booking couldn't be found");
                err.status = 404;
                throw err;
            }
        }

    } catch (error) {
        next(error);
    };
});

// delete a existing booking by id
// delete an existing review
router.delete('/:bookingId', requireAuth, async (req, res, next) => {
    try {
        const { bookingId } = req.params;

        const { user } = req;
        const booking = await Booking.findByPk(bookingId);
        if (!booking) {
            const err = new Error("Booking couldn't be found");
            err.status = 404;
            throw err;
        };

        

        if (booking.userId !== user.id) {
            const err = new Error('Forbidden');
            err.status = 403;
            throw err;
        };



        
        const deletedbooking = await booking.destroy();
        res.json({
            message: 'Successfully deleted'
        });



    } catch (error) {
        next(error);
    };
});


module.exports = router;