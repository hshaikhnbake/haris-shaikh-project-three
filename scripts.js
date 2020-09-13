const cardApp = {}
cardApp.card = $('.memoryCard')
cardApp.cardMatchContainer = [];
// cardApp.matchAudio = 
// cardApp.unmatchAudio = 

cardApp.cardMatch = function () {
    if (cardApp.cardMatchContainer.length === 2) {
        if (cardApp.cardMatchContainer[0].data('type') === cardApp.cardMatchContainer[1].data('type')) {
            cardApp.match();

        } else {
            cardApp.unmatch();
        }
    }
}

cardApp.cardClick = function () {
    //Event Listener on any cardApp.card to execute function of flipCard
    
    cardApp.card.on('click', flipCard);
    //flipCard function toggles '.flip' class
    function flipCard() {

        this.classList.toggle('flip');

        //Once the card has been flipped, the card is pushed in a cardMatchContainer
        if (cardApp.card.hasClass('flip')) {
            cardApp.cardMatchContainer.push($(this))
            console.log(cardApp.cardMatchContainer)
        }


        // if length of cards is equal to 2, check to see if the two cards match. If they do, run a match function. If they don't run a unmatched function. 
        cardApp.cardMatch();

        cardApp.lockBoard = function () {
            cardApp.card.off('click', flipCard)
        }
        cardApp.unlockBoard = function () {
            cardApp.card.on('click', flipCard)
        }
        cardApp.lockMatched = function () {
            $('.match').off('click', flipCard)
        }

        cardApp.match = function () {

            $(cardApp.cardMatchContainer[0]).addClass('match');
            $(cardApp.cardMatchContainer[1]).addClass('match');
            cardApp.lockMatched();
            cardApp.cardMatchContainer = [];
        }

        cardApp.unmatch = function () {
            cardApp.lockBoard();
            setTimeout(function () {
                $(cardApp.cardMatchContainer[0]).removeClass('flip');
                $(cardApp.cardMatchContainer[1]).removeClass('flip');
                cardApp.cardMatchContainer = [];
                cardApp.unlockBoard();
            }, 1100);
        }
    }
}

cardApp.init = function () {
    cardApp.cardClick();
}
$(document).ready(function () {
    cardApp.init();
});
