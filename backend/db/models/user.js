'use strict';

const { Model, Validator } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      // define association
      User.hasMany(models.Spot, {
<<<<<<< HEAD
        foreignKey: 'ownerId', onDelete: 'CASCADE', 
=======
        foreignKey: 'ownerId',
        
        onDelete: 'Cascade'
>>>>>>> 2b1a0473250d0564b31fb64ddab43b24eb3d5d53
       
      });
      User.hasMany(models.Review, {foreignKey: 'userId'});
      User.hasMany(models.Booking, {foreignKey: 'userId'});
      
    }
  };

  User.init(
    {
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len :[3, 30],
          isAlpha: true
        }
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [3, 30],
          isAlpha: true
        }
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          len: [5, 30],
          isEmail: true
        }
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          len: [4, 30],
          isNotEmail(value) {
            if (Validator.isEmail(value)) {
              throw new Error("Cannot be an email.");
            }
          }
        }
      },
      hashedPassword: {
        type: DataTypes.STRING.BINARY,
        allowNull: false,
        validate: {
          len: [60, 60]
        }
      }
    }, {
      sequelize,
      modelName: 'User',
      defaultScope: {
        attributes: {
          exclude: ['hashedPassword', 'updatedAt', 'email', 'createdAt']
        }
      }
    },

  );
  return User;
};