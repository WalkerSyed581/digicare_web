'use strict';
const {
  Model
} = require('sequelize');


module.exports = (sequelize, DataTypes) => {
  class Sensor extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Sensor.hasMany(models.SensorUserData)
    }
  };
  Sensor.init({
    name: {
      type :DataTypes.STRING,
      allowNull: false,
    },
    data_desc: {
      type :DataTypes.STRING,
      allowNull: false,
    }
  }, {
    sequelize,
    modelName: 'Sensor',
  });
  return Sensor;
};