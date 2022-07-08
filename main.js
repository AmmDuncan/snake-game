import "./style.css";
import gameBoard from "./modules/board";
import snake from "./modules/snake";

gameBoard.setup();
gameBoard.setNewFoodLocation(gameBoard.board);
gameBoard.render();

document.addEventListener("keydown", (e) => {
  const { key } = e;
  const allowedKeys = ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"];

  if (allowedKeys.includes(key)) {
    const where = {
      right: { ArrowUp: "top", ArrowDown: "bottom" },
      left: { ArrowUp: "top", ArrowDown: "bottom" },
      top: { ArrowLeft: "left", ArrowRight: "right" },
      bottom: { ArrowLeft: "left", ArrowRight: "right" },
    };

    const newDirection = where[snake.direction][key] || snake.direction;
    // const newDirRef = newDirection;
    snake.direction = newDirection;
    gameBoard.clearInterval();
    gameBoard.exec();
    gameBoard.start();
  }
});

document.querySelector(".controls").addEventListener("click", (e) => {
  const button = e.target;
  const key = button.dataset.dir;

  if (key) {
    const where = {
      right: { up: "top", down: "bottom" },
      left: { up: "top", down: "bottom" },
      top: { left: "left", right: "right" },
      bottom: { left: "left", right: "right" },
    };

    const newDirection = where[snake.direction][key] || snake.direction;
    // const newDirRef = newDirection;
    snake.direction = newDirection;
    gameBoard.clearInterval();
    gameBoard.exec();
    gameBoard.start();
  }
});

document
  .querySelector(".ctas .toggle-controls")
  .addEventListener("click", (e) => {
    document.querySelector(".controls").classList.toggle("hide");
  });

document.querySelector(".ctas .restart").addEventListener("click", (e) => {
  gameBoard.clearInterval();
  snake.reset();
  gameBoard.setup();
  gameBoard.setNewFoodLocation(gameBoard.board);
  gameBoard.render();
  gameBoard.start();
});

gameBoard.start();
