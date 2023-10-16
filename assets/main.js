const slider = document.getElementById("customRange1");
const gameBoard = document.getElementById("grid");
const reset = document.getElementById("reset");

slider.addEventListener("change", () => {
  let squares = slider.value;

  gameBoard.innerHTML = "";
  gameBoard.style.gridTemplateRows = `repeat(${squares}, 1fr)`;
  gameBoard.style.gridTemplateColumns = `repeat(${squares}, 1fr)`;

  for (let i = 0; i < squares * squares; i++) {
    let square = document.createElement("div");
    square.classList.add("square");
    square.style.border = `1px solid black`;
    gameBoard.appendChild(square);
  }

  const gridCells = gameBoard.querySelectorAll(".square");

  gridCells.forEach((cell) => {
    cell.addEventListener("mouseover", () => {
      cell.classList.add("hov-square");
    });
  });
});

function resetGameBoard() {
  //* reset the board

  gameBoard.innerHTML = "";
  slider.value = 0;
}

reset.addEventListener("click", resetGameBoard);
