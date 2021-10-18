// Game state
let gameActive = true;
let currentPlayer = 'X';
let gameState = ['','','','','','','','',''];
const winningCondition = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

function handleCellPlayed(clickedCell, clickedCellIndex) {
  gameState[clickedCellIndex] = currentPlayer;
  clickedCell.innerHTML = currentPlayer;
}

function handlePlayerChange() {
  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  console.log(currentPlayer)
  console.log(`It's ${currentPlayer} turn`)
}

function handleResultValidation() {
  let roundWon = false;
  for (let i=0; i<=7; i++) {
    const winCondition = winningCondition[i];
    let a = gameState[winCondition[0]];
    let b = gameState[winCondition[1]];
    let c = gameState[winCondition[2]];

    if (a === '' || b === '' || c === '') {
      continue;
    }
    if (a === b && b === c) {
      roundWon = true;
      break;
    }
  }
  if (!!roundWon) {
    console.log(`Player ${currentPlayer} has won`);
    gameActive = false;
    return;
  }

  let roundDraw = !gameState.includes('');
  if (roundDraw) {
    console.log('it a draw');
    gameActive = false;
    return;
  }
  handlePlayerChange();
}

function handleCellClick(e) {
  const clickedCell = e.target.firstChild;
  const clickedCellIndex = parseInt(clickedCell.getAttribute('data-cell-index'));
  // console.log(`clicked cell : ${clickedCell} and index : ${clickedCellIndex}`)

  if (gameState[clickedCellIndex] !== '' || !gameActive) {
    return;
  }

  handleCellPlayed(clickedCell, clickedCellIndex);
  handleResultValidation();
}

function handleRestartGame() {
  gameActive = true;
  currentPlayer = 'X';
  gameState = ['','','','','','','','',''];

  document.querySelectorAll('.field').forEach(cell => {
    cell.firstChild.textContent = ''
  })
}

document.querySelectorAll('.field').forEach(cell => {
  cell.onclick = handleCellClick;
})
document.querySelector('.restart').onclick = handleRestartGame;
