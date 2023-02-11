const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");

mongoose.set("strictQuery", true);

require("dotenv").config();

const db_url = process.env.DATABASE_URL;

const app = express();
const cors = require("cors");
  
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

app.listen(process.env.PORT || 8080, () => {
  console.log("Server started!!");
});
