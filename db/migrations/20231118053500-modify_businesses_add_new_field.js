"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        queryInterface.addColumn(
          "businesses",
          "typeId",
          {
            type: Sequelize.DataTypes.INTEGER,
            after: "businessName",
          },
          { transaction: t }
        ),
        queryInterface.addColumn(
          "businesses",
          "sectorId",
          {
            type: Sequelize.DataTypes.INTEGER,
            after: "typeId",
          },
          { transaction: t }
        ),
        queryInterface.addColumn(
          "businesses",
          "sectorName",
          {
            type: Sequelize.DataTypes.STRING(200),
            after: "sectorId",
          },
          { transaction: t }
        ),
        queryInterface.addColumn(
          "businesses",
          "occupation",
          {
            type: Sequelize.DataTypes.STRING(200),
            after: "sectorName",
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
