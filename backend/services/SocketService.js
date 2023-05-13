const { GetUserName } = require("./TokenValidator");
const Product = require("../models/Product");
const { PlaceBid } = require("./BidService");
const Bids = require("../models/Bids");
const User = require("../models/User");
const jwt = require("jsonwebtoken");

const SocketService = (server) => {
  const io = require("socket.io")(server, {
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

    socket.on("bid_request", async (req) => {
      try {
        const token = req.token;
        let user;
        // const user = await GetUserName(req.token);
        await jwt.verify(
          token,
          process.env.DC_KEY,
          async function (err, decoded) {
            if (err) {
              return { message: "Invalid Token" };
            }
            if (decoded.email)
              user = await User.findOne({
                $and: [{ email: decoded.email }],
              });
          }
        );

        if (user) {
          let product = await Product.findById(req.product._id);
          product.currentPrice = req.product.currentPrice;
          product.currentWinner = user;
          await product.save();
          await PlaceBid(product, user, Date(), req.product.currentPrice);
          socket.to(req._id).emit("bid_acceped", {
            bid: {
              product: product,
              username: user.username,
              bid_amt: req.product.currentPrice,
              time: Date(),
            },
          });
        }
      } catch (err) {
        console.log(err);
      }
    });
  });
  io.listen(process.env.SOCKET_PORT);
};
module.exports = SocketService;
