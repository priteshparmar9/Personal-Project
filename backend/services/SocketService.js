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

    socket.on("increment", (res) => {
      console.log(res);
      socket.to(res._id).emit("inc_done", { price: res.price });
    });
  });
  io.listen(process.env.SOCKET_PORT);
};
module.exports = SocketService;
