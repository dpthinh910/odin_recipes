// Element select (UI)
const container = document.querySelector('.container');
const resetButton = document.querySelector('#reset');
// Logic function
container.addEventListener('mouseover', createTrail);
resetButton.addEventListener('click', resetCanvas);
createGridSquares(64,64);

function createGridSquares(row, column) {
  container.style.setProperty('--grid-rows', row);
  container.style.setProperty('--grid-cols', column);
  for(let i=0; i < (row * column); i++) {
    const grid = document.createElement('div');
    container.appendChild(grid).className = 'grid-item';
  }
}

function createTrail() {
  const childNodes = container.children;
  Array.from(childNodes).forEach(childNode => {
    childNode.addEventListener('mouseover', () => {
      childNode.style.backgroundColor = 'red';
    })
  })
}

function resetCanvas() {
  Array.from(container.children).forEach(child => {
    child.style.backgroundColor = '#ffffff';
  })
}