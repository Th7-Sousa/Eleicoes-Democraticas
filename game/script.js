const cards = document.querySelectorAll(".card");
let hasFlippedCard = false;
let firstCard, secondCard;
let lockBoard = false;
var count = 0;

// Card Win
function ocultar() {
  document.getElementById("card-win").style.display = "none";
}
function view() {
  document.getElementById("card-win").style.display = "block";
}
ocultar();

// virar carta
function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;

  this.classList.add("flip");
  if (!hasFlippedCard) {
    hasFlippedCard = true;
    firstCard = this;
    return;
  }

  secondCard = this;
  hasFlippedCard = false;
  checkForMatch();
}

// checar se as cartas são iguais / tela de vitória
function checkForMatch() {
  if (firstCard.dataset.card === secondCard.dataset.card) {
    ++count;
    disableCards();
    if (count == 6) {
      view();
      pause();
    }

    return;
  }

  unflipCards();
}

// desabilita as cartas depois que viradas
function disableCards() {
  firstCard.removeEventListener("click", flipCard);
  secondCard.removeEventListener("click", flipCard);

  resetaTab();
}

// desvira as cartas
function unflipCards() {
  lockBoard = true;

  setTimeout(() => {
    firstCard.classList.remove("flip");
    secondCard.classList.remove("flip");

    resetaTab();
  }, 1500);
}

// Reseta o tabuleiro
function resetaTab() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

// embaralha as cartas
(function embaralhar() {
  cards.forEach((card) => {
    let ramdomPosition = Math.floor(Math.random() * 12);
    card.style.order = ramdomPosition;
  });
})();

// add evento de clique na carta
cards.forEach((card) => {
  card.addEventListener("click", flipCard);
});

// embaralhar novamente
var buttomEmbaralhar = document.querySelector("#refresh");
buttomEmbaralhar.addEventListener("click", function () {
  location.reload();
  reset();
});

// Cronômetro

("use strict");

let hour = 0;
let minute = 0;
let second = 0;
let millisecond = 0;

let cron;

document.getElementById("start").onclick = () => start();

function start() {
  pause();
  cron = setInterval(() => {
    timer();
  }, 10);
}

function pause() {
  clearInterval(cron);
}

function reset() {
  hour = 0;
  minute = 0;
  second = 0;
  millisecond = 0;
  document.getElementById("hour").innerText = "00";
  document.getElementById("minute").innerText = "00";
  document.getElementById("second").innerText = "00";
  document.getElementById("millisecond").innerText = "000";
  pause();
}

function timer() {
  if ((millisecond += 10) == 1000) {
    millisecond = 0;
    second++;
  }
  if (second == 60) {
    second = 0;
    minute++;
  }
  if (minute == 60) {
    minute = 0;
    hour++;
  }
  document.getElementById("hour").innerText = returnData(hour);
  document.getElementById("minute").innerText = returnData(minute);
  document.getElementById("second").innerText = returnData(second);
  document.getElementById("millisecond").innerText = returnData(millisecond);
}

function returnData(input) {
  return input >= 10 ? input : `0${input}`;
}
