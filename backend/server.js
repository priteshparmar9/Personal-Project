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

const productRouter = require("./routes/Products");
productRouter.use(bodyParser.json());
app.use("/products", productRouter);

const server = app.listen(process.env.PORT || 8080, () => {
  console.log("Server started!!");
});
// const server = http.createServer(app);
const io = require("socket.io")({
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});
io.on("connection", (socket) => {
  console.log("client connected: ", socket.id);

  socket.on("join", (data) => {
    console.log("Joining : ", data);
    socket.join(data);
  });

  socket.on("disconnect", (reason) => {
    console.log(reason);
  });
  socket.on("increment", (res) => {
    console.log(res);
    socket.to(res._id).emit("inc_done", { price: res.price });
  });
});
io.listen(8081);
