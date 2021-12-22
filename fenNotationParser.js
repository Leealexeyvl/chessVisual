const puzzleString = "6k1/5ppp/r1p5/3b4/8/1pB5/1Pr2PPP/3RR1K1 w - - 0 1";
const parsePuzzle = (puzzleString) => {
  let puzzleSubString = puzzleString.split(" ")[0];
  let puzzleRows = puzzleSubString.split("/");
  let colomns = ["a", "b", "c", "d", "e", "f", "g", "h"];
  let row = 8;
  let colomnsCounter = 0;
  let puzzle = [];
  puzzleRows.forEach((element) => {
    element.split("").forEach((item) => {
      if (!isNaN(item)) {
        colomnsCounter = colomnsCounter + +item;
      } else {
        puzzle.push([item, colomns[colomnsCounter] + row]);
        colomnsCounter++;
      }
    });
    row--;
    colomnsCounter = 0;
  });
  return puzzle;
};
console.log(parsePuzzle(puzzleString));
