"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("states", [
      { stateName: "Dhaka", countryId: 1 },
      { stateName: "Chittagong", countryId: 1 },
      { stateName: "Khulna", countryId: 1 },
      { stateName: "Sylhet", countryId: 1 },
      { stateName: "Rajshahi", countryId: 1 },
      { stateName: "Mymensingh", countryId: 1 },
      { stateName: "Barisal", countryId: 1 },
      { stateName: "Rangpur", countryId: 1 },
      { stateName: "Andaman and Nicobar Islands", countryId: 2 },
      { stateName: "Andhra Pradesh", countryId: 2 },
      { stateName: "Arunachal Pradesh", countryId: 2 },
      { stateName: "Assam", countryId: 2 },
      { stateName: "Bihar", countryId: 2 },
      { stateName: "Chandigarh", countryId: 2 },
      { stateName: "Chhattisgarh", countryId: 2 },
      { stateName: "Dadra and Nagar Haveli", countryId: 2 },
      { stateName: "Daman and Diu", countryId: 2 },
      { stateName: "Delhi", countryId: 2 },
      { stateName: "Goa", countryId: 2 },
      { stateName: "Gujarat", countryId: 2 },
      { stateName: "Haryana", countryId: 2 },
      { stateName: "Himachal Pradesh", countryId: 2 },
      { stateName: "Jammu and Kashmir", countryId: 2 },
      { stateName: "Jharkhand", countryId: 2 },
      { stateName: "Alabama", countryId: 3 },
      { stateName: "Alaska", countryId: 3 },
      { stateName: "Arizona", countryId: 3 },
      { stateName: "Arkansas", countryId: 3 },
      { stateName: "California", countryId: 3 },
      { stateName: "Colorado", countryId: 3 },
      { stateName: "Connecticut", countryId: 3 },
      { stateName: "Delaware", countryId: 3 },
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
