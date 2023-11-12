const express = require("express");

const app = express();

const { Server } = require("socket.io");

const PORT = process.env.PORT || 8080;

app.use(express.static("./public"));

const ExpressServer = app.listen(PORT,"0.0.0.0", () => {
  console.log(`listening on port ${PORT}`);
});

const io = new Server(ExpressServer);

const { formatMessage } = require("./public/utils/users.js");
const { Adduser, getuser, dltuser } = require("./public/utils/chats.js");

const { roomExists,dltroom,rooms} = require("./public/utils/rooms.js");

io.on("connection", (socket) => {
  socket.on("checkroom", (user, room) => {

    //console.log(getuser(room));

    if (!roomExists(room)) {
      rooms.push(room);
      socket.emit("create", true);
    } else {
      console.log("room exist");
      console.log(rooms);
      socket.emit("create", false);
    }

  });

  socket.on("checkjoin", (user, room) => {
    if (roomExists(room)) {
      socket.emit("join", true);
    } else {
      console.log("no room exist");
      socket.emit("join", false);
    }
  });

  socket.on("joinroom", (user, room) => {
    const id = socket.id;

    socket.join(room);

    Adduser(user, id, room);

    io.to(room).emit("userdata", getuser(room));

    socket.emit(
      "Botmsg",
      `<span class="name">chatBot</span>
     <div class="content">Welcome to ChatApp 1.0</div>`
    );
  });

  socket.on("newUser", (user, room) => {
    socket.broadcast.to(room).emit(
      "Botmsg",
      `<span class="name">chatBot</span>
        <div class="content">${user} has joined the chat</div>`
    );
  });

  socket.on("msg", (data, user, room,time) => {

    io.to(room).emit("sendmsg", formatMessage(data, user, room,socket.id,time));
    
  });

  socket.on("disconnect", () => {
    const user = dltuser(socket.id);

    if (user) {
      socket.to(user.room).emit(
        "Botmsg",
        `<span class="name">chatBot</span>
        <div class="content">${user.username} has left the chat</div>`
      );

      if (getuser(user.room).length === 0) {

        dltroom(user.room)

       console.log('empty room with no user');
  
     }

      io.to(user.room).emit("userdata", getuser(user.room));
    }
  });
});
