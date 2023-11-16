const { validationResult } = require("express-validator");
const { StatusCodes } = require("http-status-codes");
const jwt = require("jsonwebtoken");

exports.login = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(StatusCodes.BAD_REQUEST).send({
      status: StatusCodes.BAD_REQUEST,
      message: "Bad request, entered data is incorrect.",
      errors: errors.array(),
    });
  }

  const email = req.body.email;
  const password = req.body.password;

  return res.status(StatusCodes.OK).send({
    status: StatusCodes.OK,
    message: "Admin logged in successfully.",
    email: email,
    password: password,
  });
};
