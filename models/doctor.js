'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Doctor extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Doctor.belongsTo(models.User,{foreignKey: '_id' });
      Doctor.hasOne(models.Assessment);
    }
  };
  Doctor.init({
    _id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      references: {
        model: 'User',
        key: 'id'
      }
    },
    emergency_contact: {
      type: DataTypes.STRING(11),
      allowNull: false,
    }
  }, {
    sequelize,
    modelName: 'Doctor',
  });
  return Doctor;
};