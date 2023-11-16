const express = require("express");

const supportController = require("../../../controllers/supportController");
const router = express.Router();

router.post("/login", supportController.login);

module.exports = router;
