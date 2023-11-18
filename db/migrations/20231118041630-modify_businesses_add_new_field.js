"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        queryInterface.addColumn(
          "businesses",
          "previousPassword",
          {
            type: Sequelize.DataTypes.STRING(100),
            after: "password",
          },
          { transaction: t }
        ),
      ]);
    });
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        queryInterface.removeColumn("businesses", "previousPassword", {
          transaction: t,
        }),
      ]);
    });
  },
};
