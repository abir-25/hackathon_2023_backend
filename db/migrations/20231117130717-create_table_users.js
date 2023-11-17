"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    queryInterface.createTable("users", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },

      name: Sequelize.STRING(200),

      userName: Sequelize.STRING(300),

      password: Sequelize.STRING(300),

      isDeleted: {
        type: Sequelize.TINYINT,
        defaultValue: 0,
      },

      createdAt: Sequelize.DATE,

      updatedAt: {
        type: Sequelize.DATE,
        defaultValue: null,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.dropTable("users");
  },
};
