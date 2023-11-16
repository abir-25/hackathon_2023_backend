const express = require("express");

const { body } = require("express-validator");

const shippingController = require("../../../controllers/shippingController");
const isAuth = require("../../../middleware/is-auth");

const router = express.Router();

router.post(
  "/save-new-shipping",
  [
    body("businessId")
      .trim()
      .notEmpty()
      .withMessage("No bussines id found!")
      .isInt({ gt: 0 })
      .withMessage("No bussines id found!"),
  ],
  isAuth,
  shippingController.saveNewShipping
);

router.get("/get-shipping-list", isAuth, shippingController.getShippingList);

router.get("/get-shipping-by-id", isAuth, shippingController.getShippingById);

router.post(
  "/update-shipping",
  [
    body("businessId")
      .trim()
      .notEmpty()
      .withMessage("No bussines id found!")
      .isInt({ gt: 0 })
      .withMessage("No bussines id found!"),
  ],
  isAuth,
  shippingController.updateShipping
);

router.post("/remove-shipping", isAuth, shippingController.removeShipping);

module.exports = router;