let globalLoop;
let globalDelay = 500;

const width = 10;
const height = 25;

const boards = {
  black: [],
  green: [],
  blue: [],
  red: [],
};

///////////////
// tiles
/////////////

const initialTiles = {
  // OO
  // OO
  1: [O_0()],
  // IIII
  2: [I_0(), I_180()],
  //  SS
  // SS
  3: [S_0(), S_90()],
  // ZZ
  //  ZZ
  4: [Z_0(), Z_90()],
  // JJJ
  //   J
  5: [J_0(), J_90(), J_180(), J_270()],
  //  LLL
  //  L
  6: [L_0(), L_90(), L_180(), L_270()],
  // TTT
  //  T
  7: [T_0(), T_90(), T_180(), T_270()],
};

function O_0() {
  const tile = new Array(width * height);
  const start = Math.floor(width / 2);
  tile.fill(0);
  tile[start] = 1;
  tile[start - 1] = 1;
  tile[width + start] = 1;
  tile[width + start - 1] = 1;

  return tile;
}

function I_0() {
  const tile = new Array(width * height);
  const start = Math.floor(width / 2);
  tile.fill(0);

  tile[start] = 2;
  tile[width + start] = 2;
  tile[2 * width + start] = 2;
  tile[3 * width + start] = 2;

  return tile;
}

function I_180() {
  const tile = new Array(width * height);
  const start = Math.floor(width / 2);
  tile.fill(0);

  tile[width + start] = 2;
  tile[width + start + 1] = 2;
  tile[width + start - 1] = 2;
  tile[width + start - 2] = 2;

  return tile;
}

function S_0() {
  const tile = new Array(width * height);
  const start = Math.floor(width / 2);
  tile.fill(0);

  tile[width + start] = 3;
  tile[width + start + 1] = 3;
  tile[2 * width + start] = 3;
  tile[2 * width + start - 1] = 3;

  return tile;
}

function S_90() {
  const tile = new Array(width * height);
  const start = Math.floor(width / 2);
  tile.fill(0);

  tile[start - 1] = 3;
  tile[width + start - 1] = 3;
  tile[width + start] = 3;
  tile[2 * width + start] = 3;

  return tile;
}

function Z_0() {
  const tile = new Array(width * height);
  const start = Math.floor(width / 2);
  tile.fill(0);

  tile[width + start] = 4;
  tile[width + start - 1] = 4;
  tile[2 * width + start] = 4;
  tile[2 * width + start + 1] = 4;

  return tile;
}

function Z_90() {
  const tile = new Array(width * height);
  const start = Math.floor(width / 2);
  tile.fill(0);

  tile[start + 1] = 4;
  tile[width + start + 1] = 4;
  tile[width + start] = 4;
  tile[2 * width + start] = 4;

  return tile;
}

function J_0() {
  const tile = new Array(width * height);
  const start = Math.floor(width / 2);
  tile.fill(0);

  tile[width + start] = 5;
  tile[width + start + 1] = 5;
  tile[width + start - 1] = 5;
  tile[2 * width + start + 1] = 5;

  return tile;
}

function J_90() {
  const tile = new Array(width * height);
  const start = Math.floor(width / 2);
  tile.fill(0);

  tile[start] = 5;
  tile[width + start] = 5;
  tile[2 * width + start] = 5;
  tile[2 * width + start - 1] = 5;

  return tile;
}

function J_180() {
  const tile = new Array(width * height);
  const start = Math.floor(width / 2);
  tile.fill(0);

  tile[start - 1] = 5;
  tile[width + start] = 5;
  tile[width + start - 1] = 5;
  tile[width + start + 1] = 5;

  return tile;
}

function J_270() {
  const tile = new Array(width * height);
  const start = Math.floor(width / 2);
  tile.fill(0);

  tile[start] = 5;
  tile[start + 1] = 5;
  tile[width + start] = 5;
  tile[2 * width + start] = 5;

  return tile;
}

function L_0() {
  const tile = new Array(width * height);
  const start = Math.floor(width / 2);
  tile.fill(0);

  tile[width + start] = 6;
  tile[width + start + 1] = 6;
  tile[width + start - 1] = 6;
  tile[2 * width + start - 1] = 6;

  return tile;
}

