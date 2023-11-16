const express = require("express");

const { body } = require("express-validator");

const invoiceController = require("../../../controllers/invoiceController");
const paymentController = require("../../../controllers/paymentController");

const isAuth = require("../../../middleware/is-auth");

const router = express.Router();

router.post(
  "/save-new-invoice",
  [
    body("businessId")
      .trim()
      .notEmpty()
      .withMessage("No bussines id found!")
      .isInt({ gt: 0 })
      .withMessage("No bussines id found!"),
  ],
  isAuth,
  invoiceController.saveNewInvoice
);

router.get("/get-invoice-list", isAuth, invoiceController.getInvoiceList);

router.get("/get-invoice", isAuth, invoiceController.getInvoiceByInvoiceId);

router.post("/send-invoice-email", isAuth, invoiceController.sendInvoiceEmail);

router.post("/remove-invoice", isAuth, invoiceController.removeInvoice);

router.get(
  "/get-invoice-info-for-edit",
  isAuth,
  invoiceController.getInvoiceInfoForEdit
);

router.post(
  "/update-invoice",
  [
    body("businessId")
      .trim()
      .notEmpty()
      .withMessage("No bussines id found!")
      .isInt({ gt: 0 })
      .withMessage("No bussines id found!"),
  ],
  isAuth,
  invoiceController.updateInvoice
);

router.post(
  "/update-invoice-publish-status",
  isAuth,
  invoiceController.updateInvoicePublishStatus
);

router.get("/get-payment-list", isAuth, paymentController.getPaymentList);

router.get(
  "/get-invoice-list-by-customer-id",
  isAuth,
  invoiceController.getInvoiceListByUserId
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
  paymentController.saveNewPayment
);

router.get(
  "/get-next-payment-number",
  isAuth,
  paymentController.getNextPaymentNumber
);

router.get(
  "/get-payment-list-by-invoice-id",
  isAuth,
  paymentController.getPaymentListByInvoiceId
);

router.get(
  "/get-invoice-info-for-duplicate",
  isAuth,
  invoiceController.getInvoiceInfoForDuplicate
);

router.get(
  "/get-all-invoice-by-customer-id",
  isAuth,
  invoiceController.getAllInvoiceByCustomerId
);

router.get(
  "/get-payment-list-by-customer-id",
  isAuth,
  paymentController.getPaymentListByCustomerId
);

router.get(
  "/get-payment-details-by-payment-id",
  isAuth,
  paymentController.getPaymentDetailsByPaymentId
);

router.post(
  "/send-payment-receipt-mail",
  [
    body("businessId")
      .trim()
      .notEmpty()
      .withMessage("No bussines id found!")
      .isInt({ gt: 0 })
      .withMessage("No bussines id found!"),
  ],
  isAuth,
  paymentController.sendPaymentReceiptMail
);

router.get(
  "/get-next-invoice-number",
  isAuth,
  invoiceController.getNextInvoiceNo
);

router.get(
  "/get-contact-person-list-by-invoice-id",
  isAuth,
  invoiceController.getContactPersonByInvoiceId
);

module.exports = router;
