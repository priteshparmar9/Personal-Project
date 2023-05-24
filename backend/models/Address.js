const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AddressSchema = mongoose.Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: false,
  },
  houseOrBuilding: {
    type: String,
    required: true,
  },
  street1: {
    type: String,
    required: true,
  },
  street2: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  pin: {
    type: Number,
    required: true,
  },
  contact: {
    type: Number,
    required: true,
  },
});
module.exports = mongoose.model("Address", AddressSchema);
