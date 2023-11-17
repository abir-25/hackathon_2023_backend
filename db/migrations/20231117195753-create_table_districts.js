"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    queryInterface.createTable("districts", {
      districtId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },

      districtName: Sequelize.STRING(500),

      stateId: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },

      isActive: {
        type: Sequelize.TINYINT,
        defaultValue: 1,
      },

      createdAt: Sequelize.DATE,

      updatedAt: {
        type: Sequelize.DATE,
        defaultValue: null,
      },
    });
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.dropTable("districts");
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  },
};
