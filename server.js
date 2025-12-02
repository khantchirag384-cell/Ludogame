const express = require("express");
const http = require("http");
const socket = require("socket.io");
const path = require("path");

const app = express();
const server = http.createServer(app);
const io = socket(server, {
  cors: { origin: "*" }
});

app.use(express.static(path.join(__dirname, "public")));

io.on("connection", (player) => {
  console.log("Player Connected:", player.id);

  player.on("roll_dice", () => {
    const dice = Math.floor(Math.random() * 6) + 1;
    io.emit("dice_result", dice);
  });

  player.on("move_token", (data) => {
    io.emit("token_moved", data);
  });

  player.on("disconnect", () => {
    console.log("Player Disconnected");
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log("Server running on port " + PORT));
