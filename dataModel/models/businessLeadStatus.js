// const { Sequelize, Model, sequelize } = require("../../db");

// class BusinessLeadStatus extends Model {}

// BusinessLeadStatus.init(
//   {
//     id: {
//       type: Sequelize.INTEGER,
//       primaryKey: true,
//       autoIncrement: true,
//     },

//     businessId: {
//       type: Sequelize.INTEGER,
//       defaultValue: 0,
//     },

//     title: Sequelize.STRING(100),

//     isActive: {
//       type: Sequelize.TINYINT,
//       defaultValue: 1,
//     },

//     isDeleted: {
//       type: Sequelize.TINYINT,
//       defaultValue: 0,
//     },

//     createdAt: Sequelize.DATE,

//     updatedAt: {
//       type: Sequelize.DATE,
//       defaultValue: null,
//     },
//   },
//   {
//     sequelize,
//     timestamps: true,
//     createdAt: true,
//     updatedAt: false,
//     tableName: "businessLeadStatus",
//   }
// );

// module.exports = BusinessLeadStatus;
