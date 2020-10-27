var app = require("express")();
var http = require("http").createServer(app);
var io = require("socket.io")(http);

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

let user = 1;

io.on("connection", (socket) => {
  console.log("a user connected");
  io.emit("testing emission", user++); //emit an event called 'testing emission' to all current users. We can pass in variables as the 2nd argument, or an object with multiple properties
  socket.on("chat message", (msg) => {
    io.emit("chat message", msg);
  });
  socket.on("chat message", (msg) => {
    console.log("message: " + msg);
  });
  socket.on("disconnect", () => {
    io.emit("testing emission 2");
    console.log("user disconnected");
  });
});

http.listen(3000, () => {
  console.log("listening on *:3000");
});
