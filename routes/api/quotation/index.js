const express = require("express");

const { body } = require("express-validator");

const quotationController = require("../../../controllers/quotationController");

const isAuth = require("../../../middleware/is-auth");

const router = express.Router();

router.post(
  "/save-new-quotation",
  [
    body("businessId")
      .trim()
      .notEmpty()
      .withMessage("No bussines id found!")
      .isInt({ gt: 0 })
      .withMessage("No bussines id found!"),
  ],
  isAuth,
  quotationController.saveNewQuotation
);

router.get("/get-quotation-list", isAuth, quotationController.getQuotationList);

router.get(
  "/get-quotation",
  isAuth,
  quotationController.getQuotationByQuotationId
);

router.post(
  "/send-quotation-email",
  isAuth,
  quotationController.sendQuotationEmail
);

router.post("/remove-quotation", isAuth, quotationController.removeQuotation);

router.get(
  "/get-quotation-info-for-edit",
  isAuth,
  quotationController.getQuotationInfoForEdit
);

router.post(
  "/update-quotation",
  [
    body("businessId")
      .trim()
      .notEmpty()
      .withMessage("No bussines id found!")
      .isInt({ gt: 0 })
      .withMessage("No bussines id found!"),
  ],
  isAuth,
  quotationController.updateQuotation
);

router.get(
  "/get-quotation-list-by-customer-id",
  isAuth,
  quotationController.getQuotationListByUserId
);

router.get(
  "/get-quotation-info-for-duplicate",
  isAuth,
  quotationController.getQuotationInfoForDuplicate
);

router.get(
  "/get-all-quotation-by-customer-id",
  isAuth,
  quotationController.getAllQuotationByCustomerId
);

module.exports = router;
