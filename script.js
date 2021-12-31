import { PUZZLES, PIECES_SRC, ANSWERS } from "./consts.js";
import * as elements from "./elements.js";

// global variables
let currentPieceInArrayOfCurrentPuzzle = 0;
let currentPuzzleNumberInArrayOfPuzzles = 0;
let totalPiecesOnBoard = PUZZLES[currentPuzzleNumberInArrayOfPuzzles].length;
let totalPuzzlesInGame = PUZZLES.length;

// init every value on page
const initialAllValues = () => {
  // elements.currentPieceCharacterOnBoard.src =
  //   PIECES_SRC[
  //     PUZZLES[currentPuzzleNumberInArrayOfPuzzles][
  //       currentPieceInArrayOfCurrentPuzzle
  //     ][0]
  //   ];
  elements.currentPieceCharacterOnBoard.setAttribute(
    "src",
    PIECES_SRC[
      PUZZLES[currentPuzzleNumberInArrayOfPuzzles][
        currentPieceInArrayOfCurrentPuzzle
      ][0]
    ]
  );
  console.log(elements.currentPieceCharacterOnBoard);
  elements.currentPiecePositionOnBoard.textContent =
    PUZZLES[currentPuzzleNumberInArrayOfPuzzles][
      currentPieceInArrayOfCurrentPuzzle
    ][1];
  elements.currentPieceNumberOnBoard.textContent =
    currentPieceInArrayOfCurrentPuzzle + 1;
  elements.totalAmountOfPiecesOnBoard.textContent = totalPiecesOnBoard;
  elements.currentPuzzleNumber.textContent =
    currentPuzzleNumberInArrayOfPuzzles + 1;
  elements.totalAmountOfPuzzles.textContent = totalPuzzlesInGame;
  elements.result.textContent = "";
  elements.guess.value = "";
};

initialAllValues();

// move forward through chess pieces in current puzzle
elements.nextPieceButton.addEventListener("click", () => {
  // piece icon and position increment
  currentPieceInArrayOfCurrentPuzzle++;
  if (currentPieceInArrayOfCurrentPuzzle > totalPiecesOnBoard - 1) {
    currentPieceInArrayOfCurrentPuzzle = 0;
  }

  // update all values
  initialAllValues();
});

// move back through chess pieces in current puzzle
elements.previousPieceButton.addEventListener("click", () => {
  // piece character and position decrement
  currentPieceInArrayOfCurrentPuzzle--;
  if (currentPieceInArrayOfCurrentPuzzle < 0) {
    currentPieceInArrayOfCurrentPuzzle = totalPiecesOnBoard - 1;
  }

  // update all values
  initialAllValues();
});

// move forward through chess pieces for current puzzle
elements.nextPuzzleButton.addEventListener("click", () => {
  // piece character and position increment
  currentPuzzleNumberInArrayOfPuzzles++;
  if (currentPuzzleNumberInArrayOfPuzzles > totalPuzzlesInGame - 1) {
    currentPuzzleNumberInArrayOfPuzzles = 0;
  }

  // update global variables
  totalPiecesOnBoard = PUZZLES[currentPuzzleNumberInArrayOfPuzzles].length;
  currentPieceInArrayOfCurrentPuzzle = 0;

  // update all values
  initialAllValues();
});

// move back through puzzles
elements.previousPuzzleButton.addEventListener("click", () => {
  currentPuzzleNumberInArrayOfPuzzles--;
  if (currentPuzzleNumberInArrayOfPuzzles < 0) {
    currentPuzzleNumberInArrayOfPuzzles = totalPuzzlesInGame - 1;
  }

  // update global variables
  totalPiecesOnBoard = PUZZLES[currentPuzzleNumberInArrayOfPuzzles].length;
  currentPieceInArrayOfCurrentPuzzle = 0;

  // update all values
  initialAllValues();
});

// click check answer
document.querySelector("#submit-answer").addEventListener("click", () => {
  if (elements.guess.value === ANSWERS[currentPuzzleNumberInArrayOfPuzzles]) {
    elements.result.textContent = "Correct!";
  } else {
    elements.result.textContent = "Wrong!";
  }
  elements.guess.value = "";
});
