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
      SensorUserData.belongsTo(models.Patient,{foreignKey: 'patient_id' });
      SensorUserData.belongsTo(models.Sensor,{foreignKey: 'sensor_id' });
    }
  };
  SensorUserData.init({
    sensor_reading: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    timestamp: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    patient_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Patient',
        key: 'id'
      }
    },
    sensor_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Sensor',
        key: 'id'
      }
    }
  }, {
    sequelize,
    modelName: 'SensorUserData',
  });
  return SensorUserData;
};