document.addEventListener('DOMContentLoaded', () => {
    const cells = document.querySelectorAll('.cell');
    const message = document.getElementById('message');
    let currentPlayer = 'X';
    let board = Array(9).fill('');
    let gameActive = true;

    const winningConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    const checkWinner = () => {
        for (const condition of winningConditions) {
            const [a, b, c] = condition;
            if (board[a] && board[a] === board[b] && board[a] === board[c]) {
                return board[a];
            }
        }
        return board.includes('') ? null : 'Tie';
    };

    const handleClick = (e) => {
        const cellIndex = e.target.dataset.index;
        if (board[cellIndex] || !gameActive) return;

        board[cellIndex] = currentPlayer;
        e.target.textContent = currentPlayer;

        const winner = checkWinner();
        if (winner) {
            gameActive = false;
            message.textContent = winner === 'Tie' ? 'It\'s a Tie!' : `${winner} Wins!`;
            return;
        }

        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    };

    cells.forEach(cell => cell.addEventListener('click', handleClick));
});