function L_90() {
  const tile = new Array(width * height);
  const start = Math.floor(width / 2);
  tile.fill(0);

  tile[start] = 6;
  tile[start - 1] = 6;
  tile[width + start] = 6;
  tile[2 * width + start] = 6;

  return tile;
}

function L_180() {
  const tile = new Array(width * height);
  const start = Math.floor(width / 2);
  tile.fill(0);

  tile[start + 1] = 6;
  tile[width + start] = 6;
  tile[width + start + 1] = 6;
  tile[width + start - 1] = 6;

  return tile;
}

function L_270() {
  const tile = new Array(width * height);
  const start = Math.floor(width / 2);
  tile.fill(0);

  tile[start] = 6;
  tile[width + start] = 6;
  tile[2 * width + start] = 6;
  tile[2 * width + start + 1] = 6;

  return tile;
}

function T_0() {
  const tile = new Array(width * height);
  const start = Math.floor(width / 2);
  tile.fill(0);

  tile[width + start] = 7;
  tile[width + start + 1] = 7;
  tile[width + start - 1] = 7;
  tile[2 * width + start] = 7;

  return tile;
}

function T_90() {
  const tile = new Array(width * height);
  const start = Math.floor(width / 2);
  tile.fill(0);

  tile[start] = 7;
  tile[width + start - 1] = 7;
  tile[width + start] = 7;
  tile[2 * width + start] = 7;

  return tile;
}

function T_180() {
  const tile = new Array(width * height);
  const start = Math.floor(width / 2);
  tile.fill(0);

  tile[start] = 7;
  tile[width + start + 1] = 7;
  tile[width + start] = 7;
  tile[width + start - 1] = 7;

  return tile;
}

function T_270() {
  const tile = new Array(width * height);
  const start = Math.floor(width / 2);
  tile.fill(0);

  tile[start] = 7;
  tile[width + start + 1] = 7;
  tile[width + start] = 7;
  tile[2 * width + start] = 7;

  return tile;
}

function newTiles() {
  const tileId = getRandomInt(6) + 1;

  return shallowClone(initialTiles[tileId]);
}

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function shallowClone(data) {
  return JSON.parse(JSON.stringify(data));
}
/////////////////////////
// movements
////////////////////////

function dropBoards() {
  for (const color in boards) {
    if (isActive(boards[color])) drop(boards[color]);
  }
}

function drop([fixed, movingTiles, width, height, stats, color]) {
  const active = stats[0];
  if (!active) return false;
  if (canMove([fixed, movingTiles, width, height], dropTile)) {
    for (let i = 0; i < movingTiles.length; i++) {
      dropTile(movingTiles[i], width, height);
    }
    return true;
  }
  storeTile([fixed, movingTiles, width, height, stats, color]);
  nextTile([fixed, movingTiles, width, height, stats, color]);

  return false;
}

function dropTile(tile, width, height) {
  tile.splice(width * height - width, width); // remove last line
  tile.splice(0, 0, ...new Array(width).fill(0));
  return tile;
}

function fullDrop(board) {
  while (canMove(board, dropTile)) drop(board);
}

// collision detection
// simulate drop and check for overlap with fixed
function canMove([fixed, movingTiles, width, height], movementFunction) {
  const movingTileCopy = movingTiles[0].slice();
  const movingTileCopyMoved = movementFunction(
    movingTiles[0].slice(),
    width,
    height
  );
  if (
    countFilledFields(fixed, movingTileCopy) !==
    countFilledFields(fixed, movingTileCopyMoved)
  ) {
    return false;
  }

  return true;
}

function countFilledFields(boardOne, boardTwo) {
  let count = 0;
  for (let i = 0; i < boardOne.length; i++) {
    if (boardOne[i] > 0 || boardTwo[i] > 0) count++;
  }
  return count;
}

function moveLeft([fixed, movingTiles, width, height]) {
  if (canMove([fixed, movingTiles, width, height], moveLeftTile)) {
    for (let i = 0; i < movingTiles.length; i++) {
      moveLeftTile(movingTiles[i], width, height);
    }
  }
}

