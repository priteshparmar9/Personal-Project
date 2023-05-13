const Bid = require("../models/Bids");
const PlaceBid = async (product, user, time, amt) => {
  try {
    const bid = new Bid({
      product: product,
      user: user,
      username: user.username,
      time: time,
      bid_amt: amt,
    });
    await bid.save();
  } catch (err) {
    console.log(err.message);
    return false;
  }
};
const GetBids = async (product) => {
  try {
    const bids = Bid.find({
      product: product,
    });
    return bids;
  } catch (err) {
    return [];
  }
};
module.exports = { PlaceBid, GetBids };
