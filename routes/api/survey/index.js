const express = require("express");

const { body } = require("express-validator");

const surveyController = require("../../../controllers/surveyController");
const isAuth = require("../../../middleware/is-auth");

const router = express.Router();

router.post(
  "/create",
  [
    body("businessId")
      .trim()
      .notEmpty()
      .withMessage("No bussines id found!")
      .isInt({ gt: 0 })
      .withMessage("No bussines id found!"),
  ],
  isAuth,
  surveyController.saveNewSurvey
);

router.get("/get-survey-list", isAuth, surveyController.getSurveyList);

router.get("/get-survey-by-id", surveyController.getSurveyById);

router.post("/create-response", surveyController.saveNewResponse);

// router.post(
//   "/update-customer",
//   [
//     body("businessId")
//       .trim()
//       .notEmpty()
//       .withMessage("No bussines id found!")
//       .isInt({ gt: 0 })
//       .withMessage("No bussines id found!"),
//   ],
//   isAuth,
//   crmController.updateCustomer
// );

router.post("/remove", isAuth, surveyController.removeSurvey);

module.exports = router;
