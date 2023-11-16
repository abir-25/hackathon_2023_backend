const express = require("express");

const { body } = require("express-validator");

const adminController = require("../../../controllers/adminController");

const router = express.Router();

router.post(
  "/login",
  [
    body("email")
      .isEmail()
      .withMessage("Please enter a valid email")
      .normalizeEmail({ gmail_remove_dots: false }),
    body("password")
      .trim()
      .not()
      .isEmpty()
      .withMessage("Password can't be empty"),
  ],
  adminController.login
);

module.exports = router;
