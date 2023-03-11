const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SigninDataSchema = mongoose.Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  time: {
    type: Date,
    required: true,
  },
  ip: {
    type: String,
    required: true,
  },
});
module.exports = mongoose.model("signindata", SigninDataSchema);
