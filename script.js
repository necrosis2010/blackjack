let suits = ["S", "H", "D", "C"];
let ranks = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
let deck = [];

let player = {
  hand: [],
  value: 0,
  aceCount: 0,
  win: null,
};

let dealer = {
  hand: [],
  value: 0,
  aceCount: 0,
  win: null,
};

const createAndShuffleDeck = () => {
  suits.forEach((suit) => {
    ranks.forEach((rank) => {
      deck.push(rank + " of " + suit);
    });
  });

  for (let i = 0; i < 100; i++) {
    let location1 = Math.floor(Math.random() * deck.length);
    let location2 = Math.floor(Math.random() * deck.length);

    let tmp = deck[location1];
    deck[location1] = deck[location2];
    deck[location2] = tmp;
  }
};

const dealCards = (person) => {
  person.hand.push(deck.pop());
  person.hand.push(deck.pop());
};

const calculateCardValue = (person) => {
  let i = 0;
  while (i != person.hand.length) {
    if (person.hand[i].includes(2)) {
      person.value += 2;
    } else if (person.hand[i].includes(3)) {
      person.value += 3;
    } else if (person.hand[i].includes(4)) {
      person.value += 4;
    } else if (person.hand[i].includes(5)) {
      person.value += 5;
    } else if (person.hand[i].includes(6)) {
      person.value += 6;
    } else if (person.hand[i].includes(7)) {
      person.value += 7;
    } else if (person.hand[i].includes(8)) {
      person.value += 8;
    } else if (person.hand[i].includes(9)) {
      person.value += 9;
    } else if (person.hand[i].includes(10)) {
      person.value += 10;
    } else if (person.hand[i].includes("J")) {
      person.value += 10;
    } else if (person.hand[i].includes("Q")) {
      person.value += 10;
    } else if (person.hand[i].includes("K")) {
      person.value += 10;
    } else if (person.hand[i].includes("A")) {
      person.value += 11;
      person.aceCount += 1;
    }

    i++;
  }

  return person.value;
};

const aceCorrection = (person) => {
  if (person.value > 21 && person.aceCount > 1) {
    person.value -= 10;
    person.aceCount--;
  }
};

const resetValue = (person) => {
  person.value = 0;
};

const hit = (person) => {
  person.hand.push(deck.pop());
  if (person === dealer) {
    createCard(dealer.hand[1], dealer);
  }
  //   let numberOfCards = person.hand.length -1
  createCard(person.hand[person.hand.length - 1], person);
};

const stand = () => {
  resetValue(player);
  calculateCardValue(player);
  aceCorrection(player);

  while (dealer.value < 17) {
    hit(dealer);
    resetValue(dealer);
    calculateCardValue(dealer);
    aceCorrection(dealer);
  }
};

let tie = false;
const winner = () => {
  if (dealer.value > 21) {
    player.win = true;
  } else if (player.value > 21) {
    dealer.win = true;
  } else if (dealer.value > player.value) {
    dealer.win = true;
  } else if (player.value > dealer.value) {
    player.win = true;
  } else if (player.value === dealer.value) {
    tie = true;
  }
};

let dealerCardArea = document.querySelectorAll(".card-area")[0];
let playerCardArea = document.querySelectorAll(".card-area")[1];

const createCard = (card, person) => {
  let displayCard = document.createElement("div");
  displayCard.classList.add("card");

  if (card.includes(2)) {
    displayCard.innerHTML = "2<br/>";
  } else if (card.includes(3)) {
    displayCard.innerHTML = "3<br/>";
  } else if (card.includes(4)) {
    displayCard.innerHTML = "4<br/>";
  } else if (card.includes(5)) {
    displayCard.innerHTML = "5<br/>";
  } else if (card.includes(6)) {
    displayCard.innerHTML = "6<br/>";
  } else if (card.includes(7)) {
    displayCard.innerHTML = "7<br/>";
  } else if (card.includes(8)) {
    displayCard.innerHTML = "8<br/>";
  } else if (card.includes(9)) {
    displayCard.innerHTML = "9<br/>";
  } else if (card.includes(10)) {
    displayCard.innerHTML = "10<br/>";
  } else if (card.includes("J")) {
    displayCard.innerHTML = "J<br/>";
  } else if (card.includes("Q")) {
    displayCard.innerHTML = "Q<br/>";
  } else if (card.includes("K")) {
    displayCard.innerHTML = "K<br/>";
  } else if (card.includes("A")) {
    displayCard.innerHTML = "A<br/>";
  }

  if (card.includes("S")) {
    displayCard.innerHTML += "♠";
  } else if (card.includes("H")) {
    displayCard.innerHTML += "♥";
  } else if (card.includes("D")) {
    displayCard.innerHTML += "♦";
  } else if (card.includes("C")) {
    displayCard.innerHTML += "♣";
  }

  if (person === player) {
    playerCardArea.appendChild(displayCard);
  } else {
    dealerCardArea.appendChild(displayCard);
  }
};

let dealerValue = document.querySelectorAll("button[disabled]")[0];
let playerValue = document.querySelectorAll("button[disabled]")[1];

const updateValuesUI = (person) => {
  if (person === player) {
    playerValue.innerText += player.value;
  } else {
    dealerValue.innerText += dealer.value;
  }
};

const winnerUpdateUI = () => {
  let displayWinner = document.createElement("button");
  displayWinner.classList.add("btn");
  displayWinner.classList.add("btn-lg");
  displayWinner.classList.add("btn-warning");
  displayWinner.classList.add("mt-3");
  displayWinner.classList.add("centered");

  if (player.win === true) {
    displayWinner.innerText = "Player wins!";
  } else if (dealer.win === true) {
    displayWinner.innerText = "Dealer wins!";
  } else {
    displayWinner.innerText = "Tie!";
  }

  let outerDiv = document.getElementsByClassName("winner-display")[0];
  outerDiv.appendChild(displayWinner);
};
