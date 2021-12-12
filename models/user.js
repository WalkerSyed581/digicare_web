'use strict';
const {
  Model
} = require('sequelize');
const { Patient } = require('./patient');
const { Doctor } = require('./doctor');
const { CareGiver } = require('./caregiver');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasOne(Patient);
      User.hasOne(Doctor);
      User.hasOne(CareGiver);
   }
  };
  User.init({
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};