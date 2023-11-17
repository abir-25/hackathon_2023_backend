const { StatusCodes } = require("http-status-codes");
const Business = require("../models/business");
const BusinessOwnerMapper = require("../models/businessOwnerMapper");
const { sequelize, Sequelize } = require("../../db");

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

module.exports = {
  saveUser,
  editUserInfo,
};
