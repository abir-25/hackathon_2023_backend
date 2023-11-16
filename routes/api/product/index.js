const express = require("express");

const { body } = require("express-validator");

const productController = require("../../../controllers/productController");
const invoiceController = require("../../../controllers/invoiceController");
const isAuth = require("../../../middleware/is-auth");

const router = express.Router();

router.post(
  "/save-new-product",
  isAuth,
  [
    body("name")
      .trim()
      .isLength({ min: 3 })
      .withMessage("Name must be at least 3 characters"),
    body("price")
      .trim()
      .notEmpty()
      .isFloat({ min: 0.1 })
      .withMessage("Price must be more than 0"),
  ],
  productController.saveNewProduct
);

router.get(
  "/get-unit-type-n-uom-list",
  isAuth,
  productController.getUnitTypeAndUomList
);

router.get("/get-uom-list", isAuth, productController.getUomList);

router.get("/get-product-list", isAuth, productController.getProdcutList);

router.get("/get-product-by-id", isAuth, productController.getProdcutById);

router.post(
  "/update-product",
  isAuth,
  [
    body("name")
      .trim()
      .isLength({ min: 3 })
      .withMessage("Name must be at least 3 characters"),
    body("price")
      .trim()
      .notEmpty()
      .isFloat({ min: 0.1 })
      .withMessage("Price must be more than 0"),
  ],
  productController.updateProduct
);

router.post("/remove-product", isAuth, productController.removeProduct);

router.get(
  "/get-product-details-by-id",
  isAuth,
  productController.getProdcutDetailsById
);

router.get(
  "/get-invoice-list-by-product-id",
  isAuth,
  invoiceController.getPaymentListByProductId
);

router.get("/get-unit-type-list", isAuth, productController.getUnitTypeList);

router.post(
  "/get-unit-type-list-by-type-id",
  isAuth,
  productController.getUnitTypeListByTypeId
);

router.get(
  "/get-all-unit-type-n-uom-list",
  isAuth,
  productController.getAllUnitTypeAndUomList
);

router.get("/get-tag-list", isAuth, productController.getTagList);

router.post(
  "/save-new-tag",
  [
    body("businessId")
      .trim()
      .notEmpty()
      .withMessage("No bussines id found!")
      .isInt({ gt: 0 })
      .withMessage("No bussines id found!"),
  ],
  isAuth,
  productController.saveTag
);

router.get("/get-tag-by-id", isAuth, productController.getTagById);

router.post("/update-tag", isAuth, productController.updateTag);

router.post("/remove-tag", isAuth, productController.removeTag);

module.exports = router;
