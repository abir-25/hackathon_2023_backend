const express = require("express");

const router = express.Router();

// const accountRouter = require("./account");
// const locationRouter = require("./location");
const businessRouter = require("./business");
// const productRouter = require("./product");
// const invoiceRouter = require("./invoice");
// const adminRouter = require("./admin");
const surveyRouter = require("./survey");
// const dashboardRouter = require("./dashboard");
// const supportRouter = require("./support");
// const quotationRouter = require("./quotation");
// const vendorRouter = require("./vendor");
// const discountRouter = require("./discount");
// const shippingRouter = require("./shipping");
// const billRouter = require("./bill");
// const taxRouter = require("./tax");
// const settingsRouter = require("./settings");

// router.use("/account", accountRouter);
// router.use("/location", locationRouter);
router.use("/business", businessRouter);
// router.use("/product", productRouter);
// router.use("/invoice", invoiceRouter);
// router.use("/admin", adminRouter);
router.use("/survey", surveyRouter);
// router.use("/dashboard", dashboardRouter);
// router.use("/support", supportRouter);
// router.use("/quotation", quotationRouter);
// router.use("/vendor", vendorRouter);
// router.use("/discount", discountRouter);
// router.use("/shipping", shippingRouter);
// router.use("/bill", billRouter);
// router.use("/tax", taxRouter);
// router.use("/settings", settingsRouter);

module.exports = router;
