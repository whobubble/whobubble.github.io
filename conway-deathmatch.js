const boards = {
  green: [],
  red: [],
};

let globalLoop;

// all fields in one array
function initializeBoards() {
  initializeBoard("green");
  initializeBoard("red");
}

function initializeBoard(color) {
  // board data
  const width = 40;
  const height = 40;

  const neighbors = new Array(width * height);
  neighbors.fill(0);
  const alive = new Array(width * height);
  alive.fill(false);
  const history = new Array(width * height);
  history.fill(0);

  const board = document.getElementById(color);
  board.setAttribute(
    "style",
    `width: ${width * 20}px; height: ${
      height * 20
    }px; grid-template-columns: ${"20px ".repeat(
      width
    )}; border: 10px solid ${color};`
  );

  boards[color] = [neighbors, alive, width, height, history];
  return boards[color];
}

function calculateNeighbors([neighbors, alive, width]) {
  for (let i = 0; i < neighbors.length; i++) {
    neighbors[i] = calculateNeighborsOfPositon(i, alive, width);
  }
}

function calculateNeighborsOfPositon(index, alive, width) {
  const offsets = [
    -1,
    1,
    -width,
    -width - 1,
    -width + 1,
    width,
    width - 1,
    width + 1,
  ].map((i) => index + i);
  let neighbors = 0;
  for (const offset of offsets) {
    if (offset in alive && alive[offset]) {
      neighbors++;
    }
  }
  return neighbors;
}

function updateAlive([neighbors, alive]) {
  for (let i = 0; i < neighbors.length; i++) {
    if (alive[i]) {
      // die of solitude    // die of overpopulation
      if (neighbors[i] <= 1 || neighbors[i] > 3) {
        alive[i] = false;
      }
    } else {
      if (neighbors[i] === 3) {
        alive[i] = true; // spawn life with 3 neighbors
      }
    }
  }
}

function updateHistory([_neighbors, alive, _width, _height, history]) {
  for (let i = 0; i < history.length; i++) {
    if (alive[i]) {
      history[i] = 1;
    }
  }
}

function drawBoards() {
  for (const color in boards) {
    drawBoard(boards[color], color);
  }
}

function scoreBoards() {
  const scoresByColor = {};
  for (const color in boards) {
    scoresByColor[color] = score(boards[color][4]);
    document.getElementById(color).classList.remove("pulse");
  }
  const scores = Object.entries(scoresByColor);
  const topColor = scores.sort((a, b) => {
    if (a[1] > b[1]) {
      return -1;
    }
    if (a[1] < b[1]) {
      return 1;
    }
    return 0;
  })[0][0];
  document.getElementById(topColor).classList.add("pulse");
}

function clearWinState() {
  for (const color in boards) {
    document.getElementById(color).classList.remove("pulse");
  }
}

function score(history) {
  return history.reduce((sum, a) => sum + a, 0);
}

function drawBoard([_neighbors, alive, _width, _height, history], color) {
  const board = document.getElementById(color);
  if (board.hasChildNodes()) {
    for (let i = 0; i < alive.length; i++) {
      const field = document.getElementById(`${color}-${i}`);
      const newField = createFieldElement(i, color, alive[i], history[i]);
      field.removeEventListener("click", changeAlive);
      board.replaceChild(newField, field);
    }
  } else {
    for (let i = 0; i < alive.length; i++) {
      const sp = createFieldElement(i, color, alive[i]);
      board.appendChild(sp);
    }
  }
}

function createFieldElement(i, color, isAlive, isHistorical) {
  const field = document.createElement("span");
  field.id = `${color}-${i}`;
  field.classList.add("field");
  if (isAlive) {
    field.classList.add("alive");
  }
  if (isHistorical) {
    field.classList.add("historical");
  }
  field.addEventListener("click", changeAlive);
  return field;
}

// handler functions
function changeAlive(e) {
  const field = e.target;
  const color = e.target.parentElement.id;
  const board = boards[color];
  const [_, alive] = board;
  const id = Number(field.id.match(/\d+/)[0]);
  field.classList.toggle("alive");
  alive[id] = !alive[id];
  calculateNeighbors(board);
}

function step(board) {
  updateAlive(board);
  updateHistory(board);
  calculateNeighbors(board);
}

function stepBoards() {
  for (const color in boards) {
    step(boards[color]);
  }
}

function nextStep() {
  run(1);
}

function reset() {
  stop();
  initializeBoards();
  drawBoards();
  scoreBoards();
  clearWinState();
}

function start() {
  globalLoop = setInterval(() => {
    run(1);
  }, 200);
}

function stop() {
  clearInterval(globalLoop);
}

function initializeControls() {
  const nextButton = document.getElementById("next");
  nextButton.addEventListener("click", nextStep);
  const resetButton = document.getElementById("reset");
  resetButton.addEventListener("click", reset);
  const startButton = document.getElementById("start");
  startButton.addEventListener("click", start);
  const stopButton = document.getElementById("stop");
  stopButton.addEventListener("click", stop);
}

function run(steps) {
  for (let i = 0; i < steps; i++) {
    stepBoards();
    drawBoards();
    scoreBoards();
  }
}

// execute program
initializeControls();
initializeBoards();
drawBoards();
