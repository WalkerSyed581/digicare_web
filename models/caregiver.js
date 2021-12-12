'use strict';
const {
  Model
} = require('sequelize');
const { Patient } = require('./patient');
const { User } = require('./user');

module.exports = (sequelize, DataTypes) => {
  class CareGiver extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      CareGiver.belongsTo(User);
      CareGiver.belongsTo(Patient);
    }
  };
  CareGiver.init({
    user_id: DataTypes.INTEGER,
    relationship: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'CareGiver',
  });
  return CareGiver;
};