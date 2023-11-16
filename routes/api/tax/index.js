const express = require("express");

const { body } = require("express-validator");

const taxController = require("../../../controllers/taxController");
const isAuth = require("../../../middleware/is-auth");

const router = express.Router();

router.post(
  "/save-new-tax",
  [
    body("businessId")
      .trim()
      .notEmpty()
      .withMessage("No bussines id found!")
      .isInt({ gt: 0 })
      .withMessage("No bussines id found!"),
  ],
  isAuth,
  taxController.saveNewTax
);

router.get("/get-tax-list", isAuth, taxController.getTaxList);

router.get("/get-tax-by-id", isAuth, taxController.getTaxById);

router.post(
  "/update-tax",
  [
    body("businessId")
      .trim()
      .notEmpty()
      .withMessage("No bussines id found!")
      .isInt({ gt: 0 })
      .withMessage("No bussines id found!"),
  ],
  isAuth,
  taxController.updateTax
);

router.post("/remove-tax", isAuth, taxController.removeTax);


module.exports = router;