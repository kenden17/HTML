let decks = JSON.parse(localStorage.getItem("flashcardDecks")) || {};
let currentDeck = null;
let currentIndex = 0;
let flipped = false;

const deckList = document.getElementById("deck-list");
const deckNameInput = document.getElementById("deck-name");
const questionInput = document.getElementById("question");
const answerInput = document.getElementById("answer");
const flashcard = document.getElementById("flashcard");
const cardFront = document.getElementById("card-front");
const cardBack = document.getElementById("card-back");
const flashcardSection = document.getElementById("flashcard-section");
const currentDeckName = document.getElementById("current-deck-name");

function saveDecks() {
  localStorage.setItem("flashcardDecks", JSON.stringify(decks));
}

function createDeck() {
  const name = deckNameInput.value.trim();
  if (!name || decks[name]) return;
  decks[name] = [];
  saveDecks();
  deckNameInput.value = "";
  renderDeckList();
}

function renderDeckList() {
  deckList.innerHTML = "";
  Object.keys(decks).forEach(name => {
    const btn = document.createElement("button");
    btn.textContent = name;
    btn.onclick = () => openDeck(name);
    deckList.appendChild(btn);
  });
}

function openDeck(name) {
  currentDeck = name;
  currentIndex = 0;
  flipped = false;
  currentDeckName.textContent = name;
  flashcard.classList.remove("flipped");
  updateCard();
  flashcardSection.classList.remove("hidden");
}

function updateCard() {
  const deck = decks[currentDeck];
  if (deck.length === 0) {
    cardFront.textContent = "No cards";
    cardBack.textContent = "";
  } else {
    cardFront.textContent = deck[currentIndex].q;
    cardBack.textContent = deck[currentIndex].a;
  }
}

function addCard() {
  const q = questionInput.value.trim();
  const a = answerInput.value.trim();
  if (!q || !a) return;
  decks[currentDeck].push({ q, a });
  saveDecks();
  questionInput.value = "";
  answerInput.value = "";
  currentIndex = decks[currentDeck].length - 1;
  flipped = false;
  flashcard.classList.remove("flipped");
  updateCard();
}

function flipCard() {
  flipped = !flipped;
  flashcard.classList.toggle("flipped", flipped);
}

function prevCard() {
  if (!decks[currentDeck] || decks[currentDeck].length === 0) return;
  currentIndex = (currentIndex - 1 + decks[currentDeck].length) % decks[currentDeck].length;
  flipped = false;
  flashcard.classList.remove("flipped");
  updateCard();
}

function nextCard() {
  if (!decks[currentDeck] || decks[currentDeck].length === 0) return;
  currentIndex = (currentIndex + 1) % decks[currentDeck].length;
  flipped = false;
  flashcard.classList.remove("flipped");
  updateCard();
}

function deleteDeck() {
  if (!currentDeck) return;
  delete decks[currentDeck];
  saveDecks();
  currentDeck = null;
  flashcardSection.classList.add("hidden");
  renderDeckList();
}

renderDeckList();
