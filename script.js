const cards = document.querySelectorAll('.card')
const counter = document.querySelector('.counter')
let hasFlippedCard = false;
let firstCard, secondCard;
let lockBoard = false

let count = 0;
console.log(counter)

function flipCard(){

    if(lockBoard) return;
    if(this === firstCard) return;

    this.classList.add('flip')

    if(!hasFlippedCard){
        hasFlippedCard = true;
        firstCard = this;
        return
    }

    secondCard = this;
    hasFlippedCard = false;
    checkForMatch();
}

function checkForMatch() {
    if(firstCard.dataset.card === secondCard.dataset.card){
        disableCards();
        incrementCount();
        return;
    }

    unflipCard();
}

function incrementCount() {
    count += 1;

    if(count < 6) counter.innerText = `Acertos : ${count}`
    
    else{
        counter.innerText = 'Parabéns pela vitória'
    }
}

function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);

    resetBoard();
}

function unflipCard() {
    lockBoard = true;

    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');

        resetBoard();
    }, 1500);
}

function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

(function shuffle(){
    cards.forEach( card => {
        let randomPosition = Math.floor( Math.random() * 12 )
        card.style.order = randomPosition;
    })
})();

cards.forEach(card => {
    card.addEventListener('click', flipCard)
})

