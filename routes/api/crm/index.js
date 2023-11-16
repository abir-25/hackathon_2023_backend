const express = require("express");

const { body } = require("express-validator");

const crmController = require("../../../controllers/crmController");
const isAuth = require("../../../middleware/is-auth");

const router = express.Router();

router.post(
  "/save-new-customer",
  [
    body("businessId")
      .trim()
      .notEmpty()
      .withMessage("No bussines id found!")
      .isInt({ gt: 0 })
      .withMessage("No bussines id found!"),
  ],
  isAuth,
  crmController.saveNewCustomer
);

router.get("/get-customer-list", isAuth, crmController.getCustomerList);

router.get("/get-customer-by-id", isAuth, crmController.getCustomerById);

router.post(
  "/update-customer",
  [
    body("businessId")
      .trim()
      .notEmpty()
      .withMessage("No bussines id found!")
      .isInt({ gt: 0 })
      .withMessage("No bussines id found!"),
  ],
  isAuth,
  crmController.updateCustomer
);

router.post("/remove-customer", isAuth, crmController.removeCustomer);

router.post(
  "/save-new-contact-person",
  [
    body("businessId")
      .trim()
      .notEmpty()
      .withMessage("No bussines id found!")
      .isInt({ gt: 0 })
      .withMessage("No bussines id found!"),
  ],
  isAuth,
  crmController.saveNewContactPerson
);

router.get(
  "/get-contact-person-list",
  isAuth,
  crmController.getContactPersonList
);

router.get(
  "/get-contact-person-by-id",
  isAuth,
  crmController.getContactPersonById
);

router.post(
  "/update-contact-person",
  [
    body("businessId")
      .trim()
      .notEmpty()
      .withMessage("No bussines id found!")
      .isInt({ gt: 0 })
      .withMessage("No bussines id found!"),
  ],
  isAuth,
  crmController.updateContactPerson
);

router.post(
  "/remove-contact-person",
  isAuth,
  crmController.removeContactPerson
);

router.get(
  "/get-note-list-by-customer",
  isAuth,
  crmController.getNoteListByCustomer
);

router.post(
  "/save-new-customer-note",
  [
    body("customerId")
      .trim()
      .notEmpty()
      .withMessage("No customer id found!")
      .isInt({ gt: 0 })
      .withMessage("No customer id found!"),
  ],
  isAuth,
  crmController.saveNewCustomerNote
);

router.post("/update-customer-note", isAuth, crmController.updateCustomerNote);

router.post("/remove-customer-note", isAuth, crmController.removeCustomerNote);

router.get(
  "/get-call-log-list-by-customer",
  isAuth,
  crmController.getCallLogListByCustomer
);

router.post(
  "/save-new-customer-call-log",
  [
    body("customerId")
      .trim()
      .notEmpty()
      .withMessage("No customer id found!")
      .isInt({ gt: 0 })
      .withMessage("No customer id found!"),
  ],
  isAuth,
  crmController.saveNewCustomerCallLog
);

router.post(
  "/update-customer-call-log",
  isAuth,
  crmController.updateCustomerCallLog
);

router.post(
  "/remove-customer-call-log",
  isAuth,
  crmController.removeCustomerCallLog
);

router.post(
  "/convert-lead-to-client",
  isAuth,
  crmController.convertLeadToClient
);

router.post("/send-customer-email", isAuth, crmController.sendCustomerEmail);

module.exports = router;
