const { Sequelize, Model, sequelize } = require("../../db");

class Business extends Model {}

Business.init(
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    businessName: Sequelize.STRING(250),

    streetAddress: Sequelize.STRING(500),

    countryId: {
      type: Sequelize.INTEGER,
      defaultValue: 0,
    },

    stateId: {
      type: Sequelize.INTEGER,
      defaultValue: 0,
    },

    districtId: {
      type: Sequelize.INTEGER,
      defaultValue: 0,
    },

    businessEmail: Sequelize.STRING(100),

    businessPhoneNo: Sequelize.STRING(50),

    businessLogo: Sequelize.STRING(250),

    timezoneId: {
      type: Sequelize.INTEGER,
      defaultValue: 0,
    },

    timezone: Sequelize.STRING(30),

    password: Sequelize.STRING(500),

    jwToken: Sequelize.STRING(500),

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
    tableName: "businesses",
  }
);

module.exports = Business;
