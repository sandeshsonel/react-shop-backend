const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
  name: String,
  quantity: {
    type: Number,
    required: true,
    min: [1, 'Quantity can not be less then 1.'],
  },
  price: Number,
  bill: {
    type: Number,
    required: true,
  },
  // date_added: {
  //   type: Date,
  //   default: Date.now,
  // },
});

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Types.ObjectId,
      required: [true],
    },
    items: [itemSchema],
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model('Order', orderSchema);

export default Order;
