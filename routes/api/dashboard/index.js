const express = require("express");

const dashboardController = require("../../../controllers/dashboardController");
const isAuth = require("../../../middleware/is-auth");

const router = express.Router();

router.get("/", isAuth, dashboardController.getDashboardData);

router.get(
  "/get-sales-expense-data-for-graph",
  isAuth,
  dashboardController.getSalesExpenseDataForGraph
);

router.get(
  "/get-cash-cost-data-for-graph",
  isAuth,
  dashboardController.getCashCostDataForGraph
);

module.exports = router;
