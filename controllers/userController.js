const { default: mongoose } = require("mongoose");
const User = require("../models/userModel");
const catchAsync = require("../utils/catchAsync.js");
const AppError = require("../utils/appError.js");

exports.getall = catchAsync(async (req, res, next) => {
    const users = await User.find();
  
    if (users.length == 0) {
      return next(new AppError("No data fount", 404));
    }
    res.status(200).json({
      status: "success",
      data: users,
    });
  });
  
  exports.getUser = async (req, res) => {
    let userId = req.params.id;
    let user = await User.findById(userId);
    res.status(200).json({
      status: "success",
      data: user,
    });
  };
  exports.deleteUser = async (req, res) => {
    let userId = req.params.id;
    let user = await User.findByIdAndDelete(userId);
    res.status(204).json({
      status: "success",
      message: "we missed you!",
    });
  };
  