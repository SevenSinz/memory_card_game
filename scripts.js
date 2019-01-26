// flip cards 
const cards = document.querySelectorAll('.memory-card');

/** flipped=false is turned to true after first click is registered as firstCard
 * and reset to false when second click is registered as secondCard  */ 
let flipped = false;

/** lockCards will be activated only if two **different** cards are clicked.
* it will prevent a new click to be compared to firstCard & secondCard.
* It will reset after the cards are hidden again).  */
let lockCards = false;
let firstCard, secondCard;
let count=0;

function flipCards() {
    /** counting the number of clicks */
    count++;


    if (lockCards) return;
    if (this === firstCard) return;

    this.classList.add('flip');
  
//   capture the first and second card
    if (!flipped) {
        flipped = true;
        firstCard = this;
        return;
    }
        secondCard = this;
        checkMatch();
}

// check if firstCard and secondCard match 
function checkMatch(){
    (firstCard.dataset.framework === secondCard.dataset.framework) ? 
        removeListeners() :  hideCards();
}
/**  removeEventListeners will make sure clicking on 
matched cards won't trigger anything */
function removeListeners(){
    firstCard.removeEventListener('click', flipCards);
    secondCard.removeEventListener('click', flipCards);
    resetForNextMatch();
}    

/** flips back the unmatching cards */
function hideCards() { 
    /** lockcard = true for the 1.5 sec timeOut bypasses any click registeration*/
    lockCards = true;
    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');
  
        /** registers the clicks*/    
            resetForNextMatch();
        }, 1500);
}

function resetForNextMatch(){
    flipped     = false;
    lockCards   = false;
    firstCard   = null;
    secondCard  = null;
}      

(function shuffle() {
       cards.forEach(card => {
         let randomI = Math.floor(Math.random() * 12);
         card.style.order = randomI;
       });
     })();

cards.forEach(card => card.addEventListener('click', flipCards));



