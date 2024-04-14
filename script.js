import cards from "./cards.js";

//* selecorts

const cardGrid = document.querySelector(".card-grid");
const modal = document.querySelector(".modal");
const modalContent = document.querySelector("p");
const modalButton = document.querySelector("button");

let flippedCards = [];
let matchedCards = [];

const startGame = () => {
  // get 8 random card fronts
  const fronts = cards.sort(() => 0.5 - Math.random()).slice(0, 8);

  // double, shuffle , add to grid
  cardGrid.innerHTML = [...fronts, ...fronts]
    .map(({ name, image }) => {
      const card = document.createElement("div");
      card.className = "card";
      card.dataset.name = name;
      card.innerHTML = `
      <img src="backgroung dog.jpeg" alt="" class="back" />
    <img src="${image}" alt="${name}" class="front" />
    `;
      return card.outerHTML;
    })
    .sort(() => 0.5 - Math.random())
    .join("");
};

// startGame();
const initApp = () => {
  startGame();

  // listen for click event
  cardGrid.addEventListener("click", (e) => {
    const card = e.target.closest(".card");
    card && flipCard(card);
  });
};

const flipCard = (card) => {
  const isCardFlipped = card.classList.contains("flipped");
  // check if current card is not flipped and there are less than 2 flipped cards
  if (!isCardFlipped && flippedCards.length < 2) {
    // add to flipped
    card.classList.add("flipped");
    flippedCards.push(card);

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
  } else {
    card1.classList.remove("flipped");
    card2.classList.remove("flipped");
  }
  flippedCards = [];
  console.log(flippedCards);
};

initApp();
