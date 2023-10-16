const slider = document.getElementById("customRange1");
const gameBoard = document.getElementById("grid");
const reset = document.getElementById("reset");
const gridCells = document.querySelectorAll(".square");

slider.addEventListener("change", () => {
  let squares = slider.value;

  gameBoard.innerHTML = "";
  gameBoard.style.gridTemplateRows = `repeat(${squares}, 1fr)`;
  gameBoard.style.gridTemplateColumns = `repeat(${squares}, 1fr)`;

  for (let i = 0; i < squares * squares; i++) {
    let square = document.createElement("div");
    square.classList.add(".square");
    square.style.border = `1px solid black`;
    square.style.zIndex = `9`;
    gameBoard.appendChild(square);
  }
});

gridCells.forEach((cell) => {
  cell.addEventListener("mouseover", () => {
    cell.classList.add("hov-square");
  });
});

reset.addEventListener("click", resetGameBoard);

function resetGameBoard() {
  gridCells.forEach((cell) => {
    cell.classList.remove("hov-square");
    gameBoard.removeChild(cell);
  });
}
