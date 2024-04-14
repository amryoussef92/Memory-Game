import cards from "./cards.js";

//* selecorts

const cardGrid = document.querySelector(".card-grid");
const modal = document.querySelector(".modal");
const modalContent = document.querySelector("p");
const modalButton = document.querySelector("button");

const startGame = () => {
  //get 8 random card fronts
  const fronts = cards.sort(() => 0.5 - Math.random()).slice(0, 8);

  // double, shuffle , add to grid
  cardGrid.innerHTML = [...fronts, ...fronts]
    .map(({ name, image }) => {
      const card = document.createElement("div");
      card.className = "card flipped";
      card.dataset.name = name;
      card.innerHTML = `
    <img src="background dog.jpg" alt="" class="back" />
    <img src="${image}" alt="${name}" class="front" />
    `;
      return card.outerHTML;
    })
    .sort(() => 0.5 - Math.random())
    .join("");
};

const initApp = () => {
  startGame();
};

initApp();