function moveLeftTile(tile, width, height) {
  for (let i = 0; i < height * width; i = i + width) {
    if (tile[i]) return tile;
  }

  for (let i = 0; i < height; i++) {
    const pixel = tile[width * i];
    tile.splice(width * i, 1);
    tile.splice(width * i + width - 1, 0, pixel);
  }
  return tile;
}

function moveRight([fixed, movingTiles, width, height]) {
  if (canMove([fixed, movingTiles, width, height], moveRightTile)) {
    for (let i = 0; i < movingTiles.length; i++) {
      moveRightTile(movingTiles[i], width, height);
    }
  }
}

function moveRightTile(tile, width, height) {
  for (let i = width - 1; i < height * width; i = i + width) {
    if (tile[i]) return tile;
  }

  for (let i = 0; i < height; i++) {
    const pixel = tile[width * i + width - 1];
    tile.splice(width * i + width - 1, 1);
    tile.splice(width * i, 0, pixel);
  }
  return tile;
}

function turnRight([fixed, movingTiles, width, height]) {
  if (
    movingTiles[1] && canMove([fixed, movingTiles, width, height], () => movingTiles[1].slice())
  ) {
    movingTiles.push(movingTiles.shift());
  }
}

///////////////////////////
// game bookkeeping
//////////////////////////

function initializeBoards() {
  initializeBoard("black");
  initializeBoard("green");
  initializeBoard("blue");
  initializeBoard("red");
}

// all fields in one array
function initializeBoard(color) {
  const fixed = new Array(width * height);
  fixed.fill(0);
  const movingTiles = newTiles();

  const board = document.getElementById(color);
  board.setAttribute(
    "style",
    `width: ${width * 30}px; height: ${
      height * 30
    }px; grid-template-columns: ${"30px ".repeat(width)};`
  );

  const active = true;
  const stats = [active];

  boards[color] = [fixed, movingTiles, width, height, stats, color];
  return boards[color];
}

function nextTile([fixed, movingTiles, width, height, stats, color]) {
  movingTiles.splice(0, 4, ...newTiles());
  if (!canMove([fixed, movingTiles, width, height], dropTile)) {
    drawBoard([fixed, movingTiles, width, height, stats, color])
    gameOver([fixed, movingTiles, width, height, stats, color]);
  }
}

function storeTile([fixed, movingTiles, width, height, stats, color]) {
  const tile = movingTiles[0];
  for (let i = 0; i < fixed.length; i++) {
    fixed[i] = fixed[i] || tile[i];
  }
  removeFullRows([fixed, movingTiles, width, height, stats, color]);
}

function removeFullRows([fixed, movingTiles, width, height, stats, color]) {
  const rows = [];
  for (let i = 0; i < width * height; i = i + width) {
    if (fixed.slice(i, i + width).every(Boolean)) rows.push(i / width);
  }

  for (const row of rows) {
    removeRow([fixed, movingTiles, width, height, stats, color], row);
  }
}

function removeRow([fixed, _movingTiles, width, _height, _stats, color], row) {
  fixed.splice(width * row, width);
  fixed.splice(0, 0, ...new Array(width).fill(0));
  addPenaltyRows(width, color)
  speedUp();
}

function addPenaltyRows(width, color) {
  const penaltyRow = generatePenaltyRow(width);
  for (const boardColor in boards) {
    if (boardColor !== color) {
      addPenaltyRow(boards[boardColor], shallowClone(penaltyRow));
    }
  }
}

function addPenaltyRow([fixed, _movingTiles, width, height, stats], penaltyRow) {
  const active = stats[0];
  if (!active) return;
  fixed.splice(0, width); // remove top row
  fixed.splice(width * height - width, width, ...penaltyRow); // add penalty to the bottom
}

function generatePenaltyRow(width) {
  const row = new Array();
  for (let i = 0; i < width; i++) {
    row[i] = getRandomInt(6) + 1;
  }
  for (let i = 0; i < 5; i++) {
    row[getRandomInt(width)] = 0;
  }

  return row;
}

