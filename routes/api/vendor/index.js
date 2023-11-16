const express = require("express");

const { body } = require("express-validator");

const vendorController = require("../../../controllers/vendorController");
const isAuth = require("../../../middleware/is-auth");

const router = express.Router();

router.post(
  "/save-new-vendor",
  [
    body("businessId")
      .trim()
      .notEmpty()
      .withMessage("No bussines id found!")
      .isInt({ gt: 0 })
      .withMessage("No bussines id found!"),
  ],
  isAuth,
  vendorController.saveNewVendor
);

router.get("/get-vendor-list", isAuth, vendorController.getVendorList);

router.get("/get-vendor-by-id", isAuth, vendorController.getVendorById);

router.post(
  "/update-vendor",
  [
    body("businessId")
      .trim()
      .notEmpty()
      .withMessage("No bussines id found!")
      .isInt({ gt: 0 })
      .withMessage("No bussines id found!"),
  ],
  isAuth,
  vendorController.updateVendor
);

router.post("/remove-vendor", isAuth, vendorController.removeVendor);

module.exports = router;
