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
    return queryInterface.bulkInsert('Patients', [{
      id: 2,
      emergency_contact: '77876102683',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      id: 3,
      emergency_contact: '89372773526',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      id: 0,
      emergency_contact: '90413599465',
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
    return queryInterface.bulkDelete('Patients', null, {});
  }
};
