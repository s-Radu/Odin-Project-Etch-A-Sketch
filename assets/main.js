const slider = document.getElementById("customRange1");
const sliderValueDisplay = document.getElementById("rangeValue");
const gameBoard = document.getElementById("grid");
const gridSquares = document.querySelectorAll(".grid div");

let timeout;
let divs = [];
let currentValue = null;

slider.addEventListener("input", () => {
  // Clear any previous timeout to debounce the event
  clearTimeout(timeout);

  // Set a timeout to wait for the user to stop sliding
  timeout = setTimeout(() => {
    if (slider.value !== currentValue) {
      currentValue = slider.value;
      clearGrid();
      createDivGrid(currentValue, currentValue); // Pass slider value for rows and columns
    }
  }, 500);
});

function clearGrid() {
  const value = slider.value;
  sliderValueDisplay.textContent = value;
  // Clear existing divs in the grid
  while (grid.firstChild) {
    grid.removeChild(grid.firstChild);
  }
  divs = [];
}

function createDivGrid(numRows, numCols) {
  for (let i = 0; i < numRows; i++) {
    for (let j = 0; j < numCols; j++) {
      const div = document.createElement("div");
      //   div.classList.add("grid-item"); // You can apply your own CSS styles
      gameBoard.appendChild(div);
      divs.push(div);
    }
  }
}
