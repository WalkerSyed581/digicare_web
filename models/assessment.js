'use strict';
const {
  Model
} = require('sequelize');
const { Doctor } = require('./doctor');
const { Patient } = require('./patient');

module.exports = (sequelize, DataTypes) => {
  class Assessment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Assessment.belongsTo(Doctor);
      Assessment.belongsTo(Patient);
    }
  };
  Assessment.init({
    notes: DataTypes.STRING,
    condition: DataTypes.STRING,
    recommendations: DataTypes.STRING,
    cgInstr: DataTypes.STRING,
    date: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Assessment',
  });
  return Assessment;
};