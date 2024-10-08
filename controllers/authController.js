const { default: mongoose } = require("mongoose");
const User = require("../models/userModel");
const catchAsync = require("../utils/catchAsync.js");
const AppError = require("../utils/appError.js");
const jwt = require("jsonwebtoken");
const { createDefaultData } = require("../utils/defaultData.js");

//--------------------------------------

const signToken = (id) => {
  const token = jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
  return token;
};

exports.checkId = async (req, res, next, val) => {
  const isValidId = await User.findById(val);
  if (isValidId) {
    next();
  } else {
    return res.status(404).json({
      status: "failed",
      message: "User not found",
    });
  }
};

//----------------- SIGN UP --------------------------

exports.signup = catchAsync(async (req, res, next) => {
  const newUser = await User.create({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
  });

  //JWT
  const token = signToken(newUser._id);
  res.status(201).json({
    newUser,
    token,
  });
  createDefaultData(newUser._id);
});

//-------------------- LOGIN ----------------------------

exports.logIn = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new AppError("Please provide email & password", 400));
  }

  const user = await User.findOne({ email }).select("+password"); //explictily select

  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError("Incorrect email or password", 401));
  }

  //JWT
  const token = signToken(user._id);
  res.status(201).json({
    status: "success",
    user,
    token,
  });
});

exports.product = catchAsync(async (req, res, next) => {
  //  1) Getting token and check of it's there
  // let token;
  // if (
  //   req.headers.authorization &&
  //   req.headers.authorization.startsWith("Bearer")
  // ) {
  //   token = req.headers.authorization.split(" ")[1];
  //   console.log(token);
  // }
  // if (!token) {
  //   return next(
  //     new AppError("You are not logged in! Please log in to get access", 401)
  //   );
  // }
  // 2) Verification token
  // 3) Check if user still exists
  // 4) Check if user changed password after the token was issued
  next();
});
