const express = require("express");
const router = express.Router();
const crypto = require("crypto-js");
const uploadPic = require("./Dropbox");
const TokenValidator = require("../services/TokenValidator");

const Seller = require("../models/Seller");
const Product = require("../models/Product");

router.get("/", TokenValidator, async (req, res) => {
  // console.log("Here");
  try {
    let products = await Product.find();
    res.status(200).send(products);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.post("/add_product", async (req, res) => {
  try {
    let message = req.body.token;
    let data = JSON.parse(
      crypto.AES.decrypt(message, process.env.DC_KEY).toString(crypto.enc.Utf8)
    );
    const seller = crypto.AES.decrypt(data.seller, process.env.DC_KEY).toString(
      crypto.enc.Utf8
    );
    let sel = await Seller.findOne({
      username: seller,
    });
    if (sel) {
      let attachments = [];
      console.log(req.files.attachments);
      try {
        let product = new Product({
          seller: sel,
          endTime: Date(),
          title: req.body.title,
          basePrice: req.body.basePrice,
          minimumPremium: req.body.minimumPremium,
          description: req.body.description,
          category: req.body.category,
        });
        req.files.attachments.map(async (pic) => {
          attachments.push(await uploadPic(sel.username, pic));
          if (attachments.length == req.files.attachments.length) {
            product.attachments = attachments;
            await product.save();
            res.status(200).send("Success");
          }
        });
      } catch (err) {
        res.status(500).send(err.message);
      }
    } else {
      res.status(500).send("Invalid Seller");
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.post("/upload_test", async (req, res) => {
  let url = [];
  let i = 0;
  await req.files.pic.map(async (pics) => {
    url.push(await uploadPic("Pritesh", pics));
    console.log(url);
    if (url.length == req.files.pic.length) res.send(url);
  });
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
