const express = require("express");

const { body } = require("express-validator");

const accountController = require("../../../controllers/accountController");
const isAuth = require("../../../middleware/is-auth");
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
  accountController.login
);

router.post(
  "/register",
  [
    body("email")
      .isEmail()
      .withMessage("Please enter a valid email")
      .normalizeEmail({ gmail_remove_dots: false }),
    body("password")
      .trim()
      .isLength({ min: 5 })
      .withMessage("password must be at least 5 characters"),
  ],
  accountController.register
);

router.post("/email-verify", accountController.emailVerification);

router.post(
  "/resend-verify-email",
  isAuth,
  accountController.resendVerifyEmail
);

router.get("/get-user-info", isAuth, accountController.getUserInfo);

router.get(
  "/get-user-info-by-username",
  accountController.getUserInfoByUsername
);

router.patch("/update-user-info", isAuth, accountController.updateUserInfo);

router.post(
  "/password-recovery-email",
  accountController.passwordRecoveryEmail
);

router.get(
  "/verify-reset-password-token",
  accountController.verifyResetPasswordToken
);

router.post("/reset-password", accountController.resetPassword);

router.post("/change-password", accountController.changePassword);

module.exports = router;
