// const { validationResult } = require("express-validator");
// const { StatusCodes } = require("http-status-codes");
// const userManager = require("../dataModel/managers/userManager");

// exports.login = (req, res, next) => {
//   console.log("API Login");
//   const errors = validationResult(req);
//   if (!errors.isEmpty()) {
//     const mappedErrors = errors.mapped();
//     const emailError = mappedErrors.email?.msg || null;
//     const passwordError = mappedErrors.password?.msg || null;
//     return res.status(StatusCodes.BAD_REQUEST).send({
//       status: StatusCodes.BAD_REQUEST,
//       message: "Bad request, entered data is incorrect",
//       emailError: emailError,
//       passwordError: passwordError,
//     });
//   }

//   const email = req.body.email;
//   const password = req.body.password;

//   userManager
//     .userLogin(email, password)
//     .then((result) => {
//       return res.status(StatusCodes.OK).send({
//         status: 1,
//         token: result.jwToken,
//         user: {
//           id: result.id,
//           username: result.username,
//           userEmail: result.userEmail,
//           isEmailVerified: result.isEmailVerified,
//           name: result.name,
//           phoneNo: result.phoneNo,
//         },
//       });
//     })
//     .catch((error) => {
//       const statusCode = error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;
//       return res.status(statusCode).send({
//         emailError: error.message,
//       });
//     });
// };

// exports.register = (req, res, next) => {
//   console.log("API register");

//   const errors = validationResult(req);
//   if (!errors.isEmpty()) {
//     const extractedErrors = {};
//     errors.array().forEach((err) => {
//       extractedErrors[err.param] = err.msg;
//     });

//     return res.status(StatusCodes.BAD_REQUEST).send({
//       status: StatusCodes.BAD_REQUEST,
//       message: "Bad request, entered data is incorrect.",
//       ...extractedErrors,
//     });
//   }

//   const email = req.body.email;
//   const password = req.body.password;

//   const user = {
//     username: email,
//     userEmail: email,
//     password: password,
//   };

//   userManager
//     .createUser(user)
//     .then((result) => {
//       res.status(StatusCodes.OK).send({
//         status: 1,
//         message: "Registration successfull.",
//         token: result.jwToken,
//         user: {
//           id: result.id,
//           username: result.username,
//           userEmail: result.userEmail,
//           isEmailVerified: result.isEmailVerified,
//           name: result.name,
//           phoneNo: result.phoneNo,
//         },
//       });

//       userManager.sendVerificationEmailToUser(result);
//     })
//     .catch((error) => {
//       const statusCode = error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;
//       return res.status(statusCode).send({
//         message: error.message,
//         email: error.email || null,
//       });
//     });
// };

// exports.emailVerification = (req, res, next) => {
//   console.log("API Email Verification");

//   const verificationToken = req.body.verificationToken;
//   if (!verificationToken) {
//     return res.status(StatusCodes.BAD_REQUEST).send({
//       status: -1,
//       message: "Token is missing!",
//     });
//   }

//   userManager
//     .emailVerificationUser(verificationToken)
//     .then((result) => {
//       res.status(StatusCodes.OK).send({
//         ...result,
//       });
//     })
//     .catch((error) => {
//       const statusCode = error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;
//       return res.status(statusCode).send({
//         status: -1,
//         message: error.message,
//       });
//     });
// };

// exports.resendVerifyEmail = (req, res, next) => {
//   userManager
//     .resendVerifyEmail(req.userId)
//     .then(() => {
//       res.status(StatusCodes.OK).send({
//         status: 1,
//         message: "Resend verify email successfully.",
//       });
//     })
//     .catch((error) => {
//       const statusCode = error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;
//       return res.status(statusCode).send({
//         status: -1,
//         message: error.message,
//       });
//     });
// };

// exports.passwordRecoveryEmail = (req, res, next) => {
//   userManager
//     .passwordRecoveryEmail(req.body.username)
//     .then(() => {
//       res.status(StatusCodes.OK).send({
//         status: 1,
//         message: "Recovery Password email sent successfully.",
//       });
//     })
//     .catch((error) => {
//       const statusCode = error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;
//       return res.status(statusCode).send({
//         status: -1,
//         message: error.message,
//       });
//     });
// };

