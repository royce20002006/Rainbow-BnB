'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Booking extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Booking.belongsTo(models.Spot, {foreignKey: 'spotId', onDelete: 'cascade'});
      Booking.belongsTo(models.User, {foreignKey: 'userId', onDelete: 'cascade'});
    }
  }
  Booking.init({
    spotId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    startDate: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        isBeforeEndDate(value) {
          if (value >= this.endDate) {
            throw new Error('endDate cannot come before startDate')
          }
        },
        isBefore(date) {
          const current = new Date();
          if (date > current) {
            
              const err = new Error("Past bookings can't be modified");
              err.status = 403;
          
          }
        }
      }
    },
    endDate: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        isBefore(date) {
          const current = new Date();
          if (date > current) {
            
              const err = new Error("Past bookings can't be modified");
              err.status = 403;
          
          }
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Booking',
  });
  return Booking;
};