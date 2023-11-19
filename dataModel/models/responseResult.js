const { Sequelize, Model, sequelize } = require("../../db");

class ResponseResult extends Model {}

ResponseResult.init(
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

    phoneNo: Sequelize.STRING(100),

    email: Sequelize.STRING(200),

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
    tableName: "responseResults",
  }
);

module.exports = ResponseResult;
