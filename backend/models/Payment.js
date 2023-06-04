const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PaymentSchema = mongoose.Schema({
  address: {
    type: Schema.Types.ObjectId,
    ref: "Address",
    required: false,
    default: null,
  },
  product: {
    type: Schema.Types.ObjectId,
    ref: "Product",
    required: false,
    default: null,
  },
  orderId: {
    type: String,
  },
});
module.exports = mongoose.model("payments", PaymentSchema);
