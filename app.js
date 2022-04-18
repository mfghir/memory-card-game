const section = document.querySelector("section");
const playerLivesCount = document.querySelector("span");
let playerLives = 6;

playerLivesCount.textContent = playerLives;

let getData = () => [
  { imgSrc: "./img/1.jpg", id: 1, name: "1" },
  { imgSrc: "./img/2.jpg", id: 2, name: "2" },
  { imgSrc: "./img/3.png", id: 3, name: "3" },
  { imgSrc: "./img/4.jpg", id: 4, name: "4" },
  { imgSrc: "./img/5.jpg", id: 5, name: "5" },
  { imgSrc: "./img/6.jpg", id: 6, name: "6" },
  { imgSrc: "./img/7.jpg", id: 7, name: "7" },
  { imgSrc: "./img/8.jpg", id: 8, name: "8" },
  { imgSrc: "./img/1.jpg", id: 9, name: "1" },
  { imgSrc: "./img/2.jpg", id: 10, name: "2" },
  { imgSrc: "./img/3.png", id: 11, name: "3" },
  { imgSrc: "./img/4.jpg", id: 12, name: "4" },
  { imgSrc: "./img/5.jpg", id: 13, name: "5" },
  { imgSrc: "./img/6.jpg", id: 14, name: "6" },
  { imgSrc: "./img/7.jpg", id: 15, name: "7" },
  { imgSrc: "./img/8.jpg", id: 16, name: "8" },
];

const randomize = () => {
  const cardData = getData();
  cardData.sort(() => Math.random() - 0.5);
  return cardData;
};

const cardGenerator = () => {
  const cardData = randomize();
  cardData.forEach((item) => {
    const card = document.createElement("div");
    const face = document.createElement("img");
    const back = document.createElement("div");
    card.classList = "card";
    face.classList = "face";
    back.classList = "back";

    face.src = item.imgSrc;
    card.setAttribute("name", item.name);

    section.appendChild(card);
    card.appendChild(face);
    card.appendChild(back);

    card.addEventListener("click", (e) => {
      card.classList.toggle("toggleCard");
      checkCards(e);
    });
  });
};

const checkCards = (e) => {
  const clickedCard = e.target;
  const flippedCards = document.querySelectorAll(".flipped");
  const toggleCard = document.querySelectorAll(".toggleCard");
  clickedCard.classList.add("flipped");

  if (flippedCards.length === 2) {
    if (
      flippedCards[0].getAttribute("name") ===
      flippedCards[1].getAttribute("name")
    ) {
      flippedCards.forEach((card) => {
        card.classList.remove("flipped");
        card.style.pointerEvents = "none";
      });
    } else {
      flippedCards.forEach((card) => {
        card.classList.remove("flipped");
        setTimeout(() => card.classList.remove("toggleCard"), 1000);
      });
      playerLives--;
      playerLivesCount.textContent = playerLives;
      if (playerLives === 0) {
        restart("try again😕 🤕");
      }
    }
  }

  if (toggleCard.length === 16) {
    restart("🎊you win 🤩🎈🎉");
  }
};

const restart = (text) => {
  let cardData = randomize();
  let faces = document.querySelectorAll(".face");
  let cards = document.querySelectorAll(".card");
  section.style.pointerEvents = "none";

  cardData.forEach((item, index) => {
    cards[index].classList.remove("toggleCard");

    setTimeout(() => {
      cards[index].style.pointerEvents = "all";
      faces[index].src = item.imgSrc;
      cards[index].setAttribute("name", item.name);
      section.style.pointerEvents = "all";
    }, 1000);
  });

  playerLives = 6;
  playerLives.textContent = playerLives;

  setTimeout(() => {
    window.alert(text);
  }, 100);
};

cardGenerator();
