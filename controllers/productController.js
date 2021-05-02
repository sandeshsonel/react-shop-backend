const multer = require('multer');
const sharp = require('sharp');
const Product = require('../models/productModel');

const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

exports.uploadProductImage = upload.single('image');

exports.resizeProductImage = (req, res, next) => {
  if (!req.file) return next();

  req.file.filename = `product-${Date.now()}.jpeg`;

  sharp(req.file.buffer)
    .toFormat('jpeg')
    .jpeg({ quality: 50 })
    .toFile(`uploads/products/${req.file.filename}`);

  next();
};

exports.getAllProducts = async (req, res, next) => {
  try {
    const products = await Product.find();
    res.status(200).json({
      status: '1',
      results: products.length,
      data: {
        products,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: '0',
      message: err,
    });
  }
};

exports.getProduct = async (req, res) => {
  try {
    console.log(req.params);
    const product = await Product.findById(req.params.id);

    res.status(200).json({
      status: '1',
      data: {
        product,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: '0',
      message: err,
    });
  }
};

exports.getProductByQuery = async (req, res, next) => {
  try {
    const queryObj = { ...req.params };
    const excludedFields = ['page', 'sort', 'limit', 'fields'];
    excludedFields.forEach((el) => delete queryObj[el]);
    const products = await Product.find(queryObj);
    res.status(200).json({
      status: '1',
      results: products.length,
      data: products,
    });
  } catch (error) {
    console.log(error);
  }
};

exports.createProduct = async (req, res) => {
  // const fileName = req.file.filename ? req.file.filename : null;
  try {
    const product = await Product.create({
      productName: req.body.name,
      description: req.body.description,
      category: req.body.category,
      gender: req.body.gender,
      // image: fileName,
      price: req.body.price,
      priceDiscount: req.body.priceDiscount,
      sizes: req.body.size,
    });
    res.status(201).json({
      status: 'success',
      message: 'Product Created',
      data: {
        product,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: 'Product not created' + err,
    });
  }
};

exports.updateProduct = async (req, res) => {
  try {
  } catch (error) {}
};

exports.deleteProduct = async (req, res) => {
  try {
  } catch (error) {}
};
