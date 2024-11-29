const my_board = document.querySelector(".board");
const restart = document.querySelector(".restart");
const message = document.querySelector(".message");
let playedCells = [];
let x = [];
let o = [];
let xo = 1;

for (i = 0; i < 9; i++) {
  const my_div = document.createElement("div");
  my_div.setAttribute("class", "cell");
  my_board.appendChild(my_div);
}

const winCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
function reset_game() {
  start_game();
  message.innerText = "";
  playedCells = [];
  x = [];
  o = [];
  xo = 1;

  for (element of my_board.children) {
    element.innerText = "";
  }
}

message.innerText = "";
restart.addEventListener("click", reset_game);

function check_arr(my_array, win_comb) {
  for (const element of win_comb) {
    if (element.every((num) => my_array.includes(num))) {
      return 1;
    }
  }
  return 0;
}

function check_condition(event) {
  if (event.target.classList.contains("cell")) {
    const cells = Array.from(my_board.children);
    const index = cells.indexOf(event.target);
    console.log(`Clicked on the cell ${index}`);
    if (xo > 0 && playedCells.indexOf(index) === -1 && playedCells.length < 9) {
      playedCells.push(index);
      x.push(index);
      console.log(event.target);
      event.target.innerText = "X";
      xo *= -1;
      if (check_arr(x, winCombinations)) {
        message.innerText = "X WiN the GAME";
        my_board.removeEventListener("click", check_condition);
      } else if (playedCells.length === 9) {
        message.innerText = "It's a tie!";
        my_board.removeEventListener("click", check_condition);
      }
    } else if (
      xo < 0 &&
      playedCells.indexOf(index) === -1 &&
      playedCells.length < 9
    ) {
      playedCells.push(index);
      o.push(index);
      console.log(event.target);
      event.target.innerText = "0";
      xo *= -1;
      if (check_arr(o, winCombinations)) {
        message.innerText = "O WiN the GAME";
        my_board.removeEventListener("click", check_condition);
      } else if (playedCells.length === 9) {
        message.innerText = "It's a tie!";
        my_board.removeEventListener("click", check_condition);
      }
    }
  }
}

function start_game() {
  my_board.addEventListener("click", check_condition);
}
start_game();
