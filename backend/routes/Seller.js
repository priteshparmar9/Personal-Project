const express = require("express");
const router = express.Router();
const crypto = require("crypto-js");
const https = require("https");
const axios = require("axios");

const Seller = require("../models/Seller");
const OTPS = require("../models/OTP");

const mailer = require("../services/emails");

router.post("/signup", async (req, res) => {
  console.log("Signup Called");
  try {
    const available_users = await Seller.find({
      email: req.body.email,
    });
    if (available_users.length) {
      res.json({
        code: 100,
        status: "Email already registered!",
      });
    } else {
      let up_path =
        `/PersonalProjectEA/SellerProfilePictures/${req.body.username}_` +
        req.files.pic.name;

      const uploadRequest = https.request(
        "https://content.dropboxapi.com/2/files/upload",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${process.env.DB_TOKEN}`,
            "Dropbox-API-Arg": JSON.stringify({
              path: up_path,
              mode: { ".tag": "overwrite" },
              autorename: true,
              mute: false,
              strict_conflict: false,
            }),
            "Content-Type": "application/octet-stream",
          },
        },
        (res) => {
          console.log("statusCode: ", res.statusCode);
        }
      );

      await uploadRequest.write(req.files.pic.data);
      await uploadRequest.end();

      console.log("Uploaded to dropbox");

      // Finding url for the uploaded image
      let pic_addr = "";
      let i = 100;
      while (i--) {
        try {
          console.log("Getting photo url");
          const response = await axios.post(
            "https://api.dropboxapi.com/2/sharing/create_shared_link_with_settings",
            {
              path: `/PersonalProjectEA/SellerProfilePictures/${req.body.username}_${req.files.pic.name}`,
            },
            {
              headers: {
                Authorization: `Bearer ${process.env.DB_TOKEN}`,
                "Content-Type": "application/json",
              },
            }
          );
          if (response.status === 409) {
            continue;
          }
          // console.log(response.data.url);
          pic_addr = response.data.url.replace("dl=0", "raw=1");
          break;
        } catch (error) {
          console.log(error.message);
        }
      }

      const seller = new Seller({
        username: req.body.username,
        password: crypto.AES.encrypt(
          req.body.password,
          process.env.DC_KEY
        ).toString(),
        email: req.body.email,
        pic: pic_addr,
        number: req.body.contact_number,
        description: req.body.description,
        address: req.body.address,
      });
      seller.save();

      let otp = Math.floor(Math.random() * 1000000);
      while (otp < 100000) {
        otp++;
        otp *= 10;
      }
      otp %= 1000000;
      let ot = new OTPS({
        seller: seller,
        otp: otp,
      });
      ot.save();
      mailer(req.body.email, otp);
      res.json({
        code: 200,
        status: "Otp sent!",
      });
    }
  } catch (error) {
    console.log(error.message);
    res.send({
      code: 400,
      status: error.message,
    });
  }
});

module.exports = router;