// exports.verifyResetPasswordToken = (req, res, next) => {
//   console.log(req.query.token);
//   userManager
//     .verifyResetPasswordToken(req.query.token)
//     .then((result) => {
//       res.status(StatusCodes.OK).send({
//         status: 1,
//         message: "User Found!",
//       });
//     })
//     .catch((error) => {
//       const statusCode = error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;
//       return res.status(statusCode).send({
//         status: -1,
//         message: "Password already reset",
//       });
//     });
// };

// exports.resetPassword = (req, res, next) => {
//   userManager
//     .resetPassword(req.body.data.resetPasswordToken, req.body.data.password)
//     .then(() => {
//       res.status(StatusCodes.OK).send({
//         status: 1,
//         message: "Password Reset Successfully.",
//       });
//     })
//     .catch((error) => {
//       const statusCode = error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;
//       return res.status(statusCode).send({
//         status: -1,
//         message: error.message,
//       });
//     });
// };

// exports.getUserInfo = (req, res, next) => {
//   console.log("API Get User Info");
//   userManager
//     .getUserInfoByUserId(req.userId)
//     .then((result) => {
//       res.status(StatusCodes.OK).send({
//         status: 1,
//         message: "User Found!.",
//         user: {
//           id: result.id,
//           username: result.username,
//           userEmail: result.userEmail,
//           isEmailVerified: result.isEmailVerified,
//           name: result.name,
//           phoneNo: result.phoneNo,
//           businessList: result.businessList,
//         },
//       });
//     })
//     .catch((error) => {
//       const statusCode = error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;
//       return res.status(statusCode).send({
//         status: -1,
//         message: error.message,
//       });
//     });
// };

// exports.getUserInfoByUsername = (req, res, next) => {
//   console.log("API Get User Info by Username");
//   userManager
//     .getUserInfoByUsername(req.query.username)
//     .then((result) => {
//       res.status(StatusCodes.OK).send({
//         status: 1,
//         message: "User Found!",
//         user: {
//           id: result.id,
//           username: result.username,
//           userEmail: result.userEmail,
//           isEmailVerified: result.isEmailVerified,
//           name: result.name,
//           phoneNo: result.phoneNo,
//           businessList: result.businessList,
//         },
//       });
//     })
//     .catch((error) => {
//       const statusCode = error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;
//       return res.status(statusCode).send({
//         status: -1,
//         message: "This username does not exist",
//       });
//     });
// };

// exports.updateUserInfo = (req, res, next) => {
//   console.log("API Update User Info");

//   const fieldName = req.body.fieldName;
//   const fieldValue = req.body.fieldValue;
//   if (!fieldName) {
//     return res.status(StatusCodes.BAD_REQUEST).send({
//       status: -1,
//       message: "Data is missing!",
//     });
//   }

//   userManager
//     .updateUserDynamicColumn(req.userId, fieldName, fieldValue)
//     .then((result) => {
//       res.status(StatusCodes.OK).send({
//         status: 1,
//         message: "User Info updated successfully.",
//         user: {
//           id: result.id,
//           username: result.username,
//           userEmail: result.userEmail,
//           isEmailVerified: result.isEmailVerified,
//           name: result.name,
//           phoneNo: result.phoneNo,
//         },
//       });
//     })
//     .catch((error) => {
//       const statusCode = error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;
//       return res.status(statusCode).send({
//         status: -1,
//         message: error.message,
//       });
//     });
// };

// exports.changePassword = (req, res, next) => {
//   const errors = validationResult(req);
//   if (!errors.isEmpty()) {
//     const extractedErrors = {};
//     errors.array().forEach((err) => {
//       extractedErrors[err.param] = err.msg;
//     });

//     return res.status(StatusCodes.BAD_REQUEST).send({
//       status: StatusCodes.BAD_REQUEST,
//       message: "Bad request, entered data is incorrect.",
//       ...extractedErrors,
//     });
//   }

//   const userId = req.body.data.userId;
//   const currentPassword = req.body.data.currentPassword;
//   const newPassword = req.body.data.newPassword;

//   const user = {
//     userId: userId,
//     currentPassword: currentPassword,
//     newPassword: newPassword,
//   };

//   userManager
//     .changePassword(user)
//     .then((result) => {
//       res.status(StatusCodes.OK).send({
//         status: 1,
//         message: "Password updated successfully!",
//       });
//     })
//     .catch((error) => {
//       const statusCode = error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;
//       return res.status(statusCode).send({
//         message: error.message,
//       });
//     });
// };
