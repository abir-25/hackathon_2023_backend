const User = require("../models/user");
const { StatusCodes } = require("http-status-codes");
const MailManager = require("./mailManager");
const BusinessManager = require("./businessManager");

const {
  genereateHash,
  genereateJwt,
  genereateEmailVerifiTokenAndHashUrl,
  comparePassword,
  genereateEmailVerifyHashUrl,
  genereatePasswordRecoveryHashUrl,
  genereatePasswordRecoveryTokenAndHashUrl,
} = require("../../utils");
const { Sequelize } = require("sequelize");

exports.createUser = async (user) => {
  const isExisting = await getUserByUsername(user.username);
  if (isExisting) {
    const error = new Error("Email already exists!");
    error.statusCode = StatusCodes.CONFLICT;
    error.email = "Email already exists!";
    throw error;
  }

  const hashPassword = await genereateHash(user.password);
  user.password = hashPassword;

  try {
    const newUser = await User.create(user);
    const jwtData = { id: newUser.id, username: newUser.username };
    const jwToken = genereateJwt(jwtData);
    return await newUser.update({ jwToken });
  } catch (e) {
    const error = new Error("Unable to register user!");
    error.statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
    throw error;
  }
};

exports.sendVerificationEmailToUser = async (user) => {
  const { emailVerifyToken, hashUrl } =
    await genereateEmailVerifiTokenAndHashUrl(user);
  await user.update({ emailVerifyToken });
  sendVerificationMailToUser(user.username, hashUrl);
};

exports.emailVerificationUser = async (verificationToken) => {
  const user = await User.findOne({
    where: { emailVerifyToken: verificationToken },
  });
  if (!user) {
    const error = new Error("No User Found!");
    error.statusCode = StatusCodes.NOT_FOUND;
    throw error;
  }

  let status = 1;
  let message = "Your account has been verified successfully.";
  if (user.isEmailVerified) {
    status = 2;
    message = "You have already verified your account.";
  } else {
    await user.update({ isEmailVerified: true }); //, emailVerifyToken: null
  }
  const jwtData = { id: user.id, email: user.username };
  const jwToken = genereateJwt(jwtData);
  await user.update({ jwToken });
  return {
    status,
    message,
    token: jwToken,
    user: {
      id: user.id,
      username: user.username,
      userEmail: user.userEmail,
      isEmailVerified: user.isEmailVerified,
      name: user.name,
      phoneNo: user.phoneNo,
    },
  };
};

exports.userLogin = async (username, password) => {
  const user = await getUserByUsername(username);
  if (!user) {
    const error = new Error("No User Found!");
    error.statusCode = StatusCodes.NOT_FOUND;
    throw error;
  }
  const match = await comparePassword(password, user.password);
  if (match) {
    const jwtData = { id: user.id, username: user.username };
    const jwToken = genereateJwt(jwtData);
    return await user.update({ jwToken });
  } else {
    const error = new Error("Invalid Email/Password!");
    error.statusCode = StatusCodes.NOT_FOUND;
    throw error;
  }
};

const getUserByUsername = (username) => {
  return User.findOne({ where: { username: username } });
};

const verifyResetPasswordToken = (token) => {
  return User.findOne({ where: { resetPasswordToken: token } });
};

exports.updateUserDynamicColumn = async (userId, fieldName, fieldValue) => {
  const user = await getUserByUserId(userId);
  if (!user) {
    const error = new Error("No User Found!");
    error.statusCode = StatusCodes.NOT_FOUND;
    throw error;
  }
  user[fieldName] = fieldValue;
  return await user.save();
};

const getUserByUserId = (userId) => {
  return User.findByPk(userId);
};

exports.resendVerifyEmail = async (userId) => {
  const user = await getUserByUserId(userId);
  if (!user) {
    const error = new Error("No User Found!");
    error.statusCode = StatusCodes.NOT_FOUND;
    throw error;
  }
  let emailVerifyToken;
  let hashUrl;
  if (user.emailVerifyToken) {
    emailVerifyToken = user.emailVerifyToken;
    hashUrl = genereateEmailVerifyHashUrl(emailVerifyToken);
  } else {
    const result = await genereateEmailVerifiTokenAndHashUrl(user);
    emailVerifyToken = result.emailVerifyToken;
    hashUrl = result.hashUrl;
  }

  await user.update({ emailVerifyToken });

  sendVerificationMailToUser(user.username, hashUrl);

  return true;
};

