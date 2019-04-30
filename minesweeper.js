document.addEventListener('DOMContentLoaded', startGame)

// Define your `board` object here!

var difficultyLevel = 5;

// function createCells(difficultyLevel) {
//   var cells = [];
//   for (let i = 0; i < difficultyLevel; i++) {
//     for (let j = 0; j < difficultyLevel; j++) {
//       var cell = {
//         row: i,
//         col: j,
//         isMine: false,
//         hidden: true
//       }
//       cells.push(cell);
//     }
//   }
//   return cells;
// }

// var board = {
//   cells: createCells(difficultyLevel)
// }


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
      isMine: true,
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
      isMine: true,
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

  // Add surrounding mines value to each cell
  for (let i = 0; i < board.cells.length; i++) {
    var surroundingMines = countSurroundingMines(board.cells[i]);
    board.cells[i].surroundingMines = surroundingMines;
  }

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
  var hiddenCells = board.cells.filter((x) => { return x.hidden;});

  // Which hidden cells aren't mines but are hidden?
  var falselyHidden = hiddenCells.filter((x) => { return x.isMine == false});

  // Find all flags
  var flags = board.cells.filter((x) => { return x.isMarked;});
  
  // Find all mines
  var mines = board.cells.filter((x) => { return x.isMine;});

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

// Define this function to count the number of mines around the cell
// (there could be as many as 8). You don't have to get the surrounding
// cells yourself! Just use `lib.getSurroundingCells`: 
//
//   var surrounding = lib.getSurroundingCells(cell.row, cell.col)
//
// It will return cell objects in an array. You should loop through 
// them, counting the number of times `cell.isMine` is true.

//Pass the cell into the function
function countSurroundingMines (cell) {

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


// Reset the game

// function resetGame() {
//   startGame();
// }

// Audio

var winAudio = new Audio('audio/win.mp3');
var loseAudio = new Audio('audio/lose.mp3');
var flagAudio = new Audio('audio/flag.mp3');

