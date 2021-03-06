'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasOne(models.Patient);
      User.hasOne(models.Doctor);
      User.hasOne(models.CareGiver);
   }
  };
  User.init({
    firstName: {
      type: DataTypes.STRING,
      unique: false,
      allowNull: false
    },
    lastName: {
      type: DataTypes.STRING,
      unique: false,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      unique: false,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    phone_no: {
      type: DataTypes.STRING(11),
      allowNull: false
    },
    dob: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    gender: {
      type: DataTypes.ENUM('F', 'M','Other'),
      allowNull: false
    },
    address: {
      type: DataTypes.STRING
    },
    cnic: {
      type: DataTypes.STRING(13),
      allowNull: false
    },
    age: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};