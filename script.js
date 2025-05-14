(function() {
  // Get references to game elements
  const board = document.getElementById('board');
  const cells = document.querySelectorAll('.cell');
  const statusDisplay = document.getElementById('status');
  const resetButton = document.getElementById('reset');

  let currentPlayer = 'X'; // Keeps track of the current player
  let gameActive = true; // Game state
  let gameState = ['', '', '', '', '', '', '', '', '']; // Stores moves

  // winning combinations
  const winningConditions = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], 
    [0, 3, 6], [1, 4, 7], [2, 5, 8], 
    [0, 4, 8], [2, 4, 6]
  ];

  function handleCellClick(event) {
    const clickedCell = event.target;
    const clickedCellIndex = parseInt(clickedCell.getAttribute('data-index'));

    // Prevent selecting an already chosen cell or if game is over
    if (gameState[clickedCellIndex] !== '' || !gameActive) {
      return;
    }

    // Update game state and UI
    gameState[clickedCellIndex] = currentPlayer;
    clickedCell.textContent = currentPlayer;
    clickedCell.classList.add('disabled');

    checkResult();
  }

  function checkResult() {
    let roundWon = false;

    // Check if any winning combination is met
    for (let i = 0; i < winningConditions.length; i++) {
      const [a, b, c] = winningConditions[i];
      if (gameState[a] === '' || gameState[b] === '' || gameState[c] === '') {
        continue;
      }
      if (gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
        roundWon = true;
        highlightWinningCells(a, b, c);
        break;
      }
    }

    if (roundWon) {
      statusDisplay.textContent = `Player ${currentPlayer} has won! 🎉`;
      gameActive = false;
      disableAllCells();
      return;
    }

    if (!gameState.includes('')) {
      statusDisplay.textContent = 'Game ended in a tie!';
      gameActive = false;
      return;
    }

    // Switch players if the game is still active
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    statusDisplay.textContent = `Current Player: ${currentPlayer}`;
  }

  function highlightWinningCells(a, b, c) {
    // Highlight winning cells
    cells[a].style.backgroundColor = '#76d275';
    cells[b].style.backgroundColor = '#76d275';
    cells[c].style.backgroundColor = '#76d275';
  }

  function disableAllCells() {
    // Disable interaction with all cells after the game ends
    cells.forEach(cell => {
      cell.classList.add('disabled');
    });
  }

  function resetGame() {
    // Reset game state and UI
    currentPlayer = 'X';
    gameActive = true;
    gameState = ['', '', '', '', '', '', '', '', ''];
    statusDisplay.textContent = `Current Player: ${currentPlayer}`;
    cells.forEach(cell => {
      cell.textContent = '';
      cell.classList.remove('disabled');
      cell.style.backgroundColor = '#f9f9f9';
    });
  }

 
  cells.forEach(cell => cell.addEventListener('click', handleCellClick));
  resetButton.addEventListener('click', resetGame);

  
  cells.forEach(cell => {
    cell.addEventListener('keydown', event => {
      if ((event.key === 'Enter' || event.key === ' ') && gameActive) {
        event.preventDefault();
        cell.click();
      }
    });
  });
})();
