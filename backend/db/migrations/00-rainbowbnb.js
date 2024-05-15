'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createSchema('Rainbow_BnB');
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropSchema('Rainbow_BnB');
  }
};