let words = ["cat", "dog", "bat", "hat", "pig", "rat"];
let currentWord, displayedWord, missingLetter;
let isGameOver = false;
let buttons = [];
let alphabet = "abcdefghijklmnopqrstuvwxyz";
let showCorrectMessage = false;

function setup() {
  createCanvas(800, 400);
  textSize(48);
  textAlign(CENTER, CENTER);
  textStyle(BOLD);
  pickNewWord();

  createButtons();
}

function draw() {
  background(200, 230, 250);
  text(`Find the missing letter:\n ${displayedWord}`, width / 2, height / 4);

  if (showCorrectMessage) {
    text('Correct!', width / 2, height / 2);
  }
}

function pickNewWord() {
  currentWord = random(words);
  let missingLetterIndex = floor(random(currentWord.length));
  missingLetter = currentWord.charAt(missingLetterIndex);
  displayedWord = currentWord.substring(0, missingLetterIndex) + '_' + currentWord.substring(missingLetterIndex + 1);
}

function createButtons() {
  for (let i = 0; i < alphabet.length; i++) {
    let button = createButton(alphabet[i].toUpperCase());
    button.size(40, 40);
    button.position(20 + i * 45, height - 100);
    button.mousePressed(() => handleGuess(alphabet[i]));
    buttons.push(button);
  }
}

function handleGuess(guess) {
  if (guess === missingLetter) {
    showCorrectMessage = true;
    setTimeout(() => {
      showCorrectMessage = false;
      pickNewWord();
    }, 4000);
  } else {
    text('Try again1!', width / 2, height / 2 + 50);
    setTimeout(() => {
      pickNewWord();
    }, 4000);
  }
}
