import {
  PUZZLES,
  PIECES_SRC,
  ANSWERS,
  PATH_LIST_COLORS,
  PATH_LIST_PIECES,
  PATH_LIST_LETTERS,
  PATH_LIST_NUMBERS,
} from "./consts.js";
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
initialAllValues();

// move forward through chess pieces in current puzzle
elements.nextPieceButton.addEventListener("click", () => {
  currentPieceInArrayOfCurrentPuzzle++;
  if (currentPieceInArrayOfCurrentPuzzle > totalPiecesOnBoard - 1) {
    currentPieceInArrayOfCurrentPuzzle = 0;
  }
  initialAllValues();
});

// move back through chess pieces in current puzzle
elements.previousPieceButton.addEventListener("click", () => {
  currentPieceInArrayOfCurrentPuzzle--;
  if (currentPieceInArrayOfCurrentPuzzle < 0) {
    currentPieceInArrayOfCurrentPuzzle = totalPiecesOnBoard - 1;
  }
  initialAllValues();
});

// move forward through puzzles
elements.nextPuzzleButton.addEventListener("click", () => {
  currentPuzzleNumberInArrayOfPuzzles++;
  if (currentPuzzleNumberInArrayOfPuzzles > totalPuzzlesInGame - 1) {
    currentPuzzleNumberInArrayOfPuzzles = 0;
  }
  totalPiecesOnBoard = PUZZLES[currentPuzzleNumberInArrayOfPuzzles].length;
  currentPieceInArrayOfCurrentPuzzle = 0;
  initialAllValues();
});

// move back through puzzles
elements.previousPuzzleButton.addEventListener("click", () => {
  currentPuzzleNumberInArrayOfPuzzles--;
  if (currentPuzzleNumberInArrayOfPuzzles < 0) {
    currentPuzzleNumberInArrayOfPuzzles = totalPuzzlesInGame - 1;
  }
  totalPiecesOnBoard = PUZZLES[currentPuzzleNumberInArrayOfPuzzles].length;
  currentPieceInArrayOfCurrentPuzzle = 0;
  initialAllValues();
});

// check answer
document.querySelector("#submit-answer").addEventListener("click", () => {
  if (elements.guess.value === ANSWERS[currentPuzzleNumberInArrayOfPuzzles]) {
    elements.result.textContent = "Correct!";
  } else {
    elements.result.textContent = "Wrong!";
  }
  elements.guess.value = "";
});

// audio playing
elements.listen.addEventListener("click", () => {
  initialAllValues();
  startPlayingAudio();
});

elements.listen.addEventListener("touchstart", () => {
  initialAllValues();
  startPlayingAudio();
});

audio.addEventListener("ended", () => {
  soundNumber++;
  if (soundNumber >= pathAudio.length) {
    soundNumber = 0;
    return;
  }
  startPlayingAudio();
});

// delete double click
document.body.addEventListener("dblclick", (event) => {
  event.preventDefault();
});

// functions
function initialAllValues() {
  initPiecePicture();
  initPiecePosition();
  initNumbers();
  initResult();
  createAudioArr();
  stopPlayingAudio();
  formAudioPath();
}

function createAudioArr() {
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
}

function initPiecePicture() {
  elements.currentPieceCharacterOnBoard.setAttribute(
    "src",
    PIECES_SRC[
      PUZZLES[currentPuzzleNumberInArrayOfPuzzles][
        currentPieceInArrayOfCurrentPuzzle
      ][0]
    ]
  );
}

function initPiecePosition() {
  elements.currentPiecePositionOnBoard.textContent =
    PUZZLES[currentPuzzleNumberInArrayOfPuzzles][
      currentPieceInArrayOfCurrentPuzzle
    ][1];
}

function initNumbers() {
  elements.currentPieceNumberOnBoard.textContent =
    currentPieceInArrayOfCurrentPuzzle + 1;
  elements.totalAmountOfPiecesOnBoard.textContent = totalPiecesOnBoard;
  elements.currentPuzzleNumber.textContent =
    currentPuzzleNumberInArrayOfPuzzles + 1;
  elements.totalAmountOfPuzzles.textContent = totalPuzzlesInGame;
}

function initResult() {
  elements.result.textContent = "";
  elements.guess.value = "";
}

function formAudioPath() {
  pathAudio = [];
  if (audioArr[0].toLowerCase() === audioArr[0]) {
    pathAudio.push(PATH_LIST_COLORS.black);
  } else {
    pathAudio.push(PATH_LIST_COLORS.white);
  }

  pathAudio.push(PATH_LIST_PIECES[audioArr[0].toLowerCase()]);
  pathAudio.push(PATH_LIST_LETTERS[audioArr[1]]);
  pathAudio.push(PATH_LIST_NUMBERS[audioArr[2]]);
}

function startPlayingAudio() {
  audio.src = pathAudio[soundNumber];
  audio.play();
}

function stopPlayingAudio() {
  audio.pause();
  audio.currentTime = 0;
}
