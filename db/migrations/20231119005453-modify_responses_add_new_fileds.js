"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        queryInterface.addColumn(
          "responses",
          "questionId",
          {
            type: Sequelize.DataTypes.INTEGER,
            after: "surveyId",
          },
          { transaction: t }
        ),
        queryInterface.addColumn(
          "responses",
          "answer",
          {
            type: Sequelize.DataTypes.STRING(500),
            after: "questionId",
          },
          { transaction: t }
        ),
      ]);
    });
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        queryInterface.removeColumn("responses", "questionId", {
          transaction: t,
        }),
        queryInterface.removeColumn("responses", "answer", {
          transaction: t,
        }),
      ]);
    });
  },
};
