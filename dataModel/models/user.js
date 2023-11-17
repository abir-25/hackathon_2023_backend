const { Sequelize, Model, sequelize } = require("../../db");

class User extends Model {}

User.init(
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    name: Sequelize.STRING(200),

    userName: Sequelize.STRING(300),

    password: Sequelize.STRING(300),

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
    tableName: "users",
  }
);

module.exports = User;
