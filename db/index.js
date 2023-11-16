const { Sequelize, Model, QueryTypes } = require("sequelize");

const {
  database,
  username,
  password,
  host,
  dialect,
} = require("../configs/config");

const sequelize = new Sequelize(database, username, password, {
  host: host,
  dialect: dialect,
});

module.exports = { Sequelize, Model, QueryTypes, sequelize };
