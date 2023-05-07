const express = require("express");
const router = express.Router();
const crypto = require("crypto-js");
const uploadPic = require("../services/Dropbox");
const {
  UserTokenValidator,
  SellerTokenValidator,
} = require("../services/TokenValidator");
const jwt = require("jsonwebtoken");
const Seller = require("../models/Seller");
const Product = require("../models/Product");

router.get("/", UserTokenValidator, async (req, res) => {
  // console.log("Here");
  try {
    let products = await Product.find();
    res.status(200).send(products);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.post("/add_product", SellerTokenValidator, async (req, res) => {
  console.log(req.files);
  // res.send("Nothing");
  console.log("Token Verified");
  try {
    let token = req.headers["authorization"];
    token = token.replace(/^Bearer\s+/, "");

    let user;
    console.log(token);
    jwt.verify(token, process.env.DC_KEY, async function (err, decoded) {
      if (err) {
        res.status(205).json({ message: "Invalid Token" });
      }
      user = await Seller.findById(decoded._id);
      if (!user) {
        res.status(205).json({ message: "Invalid Token" });
      } else {
        let attachments = [];
        // console.log(req.files.attachments);
        try {
          let product = new Product({
            seller: user,
            endTime: Date(),
            title: req.body.title,
            basePrice: req.body.basePrice,
            minimumPremium: req.body.minimumPremium,
            description: req.body.description,
            category: req.body.category,
          });
          console.log("Uploading Files");
          req.files.attachments.map(async (pic) => {
            attachments.push(await uploadPic(user.username, pic));
          });
          setTimeout(async () => {
            product.attachments = attachments;
            await product.save();
            res.status(200).send("Success");
          }, 5000);
        } catch (err) {
          res.status(500).send(err.message);
        }
      }
    });
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.get("/getproduct/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.status(200).json({ product: product });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
