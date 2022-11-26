require("dotenv").config();
const express = require("express");
const createError = require("http-errors");
const app = express();
const socketio = require("socket.io");
const http = require("http");
const cors = require("cors");
const mainRouter = require("./src/routes/index");
const PORT = process.env.PORT || 5000;
const DB_HOST = process.env.DB_HOST;

app.use("/", express.static("./upload"));
app.use(express.json());

app.use(cors());
app.use("/", mainRouter);

const server = http.createServer(app);

const io = socketio(server, {
  cors: {
    origin: "http://localhost:3000",
    credentials: true,
  },
});

io.on("connection", (socket) => {
  socket.on("join-room", (data) => {
    socket.join(data.user);
  });

  socket.on("inisialRoom", ({ room, username }) => {
    socket.join(room);
    socket.broadcast.to(room).emit("notifAdmin", {
      sender: "Admin",
      message: `${username} telah bergabung`,
    });
  });

  socket.on("send-message", (data) => {
    console.log(data);
    const message = {
      sender: data.sender,
      receiver: data.receiver,
      message: data.message,
      created_at: new Date(),
    };
    socket.to(data.receiver).emit("new-message", message);
  });

  socket.on("grup-message", (data) => {
    const groupMessage = {
      sender: data.sender,
      message: data.message,
      photo: data.photo,
      room: data.room,
    };
    socket.broadcast
      .to(data.room.name_grup)
      .emit("response-grup", groupMessage);
  });

  socket.on("disconnect", () => {
    console.log(`ada perangkat yg terputus dengan id ${socket.id}`);
  });
});

// io.on("connection", (socket) => {
//   // console.log(`id ${socket.id} As ${socket.userId}`);

//   socket.on("sendMessage", (data, callback) => {
// const message = {
//   receiver_id: data.idReceiver,
//   message: data.messageBody,
//   sender_id: socket.userId,
//   created_at: new Date(),
// };
//     console.log(message);
//     callback({
//       ...message,
//       date: moment(message.created_at).format("LT"),
//     });
//     messageModel.create(message).then(() => {
//       socket.broadcast.to(data.idReceiver).emit("newMessage", {
//         message: message.message,
//         date: moment(message.created_at).format("LT"),
//       });
//     });
//   });

// socket.on("disconnect", () => {
//   console.log(`ada perangkat yg terputus dengan id ${socket.id}`);
//   // userModel.deleteUserbyId()
// });
// });

server.listen(PORT, () => {
  console.log(`running on ${PORT}`);
});

app.all("*", (req, res, next) => {
  next(new createError.NotFound());
});
app.use((err, req, res, next) => {
  const messageError = err.message || "internal server error";
  const statusCode = err.status || 500;

  res.status(statusCode).json({
    message: messageError,
  });
});
