'use strict';
const bcrypt = require('bcryptjs');
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "Users",
      [
        {
          fullName: "Demo User",
          email: "demoUser@demo.com",
          hashedPassword: bcrypt.hashSync('shoppy'),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          fullName: 'Monia Techini',
          email: 'monia@test.com',
          hashedPassword: bcrypt.hashSync('art'),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      { returning: true }
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {})
  }
};