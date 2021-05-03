const mongoose = require('mongoose');
const Cart = require('../models/cartModel');
const User = require('../models/userModel');

const ObjectId = mongoose.Types.ObjectId;

exports.getCartItems = async (req, res, next) => {
  try {
    const cartItems = await Cart.find({ userId: req.user._id });
    if (cartItems.length) {
      res.status(200).json({
        status: '1',
        results: cartItems[0].items.length,
        data: cartItems[0].items,
      });
    } else {
      res.status(200).json({
        status: '1',
        data: [],
        message: 'Your Cart Empty',
      });
    }
  } catch (err) {
    res.status(500).json({
      status: '0',
    });
  }
};

exports.addCartItem = async (req, res, next) => {
  try {
    const user = await Cart.find({ userId: req.user._id });
    if (user.length === 0) {
      const cartItem = new Cart({
        userId: req.user._id,
        items: {
          productId: req.body._id,
          productName: req.body.productName,
          quantity: req.body.quantity,
          size: req.body.selectSize,
          price: req.body.price,
          priceDiscount: req.body.priceDiscount,
          selectSize: req.body.selectSize,
        },
      });
      const result = await cartItem.save();

      res.status(201).json({
        status: '1',
        message: 'Cart Item Added',
        data: result.items,
      });
    } else {
      const result = await Cart.findOneAndUpdate(
        { userId: req.user._id },
        {
          $push: {
            items: {
              productId: req.body._id,
              productName: req.body.productName,
              quantity: req.body.quantity,
              size: req.body.selectSize,
              price: req.body.price,
              price: req.body.price,
              priceDiscount: req.body.priceDiscount,
              selectSize: req.body.selectSize,
            },
          },
        },
        { upsert: true, new: true }
      );

      res.status(201).json({
        status: '1',
        message: 'Cart Item Added',
        data: result.items,
      });
    }
  } catch (err) {
    res.status(500).json({
      status: '0',
      message: err,
    });
  }
};

exports.deleteCartItem = async (req, res, next) => {
  try {
    const result = await Cart.updateOne(
      { userId: req.user._id },
      { $pull: { items: { productId: ObjectId(req.params.productId) } } }
    );
    const cartItem = await Cart.find({ userId: req.user._id });

    res.status(201).json({
      status: '1',
      message: 'Cart item delete successfully',
      data: !cartItem[0].items ? [] : cartItem[0].items,
    });
  } catch (err) {}
};

exports.updateCartItem = (req, res, next) => {
  try {
  } catch (error) {}
};

exports.updateCartItemQuantity = async (req, res, next) => {
  try {
  } catch (error) {}
};
