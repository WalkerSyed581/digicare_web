'use strict';
const {
  Model
} = require('sequelize');
const { User } = require('./user');
const { CareGiver } = require('./caregiver');
const { Assessment } = require('./assessment');

module.exports = (sequelize, DataTypes) => {
  class Patient extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Patient.belongsTo(User);
      Patient.hasOne(CareGiver);
      Patient.hasOne(Assessment);
    }
  };
  Patient.init({
    user_id: DataTypes.INTEGER,
    emergency_contact: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Patient',
  });
  return Patient;
};