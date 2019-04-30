document.addEventListener('DOMContentLoaded', startGame)

// Define your `board` object here!

var rowByCol = 6;
var mineDrop = (rowByCol * rowByCol) / 4;

// Cell Creation
function createCells(rowByCol) {
  var cells = [];
  for (let i = 0; i < rowByCol; i++) {
    for (let j = 0; j < rowByCol; j++) {
      var cell = {
        row: i,
        col: j,
        isMine: false,
        hidden: true
      }
      cells.push(cell);
    }
  }
  return cells;
}

// Board Creation
var board = {
  cells: createCells(rowByCol)
}

// Mine Creation
function buryMine() {
  board.cells[Math.floor(Math.random() * board.cells.length)].isMine = true;
}

function buryMines() {
  var totalMines = 0;
  while (totalMines < mineDrop) {
    buryMine();
    totalMines++;
  }
}


// var board = {
//   cells: [
//     {
//       row: 0,
//       col: 0,
//       isMine: true,
//       hidden: true
//     },
//     {
//       row: 0,
//       col: 1,
//       isMine: false,
//       hidden: true
//     },
//     {
//       row: 0,
//       col: 2,
//       isMine: false,
//       hidden: true
//     },
//     {
//       row: 0,
//       col: 3,
//       isMine: false,
//       hidden: true
//     },
//     {
//       row: 1,
//       col: 0,
//       isMine: false,
//       hidden: true
//     },
//     {
//       row: 1,
//       col: 1,
//       isMine: false,
//       hidden: true
//     },
//     {
//       row: 1,
//       col: 2,
//       isMine: false,
//       hidden: true
//     },
//     {
//       row: 1,
//       col: 3,
//       isMine: true,
//       hidden: true
//     },
//     {
//       row: 2,
//       col: 0,
//       isMine: true,
//       hidden: true
//     },
//     {
//       row: 2,
//       col: 1,
//       isMine: false,
//       hidden: true
//     },
//     {
//       row: 2,
//       col: 2,
//       isMine: false,
//       hidden: true
//     },
//     {
//       row: 2,
//       col: 3,
//       isMine: false,
//       hidden: true
//     },
//     {
//       row: 3,
//       col: 0,
//       isMine: false,
//       hidden: true
//     },
//     {
//       row: 3,
//       col: 1,
//       isMine: true,
//       hidden: true
//     },
//     {
//       row: 3,
//       col: 2,
//       isMine: false,
//       hidden: true
//     },
//     {
//       row: 3,
//       col: 3,
//       isMine: false,
//       hidden: true
//     }]
// }


function startGame() {
  // Don't remove this function call: it makes the game work!

  buryMines();

  // // Add surrounding mines value to each cell
  // for (let i = 0; i < board.cells.length; i++) {
  //   var surroundingMines = countSurroundingMines(board.cells[i]);
  //   board.cells[i].surroundingMines = surroundingMines;
  // }

  board.cells.forEach(x => {
    x.surroundingMines = countSurroundingMines(x);
  });

  lib.initBoard()  

  document.addEventListener("click", checkForWin);
  document.addEventListener("contextmenu", checkForWin);
}

// Define this function to look for a win condition:
//
// 1. Are all of the cells that are NOT mines visible?
// 2. Are all of the mines marked?

function checkForWin() {

  // Find all hidden cells
  var hiddenCells = board.cells.filter((x) => { return x.hidden; });

  // Which hidden cells aren't mines but are hidden?
  var falselyHidden = hiddenCells.filter((x) => { return x.isMine == false });

  // Find all flags
  var flags = board.cells.filter((x) => { return x.isMarked; });

  // Find all mines
  var mines = board.cells.filter((x) => { return x.isMine; });

  // If there are no falsley hidden cells
  if (falselyHidden.length === 0) {
    // And there are as many flags as mines
    if (flags.length === mines.length) {
      // You WIN!
      winAudio.play()
      lib.displayMessage('You win!')
    }
  };

  // Started another approach but of course markedBlanks array is often empty so false wins common

  // Find All Marked Cells
  // var markedCells = board.cells.filter((x) => { return x.isMarked;});

  // Are any not mines?
  // var markedBlanks = markedCells.filter((x) => {return x.isMine == false});

  // if (markedBlanks.length === 0) {
  //   lib.displayMessage('You win!')    
  // }

  // Would love to know how to do this with a for loop!

  // var win = false;

  // for (let i = 0; i < board.cells.length; i++) {
  //   // If it is not a mine, it should not be hidden to win.
  //   if (board.cells[i].isMine == false) {
  //     if (board.cells[i].hidden == false) {
  //       win = true;
  //     }
  //     return;
  //   } else (board.cells[i].isMarked) {
  //     win = true;
  //   }

  // }
}

function countSurroundingMines(cell) {
  var surroundingCells = lib.getSurroundingCells(cell.row, cell.col);
  // Loop through the array counting how many have 'isMine' property
  var surroundingMineCount = 0;
  for (var i = 0; i < surroundingCells.length; i++) {
    if (surroundingCells[i].isMine) {
      surroundingMineCount++;
    }
  }
  // return the count
  return surroundingMineCount;
}


// Reset the game

function resetGame() {
  document.querySelector('.board').innerHTML = '';
  startGame();
}

// Audio

var winAudio = new Audio('audio/win.mp3');
var loseAudio = new Audio('audio/lose.mp3');
var flagAudio = new Audio('audio/flag.mp3');

