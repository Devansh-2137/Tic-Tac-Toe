document.addEventListener('DOMContentLoaded', () => {
    const statusDisplay = document.getElementById('status');
    const cells = document.querySelectorAll('.cell');
    const restartButton = document.getElementById('restart');
    
    let gameActive = true;
    let currentPlayer = 'X';
    let gameState = ['', '', '', '', '', '', '', '', ''];
    
    const winningConditions = [
        [0, 1, 2], // Top row
        [3, 4, 5], // Middle row
        [6, 7, 8], // Bottom row
        [0, 3, 6], // Left column
        [1, 4, 7], // Middle column
        [2, 5, 8], // Right column
        [0, 4, 8], // Diagonal top-left to bottom-right
        [2, 4, 6]  // Diagonal top-right to bottom-left
    ];
    
    // Game messages
    const winningMessage = () => `Player ${currentPlayer} has won!`;
    const drawMessage = () => `Game ended in a draw!`;
    const currentPlayerTurn = () => `Player ${currentPlayer}'s turn`;
    
    // Set initial game status
    statusDisplay.textContent = currentPlayerTurn();
    
    // Handle cell click
    function handleCellClick(clickedCellEvent) {
        const clickedCell = clickedCellEvent.target;
        const clickedCellIndex = parseInt(clickedCell.getAttribute('data-cell-index'));
        
        // Ignore click if cell is already filled or game is not active
        if (gameState[clickedCellIndex] !== '' || !gameActive) {
            return;
        }
        
        // Update game state and UI
        gameState[clickedCellIndex] = currentPlayer;
        clickedCell.textContent = currentPlayer;
        
        // Check for win or draw
        checkResult();
    }
    
    // Check game result after each move
    function checkResult() {
        let roundWon = false;
        
        // Check all winning conditions
        for (let i = 0; i < winningConditions.length; i++) {
            const [a, b, c] = winningConditions[i];
            const condition = gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c];
            
            if (condition) {
                roundWon = true;
                break;
            }
        }
        
        // Handle win
        if (roundWon) {
            statusDisplay.textContent = winningMessage();
            gameActive = false;
            return;
        }
        
        // Handle draw
        if (!gameState.includes('')) {
            statusDisplay.textContent = drawMessage();
            gameActive = false;
            return;
        }
        
        // Continue game with next player
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        statusDisplay.textContent = currentPlayerTurn();
    }
    
    // Restart game
    function restartGame() {
        gameActive = true;
        currentPlayer = 'X';
        gameState = ['', '', '', '', '', '', '', '', ''];
        statusDisplay.textContent = currentPlayerTurn();
        cells.forEach(cell => {
            cell.textContent = '';
        });
    }
    
    // Add event listeners
    cells.forEach(cell => {
        cell.addEventListener('click', handleCellClick);
    });
    
    restartButton.addEventListener('click', restartGame);
});