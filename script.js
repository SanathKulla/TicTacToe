// initial varibles
let turn = "X";
let isGameOver = false;
let cntOfMoves = 0;
let currentMode = "light";

// winning cominations
const winningComboniations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

// reading 9 * 9 game gird as an array
let cells = Array.from(document.getElementsByClassName("cell"));

//function to check if we got a winner after making a move
const checkWinner = () => {
  let combo = null;
  winningComboniations.forEach((combination) => {
    if (
      cells[combination[0]].innerText !== "" &&
      cells[combination[0]].innerText === cells[combination[1]].innerText &&
      cells[combination[1]].innerText === cells[combination[2]].innerText
    ) {
      combo = combination;
    }
  });
  return combo;
};

// function to change player turn
function changeTurn() {
  return turn === "X" ? "O" : "X";
}

//function for game logic
function gameLogic(e){
    if (e.target.querySelector("span").innerText === "" && !isGameOver) {
      e.target.querySelector("span").innerText = turn;
      let combination = checkWinner();
      if (combination !== null) {
        cells[combination[0]].querySelector("span").style.color = "yellow";
        cells[combination[1]].querySelector("span").style.color = "yellow";
        cells[combination[2]].querySelector("span").style.color = "yellow";
        document.querySelector(
          ".game-text-container"
        ).innerText = `${turn} has won`;
        isGameOver = true;
      } else {
        turn = changeTurn();
        document.querySelector(
          ".game-text-container"
        ).innerText = `${turn} to play`;
      }
      ++cntOfMoves;
      if (cntOfMoves === 9 && !isGameOver) {
        document.querySelector(
          ".game-text-container"
        ).innerText = `It's a Draw`;
        isGameOver = true;
      }
    }
  }

//events to occur if user clicks on a cell of 9*9 game grid
cells.forEach((cell) => {
  cell.addEventListener("click",gameLogic);
});

let resetbtn = document.querySelector(".reset-button");

//fucntion for resetting game board
const resetGameBoard =  () => {
  cells.forEach((cell) => {
    cell.querySelector("span").innerText = "";
    // these are necessary because we need to change the color of winning blocks back to default
    if (currentMode === "light")
      cell.querySelector("span").style.color = "black";
    else cell.querySelector("span").style.color = "white";
  });
  turn = "X";
  isGameOver = false;
  cntOfMoves = 0;
  document.querySelector(".game-text-container").innerText = `${turn} to play`;
};

// events to occur if user clicks on reset button
resetbtn.addEventListener("click",resetGameBoard);

let mainBody = document.querySelector(".main");
let root = document.querySelector(":root");
let headerContainer = document.querySelector(".header-container");
let gameTextContainer = document.querySelector(".game-text-container");
let modeBtn = document.querySelector(".mode-button");

// function to switch to darkmode
function switchToDarkMode() {
  mainBody.style.background =
    getComputedStyle(root).getPropertyValue("--dark-color");
  headerContainer.style.background =
    getComputedStyle(root).getPropertyValue("--white-color");
  gameTextContainer.style.background =
    getComputedStyle(root).getPropertyValue("--white-color");
  headerContainer.style.color = "black";
  gameTextContainer.style.color = "black";
  resetbtn.style.background = "grey";
  cells.forEach((cell) => {
    cell.style.color = "white";
    if (cell.querySelector("span").style.color === "black")
      cell.querySelector("span").style.color = "white";
  });
  modeBtn.style.background = "grey";
  currentMode = "dark";
}

//function to switch to light mode
function switchToLightMode() {
  mainBody.style.background =
    getComputedStyle(root).getPropertyValue("--light-color");
  headerContainer.style.background = "black";
  gameTextContainer.style.background = "black";
  headerContainer.style.color = "white";
  gameTextContainer.style.color = "white";
  resetbtn.style.background = "white";
  cells.forEach((cell) => {
    cell.style.color = "black";
    if (cell.querySelector("span").style.color === "white")
      cell.querySelector("span").style.color = "black";
  });
  modeBtn.style.background = "lightcoral";
  currentMode = "light";
}

//event switching the mode of page
modeBtn.addEventListener("click", () => {
  if (currentMode === "light") {
    switchToDarkMode();
  } else {
    switchToLightMode();
  }
});

// hover effects for mode button
modeBtn.addEventListener("mousemove", () => {
  if (currentMode === "light") modeBtn.style.background = "lightcoral";
  else modeBtn.style.background = "grey";
  modeBtn.style.fontWeight = "700";
});
modeBtn.addEventListener("mouseleave", () => {
  if (currentMode === "light") modeBtn.style.background = "white";
  else modeBtn.style.background = "lightgrey";
  modeBtn.style.fontWeight = "400";
});

// hover effects for reset button
resetbtn.addEventListener("mousemove", () => {
  if (currentMode === "light") resetbtn.style.background = "lightcoral";
  else resetbtn.style.background = "silver";
});
resetbtn.addEventListener("mouseleave", () => {
  if (currentMode === "light") resetbtn.style.background = "white";
  else resetbtn.style.background = "grey";
});
