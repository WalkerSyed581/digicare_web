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
      Assessment.belongsTo(models.Doctor,{foreignKey: 'doctor_id' });
      Assessment.belongsTo(models.Patient,{foreignKey: 'patient_id' });
    }
  };
  Assessment.init({
    notes: {
      type: DataTypes.STRING,
      allowNull: false
    },
    doctor_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Doctor',
        key: 'id'
      }
    },
    patient_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Patient',
        key: 'id'
      }
    },
    condition: {
      type: DataTypes.STRING,
      allowNull: false
    },
    recommendations: {
      type: DataTypes.STRING,
      allowNull: false
    },
    cgInstr: {
      type: DataTypes.STRING,
      allowNull: false
    },
  }, {
    sequelize,
    modelName: 'Assessment',
  });
  return Assessment;
};