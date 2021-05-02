const express = require('express');
const router = express.Router();

const authController = require('../controllers/authController');
const productController = require('../controllers/productController');

router
  .route('/')
  .get(productController.getAllProducts)
  .post(
    productController.uploadProductImage,
    productController.resizeProductImage,
    productController.createProduct
  );

router.route('/:gender/:category').get(productController.getProductByQuery);

router
  .route('/:id')
  .get(productController.getProduct)
  .patch(productController.updateProduct)
  .delete(productController.deleteProduct);

module.exports = router;
