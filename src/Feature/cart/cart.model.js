const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  image: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
    unique: true,
  },
  title: {
    type: String,
    required: true,
    unique: true,
  },
  cata: [],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  qty: {
    type: Number,
    default: 1,
  },
});

const Carts = mongoose.model("cart", userSchema);

module.exports = Carts;
