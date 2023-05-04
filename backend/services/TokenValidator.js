const User = require("../models/User");
const jwt = require("jsonwebtoken");
const TokenValidator = (req, res, next) => {
  try {
    let token = req.headers["authorization"];
    token = token.replace(/^Bearer\s+/, "");

    jwt.verify(token, process.env.DC_KEY, async function (err, decoded) {
      if (err) {
        res.status(205).json({ message: "Invalid Token" });
      }
      const user = await User.find({
        $and: [{ email: decoded.email }],
      });
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
module.exports = TokenValidator;
