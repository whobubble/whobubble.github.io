let globalBoard;
let globalLoop;
let globalDelay = 500;
let globalScore = 0;

const width = 10;
const height = 25;

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

  return JSON.parse(JSON.stringify(initialTiles[tileId]));
}

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

/////////////////////////
// movements
////////////////////////

function drop([fixed, movingTiles, width, height]) {
  if (canMove([fixed, movingTiles, width, height], dropTile)) {
    for (let i = 0; i < movingTiles.length; i++) {
      dropTile(movingTiles[i], width, height);
    }
    return true;
  }
  storeTile([fixed, movingTiles, width, height]);
  nextTile([fixed, movingTiles, width, height]);

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
  if (canMove([fixed, movingTiles, width, height], () => movingTiles[1].slice())) {
    movingTiles.push(movingTiles.shift());
  }
}

///////////////////////////
// game bookkeeping
//////////////////////////

// all fields in one array
function initializeBoard() {
  // board data

  const fixed = new Array(width * height);
  fixed.fill(0);
  const movingTiles = newTiles();

  const board = document.getElementById("board");
  board.setAttribute(
    "style",
    `width: ${width * 30}px; height: ${
      height * 30
    }px; grid-template-columns: ${"30px ".repeat(
      width
    )}; border: 5px inset silver;`
  );

  globalBoard = [fixed, movingTiles, width, height];
  return globalBoard;
}

function nextTile([fixed, movingTiles, width, height]) {
  movingTiles.splice(0, 4, ...newTiles());
  if (!canMove([fixed, movingTiles, width, height], dropTile)) {
    gameOver();
    stop();
  }
}

function storeTile([fixed, movingTiles, width, height]) {
  const tile = movingTiles[0];
  for (let i = 0; i < fixed.length; i++) {
    fixed[i] = fixed[i] || tile[i];
  }
  removeFullRows([fixed, movingTiles, width, height]);
}

function removeFullRows([fixed, movingTiles, width, height]) {
  const rows = [];
  for (let i = 0; i < width * height; i = i + width) {
    if (fixed.slice(i, i + width).every(Boolean)) rows.push(i / width);
  }

  for (const row of rows) {
    removeRow([fixed, movingTiles, width, height], row);
  }
}

function removeRow([fixed, _movingTiles, width, height], row) {
  fixed.splice(width * row, width);
  fixed.splice(0, 0, ...new Array(width).fill(0));
  speedUp();
  scoreRow();
}

function scoreRow() {
  globalScore += 10;
}

function gameOver() {
  document.getElementById("game-over").style.display = "flex";
}

///////////////
// main loop
///////////////

function start() {
  if (globalLoop) clearInterval(globalLoop);
  globalLoop = setInterval(() => {
    drop(globalBoard);
    drawBoard(globalBoard);
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

function drawBoard([fixed, movingTiles, width, height, score]) {
  const board = document.getElementById("board");
  if (board.hasChildNodes()) {
    for (let i = 0; i < fixed.length; i++) {
      const field = document.getElementById(i);
      const newField = createFieldElement(i, fixed[i] || movingTiles[0][i]);
      board.replaceChild(newField, field);
    }
  } else {
    for (let i = 0; i < fixed.length; i++) {
      const sp = createFieldElement(i, movingTiles[0][i]);
      board.appendChild(sp);
    }
  }

  document.getElementById('score').innerText = globalScore;
}

function createFieldElement(i, color) {
  const field = document.createElement("span");
  field.id = i;
  field.classList.add("field");
  if (color) {
    field.classList.add(`color-${color}`);
  }
  return field;
}

///////////////////
// controls
//////////////////

function initializeControls() {
  document.addEventListener("keyup", (e) => {
    if (e.key === "ArrowLeft") {
      moveLeft(globalBoard);
      drawBoard(globalBoard);
    }
    if (e.key === "ArrowRight") {
      moveRight(globalBoard);
      drawBoard(globalBoard);
    }
    if (e.key === "ArrowDown") {
      fullDrop(globalBoard);
      drawBoard(globalBoard);
    }
    if (e.key === "ArrowUp") {
      turnRight(globalBoard);
      drawBoard(globalBoard);
    }
  });
}

//////////////////////////
// setup and run game
//////////////////////////

initializeControls();
initializeBoard();
drawBoard(globalBoard);
start();
