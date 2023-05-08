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

router.get("/", async (req, res) => {
  try {
    let products = await Product.find();
    let productDTO = [];
    for (let i = 0; i < products.length; i++) {
      productDTO.push({
        id: products[i]._id,
        title: products[i].title,
        basePrice: products[i].basePrice,
        minimumPremium: products[i].minimumPremium,
        currentPrice: products[i].currentPrice,
        pic: products[i].attachments[0],
      });
    }
    res.status(200).send(productDTO);
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
        // console.log("Printing");
        // console.log(req.body.category);
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
          await req.files.attachments.map(async (pic) => {
            attachments.push(await uploadPic(user.username, pic));
          });
          // setTimeout(async () => {
          product.attachments = attachments;
          await product.save();
          res.status(200).send("Success");
          // }, 5000);
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

router.get("/search/:query", async (req, res) => {
  let query = new RegExp(req.params.query, "i");
  try {
    const products = await Product.find({
      $or: [
        {
          title: {
            $regex: query,
          },
        },
        {
          category: { $elemMatch: { $regex: query } },
        },
      ],
    });
    res.status(200).json({ products: products });
  } catch (err) {
    res.status(500).send(err.message);
  }
});
module.exports = router;
