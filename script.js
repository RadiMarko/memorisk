// INITIAL ARRAYS, LEVEL COUNTER, HIGH SCORE COUNTER, BODY

const colorOptions = ["red", "green", "blue", "gold"];
let gameArray = [];
let playerArray = [];

const levelCounter = document.querySelector(".current-counter");
levelCounter.textContent = 0;

const highScore = document.querySelector(".high-score-counter");
highScore.textContent = 0;

const body = document.querySelector("body");

// FUNCTION FOR GENERATING A RANDOM COLOR, MAKING MATCHING BUTTON FLASH, AND RESETTING PLAYER ARRAY

function randomGenerator() {
  const randomNumber = Math.floor(Math.random() * 4);
  const generatedColor = colorOptions[randomNumber];
  gameArray.push(generatedColor);

  playerArray = [];

  const chosenButton = document.querySelector(`#${generatedColor}`);

  chosenButton.style.background = "white";

  setTimeout(function () {
    chosenButton.style.background = "";
  }, 600);
}

// FUNCTION FOR GAME OVER

function gameOver() {
  body.style.background = "rgb(220, 91, 91)";
  if (levelCounter.textContent > highScore.textContent) {
    highScore.textContent = levelCounter.textContent;
  }
  gameArray = [];
  playerArray = [];
}

// HANDLING START AND RESET BUTTONS

let isGameOn = false;

const startButton = document.querySelector(".start-button");
startButton.addEventListener("click", function () {
  if (!isGameOn) {
    randomGenerator();
    startButton.textContent = "Reset";
    isGameOn = true;
    body.style.background = "";
  } else {
    gameArray = [];
    startButton.textContent = "Start";
    isGameOn = false;
    gameOver();
    levelCounter.textContent = 0;
    body.style.background = "";
  }
});

// HANDLING COLOR BUTTONS

const gameButton = document.querySelectorAll(".game-button");

for (let i = 0; i < gameButton.length; i++) {
  gameButton[i].addEventListener("click", function (event) {
    // If game is on, adding picked colors to the player array
    if (isGameOn) {
      const playerColor = event.target.id;
      playerArray.push(playerColor);

      // Check if player color matches game array at the same position
      const currentIndex = playerArray.length - 1;
      if (playerColor !== gameArray[currentIndex]) {
        gameOver();
        return;
      }

      // If sequence so far is correct but incomplete, allowing more clicks
      if (playerArray.length === gameArray.length) {
        randomGenerator();
        levelCounter.textContent++;
      }
    }
  });
}

// GETTING AND DISPLAYING CURRENT YEAR

const devYear = document.querySelector(".dev-year");
const date = new Date();
devYear.textContent = date.getFullYear();
