const { Sequelize, Model, sequelize } = require("../../db");

class Survey extends Model {}

Survey.init(
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    businessId: {
      type: Sequelize.INTEGER,
      defaultValue: 0,
    },

    title: Sequelize.STRING(500),

    description: Sequelize.STRING(3000),

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
    tableName: "surveys",
  }
);

module.exports = Survey;
