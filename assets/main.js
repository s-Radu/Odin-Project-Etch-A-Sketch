let range = document.getElementById("customRange1");
const rangeValueDisplay = document.getElementById("rangeValue");

rangeValueDisplay.textContent = range.value;

range.addEventListener("input", (e) => {
  rangeValueDisplay.textContent = e.target.value;
});
