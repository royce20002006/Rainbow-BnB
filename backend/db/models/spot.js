'use strict';
const {
  Model,
  ValidationError,
  json
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Spot extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Spot.belongsTo(models.User, {
        foreignKey: 'ownerId', as: 'Owner', onDelete: 'cascade'
      });
      Spot.hasMany(models.SpotImage, { foreignKey: 'spotId' });
      Spot.hasMany(models.Review, { foreignKey: 'spotId' });
      Spot.hasMany(models.Booking, { foreignKey: 'spotId' })
    }
  }
  Spot.init({
    ownerId: {
      type: DataTypes.INTEGER,
      allowNull: false,

    },
    address: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true,
      validate: {
        
        len: [5, 255]
      }
    },
    city: {
      type: DataTypes.STRING(60),
      allowNull: false,
      validate: {

        len: [3, 60]
      }
    },
    state: {
      type: DataTypes.STRING(60),
      allowNull: false,
      validate: {
        len: [3, 60]
      }
    },
    country: {
      type: DataTypes.STRING(255),
      allowNull: false,
      validate: {
        len: [3, 255]
      }
    },
    lat: {
      type: DataTypes.DECIMAL(9, 7),
      allowNull: false,
      validate: {
        isDecimal: true


      }

    },
    lng: {
      type: DataTypes.DECIMAL(10, 7),
      allowNull: false,
      validate: {
        isDecimal: true

      }
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true,
      validate: {
        len: [3, 55],
        

      }
    },
    description: {
      type: DataTypes.STRING(255),
      validate: {
        len: [5, 255]
      }
    },
    price: {
      type: DataTypes.DECIMAL(6, 2),
      allowNull: false,
      validate: {
        min: 1.00,
        max: 9999.99,
        isDecimal: true
      }
    }
  }, {
    sequelize,
    modelName: 'Spot',
  });
  return Spot;
};