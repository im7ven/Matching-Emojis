const cards = document.querySelectorAll(".card");

let pair = 0;
let firstCard, secondCard;
let disableCards = false;
let matchingCards = [];

function flipCard({ target: cardClicked }) {
  if (firstCard !== cardClicked && !disableCards) {
    cardClicked.classList.add("flip");
    if (!firstCard) {
      return (firstCard = cardClicked);
    }

    secondCard = cardClicked;
    disableCards = true;

    let firstCardImg = firstCard.querySelector(".card-back img").src,
      secondCardImg = secondCard.querySelector(".card-back img").src;
    matchCards(firstCardImg, secondCardImg);
  }
}

function matchCards(card1, card2) {
  if (card1 === card2) {
    pair++;
    // matchingCards.push(pair);
    if (pair === 15) {
      gameResults();
      setTimeout(() => {
        return shuffleCard();
      }, 1000);
    }

    firstCard.removeEventListener("click", flipCard);
    secondCard.removeEventListener("click", flipCard);
    firstCard = secondCard = "";
    return (disableCards = false);
  }

  setTimeout(() => {
    firstCard.classList.add("shake");
    secondCard.classList.add("shake");
  }, 400);

  setTimeout(() => {
    firstCard.classList.remove("shake", "flip");
    secondCard.classList.remove("shake", "flip");
    firstCard = secondCard = "";
    disableCards = false;
  }, 1200);
}

function shuffleCard() {
  pair = 0;
  disableCards = false;
  firstCard = secondCard = "";

  let arr = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 1, 2, 3, 4, 5, 6, 7, 8,
    9, 10, 11, 12, 13, 14, 15,
  ];
  arr.sort(() => (Math.random() > 0.5 ? 1 : -1));
  cards.forEach((card, i) => {
    card.classList.remove("flip");

    let imgTag = card.querySelector(".card-back img");
    imgTag.src = `images/img-${arr[i]}.png`;
    card.addEventListener("click", flipCard);
  });
}

shuffleCard();

cards.forEach((card) => {
  card.addEventListener("click", flipCard);
});

const appendMins = document.getElementById("mins");
const appendTens = document.getElementById("tens");
const appendSecs = document.getElementById("secs");
let interval;

let mins = 0;
let tens = 0;
let secs = 0;

function startTime() {
  interval = setInterval(() => {
    secs++;
    appendSecs.innerHTML = secs;

    if (secs > 9) {
      appendTens.innerHTML = "";
    } else appendTens.innerHTML = 0;

    if (secs === 60) {
      secs = 0;
      appendSecs.innerHTML = secs + "0";
      appendMins.innerHTML = ++mins;
    }
  }, 1000);

  //   if (matchingCards.length === 15) {
  //     console.log("YES BUT");
  //     clearInterval(interval);
  //   } else console.log(matchingCards.length);
}

const game = document.querySelector(".cards");
const timer = document.getElementById("timer");
const results = document.getElementById("results");

function gameResults() {
  const gameMins = document.getElementById("mins").innerHTML;
  const gameSecs = document.getElementById("secs").innerHTML;

  console.log(gameMins);
  console.log(gameSecs);

  game.style.display = "none";
  timer.style.display = "none";

  results.classList.add("show-results");

  const performance = document.getElementById("performance");
  const userTime = document.getElementById("userTime");
  const rewardMsg = document.getElementById("rewardMsg");
  let rewardImg = document.getElementById("rewardImg");

  if ((gameMins >= 2 && gameSecs > 30) || gameMins >= 3) {
    performance.innerHTML = "Good ";
    rewardMsg.innerHTML = "bronze trophy";
    rewardImg.src = "images/bronze.png";
    if (gameSecs < 10) {
      userTime.innerHTML = ` ${gameMins}:0${gameSecs} `;
    } else userTime.innerHTML = ` ${gameMins}:${gameSecs} `;
  } else if (
    (gameMins >= 1 && gameSecs > 30) ||
    (gameMins == 2 && gameSecs < 30)
  ) {
    performance.innerHTML = "Great ";
    rewardMsg.innerHTML = "silver trophy";
    rewardImg.src = "images/silver.png";
    if (gameSecs < 10) {
      userTime.innerHTML = ` ${gameMins}:0${gameSecs} `;
    } else {
      userTime.innerHTML = ` ${gameMins}:${gameSecs} `;
    }
  } else if (gameMins == 1 && gameSecs <= 30 && gameMins == 1 && gameSecs > 5) {
    performance.innerHTML = "Fantastic ";
    rewardMsg.innerHTML = "gold trophy";
    rewardImg.src = "images/gold.png";
    if (gameSecs < 10) {
      userTime.innerHTML = ` ${gameMins}:0${gameSecs} `;
    } else userTime.innerHTML = ` ${gameMins}:${gameSecs} `;
  } else {
    performance.innerHTML = "Phenomenal ";
    rewardMsg.innerHTML = "diamond trophy";
    rewardImg.src = "images/diamond.png";
    if (gameSecs < 10) {
      userTime.innerHTML = ` ${gameMins}:0${gameSecs} `;
    } else userTime.innerHTML = ` ${gameMins}:${gameSecs} `;
  }
}

const btn = document.getElementById("startBtn");
btn.addEventListener("click", startGame);

function startGame() {
  const menu = document.getElementById("gameMenu");
  menu.style.display = "none";

  const timer = document.getElementById("timer");
  timer.style.display = "flex";
  const game = document.getElementById("container");
  game.style.display = "block";
  startTime();
}

function playAgain() {
  location.reload();
  return false;
  //   game.style.display = "flex";
  //   timer.style.display = "flex";

  //   results.classList.remove("show-results");

  //   shuffleCard();
  //   startTime();
}
