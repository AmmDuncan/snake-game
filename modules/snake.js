import gameBoard from "./board";
import state from "./state";
import { newBoard } from "./utils";

class Snake {
  constructor() {
    this.reset();
  }

  reset() {
    this.length = 1;
    this.direction = "right";
    this.partDirection = { 1: [this.direction] };
  }

  updateDirection(key) {
    this.partDirection[key].shift();
    this.partDirection[key].push(this.direction);
  }

  updateAllDirection() {
    for (let k in this.partDirection) {
      this.updateDirection(k);
    }
  }

  move() {
    const { gameOver, rows, columns } = state;
    if (gameOver) return;
    this.updateAllDirection();
    const destination = newBoard(rows, columns);
    let foodNext = false;

    for (let x = 0; x < rows; x++) {
      for (let y = 0; y < columns; y++) {
        let val = gameBoard.board[x][y];

        if (val !== 0 && val != "food") {
          const { row, col } = gameBoard.getNextTile({ x, y, val });
          gameBoard.lastRow = val === this.length ? row : gameBoard.lastRow;
          gameBoard.lastColumn =
            val === this.length ? col : gameBoard.lastColumn;
          if (val === 1) {
            foodNext = gameBoard.checkFoodNext(row, col);
            gameBoard.checkForSelfBite({ row, col, x, y });
          }
          destination[row][col] = val;
        }

        if (val === "food" && destination[x][y] === 0) {
          destination[x][y] = "food";
        }
      }
    }
    if (foodNext) this.grow(destination);
    gameBoard.board = destination;
    this.checkTargetReached();
  }

  checkTargetReached() {
    const reached = state.target === snake.length;
    if (reached) {
      // console.log({ level: state.level, total: state.levels.length });
      if (state.level + 1 < state.levels.length) {
        state.changeLevel(state.level + 1);
        gameBoard.start();
      } else {
        gameBoard.clear();
        gameBoard.render();
        state.gameOver = true;
        gameBoard.celebrate();
      }
    }
  }

  grow(boardInstance) {
    const { row, col } = gameBoard.getNextTile({
      x: gameBoard.lastRow,
      y: gameBoard.lastColumn,
      val: this.length,
      reverse: true,
    });
    boardInstance[row][col] = ++this.length;

    const prevDir = this.partDirection[this.length - 1];
    const pieceDir = [prevDir[0], ...prevDir];
    this.partDirection[this.length] = pieceDir;
    gameBoard.setNewFoodLocation(boardInstance);
  }
}

const snake = new Snake();

export default snake;
