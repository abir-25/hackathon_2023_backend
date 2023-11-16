const dotenv = require("dotenv");
dotenv.config();

module.exports = {
  database: process.env.DB_DATABASE,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  dialect: process.env.DB_DIALECT,
  migrationStorageTableName: "sequelizeMeta",
  rootUrl: process.env.ROOT_URL,
};
