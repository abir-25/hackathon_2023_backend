"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    queryInterface.createTable("countries", {
      countryId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },

      countryName: Sequelize.STRING(500),

      countryShortName: Sequelize.STRING(50),

      countryCode: Sequelize.STRING(50),

      currencyId: {
        type: Sequelize.INTEGER,
        defaultValue: 1,
      },

      timezoneId: {
        type: Sequelize.INTEGER,
        defaultValue: 1,
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
    return queryInterface.dropTable("countries");
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  },
};
