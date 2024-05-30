'use strict';
const { SpotImage } = require('../models');

let options = {};
options.tableName = 'SpotImages'
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA; // Define your schema in options objects
}
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    try {
      await SpotImage.bulkCreate([
        {
          url: 'https://i.pinimg.com/originals/22/68/f3/2268f3afb704a4d19c287a6595b74eb8.jpg',
          spotId: 2,
          preview: true

        },
        {
          url: 'https://a.cdn-hotels.com/gdcs/production12/d1130/83f1c8c6-e12d-4e69-8433-c5bbc90b5ad6.jpg',
          spotId: 1,
          preview: true

        },
        {
          url: 'https://www.top5.com/wp-content/uploads/2018/11/most-impressive-castles-bodiam-castle.jpg',
          spotId: 1,
          preview: false

        },
        {
          url: 'https://www.mycolorfulwanderings.com/wp-content/uploads/2020/11/Carriage-House-Utah-Winter-Cabin-Getaway-1150x889.jpg',
          spotId: 3,
          preview: true

        },
        {
          url: 'https://media.boutiquehotel.me/hotel/cover/573438_1516797769.jpg',
          spotId: 4,
          preview: true

        },
        {
          url: 'https://explorenordegg.ca/wp-content/uploads/2023/05/Stix-3.jpeg',
          spotId: 5,
          preview: true

        },
        {
          url: 'https://farm2.staticflickr.com/1568/26605717921_3feb7c642c_h.jpg',
          spotId: 2,
          preview: false

        },
      ], { validate: true })
    } catch (error) {

    }
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'SpotImages';
    const Op = Sequelize.Op;

    await queryInterface.bulkDelete(
      options,
      {
        id: { [Op.in]: [1, 2, 3, 4, 5, 6, 7] },
      },

    );
  }
};
