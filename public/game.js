const socket = io();

// Canvas Setup
const canvas = document.getElementById("board");
const ctx = canvas.getContext("2d");

// Load board
const boardImg = new Image();
boardImg.src = "/board.png";

boardImg.onload = () => {
  ctx.drawImage(boardImg, 0, 0, 600, 600);
};

document.getElementById("diceBtn").onclick = () => {
  socket.emit("roll_dice");
};

socket.on("dice_result", (val) => {
  document.getElementById("diceValue").innerText = "Dice: " + val;
});
