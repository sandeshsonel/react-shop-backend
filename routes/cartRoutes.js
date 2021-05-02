const express = require('express');
const cartController = require('../controllers/cartController');
const authController = require('../controllers/authController');
const router = express.Router();

router
  .route('/')
  .all(authController.protect)
  .get(cartController.getCartItems)
  .post(cartController.addCartItem);

router
  .route('/:productId')
  .all(authController.protect)
  .delete(cartController.deleteCartItem)
  .patch(cartController.updateCartItem);

module.exports = router;
