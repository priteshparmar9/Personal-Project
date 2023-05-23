// const express = require("express");
// const router = express.Router();
require("dotenv").config();

var nodemailer = require("nodemailer");

const mailer = (email, product) => {
  var transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    auth: {
      user: "mail.eauction@gmail.com",
      pass: process.env.PASSWORD,
    },
  });

  var mailOptions = {
    from: "mail.eauction@gmail.com",
    to: email,
    subject: `Bid Update ${product.title}`,
    html: `<div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
  <div style="margin:50px auto;width:70%;padding:20px 0">
    <div style="border-bottom:1px solid #eee">
      <a href="" style="font-size:1.4em;color: #00466a;text-decoration:none;font-weight:600">EAuction</a>
    </div>
    <p style="font-size:1.1em">Hi,</p>
    <p>Hello User, We would like to inform you that the bid you had placed on ${product.title} has been up-bidded by other user to ${product.currentPrice}. You still stand chance to win the bid. If you want it, then bid again.</p>
    <h2 style="background: #00466a;margin: 0 auto;width: max-content;padding: 0 10px;color: #fff;border-radius: 4px;"></h2>
    <p style="font-size:0.9em;">Regards,<br />EAuction</p>
    <hr style="border:none;border-top:1px solid #eee" />
    <div style="float:right;padding:8px 0;color:#aaa;font-size:0.8em;line-height:1;font-weight:300">
      <p>No One</p>
      <p>1600 Amphitheatre Parkway</p>
      <p>California</p>
    </div>
  </div>
</div>`,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};

module.exports = mailer;
