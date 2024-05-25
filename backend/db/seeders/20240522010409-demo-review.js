'use strict';
const { Review } = require('../models');

let options = {};
options.tableName = 'Reviews'
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA; // Define your schema in options objects
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    try {
      await Review.bulkCreate([
        {
          userId: 1,
          spotId: 1,
          review: 'was cozy.',
          stars: 4
        },
        {
          userId: 3,
          spotId: 1,
          review: 'very boring.',
          stars: 2
        },
        {
          userId: 3,
          spotId: 3,
          review: 'very dirty.',
          stars: 1
        },
        {
          userId: 2,
          spotId: 2,
          review: 'so pretty and so warm.',
          stars: 5
        },
        {
          userId: 2,
          spotId: 3,
          review: 'such a great oasis.',
          stars: 5
        },], {validate: true}
      )

    } catch (error) {
      console.log(error)
    }
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    options.tableName = 'Reviews';
    const Op = Sequelize.Op;

    await queryInterface.bulkDelete(
      options,
      {
        id: { [Op.in]: [1,2,3,4,5] },
      },
    )
  }
};
