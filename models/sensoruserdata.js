'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class SensorUserData extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  SensorUserData.init({
    timestamp: DataTypes.TIME,
    sensor_reading: DataTypes.FLOAT
  }, {
    sequelize,
    modelName: 'SensorUserData',
  });
  return SensorUserData;
};