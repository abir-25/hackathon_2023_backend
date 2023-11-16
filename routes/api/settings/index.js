const express = require("express");

const { body } = require("express-validator");

const settingsController = require("../../../controllers/settingsController");
const businessController = require("../../../controllers/businessController");
const isAuth = require("../../../middleware/is-auth");

const router = express.Router();

router.get(
  "/get-lead-status-list",
  isAuth,
  settingsController.getLeadStatusList
);

router.get(
  "/get-deal-status-list",
  isAuth,
  settingsController.getDealStatusList
);

router.get(
  "/get-task-status-list",
  isAuth,
  settingsController.getTaskStatusList
);

router.post(
  "/save-new-lead-status",
  [
    body("businessId")
      .trim()
      .notEmpty()
      .withMessage("No bussines id found!")
      .isInt({ gt: 0 })
      .withMessage("No bussines id found!"),
  ],
  isAuth,
  settingsController.saveLeadStatus
);

router.get(
  "/get-lead-status-by-id",
  isAuth,
  settingsController.getLeadStatusById
);

router.post("/update-lead-status", isAuth, settingsController.updateLeadStatus);

router.post("/remove-lead-status", isAuth, settingsController.removeLeadStatus);

router.post(
  "/save-new-deal-status",
  [
    body("businessId")
      .trim()
      .notEmpty()
      .withMessage("No bussines id found!")
      .isInt({ gt: 0 })
      .withMessage("No bussines id found!"),
  ],
  isAuth,
  settingsController.saveDealStatus
);

router.get(
  "/get-deal-status-by-id",
  isAuth,
  settingsController.getDealStatusById
);

router.post("/update-deal-status", isAuth, settingsController.updateDealStatus);

router.post("/remove-deal-status", isAuth, settingsController.removeDealStatus);

router.post(
  "/save-new-task-status",
  [
    body("businessId")
      .trim()
      .notEmpty()
      .withMessage("No bussines id found!")
      .isInt({ gt: 0 })
      .withMessage("No bussines id found!"),
  ],
  isAuth,
  settingsController.saveTaskStatus
);

router.get(
  "/get-task-status-by-id",
  isAuth,
  settingsController.getTaskStatusById
);

router.post("/update-task-status", isAuth, settingsController.updateTaskStatus);

router.post("/remove-task-status", isAuth, settingsController.removeTaskStatus);

module.exports = router;
