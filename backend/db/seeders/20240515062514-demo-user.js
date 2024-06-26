'use strict';

const { User } = require('../models');
const bcrypt = require('bcryptjs');

let options = {};
options.tableName = 'Users'
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA; // Define your schema in options objects
}

module.exports = {
  async up(queryInterface, Sequelize) {
    try {
      await User.bulkCreate(
        [
          {
            firstName: 'jan',
            lastName: 'Well',
            email: 'demo@user.io',
            username: 'Demo-lition',
            hashedPassword: bcrypt.hashSync('password'),
          },
          {
            firstName: 'Gavin',
            lastName: 'Smith',
            email: 'user1@user.io',
            username: 'FakeUser1',
            hashedPassword: bcrypt.hashSync('password2'),
          },
          {
            firstName: 'jessica',
            lastName: 'Alburn',
            email: 'user2@user.io',
            username: 'FakeUser2',
            hashedPassword: bcrypt.hashSync('password3'),
          },
        ],
        { validate: true }
      );
    } catch (error) {

      // Re-throw the error to ensure the migration fails and logs the error
    }
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'Users';
    const Op = Sequelize.Op;
    try {
      await queryInterface.bulkDelete(
        options,
        {
          username: { [Op.in]: ['Demo-lition', 'FakeUser1', 'FakeUser2'] },
        },
        {}
      );
    } catch (error) {

      // Re-throw the error to ensure the rollback fails and logs the error
    }
  },
};
