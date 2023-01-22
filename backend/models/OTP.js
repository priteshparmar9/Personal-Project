const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const OTPSchema = mongoose.Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  otp: {
    type: Number,
    required: true,
  },
  time: {
    type: Date,
    default: Date.now(),
  },
});
module.exports = mongoose.model("OTPS", OTPSchema);
