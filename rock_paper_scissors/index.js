// Game Play
let playerScore = 0;
let computerScore = 0;
let roundWinner = '';

const playround = (playerSelection, computerSelection) => {
  if (playerSelection === computerSelection) {
    roundWinner = "tie";
  }
  if (
    (playerSelection === "ROCK" &&  computerSelection === "SCISSORS") ||
    (playerSelection === "SCISSORS" && computerSelection === "PAPER") ||
    (playerSelection === "PAPER" && computerSelection === "ROCK")
  ) {
    playerScore++;
    roundWinner = "player";
  }
  if (
    (playerSelection === "SCISSORS" &&  computerSelection === "ROCK") ||
    (playerSelection === "PAPER" && computerSelection === "SCISSORS") ||
    (playerSelection === "ROCK" && computerSelection === "PAPER")
  ) {
    computerScore++;
    roundWinner = "computer";
  }
}

const getRandomValue = () => {
  const selectionArr = ['ROCK', 'PAPER', 'SCISSORS'];
  const randomSelection = Math.floor(Math.random() * selectionArr.length);
  return selectionArr[randomSelection];
}

const isGameOver = () => {
  return playerScore === 5 || computerScore === 5;
}

// DOM MANIPULATION
const scoreInfo = document.getElementById("score-info");
const playerScoreSection = document.getElementById("score-section__player");
const computerScoreSection = document.getElementById("score-section__computer");

const rockButton = document.getElementById("icon-rock");
const paperButton = document.getElementById("icon-paper");
const scissorsButton = document.getElementById("icon-scissors");
const playerIcon = document.getElementById('player-icon');
const computerIcon = document.getElementById('computer-icon');
const endgameModal = document.getElementById('endgame-modal');
const endgameMessage = document.getElementById('endgame-message');
const overlay = document.getElementById('overlay');
const restartBtn = document.getElementById("restart-button");

rockButton.addEventListener('click',() => handleClick('ROCK'));
paperButton.addEventListener('click',() => handleClick('PAPER'));
scissorsButton.addEventListener('click',() => handleClick('SCISSORS'));
restartBtn.addEventListener('click',() => restartGame());
overlay.addEventListener('click',() => closeModal());

function handleClick(playerSelection) {
  if (isGameOver()) {
    openModal();
    return;
  }

  const computerSelection = getRandomValue();
  playround(playerSelection, computerSelection);
  updateChoices(playerSelection, computerSelection);
  updateScore();

  if (isGameOver()) {
    openModal();
    setFinalMessage();
  }
}

function updateChoices(playerSelection, computerSelection) {
  const updatePlayerIcon = `fa-hand-${playerSelection.toLowerCase()}`;
  const updateComputerIcon = `fa-hand-${computerSelection.toLowerCase()}`;

  playerIcon.classList = `fa ${updatePlayerIcon} active`;
  computerIcon.classList = `fa ${updateComputerIcon} active`;
}

function updateScore() {
  if(roundWinner === 'tie') {
    scoreInfo.textContent = "It's a TIE";
  } else if ( roundWinner === 'player') {
    scoreInfo.textContent = "You won!";
  } else if ( roundWinner === 'computer') {
    scoreInfo.textContent = "You lost!";
  }

  playerScoreSection.textContent = `Player: ${playerScore}`;
  computerScoreSection.textContent = `Computer: ${computerScore}`;
}

function openModal() {
  endgameModal.classList.add('active');
  overlay.classList.add('active');
}

function closeModal() {
  endgameModal.classList.remove('active');
  overlay.classList.remove('active');
}

function setFinalMessage() {
  return playerScore > computerScore
  ? (endgameMessage.textContent = 'You won')
  : (endgameMessage.textContent = 'You lost')
}

function restartGame() {
  playerScore = 0;
  computerScore = 0;
  scoreInfo.textContent = 'Score';
  playerScoreSection.textContent = 'Player: 0';
  computerScoreSection.textContent = 'Computer: 0';
  playerIcon.classList.remove('active');
  computerIcon.classList.remove('active');
  endgameModal.classList.remove('active');
  overlay.classList.remove('active');
}