const { Categories } = require("../models/categoryModel");
const User = require("../models/userModel");
const catchAsync = require("../utils/catchAsync");

exports.getAllCategories = catchAsync(async (req, res, next) => {
  let categories = await Categories.find({ userId: req.params.id });

  if (!categories) {
    return next(new AppError("Categories not found", 404));
  }

  res.status(200).json({
    status: "success",
    result: categories.length,
    data: categories,
  });
});

exports.createCategory = catchAsync(async (req, res, next) => {
  let newCategory = await Categories.create({
    image: req.body.image,
    name: req.body.name,
    type: req.body.type,
    userId: req.params.id,
  });

  // Respond with the newly created category
  res.status(201).json({
    status: "success",
    result: newCategory.length,
    data: newCategory,
  });
});

exports.updateCategory = catchAsync(async (req, res, next) => {
  const category = await Categories.findByIdAndUpdate(req.params.id, req.body, {
    runValidators: true,
  });

  res.status(200).json({
    status: "success",
    data: category,
  });
});

exports.deleteCategory = catchAsync(async (req, res, next) => {
  const category = await Categories.findByIdAndDelete(req.params.id);
  res.status(204).json({
    status: "success",
  });
});
