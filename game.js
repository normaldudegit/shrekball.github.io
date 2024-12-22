// game.js

// Set up the canvas and game elements
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Set canvas dimensions
canvas.width = 800;
canvas.height = 600;

// Game Variables
const shrekWidth = 50;
const shrekHeight = 80;
const ballRadius = 15;
let shrekX = 100, shrekY = canvas.height / 2 - shrekHeight / 2;
let ballX = canvas.width / 2, ballY = canvas.height / 2;
let ballSpeedX = 0, ballSpeedY = 0;

// Movement Speed
const moveSpeed = 5;
const ballKickSpeed = 7;

// Shrek Image (or placeholder)
const shrekImg = new Image();
shrekImg.src = "https://pngimg.com/uploads/shrek/shrek_PNG37.png"; // Add your own Shrek image URL

// Ball Color
const ballColor = "#FF4500"; // Orange

// Key controls
let leftPressed = false, rightPressed = false, upPressed = false, downPressed = false;

// Event Listeners for Key Presses
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

// Functions to handle key events
function keyDownHandler(e) {
    if (e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = true;
    } else if (e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = true;
    } else if (e.key == "Up" || e.key == "ArrowUp") {
        upPressed = true;
    } else if (e.key == "Down" || e.key == "ArrowDown") {
        downPressed = true;
    }
}

function keyUpHandler(e) {
    if (e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = false;
    } else if (e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = false;
    } else if (e.key == "Up" || e.key == "ArrowUp") {
        upPressed = false;
    } else if (e.key == "Down" || e.key == "ArrowDown") {
        downPressed = false;
    }
}

// Update Shrek's position based on key presses
function updateShrekPosition() {
    if (rightPressed && shrekX < canvas.width - shrekWidth) {
        shrekX += moveSpeed;
    }
    if (leftPressed && shrekX > 0) {
        shrekX -= moveSpeed;
    }
    if (upPressed && shrekY > 0) {
        shrekY -= moveSpeed;
    }
    if (downPressed && shrekY < canvas.height - shrekHeight) {
        shrekY += moveSpeed;
    }
}

// Draw game elements (Shrek and Ball)
function draw() {
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw Shrek
    ctx.drawImage(shrekImg, shrekX, shrekY, shrekWidth, shrekHeight);

    // Draw Ball
    ctx.beginPath();
    ctx.arc(ballX, ballY, ballRadius, 0, Math.PI * 2);
    ctx.fillStyle = ballColor;
    ctx.fill();
    ctx.closePath();
}

// Update the ball's movement
function updateBallPosition() {
    ballX += ballSpeedX;
    ballY += ballSpeedY;

    // Ball collision with walls
    if (ballX + ballRadius > canvas.width || ballX - ballRadius < 0) {
        ballSpeedX = -ballSpeedX;
    }
    if (ballY + ballRadius > canvas.height || ballY - ballRadius < 0) {
        ballSpeedY = -ballSpeedY;
    }

    // Ball collision with Shrek (kick the ball)
    if (ballX + ballRadius > shrekX && ballX - ballRadius < shrekX + shrekWidth &&
        ballY + ballRadius > shrekY && ballY - ballRadius < shrekY + shrekHeight) {
        // Kick the ball
        ballSpeedX = (ballX < shrekX + shrekWidth / 2) ? -ballKickSpeed : ballKickSpeed;
        ballSpeedY = (ballY < shrekY + shrekHeight / 2) ? -ballKickSpeed : ballKickSpeed;
    }
}

// Main game loop
function gameLoop() {
    updateShrekPosition();
    updateBallPosition();
    draw();
    requestAnimationFrame(gameLoop);
}

// Start the game loop when the image loads
shrekImg.onload = () => {
    gameLoop();
};
