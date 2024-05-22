'use strict';
const { ReviewImage } = require('../models');


let options = {};
options.tableName = 'ReviewImages'
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA; // Define your schema in options objects
}
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    try {
      await ReviewImage.bulkCreate([
        {
          url: 'https://wallpaperaccess.com/full/3430302.jpg',
          reviewId: 1
        },
        {
          url: 'https://wallpapercave.com/wp/wp6337724.jpg',
          reviewId: 2
        },
        {
          url: 'https://i.pinimg.com/originals/9e/a3/75/9ea375e6c1cd44df0c4ba3f31d7b477b.jpg',
          reviewId: 3
        },
        {
          url: 'https://cdn2.wanderlust.co.uk/media/1036/cropped-oman-shutterstock_632028596.jpg?anchor=center&mode=crop&width=1760&height=0&format=auto&quality=90&rnd=132056042220000000',
          reviewId: 4
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
        id: { [Op.in]: [1, 2, 3, 4] },
      },
    )}
};
