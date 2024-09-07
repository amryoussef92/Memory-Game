import cards from "./cards.js";

//* selecorts

const cardGrid = document.querySelector(".card-grid");
const modal = document.querySelector(".modal");
const modalContent = document.querySelector("p");
const modalButton = document.querySelector("button");

let flippedCards = [];
let matchedCards = [];
let flipCount = 0;
let duration = 0;
let timer = 0;

const startGame = () => {
  // get 8 random card fronts
  const fronts = cards.sort(() => 0.5 - Math.random()).slice(0, 8);

  // double, shuffle , add to grid
  const doubledCards = [...fronts, ...fronts].sort(() => 0.5 - Math.random());

  // Generate the HTML for the cards
  const cardHTML = doubledCards
    .map(
      ({ name, image }) => `
    <div class="card" data-name="${name}">
      <img src="backgroung dog.jpeg" alt="Card Back" class="back" />
      <img src="${image}" alt="${name}" class="front" />
    </div>`
    )
    .join("");

  cardGrid.innerHTML = cardHTML;
  startTimer();
};

const resetGame = () => {
  matchedCards = [];
  flipCount = 0;
  duration = 0;
  modal.hidden = true;
  startGame();
};

const startTimer = () => {
  timer = setInterval(() => {
    duration++;
  }, 1000);
};

const stopTimer = () => {
  clearInterval(timer);
};
// startGame();
const initApp = () => {
  startGame();

  // listen for click event
  cardGrid.addEventListener("click", (e) => {
    const card = e.target.closest(".card");
    card && flipCard(card);
  });

  modalButton.addEventListener("click", resetGame);
  console.log(modalButton);
};

const flipCard = (card) => {
  const isCardFlipped = card.classList.contains("flipped");
  // check if current card is not flipped and there are less than 2 flipped cards
  if (!isCardFlipped && flippedCards.length < 2) {
    // add to flipped
    card.classList.add("flipped");
    flippedCards.push(card);
    flipCount++;

    // check for a match
    if (flippedCards.length === 2) {
      setTimeout(checkMatch, 1000);
    }
  }
};
const checkMatch = () => {
  const [card1, card2] = flippedCards;
  if (card1.dataset.name === card2.dataset.name) {
    matchedCards.push(card1, card2);
    checkGameCompletion();
  } else {
    card1.classList.remove("flipped");
    card2.classList.remove("flipped");
  }
  flippedCards = [];
  console.log(flippedCards);
  console.log(matchedCards);
};
const checkGameCompletion = () => {
  if (cardGrid.children.length === matchedCards.length) {
    // stop timer
    stopTimer();

    updateModalContent();
    //display modal
    modal.hidden = false;
  }
};

const updateModalContent = () => {
  const minutes = Math.floor(duration / 60);
  const seconds = Math.floor(duration % 60);
  const timeSpent = `${minutes}:${seconds.toString().padStart(2, "0")}`;

  modalContent.textContent = `You completed the game in ${timeSpent} with ${flipCount} flips.`;
};

initApp();
