const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BidsSchema = mongoose.Schema({
  product: {
    type: Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  time: {
    type: Date,
    default: Date(),
  },
  bid_amt: {
    type: Number,
    required: true,
  },
});
module.exports = mongoose.model("Bids", BidsSchema);
