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
     return queryInterface.bulkInsert('SensorUserData', [{
      timestamp: new Date(),
      patient_id: 2,
      sensor_reading: '69.47',
      sensor_id: '1',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      timestamp: new Date(),
      patient_id: 3,
      sensor_reading: '37.73',
      sensor_id: '2',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      timestamp: new Date(),
      patient_id: 3,
      sensor_reading: '70.81',
      sensor_id: '1',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      timestamp: new Date(),
      patient_id: 3,
      sensor_reading: '41.46',
      sensor_id: '0',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      timestamp: new Date(),
      patient_id: 3,
      sensor_reading: '32.91',
      sensor_id: '0',
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
     return queryInterface.bulkDelete('SensorUserData', null, {});
  }
};
