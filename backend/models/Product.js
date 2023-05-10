const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProductSchema = mongoose.Schema({
  seller: {
    type: Schema.Types.ObjectId,
    ref: "Seller",
    required: false,
  },
  endTime: {
    type: Date,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  basePrice: {
    type: Number,
    required: true,
  },
  currentPrice: {
    type: Number,
    default: 0,
  },
  minimumPremium: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  catagory: {
    type: String,
    required: true,
    default: "Product",
  },
  attachments: {
    type: Array,
    required: true,
  },
});
module.exports = mongoose.model("Products", ProductSchema);
