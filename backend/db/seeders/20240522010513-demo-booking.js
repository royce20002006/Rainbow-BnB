'use strict';
const { Booking } = require('../models');


let options = {};
options.tableName = 'Bookings'
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA; // Define your schema in options objects
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    try {
      await Booking.bulkCreate([
        {
          spotId: 1,
          userId: 1,
          startDate: '11-25-2025',
          endDate: '11-30-2025'
        },
        {
          spotId: 2,
          userId: 2,
          startDate: '01-05-2026',
          endDate: '02-05-2026'
        },
        {
          spotId: 3,
          userId: 1,
          startDate: '02-02-2027',
          endDate: '02-04-2027'
        },
        {
          spotId: 5,
          userId: 3,
          startDate: '05-25-2026',
          endDate: '05-30-2026'
        },
        {
          spotId: 2,
          userId: 3,
          startDate: '10-20-2028',
          endDate: '11-30-2028'
        },
      ], {validate: true})
    } catch (error) {
      console.log(error)
    }
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'ReviewImages';
    const Op = Sequelize.Op;

    await queryInterface.bulkDelete(
      options,
      {
        id: { [Op.in]: [1, 2, 3, 4, 5] },
      },
    )
  }
};
