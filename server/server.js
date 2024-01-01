const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");
const app = express();

const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

app.get("/", (req, res) => {
  res.send("react chat app backend");
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
const port = process.env.PORT || 5720;
server.listen(port, () => console.log(`Listening to port ${port}`));
