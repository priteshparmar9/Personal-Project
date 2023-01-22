const express = require("express");
const router = express.Router();
const crypto = require("crypto-js");
const https = require("https");
const axios = require("axios");

const User = require("../models/User");
const OTPS = require("../models/OTP");

const mailer = require("../services/emails");

router.post("/signup", async (req, res) => {
  console.log("Signup Called");
  try {
    const available_users = await User.find({
      email: req.body.email,
    });
    if (available_users.length) {
      res.json({
        code: 100,
        status: "Email already registered!",
      });
    } else {
      let up_path =
        `/PersonalProjectEA/ProfilePictures/${req.body.username}_` +
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
              path: `/PersonalProjectEA/ProfilePictures/${req.body.username}_${req.files.pic.name}`,
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

      const user = new User({
        username: req.body.username,
        password: crypto.AES.encrypt(
          req.body.password,
          process.env.DC_KEY
        ).toString(),
        email: req.body.email,
        pic: pic_addr,
      });
      user.save();

      let otp = Math.floor(Math.random() * 1000000);
      while (otp < 100000) {
        otp++;
        otp *= 10;
      }
      otp %= 1000000;
      let ot = new OTPS({
        user: user,
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

// Login function's code 200 means that user is authenticated and it also sends token to store at front-end(user's local storage)
// Code 201 means invalid credentials
// Code 500 means internal server error
router.post("/login", async (req, res) => {
  try {
    const available_users = await User.findOne({
      $or: [
        { email: req.body.username },
        {
          username: req.body.username,
        },
      ],
    });
    if (available_users) {
      if (
        crypto.AES.decrypt(
          available_users.password,
          process.env.DC_KEY
        ).toString(crypto.enc.Utf8) === req.body.password
      ) {
        console.log(available_users);
        res.json({
          code: 200,
          token: crypto.AES.encrypt(
            JSON.stringify({
              isLoggedIn: true,
              email: crypto.AES.encrypt(
                available_users.email,
                process.env.DC_KEY
              ).toString(),
              username: crypto.AES.encrypt(
                available_users.username,
                process.env.DC_KEY
              ).toString(),
              time: Date(),
            }),
            process.env.DC_KEY
          ).toString(),
          // process.env.DC_KEY

          status: "Login Successful",
        });
      } else {
        res.json({
          code: 201,
          status: "Invalid Credentials",
        });
      }
    } else {
      res.json({
        code: 201,
        status: "Invalid Credentials",
      });
    }
  } catch (error) {
    res.json({
      code: 500,
      status: "Error Occured : " + error.message,
    });
  }
});

router.post("/check_otp", async (req, res) => {
  try {
    const available_users = await User.findOne({
      email: req.body.email,
    });
    // console.log(available_users);
    if (available_users != null) {
      const otp = await OTPS.findOne({
        user: available_users._id,
      });
      // console.log(otp);
      if (otp) {
        if (otp.otp == req.body.otp) {
          otp.remove();
          available_users.verified = true;
          // console.log(available_users[0]);
          available_users.save();
          res.json({
            code: 200,
            status: "Otp Verified!",
          });
        } else {
          res.json({
            code: 100,
            status: "Otp Incorrect!",
          });
        }
      }
    } else {
      res.json({
        code: 404,
        status: "No Idea!",
      });
    }
  } catch (error) {
    res.send("Error : " + error);
  }
});

router.post("/forgot_password", async (req, res) => {
  try {
    let available_user = await User.findOne({
      $or: [
        { email: req.body.username },
        {
          username: req.body.username,
        },
      ],
    });
    if (available_user) {
      let otp = Math.floor(Math.random() * 1000000);
      while (otp < 100000) {
        otp++;
        otp *= 10;
      }
      otp %= 1000000;
      let ot = new OTPS({
        user: available_user,
        otp: otp,
      });
      ot.save();
      // console.log(ot._id.toString());
      const link =
        process.env.FRONT_END_BASE_URL + "change_password/" + ot._id.toString();
      mailer(available_user.email, link);
      res.json({
        code: 200,
        status: "Otp sent!",
      });
    } else {
      res.json({
        code: 201,
        status: "User Not Found",
      });
    }
  } catch (error) {
    res.json({
      code: 500,
      status: "Error Occured : " + error.message,
    });
  }
});

router.post("/change_password", async (req, res) => {
  try {
    const otp = await OTPS.findById(req.body.id);
    if (otp) {
      let user = await User.findById(otp.user._id);
      if (user) {
        user.password = crypto.AES.encrypt(
          req.body.password,
          process.env.DC_KEY
        ).toString();
        user.save();
        otp.delete();
        res.json({
          code: 200,
          status: "Password Changed!",
        });
      } else {
        res.json({
          code: 201,
          status: "User not found!",
        });
      }
    } else {
      res.json({
        code: 202,
        status: "Invalid Request!",
      });
    }
  } catch (error) {
    res.json({
      code: 500,
      status: "Error Occured : " + error.message,
    });
  }
});

router.post("/validate_change_password", async (req, res) => {
  try {
    console.log("here");
    const otp = await OTPS.find({ _id: req.body.id });
    console.log(otp);
    if (otp.length) {
      res.json({
        code: 200,
        status: "Valid Request!",
      });
    } else {
      res.json({
        code: 201,
        status: "Invalid Request!",
      });
    }
  } catch (error) {
    console.log(error.message);
    res.json({
      code: 201,
      status: "Error Occured : " + error.message,
    });
  }
});

module.exports = router;
