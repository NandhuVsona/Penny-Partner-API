const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const buildInData = require("../data/defaultCategories.js");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Please tell us your name!"],
    maxlength: [20, "Username should be less than 20 letters"],
  },
  email: {
    type: String,
    required: [true, "Plese provide your email"],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, "Please provide a valid email"],
  },
  password: {
    type: String,
    required: true,
    minlength: [8, "Password contain atleast 8 characters"],
    select: false,
  },
  currency: {
    type: String,
    default: "₹",
  },
  categories: {
    type: Array,
    default: buildInData.defaultCategories,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

userSchema.pre("save", async function (next) {
  // Only run if password is actually modified
  if (!this.isModified("password")) next();

  this.password = await bcrypt.hash(this.password, 12);
});

//INSTANCE METHOD
userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};
const User = mongoose.model("Users", userSchema);
module.exports = User;
