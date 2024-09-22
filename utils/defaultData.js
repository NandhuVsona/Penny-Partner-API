
const { defaultCategories } = require("../data/defaultCategories");
const { Categories } = require("../models/categoryModel");

exports.createDefaultData = async (userId) => {
  let updateUserId = defaultCategories.map((item) => {
    item.userId = userId;
    return item;
  });
  const categories = await Categories.insertMany(updateUserId);
 
};

