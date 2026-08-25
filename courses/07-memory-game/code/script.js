// Chapter 1 - Memory Game
const emojis = ["🍎", "🍌", "🍇", "🍒", "🍋", "🍉", "🍓", "🍍"];

const board = document.getElementById("board");
const movesText = document.getElementById("moves");
const winMessage = document.getElementById("win-message");
const finalMoves = document.getElementById("final-moves");
const restartButton = document.getElementById("restart-button");

let cards = [];
let firstIndex = null;
let isChecking = false;
let moves = 0;

function shuffle(array) {
  const result = array.slice();
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = result[i];
    result[i] = result[j];
    result[j] = temp;
  }
  return result;
}

function createCards() {
  const pairedValues = emojis.concat(emojis);
  const shuffledValues = shuffle(pairedValues);
  return shuffledValues.map((value) => ({ value: value, flipped: false, matched: false }));
}

function cardClass(card) {
  if (card.matched) {
    return "card matched";
  }
  if (card.flipped) {
    return "card flipped";
  }
  return "card";
}

function renderCards() {
  board.innerHTML = cards
    .map((card, index) => {
      const stateClass = cardClass(card);
      return (
        '<button class="' + stateClass + '" data-index="' + index + '">' +
          '<span class="card-inner">' +
            '<span class="card-face card-front">?</span>' +
            '<span class="card-face card-back">' + card.value + "</span>" +
          "</span>" +
        "</button>"
      );
    })
    .join("");

  board.querySelectorAll(".card").forEach((button) => {
    button.addEventListener("click", () => {
      handleCardClick(Number(button.dataset.index));
    });
  });

  movesText.textContent = "Moves: " + moves;
}

function handleCardClick(index) {
  if (isChecking || cards[index].flipped || cards[index].matched) {
    return;
  }

  cards[index].flipped = true;
  renderCards();

  if (firstIndex === null) {
    firstIndex = index;
    return;
  }

  checkForMatch(firstIndex, index);
  firstIndex = null;
}

function checkForMatch(a, b) {
  moves = moves + 1;

  if (cards[a].value === cards[b].value) {
    cards[a].matched = true;
    cards[b].matched = true;
    renderCards();
    checkWin();
    return;
  }

  isChecking = true;
  setTimeout(() => {
    cards[a].flipped = false;
    cards[b].flipped = false;
    isChecking = false;
    renderCards();
  }, 800);
}

function checkWin() {
  const allMatched = cards.every((card) => card.matched);
  if (allMatched) {
    winMessage.classList.remove("hidden");
    finalMoves.textContent = moves;
  }
}

function restartGame() {
  cards = createCards();
  moves = 0;
  firstIndex = null;
  isChecking = false;
  winMessage.classList.add("hidden");
  renderCards();
}

restartButton.addEventListener("click", restartGame);

cards = createCards();
renderCards();
