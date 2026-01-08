// Get canvas and context
const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

// 1. Draw filled rectangle
ctx.fillStyle = "lightblue";
ctx.fillRect(30, 30, 150, 80);

// 2. Draw filled circle
ctx.beginPath();
ctx.arc(410, 80, 50, 0, Math.PI * 2);
ctx.fillStyle = "orange";
ctx.fill();

// 3. Draw straight line
ctx.beginPath();
ctx.moveTo(20, 250);
ctx.lineTo(480, 250);
ctx.strokeStyle = "black";
ctx.lineWidth = 2;
ctx.stroke();

// 4. Draw text
ctx.font = "24px Arial";
ctx.fillStyle = "green";
ctx.fillText("HTML5 Canvas", 170, 200);
