document.addEventListener('DOMContentLoaded', startGame)

// Define your `board` object here!
var board = {
  cells: [
    {
      row: 0,
      col: 0,
      isMine: true,
      hidden: true
    },
    {
      row: 0,
      col: 1,
      isMine: false,
      hidden: true
    },
    {
      row: 0,
      col: 2,
      isMine: false,
      hidden: true
    },
    {
      row: 0,
      col: 3,
      isMine: false,
      hidden: true
    },
    {
      row: 1,
      col: 0,
      isMine: false,
      hidden: true
    },
    {
      row: 1,
      col: 1,
      isMine: false,
      hidden: true
    },
    {
      row: 1,
      col: 2,
      isMine: false,
      hidden: true
    },
    {
      row: 1,
      col: 3,
      isMine: true,
      hidden: true
    },
    {
      row: 2,
      col: 0,
      isMine: false,
      hidden: true
    },
    {
      row: 2,
      col: 1,
      isMine: false,
      hidden: true
    },
    {
      row: 2,
      col: 2,
      isMine: false,
      hidden: true
    },
    {
      row: 2,
      col: 3,
      isMine: false,
      hidden: true
    },
    {
      row: 3,
      col: 0,
      isMine: false,
      hidden: true
    },
    {
      row: 3,
      col: 1,
      isMine: false,
      hidden: true
    },
    {
      row: 3,
      col: 2,
      isMine: false,
      hidden: true
    },
    {
      row: 3,
      col: 3,
      isMine: false,
      hidden: true
    }]
}

function startGame() {
  // Don't remove this function call: it makes the game work!

  for (let i = 0; i < board.cells.length; i++) {
    var surroundingMines = countSurroundingMines(board.cells[i]);
    board.cells[i].surroundingMines = surroundingMines;
  }

  lib.initBoard()

  document.addEventListener("click", checkForWin());
  document.addEventListener("contextmenu", checkForWin());
}

// Define this function to look for a win condition:
//
// 1. Are all of the cells that are NOT mines visible?
// 2. Are all of the mines marked?

function checkForWin() {

  // Find all hidden cells
  var hiddenCells = board.cells.filter((x) => { return x.hidden;});

  // Are they all 
  var falselyHidden = hiddenCells.filter((x) => { return x.isMine == false});

  // If there
  if (!falselyHidden.length) {
    lib.displayMessage('You win!')
  };

  // Find All Mines
  var mineArray = board.cells.filter((x) => { return x.isMine;});

  // // Find unMarked Mines
  // var markedMineArray = mineArray.filter((x) => {return x.isMarked == false;});

  // For each cell
  // Check if each cell is a mine and is marked
  // If a mine is not marked then return
  // If every mine is marked but there are hidden cells then return
  // If mines are marked and no other cells are hidden then display win
}

// Define this function to count the number of mines around the cell
// (there could be as many as 8). You don't have to get the surrounding
// cells yourself! Just use `lib.getSurroundingCells`: 
//
//   var surrounding = lib.getSurroundingCells(cell.row, cell.col)
//
// It will return cell objects in an array. You should loop through 
// them, counting the number of times `cell.isMine` is true.

//Pass the cell into the function
function countSurroundingMines(cell) {

  // Get an array of surrounding cells
  var surroundingCells = lib.getSurroundingCells(cell.row, cell.col);

  // Loop through the array counting how many have 'isMine' property
  for (let i = 0; i < surroundingCells.length; i++) {

    var surroundingMineCount = 0;

    if (surroundingCells[i].isMine) {
      surroundingMineCount++;
    }

    return surroundingMineCount;

  }
  // return the count
  return surroundingMineCount;
}