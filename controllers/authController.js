const { promisify } = require('util');
const mongoose = require('mongoose');
const AppError = require('../utils/appError');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const ObjectId = mongoose.Types.ObjectId;

const signToken = (id) => {
  return jwt.sign({ id: id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

exports.signup = async (req, res, next) => {
  console.log('xoxo', req.body);
  try {
    const newUser = await User.create(req.body);
    const token = signToken(newUser._id);
    // const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
    //   expiresIn: process.env.JWT_EXPIRES_IN,
    // });

    console.log('newUser', newUser);

    // return;
    res.status(201).json({
      status: '1',
      token,
      data: {
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        email: newUser.email,
        dateOfBirth: newUser.dateOfBirth,
        mostlyInterested: newUser.mostlyInterested,
      },
      message: 'User Created Successfully',
    });
  } catch (err) {
    console.log(err.message);
    res.status(404).json({
      status: '0',
      message: err.message,
    });
  }
};

exports.login = async (req, res, next) => {
  try {
    console.log('xoxo', req.body);
    const { email, password } = req.body;

    // 1) Check if email and password exist
    if (!email || !password) {
      return res.status(400).json({
        success: 'failed',
        message: 'Please provide email and password',
      });
    }

    // 2) Check if user exists && password is correct
    const user = await User.findOne({ email }).select('+password');
    const correct = user.correctPassword(password, user.password);

    if (!user || !correct) {
      return res.status(401).json({
        success: '0',
        message: 'Incorrect email or password',
      });
    }

    // 3) If everything ok, send token to client
    const token = signToken(user._id);

    console.log('xoxo-sign-user', user);

    return res.status(200).json({
      status: '1',
      token,
      data: {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        dateOfBirth: user.dateOfBirth,
        mostlyInterested: user.mostlyInterested,
      },
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: '0',
      message: err,
    });
  }
};

exports.protect = async (req, res, next) => {
  try {
    console.log('xoxoxo', req.headers);
    // 1) Getting Token and check of it's here
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      return res.status(401).json({
        success: 'failure',
        message: 'You are not logged in! Please log in to get access.',
      });
    }
    // 2) Verification token
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
    let user = await User.find(ObjectId(decoded.id));
    req.user = user[0];
    next();
  } catch (err) {
    console.log(err);
  }
};
