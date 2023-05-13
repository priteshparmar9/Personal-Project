const User = require("../models/User");
const Seller = require("../models/Seller");
const jwt = require("jsonwebtoken");

const UserTokenValidator = (req, res, next) => {
  try {
    let token = req.headers["authorization"];
    token = token.replace(/^Bearer\s+/, "");

    jwt.verify(token, process.env.DC_KEY, async function (err, decoded) {
      if (err) {
        res.status(205).json({ message: "Invalid Token" });
      }
      let user;
      if (decoded.email)
        user = await User.find({
          $and: [{ email: decoded.email }],
        });
      if (!user) {
        await Seller.findById(decoded._id);
      }
      if (user) {
        next();
      } else {
        res.status(205).json({ message: "Invalid Token" });
      }
    });
  } catch (error) {
    res.status(205).json({ message: "Invalid Token" });
  }
};

const GetUserName = async (token) => {
  try {
    jwt.verify(
      token,
      process.env.DC_KEY,
      async function (err, decoded) {
        if (err) {
          return { message: "Invalid Token" };
        }
        let user;
        if (decoded.email)
          user = await User.findOne({
            $and: [{ email: decoded.email }],
          });
        if (user) {
          return user.username;
        } else {
          return { message: "Invalid Token" };
        }
      }.then((res) => {
        return res;
      })
    );
  } catch (error) {
    return { message: "Invalid Token" };
  }
};

const SellerTokenValidator = (req, res, next) => {
  console.log("Validation Seller token");
  try {
    let token = req.headers["authorization"];
    token = token.replace(/^Bearer\s+/, "");

    jwt.verify(token, process.env.DC_KEY, async function (err, decoded) {
      if (err) {
        res.status(205).json({ message: "Invalid Token" });
      }
      const user = await Seller.findById(decoded._id);
      if (user) {
        console.log("Sending to next");
        next();
      } else {
        res.status(205).json({ message: "Invalid Token" });
      }
    });
  } catch (error) {
    res.status(205).json({ message: "Invalid Token" });
  }
};

module.exports = { UserTokenValidator, SellerTokenValidator, GetUserName };