const sendVerificationMailToUser = (receipentsEmail, hashUrl) => {
  const mailManager = new MailManager();
  mailManager.sendEmailVerificationMail(receipentsEmail, hashUrl);
};

exports.passwordRecoveryEmail = async (username) => {
  const user = await getUserByUsername(username);

  if (!user) {
    const error = new Error("No User Found!");
    error.statusCode = StatusCodes.NOT_FOUND;
    throw error;
  }

  let resetPasswordToken;
  let hashUrl;
  if (user.resetPasswordToken) {
    resetPasswordToken = user.resetPasswordToken;
    hashUrl = genereatePasswordRecoveryHashUrl(resetPasswordToken);
  } else {
    const result = await genereatePasswordRecoveryTokenAndHashUrl(user);
    resetPasswordToken = result.resetPasswordToken;
    hashUrl = result.hashUrl;
  }

  await user.update({ resetPasswordToken });

  sendRecoveryPasswordMailToUser(user.username, hashUrl);

  return true;
};

const sendRecoveryPasswordMailToUser = (receipentsEmail, hashUrl) => {
  const mailManager = new MailManager();
  mailManager.sendPasswordRecoveryMail(receipentsEmail, hashUrl);
};

exports.resetPassword = async (token, password) => {
  const hashPassword = await genereateHash(password);
  try {
    await updateUserPassword(token, hashPassword);
  } catch (e) {
    console.log(e);
    const error = new Error("Unable to update Password!");
    error.statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
    throw error;
  }
  return true;
};

const updateUserPassword = async (token, password) => {
  let user = {
    resetPasswordToken: "",
    updatedAt: Sequelize.literal("CURRENT_TIMESTAMP"),
    password: password,
  };
  try {
    await User.update(user, {
      where: { resetPasswordToken: token },
    });
  } catch (e) {
    const error = new Error(e.message);
    error.statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
    throw error;
  }
};

exports.getUserInfoByUserId = async (userId) => {
  const user = await getUserByUserId(userId);
  if (!user) {
    const error = new Error("No User Found!");
    error.statusCode = StatusCodes.NOT_FOUND;
    throw error;
  }
  const businessList = await BusinessManager.getBusinessListByUserId(userId);
  if (businessList) {
    user.businessList = businessList;
  }

  return user;
};

exports.getUserInfoByUsername = async (username) => {
  const user = await getUserByUsername(username);
  if (!user) {
    const error = new Error("No User Found!");
    error.statusCode = StatusCodes.NOT_FOUND;
    throw error;
  }
  return user;
};

exports.verifyResetPasswordToken = async (token) => {
  const user = await verifyResetPasswordToken(token);
  if (!user) {
    const error = new Error("Passsword already reset");
    error.statusCode = StatusCodes.NOT_FOUND;
    throw error;
  }
  return user;
};

exports.supportLogin = async (username, password) => {
  const user = await getUserByUsername(username);
  if (user) {
    const match = await comparePassword(password, user.password);
    if (match) {
      const userInfo = {
        userId: user.id,
        name: user.name,
        username: user.username,
        businessList: [],
      };
      const businessList = await BusinessManager.getBusinessListByUserId(
        user.id
      );
      if (businessList) {
        userInfo.businessList = businessList;
      }
      return [userInfo];
    }
  }
  return [];
};

exports.changePassword = async (user) => {
  const password = await checkCurrentPassword(user);
  if (!password.isSuccess) {
    const error = new Error("Old password is incorrect");
    error.statusCode = StatusCodes.CONFLICT;
    error.message = "Old password is incorrect";
    throw error;
  }

  try {
    User.findByPk(user.userId).then(function (userData) {
      userData.password = password.hashPassword;
      userData.save();
    });
  } catch (e) {
    const error = new Error("Unable to register user!");
    error.statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
    throw error;
  }
};

const checkCurrentPassword = async (user) => {
  const userData = await getUserByUserId(user.userId);
  const oldPassword = userData.dataValues.password;

  const match = await comparePassword(user.currentPassword, oldPassword);
  const newHashPassword = await genereateHash(user.newPassword);

  if (match) {
    return { isSuccess: true, hashPassword: newHashPassword };
  } else {
    return { isSuccess: false };
  }
};
