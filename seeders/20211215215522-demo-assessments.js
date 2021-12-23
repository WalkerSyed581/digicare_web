'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
     return queryInterface.bulkInsert('Assessments', [{
      id: 1,
      doctor_id: 4,
      patient_id: 1,
      condition: 'Average',
      recommendations: 'Eat healthy',
      cgInstr: 'Be present round-the-clock',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      id: 2,
      doctor_id: 4,
      patient_id: 1,
      condition: 'Good',
      recommendations: 'Do not engage in strenuous activity',
      cgInstr: 'Ensure medicine dose is taken',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      id: 3,
      doctor_id: 4,
      patient_id: 2,
      condition: 'Poor',
      recommendations: 'Do not engage in strenuous activity',
      cgInstr: 'Visit once daily',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      id: 4,
      doctor_id: 4,
      patient_id: 3,
      condition: 'Critical',
      recommendations: 'Eat healthy',
      cgInstr: 'Ensure medicine dose is taken',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      id: 5,
      doctor_id: 4,
      patient_id: 3,
      condition: 'Critical',
      recommendations: 'Do not engage in strenuous activity',
      cgInstr: 'Visit once daily',
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     return queryInterface.bulkDelete('Assessments', null, {});
  }
};
