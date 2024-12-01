const mongoose = require("mongoose");

const UserSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    verified: {
      type: Boolean,
      default: false,
    },
    pic: {
      type: String,
    },
    google: {
      type: Boolean,
      default: false,
    },
    dob: {
      type: Date,
      required
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("user", UserSchema);
