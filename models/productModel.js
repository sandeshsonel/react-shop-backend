const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      min: 0,
      max: 5,
    },
  },
  {
    timestamps: true,
  }
);

// const productDetails = new mongoose.Schema({
//   description: {
//     type: String,
//     required: true,
//   },

// });

const productSchema = new mongoose.Schema({
  productName: {
    type: String,
    required: [true, 'A product must have a name'],
    trim: true,
  },
  description: {
    type: String,
    required: true,
  },
  productDetails: [
    {
      title: String,
      description: String,
    },
  ],
  // productNo: {
  //   type: Number,
  //   required: true
  // },
  category: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    // default: null,
    // required: [true, "A product must have a one image"],
  },
  price: {
    type: Number,
    required: [true, 'A product must have a price'],
  },
  priceDiscount: Number,
  discountLabel: Number,
  sizes: {
    type: Array,
  },
  rating: {
    type: Number,
    min: 0,
    max: 5,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Product = mongoose.model('Products', productSchema);

module.exports = Product;

//"availableSizes": ["XL", "XXL"],
// "currencyId": "USD",
// "currencyFormat": "$",
// "isFreeShipping": true
// countInStock: { type: Number, default: 0, required: true }
//gender: men
// offer_type: price_cut
