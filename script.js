import { PUZZLES, PIECES_SRC, ANSWERS } from "./consts.js";
import * as elements from "./elements.js";

// global variables
let currentPieceInArrayOfCurrentPuzzle = 0;
let currentPuzzleNumberInArrayOfPuzzles = 0;
let totalPiecesOnBoard = PUZZLES[currentPuzzleNumberInArrayOfPuzzles].length;
let totalPuzzlesInGame = PUZZLES.length;
let audioArr = [];
let pathAudio = [];
let audio = new Audio();
let soundNumber = 0;

// init every value on page
const initialAllValues = () => {
  elements.currentPieceCharacterOnBoard.setAttribute(
    "src",
    PIECES_SRC[
      PUZZLES[currentPuzzleNumberInArrayOfPuzzles][
        currentPieceInArrayOfCurrentPuzzle
      ][0]
    ]
  );
  soundNumber = 0;
  audioArr = [];
  audioArr.push(
    PUZZLES[currentPuzzleNumberInArrayOfPuzzles][
      currentPieceInArrayOfCurrentPuzzle
    ][0]
  );
  audioArr.push(
    PUZZLES[currentPuzzleNumberInArrayOfPuzzles][
      currentPieceInArrayOfCurrentPuzzle
    ][1][0]
  );
  audioArr.push(
    PUZZLES[currentPuzzleNumberInArrayOfPuzzles][
      currentPieceInArrayOfCurrentPuzzle
    ][1][1]
  );
  console.log(audioArr);
  audio.pause();
  audio.currentTime = 0;
  let pathsListColor = {
    black: "black.m4a",
    white: "white.m4a",
  };

  let pathsListPiece = {
    k: "king.m4a",
    r: "rook.m4a",
    b: "bishop.m4a",
    q: "queen.m4a",
    n: "knight.m4a",
    p: "pawn.m4a",
  };
  let pathsListLetter = {
    a: "a.m4a",
    b: "b.m4a",
    c: "c.m4a",
    d: "d.m4a",
    e: "e.m4a",
    f: "f.m4a",
    g: "g.m4a",
    h: "h.m4a",
  };
  let pathsListNumber = {
    1: "1.m4a",
    2: "2.m4a",
    3: "3.m4a",
    4: "4.m4a",
    5: "5.m4a",
    6: "6.m4a",
    7: "7.m4a",
    8: "8.m4a",
  };
  pathAudio = [];
  if (audioArr[0].toLowerCase() === audioArr[0]) {
    pathAudio.push(pathsListColor.black);
  } else {
    pathAudio.push(pathsListColor.white);
  }

  pathAudio.push(pathsListPiece[audioArr[0].toLowerCase()]);
  pathAudio.push(pathsListLetter[audioArr[1]]);
  pathAudio.push(pathsListNumber[audioArr[2]]);

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

// delete double click
document.body.addEventListener("dblclick", (event) => {
  event.preventDefault();
});

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

// move forward through puzzles
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

// audio playing

audio.src = pathAudio[soundNumber];

audio.addEventListener("ended", () => {
  console.log("End");
  soundNumber++;
  if (soundNumber >= pathAudio.length) {
    soundNumber = 0;
    return;
  }
  audio.src = pathAudio[soundNumber];
  audio.play();
});
elements.listen.addEventListener("click", () => {
  initialAllValues();
  audio.src = pathAudio[soundNumber];
  audio.play();
  console.log("Start");
});
elements.listen.addEventListener("touchstart", () => {
  initialAllValues();
  audio.src = pathAudio[soundNumber];
  audio.play();
  console.log("Start");
});
