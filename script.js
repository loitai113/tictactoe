(() => {
    const cells = document.querySelectorAll('.cell')
    const statusDisplay = document.querySelector(".game--status")
    let gameState = ["", "", "", "", "", "", "", "", ""];
    let gameActive = true;
    let currentPlayer = "X";

    const winningMessage = () => `Player ${currentPlayer} has won!`;
    const drawMessage = () => `Game ended in a draw!`;
    const currentPlayerTurn = () => `It's ${currentPlayer}'s turn`;

    statusDisplay.innerHTML = currentPlayerTurn()

    function handlePlayerChange() {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        statusDisplay.innerHTML = currentPlayerTurn()
    }

    function handleCellPlayed(clickedCell, clickedCellIndex) {
        clickedCell.innerHTML = currentPlayer;
        gameState[clickedCellIndex] = currentPlayer;

    }

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

    function handleResultValidation() {
        let roundWon = false;
        for (let i = 0; i <= 7; i++) {
            const winCondition = winningConditions[i];

            let a = gameState[winCondition[0]]
            let b = gameState[winCondition[1]]
            let c = gameState[winCondition[2]]

            if (a === "" || b === "" || c === "") {
                continue
            }

            if (a === b && b === c) {
                roundWon = true;
                cells[winCondition[0]].classList.add('red-color')
                cells[winCondition[1]].classList.add('red-color')
                cells[winCondition[2]].classList.add('red-color')
                break;
            }
        }

        if (roundWon) {
            statusDisplay.innerHTML = winningMessage();
            gameActive = false;
            return;
        }

        let roundDraw = !gameState.includes("")
        if (roundDraw) {
            statusDisplay.innerHTML = drawMessage();
            gameActive = false;
            return;
        }

        handlePlayerChange();
    }

    function handleCellClick(e) {
        const clickedCell = e.target;
        const clickedCellIndex = parseInt(clickedCell.dataset.cellIndex) - 1;
        
        if (gameState[clickedCellIndex] === "" && gameActive) {
            handleCellPlayed(clickedCell, clickedCellIndex);
            handleResultValidation()
        }
    }

    function handleRestartGame() {
        gameActive = true;
        gameState = ["", "", "", "", "", "", "", "", ""];
        cells.forEach(cell => {
            cell.innerHTML = ""
            cell.classList.remove('red-color')
        })
        currentPlayer = "X";
        statusDisplay.innerHTML = currentPlayerTurn()
    }

    cells.forEach(cell => cell.addEventListener('click', handleCellClick));
    document.querySelector('.game--restart').addEventListener('click', handleRestartGame);

})()