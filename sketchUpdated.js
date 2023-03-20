let words = ["cat", "dog", "bat", "hat", "pig", "rat"];
let currentWord, displayedWord, missingLetter, img;
let isGameOver = false;
let buttons = [];
let alphabet = "abcdefghijklmnopqrstuvwxyz";
let showCorrectMessage = false;
let showINCorrectMessage = false;
//let unsplashAccessKey = 'Dj9TMJ78IqUE2qWHU0NTw96-M0y_gR9NU--_fF8EpuA';
let unsplashAccessKey = 'Z-qhyRPej0sFAlkyvPFtJDIgWxpkBoZZi1-j41Dkxmo';
function setup() {
  createCanvas(windowWidth, windowHeight);
  textSize(48);
  textAlign(CENTER, CENTER);
  textStyle(BOLD);
  pickNewWord();

  createButtons();
}
function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    positionButtons();
  }
function draw() {
  background(400, 460, 500);

  if (img) {
    image(img, 0, 0, width, height-50);
  }

  if (!isGameOver) {
    stroke(255);
    strokeWeight(4);
    fill(0);
    text(`Find the missing letter: ${displayedWord}`, width / 2, height - 100);
    if (keyIsPressed) {
      if (key === missingLetter) {
        fill(0, 255, 0);

        isGameOver = true;
        setTimeout(() => {
          isGameOver = false;
          pickNewWord();
        }, 1500);
      }
    }
  }

  if (showCorrectMessage) {
    text('Correct!', width / 2, height-50);
  }
  if (showINCorrectMessage) {
    text('Try again!', width / 2, height-50);
  }
}

function pickNewWord() {
  currentWord = random(words);
  let missingLetterIndex = floor(random(currentWord.length));
  missingLetter = currentWord.charAt(missingLetterIndex);
  displayedWord = currentWord.substring(0, missingLetterIndex) + '_' + currentWord.substring(missingLetterIndex + 1);
  loadImageFromUnsplash(currentWord);
}

function createButtons() {
    let buttonSize = 65;
  
    for (let i = 0; i < alphabet.length; i++) {
      let button = createButton(alphabet[i].toUpperCase());
      button.size(buttonSize, buttonSize);

      positionButtons()
      button.mousePressed(() => handleGuess(alphabet[i]));
      buttons.push(button);

    }
  }
  
  function positionButtons() {
    let buttonSpacing = 80;
    let buttonsPerRow = floor((width - 20) / buttonSpacing);
  
    for (let i = 0; i < buttons.length; i++) {
      let xPos = 45 + (i % buttonsPerRow) * buttonSpacing;
      let yPos = height / 2  + floor(i / buttonsPerRow) * buttonSpacing;
      buttons[i].position(xPos, yPos);
    }
  }
function handleGuess(guess) {
  if (guess === missingLetter) {
    showCorrectMessage = true;
    setTimeout(() => {
        showCorrectMessage = false;
        pickNewWord();
    }, 2000);
  } else {
    showINCorrectMessage = true;
    setTimeout(() => {
        showINCorrectMessage = false;
        pickNewWord();
    }, 2000);

  }
}

async function loadImageFromUnsplash(searchTerm) {
  let url = `https://api.unsplash.com/photos/random?content_filter=high&client_id=${unsplashAccessKey}&query=${searchTerm}`;
  try {
    let response = await fetch(url);
    let data = await response.json();
    img = loadImage(data.urls.small, () => {
      img.resize(width, height);
    });
  } catch (error) {
    console.error('Error loading image:', error);
  }
}
