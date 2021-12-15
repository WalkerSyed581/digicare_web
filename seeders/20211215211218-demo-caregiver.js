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
     return queryInterface.bulkInsert('CareGivers', [{
      id: 2,
      patient_id: 0,
      relationship: 'Companion',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      id: 1,
      patient_id: 3,
      relationship: 'Nurse',
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
     return queryInterface.bulkDelete('CareGivers', null, {});
  }
};
