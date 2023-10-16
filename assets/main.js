const slider = document.getElementById("customRange1");
const gameBoard = document.getElementById("grid");
const reset = document.getElementById("reset");

let isMouseDown = false;

function updateGameBoard() {
  let squares = slider.value;

  gameBoard.innerHTML = "";
  gameBoard.style.gridTemplateRows = `repeat(${squares}, 1fr)`;
  gameBoard.style.gridTemplateColumns = `repeat(${squares}, 1fr)`;

  for (let i = 0; i < squares * squares; i++) {
    let square = document.createElement("div");
    square.classList.add("square");
    square.style.border = `1px solid black`;

    //* event listeners for mouseover and mousedown
    //> As the event listeners are added inside the for loop, each square that's added to the game board gets all these event listeners

    square.addEventListener("mousedown", () => {
      square.classList.add("hov-square");
      isMouseDown = true;
    });

    square.addEventListener("mouseover", () => {
      if (isMouseDown) {
        square.classList.add("hov-square");
      }
    });

    square.addEventListener("mouseup", () => {
      isMouseDown = false;
    });

    gameBoard.appendChild(square);
  }

  //* Event listener only for mouseover

  // const gridcells = gameBoard.querySelectorAll(".square");

  // gridcells.forEach((cell) => {
  //   cell.addEventListener("mouseover", () => {
  //     cell.classList.add("hov-square");
  //   });
  // });
}

slider.addEventListener("change", updateGameBoard);

function resetGameBoard() {
  //* reset the board

  gameBoard.innerHTML = "";
  slider.value = 0;
}

reset.addEventListener("click", resetGameBoard);
