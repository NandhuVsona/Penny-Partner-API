const mongoose = require("mongoose");
const { Accounts } = require("./accountModel");
const { Categories } = require("./categoryModel"); // Assuming you have a Categories model

const transactionSchema = new mongoose.Schema({
  month: {
    type: String,
    required: true,
  },

  date: {
    type: String,
    required: true,
  },

  category: {
    type: mongoose.Types.ObjectId,
    ref: "Categories", // Reference to Category model
    required: true,
  },
  account: {
    type: mongoose.Types.ObjectId,
    ref: "Accounts", // Reference to Accounts model
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  //   date: {
  //     type: Date, // Change to Date type for proper date handling
  //     required: true,
  //   },
  description: {
    type: String,
    default: "No notes",
  },

  userId: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

exports.Transactions = mongoose.model("Transactions", transactionSchema);
