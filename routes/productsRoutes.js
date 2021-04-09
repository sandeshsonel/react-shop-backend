const express = require("express");
const router = express.Router();

const productController = require("../controllers/productController");

router
  .route("/")
  .get(productController.getAllProducts)
  .post(productController.uploadProductImage, productController.resizeProductImage, productController.createProduct);

router.route("/:id").get(productController.getProduct).patch(productController.updateProduct).delete(productController.deleteProduct);

module.exports = router;
