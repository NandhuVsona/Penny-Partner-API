const User = require("../models/userModel");
const catchAsync = require("../utils/catchAsync");


exports.getAllCategories = catchAsync(async (req, res, next) => {
  let user = await User.findById(req.params.id).select("categories");
 
  if (!user) {
    return next(new AppError("User not found", 404));
  }

  res.status(200).json({
    status: "success",
    result:user.categories.length,
    data: user.categories,
  });
});

exports.createCategory = catchAsync(async (req, res, next) => {
  // Fetch the user and their categories
  let user = await User.findById(req.params.id).select("categories");

  if (!user) {
    return next(new AppError("Error: User not found with that id", 404));
  }

  // Create a new category with id equal to the current length of the categories array
  const newCategory = {
    id: user.categories.length, // Correct spelling of 'length'
    image: req.body.image,
    name: req.body.name,
    type: req.body.type,
  };

  // Push the new category to the user's categories
  user.categories.push(newCategory);

  // Save the updated user document
  await user.save();

  // Respond with the newly created category
  res.status(201).json({
    status: "success",
    result:newCategory.length,
    data: newCategory,
  });
});

exports.updateCategory = catchAsync(async (req, res, next) => {
  const { categories } = await User.findById(req.params.id);

  if (!categories) {
    return next(new AppError("User not found", 404));
  }

  categories.forEach((item) => {
    if (item.id === req.body.id) {
      item.name = req.body.name || item.name;
      item.image = req.body.image || item.image;
      item.type = req.body.type || item.type;
    }
  });

  res.status(200).json({
    status: "success",
    data: categories,
  });
});

exports.deleteCategory = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(new AppError("User not found", 404));
  }

  // Filter out the category by id
  user.categories = user.categories.filter((item) => item.id !== req.body.id);

  // Save the updated user document
  await user.save();

  res.status(200).json({
    status: "success",
    data: user.categories,
  });
});
