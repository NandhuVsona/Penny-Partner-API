const mongoose = require("mongoose");
const { Accounts } = require("./accountModel");

const trasnsctionSchema = new mongoose.Schema({
  month: {
    type: String,
    required: true,
  },
  data: [
    {
      date: {
        type: String,
        required: true,
      },
      // trasnsctions: [
      //   {
      //     id: "5",
      //     category: {
      //       name: {
      //         type: String,
      //         required: true,
      //       },
      //       icon: "icons/Income-expense/books.jpg",
      //       type: {
      //         type: String,
      //         enum: ["income", "expense", "transfer"],
      //       },
      //     },
      //     account: Accounts,
      //     amount: {
      //       type: Number,
      //       required: true,
      //     },
      //     date: "2024-08-10",
      //     description: {
      //       type: String,
      //       default: "No notes",
      //     },
      //   },
      // ],
    },
  ],
  userId: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
});
exports.Trasnsctions = mongoose.model("Transactions", trasnsctionSchema);
