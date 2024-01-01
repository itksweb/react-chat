const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");
const app = express();
const port = process.env.PORT || 5720;

const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

app.get("/", (req, res) => {
  res.send( "server accessible");
});

io.on("connection", (socket) => {
  console.log("We are connected");

  socket.on("chat", (chat) => {
    io.emit("chat", chat);
  });

  socket.on("disconnect", () => {
    console.log("disconnected");
  });
});


server.listen(port, () => console.log(`Listening to port ${port}`));
module.exports = port;
