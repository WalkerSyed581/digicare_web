'use strict';
const {
  Model
} = require('sequelize');
const { User } = require('./user');
const { Assessment } = require('./assessment');

module.exports = (sequelize, DataTypes) => {
  class Doctor extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Doctor.belongsTo(User);
      Doctor.hasOne(Assessment);
    }
  };
  Doctor.init({
    user_id: DataTypes.INTEGER,
    emergency_contact: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Doctor',
  });
  return Doctor;
};