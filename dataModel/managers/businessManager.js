const { StatusCodes } = require("http-status-codes");
const Business = require("../models/business");
const { sequelize, Sequelize } = require("../../db");

const { genereateJwt, comparePassword } = require("../../utils");

const saveUser = async (business, userId) => {
  const t = await sequelize.transaction();

  try {
    const newBusiness = await Business.create(business);

    await t.commit();
    return newBusiness;
  } catch (e) {
    console.log(e);
    const error = new Error("Unable to create User!");
    error.statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
    throw error;
  }
};

const editUserInfo = async (business, businessId) => {
  try {
    await updateUser(business, businessId);
  } catch (e) {
    const error = new Error("Unable to update User!");
    error.statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
    throw error;
  }
};

const updateUser = async (business, businessId) => {
  business.updatedAt = Sequelize.literal("CURRENT_TIMESTAMP");
  try {
    await Business.update(business, {
      where: { id: businessId },
    });
  } catch (e) {
    const error = new Error(e.message);
    error.statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
    throw error;
  }
};

const getBusinessLogin = async (username, password) => {
  const business = await getUserByUsername(username);
  if (!business) {
    const error = new Error("No Business Found!");
    error.statusCode = StatusCodes.NOT_FOUND;
    throw error;
  }
  const match = await comparePassword(password, business.password);
  console.log(match);
  if (match) {
    const jwtData = { id: business.id, username: business.businessEmail };
    const jwToken = genereateJwt(jwtData);
    return await business.update({ jwToken });
  } else {
    const error = new Error("Invalid Email/Password!");
    error.statusCode = StatusCodes.NOT_FOUND;
    throw error;
  }
};

const getUserByUsername = (username) => {
  return Business.findOne({ where: { businessEmail: username } });
};

module.exports = {
  saveUser,
  editUserInfo,
  getBusinessLogin,
};
