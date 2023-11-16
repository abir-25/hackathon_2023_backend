const express = require("express");

const locationController = require("../../../controllers/locationController");
const isAuth = require("../../../middleware/is-auth");
const router = express.Router();

router.get(
  "/get-country-state-district-list",
  isAuth,
  locationController.getCountryStateDistrictList
);

router.get("/get-country-list", isAuth, locationController.getCountryList);

router.get("/get-state-list", isAuth, locationController.getStateList);

router.get("/get-district-list", isAuth, locationController.getDistrictList);

module.exports = router;
