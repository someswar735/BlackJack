let playerName = prompt("Enter your name:")
let playerChips = parseInt(prompt("Enter the number of chips you want to start with:"))

let player = {
    name: playerName,
    chips: playerChips
}


let cards = []
let sum = 0
let hasBlackJack = false
let isAlive = false
let message = ""
let messageEl = document.getElementById("message-el")
let sumEl = document.getElementById("sum-el")
let cardsEl = document.getElementById("cards-el")
let playerEl = document.getElementById("player-el")

playerEl.textContent = player.name + ": $" + player.chips

function getRandomCard() {
    let randomNumber = Math.floor( Math.random()*13 ) + 1
    if (randomNumber > 10) {
        return 10
    } else if (randomNumber === 1) {
        return 11
    } else {
        return randomNumber
    }
}

function startGame() {
    isAlive = true
    hasBlackJack = false 
    let firstCard = getRandomCard()
    let secondCard = getRandomCard()
    cards = [firstCard, secondCard]
    sum = firstCard + secondCard
    renderGame()
    playCardFlipSound();
}


function renderGame() {
    cardsEl.textContent = "Cards: "
    for (let i = 0; i < cards.length; i++) {
        let card = document.createElement("span");
        card.textContent = cards[i] + " ";
        card.className = "card";
        cardsEl.appendChild(card);
        card.style.animation = "drawCard 0.5s ease-out " + (i * 0.2) + "s 1 forwards";
    }
    
    sumEl.textContent = "Sum: " + sum
    if (sum <= 20) {
        message = "Do you want to draw a new card?"
    } else if (sum === 21) {
        message = "You've got Blackjack!"
        hasBlackJack = true
        playBlackjackSound(); // blackjack sound
    } else {
        message = "You're out of the game!"
        isAlive = false
        messageEl.textContent = message;
        messageEl.classList.add("out-of-jack");
        playOutOfJackSound(); // outOfJack sound
    }
    messageEl.textContent = message
}



function newCard() {
    if (isAlive === true && hasBlackJack === false) {
        let card = getRandomCard()
        sum += card
        cards.push(card)
        renderGame()
        playCardFlipSound(); //sound effect

        // if (sum > 21) {
        //     isAlive = false;
        //     playOutOfJackSound(); // outOfJack sound
        // }
    }
}


function playCardFlipSound() {
    let card = document.getElementById("card-flip-sound");
    card.play();
}
function playOutOfJackSound() {
    let outOfJack = document.getElementById("outOfJack-sound");
    outOfJack.play();
}
function playBlackjackSound() {
    let blackjackSound = document.getElementById("blackjack-sound");
    blackjackSound.play();
}
function changeTheme() {
    let theme = document.getElementById("theme-select").value;
    let body = document.querySelector("body");

    switch (theme) {
        case "dark":
            body.style.backgroundImage = "url('blackBg.jpg')";
            body.style.color = "white";
            break;
        case "light":
            body.style.backgroundImage = "url('whiteBg.jpg')";
            body.style.color = "black";
            break;
        default:
            body.style.backgroundImage = "url('bg.jpg')";
            body.style.color = "white";
            break;
    }
}
