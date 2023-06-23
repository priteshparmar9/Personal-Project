const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProductSchema = mongoose.Schema({
  seller: {
    type: Schema.Types.ObjectId,
    ref: "Seller",
    required: false,
  },
  currentWinner: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: false,
  },
  endTime: {
    type: Date,
    required: false,
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
    required: false,
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
  status: {
    type: String,
    default: "Active",
  },
  noOfItems: {
    type: Number,
    default: 0,
    required: false,
  },
  onAuc: {
    type: Boolean,
    default: true,
    required: false,
  },
});
module.exports = mongoose.model("Products", ProductSchema);
