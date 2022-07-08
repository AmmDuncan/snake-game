import state from "./state";
import snake from "./snake";
import { newBoard } from "./utils";

let inter;
let THRESHOLD = 250;
let TIMEOUT = 500;
let MULTIPLIER = 50;

class GameBoard {
  travel = {
    left: [-1, 0],
    right: [1, 0],
    bottom: [0, 1],
    top: [0, -1],
  };

  constructor() {
    this.domBoard = document.querySelector(".board");
    this.lastRow = 0;
    this.lastColumn = 0;
  }

  setup(clearOver = false) {
    const { rows, columns } = state;
    // if (!copyContent) {
    this.board = newBoard(rows, columns);
    this.board[0][0] = 1;
    // }

    if (clearOver) {
      this.gameOverContainer.innerHTML = "";
    }

    let html = "";
    for (let i = 0; i < rows * columns; i++) {
      html += '<div class="box"></div> \n';
    }

    this.domBoard.innerHTML = html;
    this.domBoard.style.grid = `repeat(${columns}, 1fr) / repeat(${rows}, 1fr)`;
    this.domBoxes = document.querySelectorAll(".box");
  }

  get boxArray() {
    return Array.from(this.domBoxes);
  }
  get gameOverContainer() {
    return document.querySelector(".game-over");
  }

  clear() {
    if (state.gameOver) return;
    this.boxArray.forEach((box) => {
      box.classList.remove("active");
      box.classList.remove("food");
    });
  }

  render() {
    const { gameOver, rows, columns } = state;

    if (gameOver) return;
    for (let x = 0; x < rows; x++) {
      for (let y = 0; y < columns; y++) {
        let val = this.board[x][y];
        if (val === "bite") {
          this.boxArray[y * rows + x].classList.add("bite");
        } else if (val === "food") {
          this.boxArray[y * rows + x].classList.add("food");
        } else if (val != 0) {
          this.boxArray[y * rows + x].classList.add("active");
        }
      }
    }

    this.renderLevel();
    this.renderTarget();
  }

  renderLevel() {
    const { levels, level } = state;
    document.querySelector(".level-value").innerHTML = levels[level].level;
  }

  renderTarget() {
    const { target } = state;
    const { length } = snake;
    document.querySelector(".target-value").innerHTML = `${length}/${target}`;
  }

  getNextTile({ x, y, val, reverse = false }) {
    const { rows, columns } = state;
    const pieceDirection = snake.partDirection[val]?.[0];
    const moveTo = this.travel[pieceDirection || snake.direction];

    let row = (x + moveTo[0]) % rows;
    let col = (y + moveTo[1]) % columns;

    if (reverse) {
      row = (x - moveTo[0]) % rows;
      col = (y - moveTo[1]) % columns;
    }

    row = row < 0 ? rows - 1 : row;
    col = col < 0 ? columns - 1 : col;

    return { col, row };
  }

  checkFoodNext(row, col) {
    return this.board[row][col] === "food";
  }

  checkForSelfBite({ row, col, x, y }) {
    const nextContent = this.board[row][col];
    if (nextContent !== "food" && nextContent !== 0) {
      this.board[x][y] = "bite";
      this.board[row][col] = nextContent;
      this.gameOver({ x, y });
    }
  }

  gameOver({ x, y }) {
    state.gameOver = true;
    clearInterval(inter);
    this.boxArray[y * state.rows + x].classList.add("bite");
    this.gameOverContainer.innerHTML = "GAME OVER 😞";
  }

  setNewFoodLocation(boardInstance) {
    const { rows, columns } = state;
    const emptyCells = [];
    for (let x = 0; x < rows; x++) {
      for (let y = 0; y < columns; y++) {
        let val = boardInstance[x][y];
        if (val === 0) emptyCells.push([x, y]);
      }
    }

    const randInt = Math.round(Math.random() * emptyCells.length + 1) - 1;
    let [row, col] =
      emptyCells[randInt < 0 || randInt >= emptyCells.length ? 1 : randInt];
    boardInstance[row][col] = "food";
  }

  start() {
    clearInterval(inter);
    const time = TIMEOUT - state.level * MULTIPLIER;
    inter = setInterval(() => this.exec(), time < THRESHOLD ? 400 : time);
  }

  exec() {
    if (state.gameOver) {
      clearInterval(inter);
      this.render();
      return;
    }
    snake.move();
    this.clear();
    this.render();
  }

  clearInterval() {
    clearInterval(inter);
  }

  celebrate() {
    document.querySelector(".closing").innerHTML = "🎊 CONGRATULATIONS 🎊";
  }
}

const gameBoard = new GameBoard();

export default gameBoard;

// } else {
//   const board = newBoard(rows, columns);
//   const bal = Math.round((rows - this.board.length) / 2);
//   const boardRows = this.board.length;
//   const boardColumns = this.board[0].length;
//   for (let x = 0; x < boardRows; x++) {
//     for (let y = 0; y < boardColumns; y++) {
//       let val = this.board[x][y];
//       const onEdge =
//         x === 0 || x === boardRows || y === 0 || y === boardColumns;
//       if (val !== 0 && onEdge) {
//         const { row, col } = this.getNextTile({ x, val, val });
//         const { row: bRow, col: bCol } = this.getNextTile({
//           x,
//           y,
//           val,
//           reverse: true,
//         });

//         const frontVal = this.board[row][col];
//         const backVal = this.board[bRow][bCol];

//         if (frontVal || backVal) {

//         }
//       }
//       board[x + bal][y + bal] = this.board[x][y];
//     }
//   }
//   this.board = board;
// }
