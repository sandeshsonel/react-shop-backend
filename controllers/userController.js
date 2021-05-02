const User = require("../models/userModel");

exports.getAllUsers = async (req, res, next) => {
  console.log(req.body)
  try {
    const users = await User.find();
    return res.status(200).json({
      status: "success",
      results: users.length,
      data: {
        users,
      },
    });
  } catch (err) {
    return res.status(500).json({
      status: "error",
      message: err,
    });
  }
};

exports.getUser = async (req, res, next) => {};

exports.createUser = async (req, res, next) => {};

exports.updateUser = async (req, res, next) => {};

exports.deleteUser = async (req, res, next) => {};
