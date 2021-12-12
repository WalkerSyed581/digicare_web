'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      firstName: {
        type: Sequelize.STRING,
        unique: false,
        allowNull: false
      },
      lastName: {
        type: Sequelize.STRING,
        unique: false,
        allowNull: false
      },
      email: {
        type: Sequelize.STRING,
        unique: false,
        allowNull: false
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false
      },
      phone_no: {
        type: Sequelize.STRING(11),
        allowNull: false
      },
      dob: {
        type: Sequelize.DATEONLY,
        allowNull: false
      },
      gender: {
        type: Sequelize.ENUM('F', 'M','Other'),
        allowNull: false
      },
      address: {
        type: Sequelize.STRING
      },
      cnic: {
        type: Sequelize.STRING(13),
        allowNull: false
      },
      age: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Users');
  }
};