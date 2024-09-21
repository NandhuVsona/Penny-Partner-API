const User = require("../models/userModel");
const catchAsync = require("../utils/catchAsync");

exports.createCategory = catchAsync(async (req, res, next) => {
  const newCategory = {
    icons: req.body.icon,
    name: req.body.name,
    type: req.body.type,
  };

  let user = await User.findByIdAndUpdate(req.params.id, {
    $push: { categories: newCategory },
  });

  res.status(201).json({
    status: "success",
    data: newCategory,
  });
});

exports.updateCategory = catchAsync(async (req, res, next) => {
  const updatedCategory = await Categories.findByIdAndUpdate(
    req.params.id,
    req.body,
    { runValidators: true }
  );

  res.status(200).json({
    status: "success",
    data: updatedCategory,
  });
});
