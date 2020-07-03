const express = require("express");
const app = express();
const socket = require("socket.io");

app.use(express.static("public"));

const server = app.listen(4001, () => {
  console.log("server is running on PORT 4001");
});

const io = socket(server);
io.on("connection", (socket) => {
  console.log("connect success via", socket.id);

  socket.on('chat', (data) => {
    io.sockets.emit('chat', data);
  })

  socket.on('typing', (data) => {
    socket.broadcast.emit('typing', data);
  })
});