let words = ["cat", "dog", "bat", "hat", "pig", "rat"];
let currentWord, displayedWord, missingLetter;
let isGameOver = false;

function setup() {
  createCanvas(1000, 600);
  textSize(72);
  textAlign(CENTER, CENTER);
  textStyle(BOLD);
  pickNewWord();
}

let showCorrectMessage = false;

function draw() {
  background(200, 230, 250);

  if (!isGameOver) {
    text(`Find the missing letter:\n ${displayedWord}`, width / 2, height / 2 - 50);

    if (keyIsPressed) {
      if (key === missingLetter) {
        showCorrectMessage = true;
        setTimeout(() => {
          showCorrectMessage = false;
          isGameOver = false;
          pickNewWord();
        }, 3000);
        isGameOver = true;
      } else {
        text('Try again!', width / 2, height / 2 + 50);
      }
    }

    if (showCorrectMessage) {
      text('Correct!', width / 2, height / 2 + 50);
    }
  }
}


function pickNewWord() {
  currentWord = random(words);
  let missingLetterIndex = floor(random(currentWord.length));
  missingLetter = currentWord.charAt(missingLetterIndex);
  displayedWord = currentWord.substring(0, missingLetterIndex) + '_' + currentWord.substring(missingLetterIndex + 1);
}
