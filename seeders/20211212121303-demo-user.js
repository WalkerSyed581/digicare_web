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
    return queryInterface.bulkInsert('Users', [{
      id: 1,
      firstName: 'Afzal',
      lastName: 'Habib',
      email: 'afzalhabib@gmail.com',
      password: 'BiycO',
      phone_no: '27877139043',
      dob: new Date(),
      gender: 'Other',
      address: 'House 96, Street 15, Islamabad',
      cnic: 7774174598886,
      age: 43,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      id: 2,
      firstName: 'Afzal',
      lastName: 'Hakim',
      email: 'afzalhakim@gmail.com',
      password: 'Xh4NX',
      phone_no: '30970356133',
      dob: new Date(),
      gender: 'Other',
      address: 'House 1, Street 85, Karachi',
      cnic: 5765338821634,
      age: 73,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      id: 3,
      firstName: 'Adnan',
      lastName: 'Habib',
      email: 'adnanhabib@yahoo.com',
      password: '5bXJe',
      phone_no: '47313906651',
      dob: new Date(),
      gender: 'M',
      address: 'House 34, Street 15, Lahore',
      cnic: 3677494980892,
      age: 85,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      id: 4,
      firstName: 'Adnan',
      lastName: 'Hakim',
      email: 'adnanhakim@yahoo.com',
      password: 'Sylkj',
      phone_no: '34213962871',
      dob: new Date(),
      gender: 'F',
      address: 'House 21, Street 15, Karachi',
      cnic: 6709851360510,
      age: 31,
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      id: 5,
      firstName: 'Afzal',
      lastName: 'Habib',
      email: 'afzalhabib@seecs.edu.pk',
      password: 'Z34hy',
      phone_no: '17665555947',
      dob: new Date(),
      gender: 'M',
      address: 'House 1, Street 85, Karachi',
      cnic: 3556458368938,
      age: 66,
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
    return queryInterface.bulkDelete('Users', null, {});
  }
};
