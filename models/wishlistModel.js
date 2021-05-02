const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Types.ObjectId,
  },
  productName: String,
  quantity: {
    type: Number,
    // required: true,
    min: [1, 'Quantity can not be less then 1.'],
    deafult: 1,
  },
  size: {
    type: String,
    // required: true,
  },
  price: Number,
  bill: {
    type: Number,
    // required: true,
    default: 0,
  },
});

const wishListSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Types.ObjectId,
    required: [true],
  },
  items: [itemSchema],
});

const Wishlist = mongoose.model('Wishlist', wishListSchema);

module.exports = Wishlist;
