const { QueryTypes, sequelize } = require("../../db");

exports.executeQueryDataReturnWithParameter = async (query, params) => {
  return await sequelize.query(query, {
    replacements: params,
    type: QueryTypes.SELECT,
  });
};

exports.executeUpdateQuery = async (query, params) => {
  return await sequelize.query(query, {
    replacements: params,
    type: QueryTypes.UPDATE,
  });
};
