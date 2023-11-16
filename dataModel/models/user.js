// const { Sequelize, Model, sequelize } = require("../../db");

// // const User = sequelize.define(
// //   "user",
// //   {
// //     id: {
// //       type: Sequelize.INTEGER,
// //       allowNull: false,
// //       autoIncrement: true,
// //       primaryKey: true,
// //     },

// //     name: {
// //       type: Sequelize.STRING(150),
// //     },

// //     email: {
// //       type: Sequelize.STRING(100),
// //       allowNull: false,
// //     },

// //     password: {
// //       type: Sequelize.STRING(500),
// //     },

// //     userType: {
// //       type: Sequelize.INTEGER,
// //       defaultValue: 0,
// //     },

// //     phoneNo: {
// //       type: Sequelize.STRING(30),
// //     },

// //     profileImage: {
// //       type: Sequelize.STRING(200),
// //     },

// //     jwToken: {
// //       type: Sequelize.STRING(500),
// //     },

// //     isEmailVerified: {
// //       type: Sequelize.BOOLEAN,
// //       defaultValue: false,
// //     },

// //     emailVerifyToken: {
// //       type: Sequelize.STRING(500),
// //     },

// //     isActive: {
// //       type: Sequelize.TINYINT,
// //       defaultValue: 1,
// //     },

// //     isDeleted: {
// //       type: Sequelize.TINYINT,
// //       defaultValue: 0,
// //     },

// //     createdAt: {
// //       type: Sequelize.DATE,
// //     },

// //     updatedAt: {
// //       type: Sequelize.DATE,
// //       defaultValue: null,
// //     },
// //   },
// //   {
// //     timestamps: true,
// //     createdAt: true,
// //     updatedAt: false,
// //   }
// // );

// class User extends Model {
//   getFullname() {
//     return [this.name, "Shahriar"].join(" ");
//   }
// }
// User.init(
//   {
//     userType: {
//       type: Sequelize.INTEGER,
//       defaultValue: 0,
//     },

//     username: {
//       type: Sequelize.STRING(100),
//     },

//     name: Sequelize.STRING(150),

//     userEmail: {
//       type: Sequelize.STRING(100),
//     },

//     password: Sequelize.STRING(500),

//     phoneNo: Sequelize.STRING(30),

//     profileImage: Sequelize.STRING(200),

//     jwToken: Sequelize.STRING(500),

//     isEmailVerified: {
//       type: Sequelize.BOOLEAN,
//       defaultValue: false,
//     },

//     emailVerifyToken: Sequelize.STRING(500),

//     resetPasswordToken: Sequelize.STRING(500),

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
//     tableName: "users",
//   }
// );

// module.exports = User;
