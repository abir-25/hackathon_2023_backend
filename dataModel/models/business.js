const { Sequelize, Model, sequelize } = require("../../db");

class Business extends Model {}

Business.init(
  {
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

    defaultNote: Sequelize.STRING(1000),

    isInvoiceWithHeader: {
      type: Sequelize.TINYINT,
      defaultValue: 1,
    },

    currencyId: {
      type: Sequelize.INTEGER,
      defaultValue: 0,
    },

    timezoneId: {
      type: Sequelize.INTEGER,
      defaultValue: 0,
    },

    timezone: Sequelize.STRING(30),

    dateFormatId: {
      type: Sequelize.INTEGER,
      defaultValue: 1,
    },

    dateFormat: {
      type: Sequelize.STRING(20),
      defaultValue: "DD MMM YYYY",
    },

    isSetInWords: {
      type: Sequelize.TINYINT,
      defaultValue: 0,
    },

    isDeleted: {
      type: Sequelize.TINYINT,
      defaultValue: 0,
    },

    createdAt: Sequelize.DATE,

    updatedAt: {
      type: Sequelize.DATE,
      defaultValue: null,
    },

    invoicePrefix: {
      type: Sequelize.STRING(15),
      defaultValue: "INV",
    },

    invoiceNoDigits: {
      type: Sequelize.INTEGER,
      defaultValue: 0,
    },

    quotationPrefix: {
      type: Sequelize.STRING(15),
      defaultValue: "QT",
    },

    quotationNoDigits: {
      type: Sequelize.INTEGER,
      defaultValue: 0,
    },

    billPrefix: {
      type: Sequelize.STRING(15),
      defaultValue: "BL",
    },

    billNoDigits: {
      type: Sequelize.INTEGER,
      defaultValue: 0,
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
