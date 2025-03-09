let globalBoard;
let globalLoop;

// all fields in one array
function initializeBoard() {
  // board data
  const width = 70;
  const height = 30;

  const neighbors = new Array(width * height);
  neighbors.fill(0);
  const alive = new Array(width * height);
  alive.fill(false);

  const board = document.getElementById("board");
  board.setAttribute(
    "style",
    `width: ${width * 20}px; height: ${
      height * 20
    }px; grid-template-columns: ${"20px ".repeat(
      width
    )};`
  );

  globalBoard = [neighbors, alive, width, height];
  return globalBoard;
}

function step(board) {
  updateAlive(board);
  calculateNeighbors(board);
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
function drawBoard([neighbors, alive, width, height]) {
  console.log(JSON.parse(JSON.stringify([neighbors, alive, width, height])));

  const board = document.getElementById("board");
  if (board.hasChildNodes()) {
    for (let i = 0; i < alive.length; i++) {
      const field = document.getElementById(i);
      const newField = createFieldElement(i, alive[i]);
      field.removeEventListener("click", changeAlive);
      board.replaceChild(newField, field);
    }
  } else {
    for (let i = 0; i < alive.length; i++) {
      const sp = createFieldElement(i, alive[i]);
      board.appendChild(sp);
    }
  }
}

function createFieldElement(i, isAlive) {
  const field = document.createElement("span");
  field.id = i;
  field.classList.add("field");
  if (isAlive) {
    field.classList.add("alive");
  }
  field.addEventListener("click", changeAlive);
  return field;
}

// handler functions
function changeAlive(e) {
  const field = e.target;
  const [_, alive] = globalBoard;
  const id = Number(field.id);
  field.classList.toggle("alive");
  alive[id] = !alive[id];
  calculateNeighbors(globalBoard);
}

function nextStep() {
  run(1);
}

function reset() {
  stop();
  initializeBoard();
  drawBoard(globalBoard);
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
    step(globalBoard);
    drawBoard(globalBoard);
  }
}

// execute program
initializeControls();
initializeBoard();
drawBoard(globalBoard);