function gameOver([_fixed, _movingTiles, _width, _height, stats, color]) {
  document.getElementById(color).classList.add("game-over");
  stats[0] = false; // active = false
  
  console.log('Game over', JSON.parse(JSON.stringify([_fixed, _movingTiles, _width, _height, stats, color])))
}

function isActive([
  _fixed,
  _movingTiles,
  _width,
  _height,
  [active],
]) {
  return active;
}

///////////////
// main loop
///////////////

function start() {
  if (globalLoop) clearInterval(globalLoop);
  globalLoop = setInterval(() => {
    dropBoards();
    drawBoards();
  }, globalDelay);
}

function speedUp() {
  stop();
  globalDelay = globalDelay - 10;
  start();
}

function stop() {
  clearInterval(globalLoop);
}

/////////////////////
// board drawing
/////////////////////

function drawBoards() {
  for (const color in boards) {
    if (isActive(boards[color])) drawBoard(boards[color]);
  }
}

function drawBoard([fixed, movingTiles, _width, _height, _stats, color]) {
  const board = document.getElementById(color);
  if (board.hasChildNodes()) {
    for (let i = 0; i < fixed.length; i++) {
      const field = document.getElementById(`${color}-${i}`);
      const newField = createFieldElement(
        i,
        fixed[i] || movingTiles[0][i],
        color
      );
      board.replaceChild(newField, field);
    }
  } else {
    for (let i = 0; i < fixed.length; i++) {
      const sp = createFieldElement(i, movingTiles[0][i], color);
      board.appendChild(sp);
    }
  }
}

function createFieldElement(i, fieldColor, boardColor) {
  const field = document.createElement("span");
  field.id = `${boardColor}-${i}`;
  field.classList.add("field");
  if (fieldColor) {
    field.classList.add(`color-${fieldColor}`);
  }
  return field;
}

///////////////////
// controls
//////////////////

// green: W-A-S-D
// blue: G-V-B-N
// red: I-J-K-L
// black: arrow keys
function initializeControls() {
  document.addEventListener("keyup", (e) => {
    if (isActive(boards.green)) {
      if (e.code === "KeyA") {
        moveLeft(boards.green);
        drawBoard(boards.green);
      }
      if (e.code === "KeyD") {
        moveRight(boards.green);
        drawBoard(boards.green);
      }
      if (e.code === "KeyS") {
        fullDrop(boards.green);
        drawBoard(boards.green);
      }
      if (e.code === "KeyW") {
        turnRight(boards.green);
        drawBoard(boards.green);
      }
    }
    if (isActive(boards.blue)) {
      if (e.code === "KeyV") {
        moveLeft(boards.blue);
        drawBoard(boards.blue);
      }
      if (e.code === "KeyN") {
        moveRight(boards.blue);
        drawBoard(boards.blue);
      }
      if (e.code === "KeyB") {
        fullDrop(boards.blue);
        drawBoard(boards.blue);
      }
      if (e.code === "KeyG") {
        turnRight(boards.blue);
        drawBoard(boards.blue);
      }
    }
    if (isActive(boards.red)) {
      if (e.code === "KeyJ") {
        moveLeft(boards.red);
        drawBoard(boards.red);
      }
      if (e.code === "KeyL") {
        moveRight(boards.red);
        drawBoard(boards.red);
      }
      if (e.code === "KeyK") {
        fullDrop(boards.red);
        drawBoard(boards.red);
      }
      if (e.code === "KeyI") {
        turnRight(boards.red);
        drawBoard(boards.red);
      }
    }
    if (isActive(boards.black)) {
      if (e.code === "ArrowLeft") {
        moveLeft(boards.black);
        drawBoard(boards.black);
      }
      if (e.code === "ArrowRight") {
        moveRight(boards.black);
        drawBoard(boards.black);
      }
      if (e.code === "ArrowDown") {
        fullDrop(boards.black);
        drawBoard(boards.black);
      }
      if (e.code === "ArrowUp") {
        turnRight(boards.black);
        drawBoard(boards.black);
      }
    }
  });
}

//////////////////////////
// setup and run game
//////////////////////////

initializeControls();
initializeBoards();
drawBoards();
start();
