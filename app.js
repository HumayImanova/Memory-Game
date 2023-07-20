let firstCard = null;
let secondCard = null;
let isFlipped = false;
let lockBoard = false;

const colors = ["red", "green", "blue", "yellow", "red", "green", "blue", "yellow"];

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function onCardClicked(event) {
  const card = event.target;

  if (lockBoard || card === firstCard || card.classList.contains("color-visible")) {
    return;
  }

  card.style.backgroundColor = card.dataset.color;
  card.classList.add("color-visible");

  if (!isFlipped) {
    firstCard = card;
    isFlipped = true;
  } else {
    secondCard = card;
    checkForMatch();
  }
}

let matchedPairs = 0;
const totalPairs = colors.length / 2;

function checkForMatch() {
  const isMatch = firstCard.dataset.color === secondCard.dataset.color;

  isMatch ? disableCards() : unflipCards();
}

function disableCards() {
  firstCard.removeEventListener("click", onCardClicked);
  secondCard.removeEventListener("click", onCardClicked);
  matchedPairs++;
  resetBoard();

  if (matchedPairs === totalPairs) {
    setTimeout(() => {
      const h1 = document.querySelector("h1");
      h1.textContent = "You Win!";
      h1.classList.add("animate-win"); 
    }, 1000);
  }
}

function unflipCards() {
  lockBoard = true;
  setTimeout(() => {
    firstCard.style.backgroundColor = "white";
    secondCard.style.backgroundColor = "white";
    firstCard.classList.remove("color-visible");
    secondCard.classList.remove("color-visible");
    resetBoard();
  }, 1000);
}

function resetBoard() {
  [firstCard, secondCard] = [null, null];
  [isFlipped, lockBoard] = [false, false];
}

function restartGame() {
    matchedPairs = 0
    lockBoard = true;
    setTimeout(() => {
      lockBoard = false;
      const cards = document.querySelectorAll(".card");
      cards.forEach(card => {
        card.style.backgroundColor = "white";
        card.classList.remove("color-visible");
        card.addEventListener("click", onCardClicked);
      });
  
      const h1 = document.querySelector("h1");
      h1.textContent = "Memory"; 
      h1.classList.remove("animate-win"); 
    }, 500);

  shuffle(colors);
  const colorCards = document.querySelectorAll(".card");
  colorCards.forEach((card, index) => {
    card.dataset.color = colors[index];
  });

  isFlipped = false;
  firstCard = null;
  secondCard = null;
}



const restartButton = document.querySelector(".btn-primary");
restartButton.addEventListener("click", restartGame);


document.addEventListener("DOMContentLoaded", () => {
  shuffle(colors);
  const colorCards = document.querySelectorAll(".card");
  colorCards.forEach((card, index) => {
    card.dataset.color = colors[index];
    card.addEventListener("click", onCardClicked);
  });
});
