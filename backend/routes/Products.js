const express = require("express");
const router = express.Router();
const crypto = require("crypto-js");
const { uploadPic } = require("../services/Dropbox");
const {
  UserTokenValidator,
  SellerTokenValidator,
} = require("../services/TokenValidator");
const jwt = require("jsonwebtoken");
const Seller = require("../models/Seller");
const Product = require("../models/Product");
const Bids = require("../models/Bids");
const User = require("../models/User");

router.get("/", async (req, res) => {
  try {
    let products = await Product.find({
      $or: [{ status: "Active" }, { status: null }],
    });
    let productDTO = [];
    for (let i = 0; i < products.length; i++) {
      productDTO.push({
        id: products[i]._id,
        title: products[i].title,
        basePrice: products[i].basePrice,
        minimumPremium: products[i].minimumPremium,
        currentPrice: products[i].currentPrice,
        pic: products[i].attachments[0],
        status: products[i].status,
      });
    }
    res.status(200).send(productDTO);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.get("/expired", async (req, res) => {
  try {
    let products = await Product.find({
      status: "Expired",
    });
    let productDTO = [];
    for (let i = 0; i < products.length; i++) {
      productDTO.push({
        id: products[i]._id,
        title: products[i].title,
        basePrice: products[i].basePrice,
        minimumPremium: products[i].minimumPremium,
        currentPrice: products[i].currentPrice,
        pic: products[i].attachments[0],
        status: products[i].status,
      });
    }
    res.status(200).send(productDTO);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.post("/add_product", SellerTokenValidator, async (req, res) => {
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
        console.log(req.body.category);
        try {
          let product = new Product({
            seller: user,
            endTime: new Date(req.body.endTime),
            title: req.body.title,
            basePrice: req.body.basePrice,
            minimumPremium: req.body.minimumPremium,
            description: req.body.description,
          });

          for (let i = 0; i <= req.files.attachments.length; i++) {
            if (i != req.files.attachments.length)
              attachments.push(
                await uploadPic(user.username, req.files.attachments[i])
              );
            else {
              console.log("Files uploaded");
              product.attachments = attachments;
              product.catagory = req.body.category
                ? req.body.category
                : "product";
              await product.save();
              res.status(200).send("Success");
            }
          }
        } catch (err) {
          console.log(err.message);
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
    // console.log(product);
    if (product.endTime < new Date()) {
      product.status = "Expired";
      await product.save();
    }
    const bids = await Bids.find({ product: product });
    res.status(200).json({ product: product, bids: bids });
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
          catagory: { $regex: query },
        },
      ],
    });
    let productDTO = [];
    for (let i = 0; i < products.length; i++) {
      productDTO.push({
        id: products[i]._id,
        title: products[i].title,
        basePrice: products[i].basePrice,
        minimumPremium: products[i].minimumPremium,
        currentPrice: products[i].currentPrice,
        pic: products[i].attachments[0],
        status: products[i].status,
      });
    }
    res.status(200).json({ products: productDTO });
  } catch (err) {
    res.status(500).send(err.message);
  }
  // console.log(req.body.category);
});

router.post("/getWinning", async (req, res) => {
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
        const products = await Product.find({ currentWinner: user });
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
        res.status(200).json({ winnings: productDTO });
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
