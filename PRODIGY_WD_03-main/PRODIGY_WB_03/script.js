const cells = document.querySelectorAll('.cell');
const symbolButtons = document.querySelectorAll('.symbol-btn');
const board = document.getElementById('board');
const overlay = document.getElementById('overlay');
const overlayMessage = document.getElementById('overlay-message');
const resetBtn = document.getElementById('reset');
let boardState = Array(9).fill('');
let playerSymbol = '';
let aiSymbol = '';
let currentPlayer = '';
symbolButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    playerSymbol = btn.getAttribute('data-symbol');
    aiSymbol = playerSymbol === 'X' ? 'O' : 'X';
    currentPlayer = Math.random() < 0.5 ? playerSymbol : aiSymbol;
    document.getElementById('symbol-choice').style.display = 'none';
    board.style.display = 'grid';
    if (currentPlayer === aiSymbol) aiMove();
  });
});
cells.forEach(cell => {
  cell.addEventListener('click', () => {
    const index = cell.getAttribute('data-index');
    if (boardState[index] === '' && currentPlayer === playerSymbol) {
      boardState[index] = playerSymbol;
      cell.textContent = playerSymbol;
      if (checkWinner(playerSymbol)) {
        showOverlay('You Win!');
      } else if (boardState.every(cell => cell !== '')) {
        showOverlay('Draw!');
      } else {
        currentPlayer = aiSymbol;
        setTimeout(aiMove, 500);
      }
    }
  });
});
function aiMove() {
  let empty = boardState.map((val, i) => val === '' ? i : null).filter(v => v !== null);
  let move = empty[Math.floor(Math.random() * empty.length)];
  boardState[move] = aiSymbol;
  cells[move].textContent = aiSymbol;
  if (checkWinner(aiSymbol)) {
    showOverlay('You Lose!');
  } else if (boardState.every(cell => cell !== '')) {
    showOverlay('Draw!');
  } else {
    currentPlayer = playerSymbol;
  }
}
function checkWinner(symbol) {
  const winCombos = [
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6]
  ];
  return winCombos.some(combo => combo.every(i => boardState[i] === symbol));
}
function showOverlay(msg) {
  overlayMessage.textContent = msg;
  overlay.style.display = 'flex';
}
resetBtn.addEventListener('click', () => {
  boardState = Array(9).fill('');
  cells.forEach(cell => cell.textContent = '');
  overlay.style.display = 'none';
  document.getElementById('symbol-choice').style.display = 'block';
  board.style.display = 'none';
});
