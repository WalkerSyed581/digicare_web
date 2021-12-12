'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('SensorUserData', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      timestamp: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      sensor_reading: {
        type: Sequelize.FLOAT
      },
      patient_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Patients',
          key: 'id'
        }
      },
      sensor_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Sensors',
          key: 'id'
        }
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
    await queryInterface.dropTable('SensorUserData');
  }
};