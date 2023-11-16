const jwt = require("jsonwebtoken");
const { StatusCodes } = require("http-status-codes");
const { verifyJwt } = require("../utils");

module.exports = (req, res, next) => {
  console.log("Middleware");
  const authHeader = req.get("Authorization");
  if (!authHeader) {
    const error = new Error("Not authenticated!");
    error.statusCode = StatusCodes.UNAUTHORIZED;
    throw error;
  }

  const token = authHeader.split(" ")[1];
  try {
    const decodeToken = verifyJwt(token);
    req.userId = decodeToken.id;
    next();
  } catch (err) {
    err.statusCode = StatusCodes.UNAUTHORIZED;
    throw err;
  }
};
