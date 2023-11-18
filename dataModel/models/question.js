const { Sequelize, Model, sequelize } = require("../../db");

class Question extends Model {}

Question.init(
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

    type: {
      type: Sequelize.INTEGER,
      defaultValue: 0,
    },

    title: Sequelize.STRING(1500),

    description: Sequelize.STRING(3000),

    answer: Sequelize.STRING(500),

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
    tableName: "questions",
  }
);

module.exports = Question;
