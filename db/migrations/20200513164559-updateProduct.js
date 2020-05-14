"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn("Products", "description", {
      type: Sequelize.TEXT,
    });
    await queryInterface.changeColumn("Products", "photoUrl", {
      type: Sequelize.TEXT,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn("Products", "description", {
      type: Sequelize.STRING,
    });
    await queryInterface.changeColumn("Products", "photoUrl", {
      type: Sequelize.STRING,
    });
  },
};
