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
    return queryInterface.bulkInsert('Sensors', [{
      id: 1,
      name: 'max30102',
      data_desc: 'Pulse oximeter',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      id: 2,
      name: 'mpu3040',
      data_desc: 'Heart rate sensor',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      id: 3,
      name: 'ir1353',
      data_desc: 'ECG sensor',
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
     return queryInterface.bulkDelete('Sensors', null, {});
  }
};
