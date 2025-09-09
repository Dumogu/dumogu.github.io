
class MinesweeperGame {
    constructor() {
        this.board = [];
        this.rows = 9;
        this.cols = 9;
        this.minesCount = 10;
        this.flagsCount = 0;
        this.revealedCount = 0;
        this.gameOver = false;
        this.gameWon = false;
        this.firstClick = true;
        this.timer = 0;
        this.timerInterval = null;

        this.initElements();
        this.setupEventListeners();
        this.newGame();
    }

    initElements() {
        this.boardElement = document.getElementById('game-board');
        this.minesLeftElement = document.getElementById('mines-left');
        this.gameTimeElement = document.getElementById('game-time');
        this.gameStatusElement = document.getElementById('game-status');
        this.newGameButton = document.getElementById('new-game');
        this.difficultySelect = document.getElementById('difficulty');
    }

    setupEventListeners() {
        this.newGameButton.addEventListener('click', () => this.newGame());
        this.difficultySelect.addEventListener('change', () => this.setDifficulty());
    }

    setDifficulty() {
        const difficulty = this.difficultySelect.value;
        switch (difficulty) {
            case 'easy':
                this.rows = 9;
                this.cols = 9;
                this.minesCount = 10;
                break;
            case 'medium':
                this.rows = 16;
                this.cols = 16;
                this.minesCount = 40;
                break;
            case 'hard':
                this.rows = 25;
                this.cols = 25;
                this.minesCount = 100;
                break;
        }
        this.newGame();
    }

    newGame() {
        this.resetGameState();
        this.createBoard();
        this.renderBoard();
    }

    resetGameState() {
        clearInterval(this.timerInterval);
        this.board = [];
        this.flagsCount = 0;
        this.revealedCount = 0;
        this.gameOver = false;
        this.gameWon = false;
        this.firstClick = true;
        this.timer = 0;
        this.gameTimeElement.textContent = '0';
        this.gameStatusElement.textContent = '';
        this.minesLeftElement.textContent = this.minesCount;
    }

    createBoard() {
        this.board = Array(this.rows).fill().map(() =>
            Array(this.cols).fill().map(() => ({
                isMine: false,
                revealed: false,
                flagged: false,
                adjacentMines: 0
            }))
        );
    }

    placeMines(firstClickRow, firstClickCol) {
        let minesPlaced = 0;

        while (minesPlaced < this.minesCount) {
            const row = Math.floor(Math.random() * this.rows);
            const col = Math.floor(Math.random() * this.cols);

            // 确保第一次点击的位置及其周围没有地雷
            if ((Math.abs(row - firstClickRow) <= 1 && Math.abs(col - firstClickCol) <= 1) ||
                this.board[row][col].isMine) {
                continue;
            }

            this.board[row][col].isMine = true;
            minesPlaced++;
        }

        this.calculateAdjacentMines();
    }

    calculateAdjacentMines() {
        for (let row = 0; row < this.rows; row++) {
            for (let col = 0; col < this.cols; col++) {
                if (this.board[row][col].isMine) continue;

                let count = 0;
                for (let r = Math.max(0, row - 1); r <= Math.min(this.rows - 1, row + 1); r++) {
                    for (let c = Math.max(0, col - 1); c <= Math.min(this.cols - 1, col + 1); c++) {
                        if (this.board[r][c].isMine) count++;
                    }
                }
                this.board[row][col].adjacentMines = count;
            }
        }
    }

    renderBoard() {
        this.boardElement.innerHTML = '';
        this.boardElement.style.gridTemplateColumns = `repeat(${this.cols}, 30px)`;

        for (let row = 0; row < this.rows; row++) {
            for (let col = 0; col < this.cols; col++) {
                const cell = document.createElement('div');
                cell.className = 'cell';
                cell.dataset.row = row;
                cell.dataset.col = col;

                const cellData = this.board[row][col];

                if (cellData.revealed) {
                    cell.classList.add('revealed');
                    if (cellData.isMine) {
                        cell.classList.add('mine');
                        cell.textContent = '💣';
                    } else if (cellData.adjacentMines > 0) {
                        cell.textContent = cellData.adjacentMines;
                        cell.classList.add(`number-${cellData.adjacentMines}`);
                    }
                } else if (cellData.flagged) {
                    cell.classList.add('flagged');
                    cell.textContent = '🚩';
                }

                cell.addEventListener('click', () => this.handleCellClick(row, col));
                cell.addEventListener('contextmenu', (e) => {
                    e.preventDefault();
                    this.handleRightClick(row, col);
                });

                this.boardElement.appendChild(cell);
            }
        }
    }

    handleCellClick(row, col) {
        if (this.gameOver || this.board[row][col].flagged) return;

        if (this.firstClick) {
            this.firstClick = false;
            this.placeMines(row, col);
            this.startTimer();
        }

        this.revealCell(row, col);
        this.renderBoard();
        this.checkGameStatus();
    }

    handleRightClick(row, col) {
        if (this.gameOver || this.board[row][col].revealed) return;

        const cell = this.board[row][col];
        cell.flagged = !cell.flagged;

        if (cell.flagged) {
            this.flagsCount++;
        } else {
            this.flagsCount--;
        }

        this.minesLeftElement.textContent = this.minesCount - this.flagsCount;
        this.renderBoard();
    }

    revealCell(row, col) {
        if (row < 0 || row >= this.rows || col < 0 || col >= this.cols ||
            this.board[row][col].revealed || this.board[row][col].flagged) {
            return;
        }

        this.board[row][col].revealed = true;
        this.revealedCount++;

        if (this.board[row][col].isMine) {
            this.gameOver = true;
            this.revealAllMines();
            return;
        }

        if (this.board[row][col].adjacentMines === 0) {
            // 如果是空白格子，递归揭示周围的格子
            for (let r = Math.max(0, row - 1); r <= Math.min(this.rows - 1, row + 1); r++) {
                for (let c = Math.max(0, col - 1); c <= Math.min(this.cols - 1, col + 1); c++) {
                    if (r !== row || c !== col) {
                        this.revealCell(r, c);
                    }
                }
            }
        }
    }

    revealAllMines() {
        for (let row = 0; row < this.rows; row++) {
            for (let col = 0; col < this.cols; col++) {
                if (this.board[row][col].isMine) {
                    this.board[row][col].revealed = true;
                }
            }
        }
    }

    checkGameStatus() {
        if (this.gameOver) {
            clearInterval(this.timerInterval);
            this.gameStatusElement.textContent = '游戏结束！你踩到地雷了！';
            this.gameStatusElement.className = 'game-status text-red-600';
            return;
        }

        if (this.revealedCount === (this.rows * this.cols - this.minesCount)) {
            this.gameOver = true;
            this.gameWon = true;
            clearInterval(this.timerInterval);
            this.gameStatusElement.textContent = '恭喜你赢了！';
            this.gameStatusElement.className = 'game-status text-green-600';
        }
    }

    startTimer() {
        this.timerInterval = setInterval(() => {
            this.timer++;
            this.gameTimeElement.textContent = this.timer;
        }, 1000);
    }
}

// 初始化游戏
document.addEventListener('DOMContentLoaded', () => {
    new MinesweeperGame();
});
