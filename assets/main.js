//< Variables

const slider = document.getElementById("customRange1");
const gameBoard = document.getElementById("grid");
const reset = document.getElementById("reset");

const colour = document.getElementById("colour");
const colourCircle = document.getElementById("colour-circle");

const buttonModes = document.querySelectorAll(
  "#colourMode, #rainbowMode, #eraser"
);

let isMouseDown = false;
let selectedColor = colour.value;

//< Functions

function updateGameBoard() {
  let squares = slider.value;

  gameBoard.innerHTML = "";
  gameBoard.style.gridTemplateRows = `repeat(${squares}, 1fr)`;
  gameBoard.style.gridTemplateColumns = `repeat(${squares}, 1fr)`;

  for (let i = 0; i < squares * squares; i++) {
    let square = document.createElement("div");
    square.classList.add("square");

    //* event listeners for mouseover and mousedown
    //> As the event listeners are added inside the for loop, each square that's added to the game board gets all these event listeners

    square.addEventListener("mousedown", () => {
      square.classList.add("hov-square");
      square.style.backgroundColor = selectedColor;
      isMouseDown = true;
    });

    square.addEventListener("mouseover", () => {
      if (isMouseDown) {
        square.classList.add("hov-square");
        square.style.backgroundColor = selectedColor;
      }
    });

    square.addEventListener("mouseup", () => {
      isMouseDown = false;
    });

    gameBoard.appendChild(square);
  }
}

function handleColourCircleClick() {
  colour.click();
}

function handleColourChange() {
  selectedColor = this.value;
  colourCircle.style.backgroundColor = selectedColor;
  console.log(selectedColor);
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
