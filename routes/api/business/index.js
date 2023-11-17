const express = require("express");

const { body } = require("express-validator");

const businessController = require("../../../controllers/businessController");
const isAuth = require("../../../middleware/is-auth");

const router = express.Router();

// router.post(
//   "/save-new-business",
//   isAuth,
//   [
//     body("businessName")
//       .trim()
//       .isLength({ min: 3 })
//       .withMessage("Business Name must be at least 5 characters"),
//     body("streetAddress")
//       .trim()
//       .isLength({ min: 5 })
//       .withMessage("Street Address must be at least 5 characters"),
//   ],
//   businessController.createBusiness
// );

// router.get("/get-currency-list", isAuth, businessController.getCurrencyList);

// router.get("/get-timezone-list", isAuth, businessController.getTimezoneList);

// router.get(
//   "/get-dateformat-list",
//   isAuth,
//   businessController.getDateFormatList
// );

router.get("/get-business-info", businessController.getBusinessInfo);

// router.post(
//   "/update-business-info",
//   isAuth,
//   businessController.updateBusinessInfo
// );

// router.post(
//   "/update-business-invoice-info",
//   isAuth,
//   businessController.updateBusinessInvoiceInfo
// );

// router.post(
//   "/update-business-quotation-info",
//   isAuth,
//   businessController.updateBusinessQuotationInfo
// );

// router.post(
//   "/update-business-bill-info",
//   isAuth,
//   businessController.updateBusinessBillInfo
// );

// router.post(
//   "/update-business-configuration",
//   isAuth,
//   businessController.updateBusinessConfiguration
// );

// router.get(
//   "/get-business-info-for-invoice",
//   isAuth,
//   businessController.getBusinessInfoForInvoice
// );

// router.get(
//   "/get-business-info-for-quotation",
//   isAuth,
//   businessController.getBusinessInfoForQuotation
// );

// router.get(
//   "/get-business-info-for-bill",
//   isAuth,
//   businessController.getBusinessInfoForBill
// );

module.exports = router;
