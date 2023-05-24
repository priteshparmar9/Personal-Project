const express = require("express");
const router = express.Router();
const {
  UserTokenValidator,
  SellerTokenValidator,
} = require("../services/TokenValidator");
const jwt = require("jsonwebtoken");
const Address = require("../models/Address");
const User = require("../models/User");

router.post("/get", (req, res) => {
  try {
    console.log(req.body.headers);
    let token = req.body.headers["authorization"];
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
      if (user) {
        console.log(user[0]);
        const addresses = await Address.find({ user: user[0] });
        res.status(200).json({ addresses: addresses });
      } else {
        res.status(205).json({ message: "Invalid Token" });
      }
    });
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

router.post("/addAddress", (req, res) => {
  console.log("Add Address Called");
  try {
    console.log(req.body.headers);
    let token = req.body.headers["authorization"];
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
      if (user) {
        console.log(user);
        const address = new Address({
          user: user[0],  
          houseOrBuilding: req.body.houseOrBuilding,
          street1: req.body.street1,
          street2: req.body.street2,
          city: req.body.city,
          state: req.body.state,
          pin: req.body.pin,
          contact: req.body.contact,
        });
        await address.save();
        res.status(200).json({ message: "Successful!" });
      } else {
        res.status(205).json({ message: "Invalid Token" });
      }
    });
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

module.exports = router;
