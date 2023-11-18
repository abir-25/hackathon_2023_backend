const { Sequelize, Model, sequelize } = require("../../db");

class Response extends Model {}

Response.init(
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    surveyId: {
      type: Sequelize.INTEGER,
      defaultValue: 0,
    },

    result: Sequelize.STRING(1500),

    isDeleted: {
      type: Sequelize.TINYINT,
      defaultValue: 0,
    },

    createdAt: Sequelize.DATE,

    updatedAt: {
      type: Sequelize.DATE,
      defaultValue: null,
    },
  },
  {
    sequelize,
    timestamps: true,
    createdAt: true,
    updatedAt: false,
    tableName: "responses",
  }
);

module.exports = Response;
