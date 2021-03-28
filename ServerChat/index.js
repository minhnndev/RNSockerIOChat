var express = require("express");
var app = express();
var server = require("http").Server(app);
const io = require('socket.io')(server);
const port = 3000;

io.on("connection", (socket) => {
  console.log("a user connected :D");
  socket.on("chat message", (msg) => {
    console.log(msg);
    io.emit("chat message", msg);
  });
});

app.get('/', function (req, res) {
  res.json({
    message: 'OK'
  })
})

server.listen(port, () => console.log("server running on port:" + port));
