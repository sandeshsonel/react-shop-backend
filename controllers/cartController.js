const mongoose = require('mongoose');
const Cart = require('../models/cartModel');
const User = require('../models/userModel');

const ObjectId = mongoose.Types.ObjectId;

exports.getCartItems = async (req, res, next) => {
  try {
    console.log('xoxo-user', req.user);
    const cartItems = await Cart.find({ userId: req.user._id });
    console.log(cartItems);
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
    console.log('cartitem', cartItems);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: '0',
    });
  }
};

exports.addCartItem = async (req, res, next) => {
  try {
    console.log('xoxo', req.body);
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
    console.log(err);
    res.status(500).json({
      status: '0',
      message: err,
    });
  }
};

exports.deleteCartItem = async (req, res, next) => {
  try {
    console.log('xoox-user', req.user);
    console.log('xoxo', req.params);
    const result = await Cart.updateOne(
      { userId: req.user._id },
      { $pull: { items: { productId: ObjectId(req.params.productId) } } }
    );
    console.log(result);
    const cartItem = await Cart.find({ userId: req.user._id });
    console.log('xoxo', cartItem, cartItem[0].items);
    res.status(201).json({
      status: '1',
      message: 'Cart item delete successfully',
      data: !cartItem[0].items ? [] : cartItem[0].items,
    });
  } catch (err) {
    console.log('xoxo-delete', err);
  }
};

exports.updateCartItem = (req, res, next) => {
  try {
  } catch (error) {}
};

exports.updateCartItemQuantity = async (req, res, next) => {
  try {
  } catch (error) {}
};
