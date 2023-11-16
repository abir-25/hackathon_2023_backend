const express = require("express");

const { body } = require("express-validator");

const billController = require("../../../controllers/billController");
const billPaymentController = require("../../../controllers/billPaymentController");

const isAuth = require("../../../middleware/is-auth");

const router = express.Router();

router.post(
  "/save-new-bill",
  [
    body("businessId")
      .trim()
      .notEmpty()
      .withMessage("No bussines id found!")
      .isInt({ gt: 0 })
      .withMessage("No bussines id found!"),
  ],
  isAuth,
  billController.saveNewBill
);

router.get("/get-bill-list", isAuth, billController.getBillList);

router.get("/get-bill", isAuth, billController.getBillByBillId);

router.post("/send-bill-email", isAuth, billController.sendBillEmail);

router.post("/remove-bill", isAuth, billController.removeBill);

router.get(
  "/get-bill-info-for-edit",
  isAuth,
  billController.getBillInfoForEdit
);

router.post(
  "/update-bill",
  [
    body("businessId")
      .trim()
      .notEmpty()
      .withMessage("No bussines id found!")
      .isInt({ gt: 0 })
      .withMessage("No bussines id found!"),
  ],
  isAuth,
  billController.updateBill
);

router.post(
  "/update-bill-publish-status",
  isAuth,
  billController.updateBillPublishStatus
);

router.get("/get-payment-list", isAuth, billPaymentController.getPaymentList);

router.get(
  "/get-bill-list-by-vendor-id",
  isAuth,
  billController.getBillListByUserId
);

router.post(
  "/save-new-payment",
  [
    body("businessId")
      .trim()
      .notEmpty()
      .withMessage("No bussines id found!")
      .isInt({ gt: 0 })
      .withMessage("No bussines id found!"),
  ],
  isAuth,
  billPaymentController.saveNewPayment
);

router.get(
  "/get-next-payment-number",
  isAuth,
  billPaymentController.getNextPaymentNumber
);

router.get(
  "/get-payment-list-by-bill-id",
  isAuth,
  billPaymentController.getPaymentListByBillId
);

router.get(
  "/get-bill-info-for-duplicate",
  isAuth,
  billController.getBillInfoForDuplicate
);

router.get(
  "/get-all-bill-by-vendor-id",
  isAuth,
  billController.getAllBillByVendorId
);

router.get(
  "/get-payment-list-by-vendor-id",
  isAuth,
  billPaymentController.getPaymentListByVendorId
);

router.get(
  "/get-payment-details-by-payment-id",
  isAuth,
  billPaymentController.getPaymentDetailsByPaymentId
);

module.exports = router;
