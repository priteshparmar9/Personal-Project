/*
RAZOR PAY
*/
const router = require("express").Router();
const Razorpay = require("razorpay");
const crypto = require("crypto");
const Product = require("../models/Product");
const Payment = require("../models/Payment");
const mailer = require("../services/billMails");
router.post("/orders", async (req, res) => {
  console.log(req);
  try {
    const instance = new Razorpay({
      key_id: process.env.RAZOR_KEY_ID,
      key_secret: process.env.RAZOR_KEY_SECRET,
    });

    const options = {
      amount: req.body.amount * 100,
      currency: "INR",
      receipt: crypto.randomBytes(10).toString("hex"),
    };

    instance.orders.create(options, (error, order) => {
      if (error) {
        console.log(error);
        return res.status(500).json({ message: "Something Went Wrong!" });
      }
      res.status(200).json({ data: order });
    });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error!" });
    console.log(error);
  }
});

router.post("/verify", async (req, res) => {
  console.log(req.body);
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
      req.body.response;
    const sign = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSign = crypto
      .createHmac("sha256", process.env.RAZOR_KEY_SECRET)
      .update(sign.toString())
      .digest("hex");

    if (razorpay_signature === expectedSign) {
      console.log("Sold");
      let prod = await Product.findById(req.body.productId);
      prod.status = "Sold";
      await prod.save();
      const payment = new Payment({
        address: req.body.address,
        product: prod,
        orderId: razorpay_order_id,
      });
      await payment.save();
      await mailer(req.body.productId);
      return res.status(200).json({ message: "Payment verified successfully" });
    } else {
      return res.status(400).json({ message: "Invalid signature sent!" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error!" });
    console.log(error);
  }
});

module.exports = router;
