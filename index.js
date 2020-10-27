var app = require("express")();
var http = require("http").createServer(app);
var io = require("socket.io")(http);

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

let user = 1;
const arrayOfUsers = [];

io.on("connection", (socket) => {
  arrayOfUsers.push(`User${user++}`);
  console.log("a user connected");
  console.log('socket ->', socket.conn);
  io.emit("testing emission", user); //emit an event called 'testing emission' to all current users. We can pass in variables as the 2nd argument, or an object with multiple properties
  socket.on("chat message", (msg) => {
    console.log(arrayOfUsers);
    io.emit("chat message", msg);
  });
  socket.on("chat message", (msg) => {
    console.log("message: " + msg);
  });
  socket.on("disconnect", (user) => {
    io.emit("testing emission 2");
    console.log("user disconnected");
    console.log('user',user);
  });
});

http.listen(3000, () => {
  console.log("listening on *:3000");
});
