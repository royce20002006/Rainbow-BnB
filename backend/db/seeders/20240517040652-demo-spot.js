'use strict';

const { Spot } = require('../models');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA; // Define your schema in options objects
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
      await Spot.bulkCreate([
        {
          ownerId: 2,
          address: '925 richie lane',
          city: 'Richman',
          state: 'Washington',
          country: 'United States',
          lat: 10.9328945,
          lng: 123.1233598,
          name: 'Richman Castle',
          description: 'This castle stay is surrounded by a beautiful horizon.',
          price: 995.00
        },
        {
          ownerId: 1,
          address: '900 oak ave',
          city: 'sleepy',
          state: 'Hollow',
          country: 'Spain',
          lat: 34.9328545,
          lng: 103.1233548,
          name: 'Cozy cabin',
          description: 'The cabin has a nice spring that runs around it.',
          price: 422.00
        },
        {
          ownerId: 2,
          address: '560 getaway mansion',
          city: 'Juist',
          state: ' Saxony',
          country: 'Germany',
          lat: 14.9328445,
          lng: 103.1233548,
          name: 'german paradise',
          description: 'a nice beach house with a great view of the ocean.',
          price: 250.10
        },
        {
          ownerId: 3,
          address: '422 pikearich ave',
          city: 'wilburville',
          state: ' soaky',
          country: 'brazil',
          lat: 54.9368445,
          lng: 145.1356548,
          name: 'cozy home',
          description: 'a nice cozy house with a warm fireplace.',
          price: 44.82
        },

      ], {validate: true})
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    options.tableName = 'Users';
    const Op = Sequelize.Op;
    
      await queryInterface.bulkDelete(
        options,
        {
          username: { [Op.in]: ['Demo-lition', 'FakeUser1', 'FakeUser2'] },
        },
        
      );
    }
  
};
