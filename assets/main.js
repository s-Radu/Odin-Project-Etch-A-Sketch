//< Variables

const slider = document.getElementById("customRange1");
const gameBoard = document.getElementById("grid");
const reset = document.getElementById("reset");

const colour = document.getElementById("colour");
const colourCircle = document.getElementById("colour-circle");

const buttonModes = document.querySelectorAll(
  "#colourMode, #rainbowMode, #shadowMode, #eraser"
);
const colourModeBtn = buttonModes[0];
const rainbowModeBtn = buttonModes[1];
const shadowModeBtn = buttonModes[2];
const eraserBtn = buttonModes[3];

let isClicked = false;

//* Generate random color to be used with rainbowModeBtn
const randomColor = Math.floor(Math.random() * 16777215).toString(16);

//< Functions

function updateGameBoard() {
  const squares = slider.value;

  gameBoard.innerHTML = "";
  gameBoard.style.gridTemplateRows = `repeat(${squares}, 1fr)`;
  gameBoard.style.gridTemplateColumns = `repeat(${squares}, 1fr)`;

  for (let i = 0; i < squares * squares; i++) {
    const square = createSquare();
    gameBoard.appendChild(square);
  }

  gameBoard.addEventListener("mousedown", () => {
    isClicked = true;
  });

  gameBoard.addEventListener("mouseup", () => {
    isClicked = false;
  });

  gameBoard.addEventListener("mouseover", handleSquareInteraction);
  gameBoard.addEventListener("mousedown", handleSquareInteraction);
}

function createSquare() {
  const square = document.createElement("div");
  square.classList.add("square");
  return square;
}

function handleSquareInteraction(event) {
  if (event.target.classList.contains("square")) {
    const square = event.target;

    if (isClicked) {
      if (colourModeBtn.classList.contains("active")) {
        square.style.backgroundColor = selectedColor;
      } else if (rainbowModeBtn.classList.contains("active")) {
        square.style.backgroundColor = randomDotColour();
      } else if (shadowModeBtn.classList.contains("active")) {
        handleShadowMode(square);
      } else if (eraserBtn.classList.contains("active")) {
        square.style.backgroundColor = "white";
      }
    }
  }
}

function handleShadowMode(square) {
  if (!square.hasAttribute("data-opacity")) {
    square.setAttribute("data-opacity", 0.1);
    square.style.backgroundColor = `rgba(0, 0, 0, 0.1)`;
  } else {
    let currentOpacity = parseFloat(square.getAttribute("data-opacity"));
    currentOpacity += 0.1;
    square.setAttribute("data-opacity", currentOpacity);
    square.style.backgroundColor = `rgba(0, 0, 0, ${currentOpacity})`;
  }
}

function randomDotColour() {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function handleColourCircleClick() {
  colour.click();
}

function handleColourChange() {
  selectedColor = this.value;
  colourCircle.style.backgroundColor = selectedColor;
}

function resetGameBoard() {
  //* reset the board

  const gridCells = gameBoard.querySelectorAll(".square");
  gridCells.forEach((cell) => {
    cell.style.backgroundColor = "white";
  });

  isMouseDown = false;
}

buttonModes.forEach((btn) => {
  btn.addEventListener("click", () => {
    buttonModes.forEach((otherButton) =>
      otherButton.classList.remove("active")
    );
    btn.classList.add("active");
  });
});

//< Event listeners

//* Prevent the default drag behaviour when the user plays with the game board

gameBoard.addEventListener("selectstart", (e) => {
  e.preventDefault();
});
slider.addEventListener("change", updateGameBoard);
reset.addEventListener("click", resetGameBoard);

colourCircle.addEventListener("click", handleColourCircleClick);
colour.addEventListener("input", handleColourChange);
