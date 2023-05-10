const { GetUserName } = require("./TokenValidator");
const Product = require("../models/Product");

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
      console.log(req);
      try {
        const user = GetUserName(req.token);
        let product = await Product.findById(req.product);
        product.currentPrice = req.price;
        await product.save();
        socket.to(req._id).emit("bid_acceped", { price: req.price });
      } catch (err) {
        console.log(err);
      }
    });
  });
  io.listen(process.env.SOCKET_PORT);
};
module.exports = SocketService;
