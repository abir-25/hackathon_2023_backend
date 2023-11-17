"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    queryInterface.createTable("businesses", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },

      businessName: Sequelize.STRING(250),

      streetAddress: Sequelize.STRING(500),

      countryId: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },

      stateId: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },

      districtId: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },

      businessEmail: Sequelize.STRING(100),

      businessPhoneNo: Sequelize.STRING(50),

      businessLogo: Sequelize.STRING(250),

      currencyId: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },

      timezoneId: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },

      timezone: Sequelize.STRING(30),

      dateFormatId: {
        type: Sequelize.INTEGER,
        defaultValue: 1,
      },

      dateFormat: {
        type: Sequelize.STRING(20),
        defaultValue: "DD MMM YYYY",
      },

      password: Sequelize.STRING(500),

      jwToken: Sequelize.STRING(500),

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
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.dropTable("businesses");
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  },
};
