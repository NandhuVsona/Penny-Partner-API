const mongoose = require("mongoose");

const budgetSchema = new mongoose.Schema({
  month: {
    type: String,
    required: true,
  },

  categoryId: {
    type: mongoose.Types.ObjectId,
    ref: "Categories",
    required: true,
  },
  budget: {
    type: Number,
    required: true,
  },
  spend: {
    type: Number,
    required: true,
    default: 0,
  },
  remaining: {
    type: Number,
    required: true,
  },

  userId: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

exports.Budgets = mongoose.model("Budgets", budgetSchema);
