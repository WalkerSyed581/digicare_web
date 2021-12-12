'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Assessments', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      doctor_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Doctors',
          key: 'id'
        }
      },
      patient_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Patients',
          key: 'id'
        }
      },
      condition: {
        type: Sequelize.STRING,
        allowNull: false
      },
      recommendations: {
        type: Sequelize.STRING,
        allowNull: false
      },
      cgInstr: {
        type: Sequelize.STRING,
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
    await queryInterface.dropTable('Assessments');
  }
};