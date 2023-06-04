const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const app = express();
const schedule = require("node-schedule");
const SocketService = require("./services/SocketService");
const { Update } = require("./services/BackgroundServices");
const cors = require("cors");
const Product = require("./models/Product");

require("dotenv").config();
const db_url = process.env.DATABASE_URL;

mongoose.set("strictQuery", true);

app.use(cors());
app.use(fileUpload());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
try {
  mongoose.connect(db_url, { useNewUrlParser: true });
} catch (error) {
  console.log("Error Occured in Database connection : ", error);
}

// create application/json parser
var jsonParser = bodyParser.json();

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false });

const mailRouter = require("./services/emails");
app.use("/emails", mailRouter);

const userRouter = require("./routes/User");
userRouter.use(bodyParser.json());
app.use("/users", userRouter);

const sellerRouter = require("./routes/Seller");
sellerRouter.use(bodyParser.json());
app.use("/sellers", sellerRouter);

const productRouter = require("./routes/Products");
productRouter.use(bodyParser.json());
app.use("/products", productRouter);

const addressRouter = require("./routes/Address");
addressRouter.use(bodyParser.json());
app.use("/address", addressRouter);

const paymentRouter = require("./routes/PaymentGateway");
paymentRouter.use(bodyParser.json());
app.use("/payment", paymentRouter);

const server = app.listen(process.env.PORT || 8080, () => {
  console.log("Server started!!");
});

schedule.scheduleJob("*/15 * * * *", async () => {
  console.log("Updating Products");
  const product = await Product.find({
    $or: [{ status: "Active" }, { status: null }],
  });
  for (pr in product) {
    if (new Date(product[pr].endTime) < new Date()) {
      product[pr].status = "Expired";
      await product[pr].save();
    }
  }
});

SocketService(server);
