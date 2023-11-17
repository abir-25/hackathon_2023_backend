"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("countries", [
      {
        countryName: "Bangladesh",
        countryShortName: "BD",
        countryCode: "+880",
        timezoneId: 1,
      },
      {
        countryName: "India",
        countryShortName: "IN",
        countryCode: "+91",
        timezoneId: 2,
      },
      {
        countryName: "United States",
        countryShortName: "US",
        countryCode: "+1",
        timezoneId: 3,
      },
    ]);
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
