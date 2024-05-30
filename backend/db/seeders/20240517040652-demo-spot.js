'use strict';

const { Spot } = require('../models');

let options = {};
options.tableName = 'Spots';
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA; // Define your schema in options objects
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
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
        ownerId: 3,
        address: '921 artichoke rd',
        city: 'Wilburville',
        state: 'Iowa',
        country: 'United States',
        lat: 23.5324945,
        lng: 103.1243598,
        name: 'Artichoke cottage',
        description: 'This small cottage has everything you need.',
        price: 365.50
      },
      {
        ownerId: 1,
        address: '920 cedar drive',
        city: 'owasio',
        state: 'oklahoma',
        country: 'United States',
        lat: 88.9358445,
        lng: 114.1973598,
        name: 'cozy cabin',
        description: 'This cabin stay is surrounded by a peaceful rainforest.',
        price: 225.05
      },
      {
        ownerId: 2,
        address: '900 german street',
        city: 'augustus',
        state: 'liesterstein',
        country: 'Germany',
        lat: 25.8468945,
        lng: 100.3784598,
        name: 'german resort',
        description: 'This resort has beautiful scenery and just the right weather for anything.',
        price: 95.00
      },
      {
        ownerId: 1,
        address: '901 acne lane',
        city: 'buffalo gap',
        state: 'seatle',
        country: 'United States',
        lat: 29.9836945,
        lng: 103.1284598,
        name: 'the stix',
        description: 'this remote location is away from everything so you can enjoy your alone time.',
        price: 104.00
      },

    ], { validate: true })
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    options.tableName = 'Spots';
    const Op = Sequelize.Op;

    await queryInterface.bulkDelete(
      options,
      {
        name: { [Op.in]: ['the stix', 'german resort', 'cozy cabin', 'Artichoke cottage', 'Richman Castle'] },
      },

    );
  }

};
