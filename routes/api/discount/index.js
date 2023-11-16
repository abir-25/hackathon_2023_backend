const express = require("express");

const { body } = require("express-validator");

const discountController = require("../../../controllers/discountController");
const isAuth = require("../../../middleware/is-auth");

const router = express.Router();

router.post(
  "/save-new-discount",
  [
    body("businessId")
      .trim()
      .notEmpty()
      .withMessage("No bussines id found!")
      .isInt({ gt: 0 })
      .withMessage("No bussines id found!"),
  ],
  isAuth,
  discountController.saveNewDiscount
);

router.get("/get-discount-list", isAuth, discountController.getDiscountList);

router.get("/get-discount-by-id", isAuth, discountController.getDiscountById);

router.post(
  "/update-discount",
  [
    body("businessId")
      .trim()
      .notEmpty()
      .withMessage("No bussines id found!")
      .isInt({ gt: 0 })
      .withMessage("No bussines id found!"),
  ],
  isAuth,
  discountController.updateDiscount
);

router.post("/remove-discount", isAuth, discountController.removeDiscount);

module.exports = router;
