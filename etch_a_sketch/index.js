// Element select (UI) and Default values
const grid = document.querySelector('#grid');
const colorPicker = document.querySelector('.colorPicker');
const colorButton = document.querySelector('#color-btn');
const rainbowButton = document.querySelector('#rainbow-btn');
const eraser = document.querySelector('#eraser-btn');
const resetButton = document.querySelector('#reset');
const sizeValue = document.querySelector('#sizeValue');
const slider = document.querySelector("#sizeSlider");

colorPicker.onclick = (e) => setCurrentColor(e.target.value);
colorButton.onclick = () => setCurrentMode('color');
rainbowButton.onclick = () => setCurrentMode('rainbow');
eraser.onclick = (e) => setCurrentMode('eraser');
resetButton.onclick = () => resetGrid();
slider.onmousemove = (e) => updateSizeValue(e.target.value);
slider.onchange = (e) => changeGridSize(e.target.value);

let currentColor = '#082032';
let currentMode = 'color';
let currentSize = 16;

// Logic function
function setCurrentColor(color) {
  currentColor = color;
}

function setCurrentMode(mode) {
  activateButton(mode);
  currentMode = mode;
}

function setCurrentSize(size) {
  currentSize = size;
}

function changeGridSize(value) {
  setCurrentSize(value);
  updateSizeValue(value);
  resetGrid();
}

function updateSizeValue(value) {
  sizeValue.innerHTML = `${value} * ${value}`;
}

function resetGrid() {
  clearGrid();
  setUpGrid(currentSize);
}

function clearGrid() {
  grid.innerHTML = '';
}

function setUpGrid(size) {
  grid.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
  grid.style.gridTemplateRows = `repeat(${size}, 1fr)`;

  for (let i=0; i < size * size; i++) {
    const gridElement = document.createElement('div');
    gridElement.addEventListener('mouseover', changeColor)
    grid.appendChild(gridElement);
  }
}

function changeColor(e) {
  if (currentMode === 'rainbow') {
    const randR = Math.floor(Math.random() * 125 + 180);
    const randG = Math.floor(Math.random() * 125 + 180)
    const randB = Math.floor(Math.random() * 125 + 220)
    e.target.style.backgroundColor = `rgb(${randR}, ${randG}, ${randB})`;
  } else if (currentMode === 'color') {
    e.target.style.backgroundColor = currentColor;
  } else if (currentMode === 'eraser') {
    e.target.style.backgroundColor = '#fefefe';
  }
}

function activateButton(mode) {
  if(currentMode === 'rainbow') {
    rainbowButton.classList.remove('active');
  } else if (currentMode === 'color') {
    colorButton.classList.remove('active');
  } else if (currentMode === 'eraser') {
    eraser.classList.remove('active');
  }

  if (mode === 'rainbow') {
    rainbowButton.classList.add('active');
  } else if (mode === 'color') {
    colorButton.classList.add('active');
  } else if (mode === 'eraser') {
    eraser.classList.add('active');
  }
}

window.onload = () => {
  setUpGrid(currentSize);
  activateButton(currentMode);
}