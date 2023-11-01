require("dotenv").config();
const cors = require("cors");
const express = require("express");
const app = express();
// Use middlewares
app.use(cors());
app.use(express.json());

const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const { markAsUntransferable } = require("worker_threads");
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  },
});

/** Express Server **/
app.get("/", (req, res) => {
  res.status(200).send("Hello");
});

const onlineUsers = {};
const deleteUsersFromDictionary_ID = (idToDelete) => {
  for (var key in onlineUsers) {
    if (onlineUsers[key] == idToDelete) {
      delete onlineUsers[key];
      console.log(`Disconnecting User ${key} deleted from online users dictionary!`);
      return;
    }
  }
  console.log("Disconnecting User NOT FOUND!");
};
const addUserIntoDictionary = (newUsername, socketID) => {
  if (onlineUsers.hasOwnProperty(newUsername) || Object.values(onlineUsers).includes(socketID)) {
    console.log("Username/SocketID already exists in online users dictionary!");
    return;
  }
  onlineUsers[newUsername] = socketID;
  console.log(`New username ${newUsername} added into online users dictionary!`);
};
const getSocketIDFromUsername = (username) => {
  if (!onlineUsers.hasOwnProperty(username)) {
    console.log(`Username ${username} does not exists!`);
    return;
  }
  return onlineUsers[username];
};

/** Socket.IO Server **/
io.on("connection", (socket) => {
  console.log("A user with ID: " + socket.id + " connected");

  // // More Socket listening here.
  // if (io.sockets.connected) socket.emit("connections", Object.keys(io.sockets.connected).length);
  // else socket.emit("connections", 0);

  socket.on("disconnect", function () {
    console.log("A user with ID: " + socket.id + " disconnected");
    deleteUsersFromDictionary_ID(socket.id);
  });

  socket.on("client:connected", function (payload) {
    const { myUsername } = payload;
    addUserIntoDictionary(myUsername, socket.id);
  });
  socket.on("client:disconnecting", function (userID) {
    console.log("User with ID", userID, "is disconnecting!");
  });
  socket.on("client:send-message", async (payload) => {
    const {
      senderSocketID,
      messageObj,
      chatID,
      senderUsername,
      senderDocRef,
      targetUsername,
      targetDocRef,
      senderIsVolunteer,
    } = payload;

    try {
      // Emit to the target
      socket.to(getSocketIDFromUsername(targetUsername)).emit("server:send-client-message", payload);
      //// Sender emit
      // socket.emit("server:send-client-message", data);
    } catch (error) {
      console.log("SocketIO Error : client:send-message, ", error);
    }
  });

  socket.on("typing", (data) => {
    socket.broadcast.emit("typing", data);
  });

  socket.on("stopTyping", () => {
    socket.broadcast.emit("stopTyping");
  });

  socket.on("joined", async (name) => {
    let messageData = null;
    const data = {
      name,
      user_id: socket.id,
    };
    const user = await db.addUser(data);
    if (user) {
      messageData = await db.fetchUserMessages(data);
    }
    socket.broadcast.emit("joined", messageData);
  });

  socket.on("leave", (data) => {
    socket.broadcast.emit("leave", data);
  });
});

// Start Server
const port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log("Server listening on PORT", port);
});
