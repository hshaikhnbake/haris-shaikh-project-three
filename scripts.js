
//Baseline App Variables
const cardApp = {}
cardApp.card = $('.memoryCard')
cardApp.cardMatchContainer = [];

//App Features

//Audio Components
cardApp.playMainAudio = function () {
    $('.soundOn').on('click', soundOn);

    function soundOn (){
        $('#mainAudio')[0].play();
    }
}

cardApp.pauseMainAudio = function () {
    $('.soundOff').on('click', soundOn);

    function soundOn() {
        $('#mainAudio')[0].pause();
    }
}

//Smooth Scroll Feature
cardApp.scroll = function () {
    $(".startGame").click(function () {
        $('html, body').animate({
            scrollTop: $(".game").offset().top
        }, 100);
    });
}

// Card Match If Function
cardApp.cardMatch = function () {
    if (cardApp.cardMatchContainer.length === 2) {
        if (cardApp.cardMatchContainer[0].data('type') === cardApp.cardMatchContainer[1].data('type')) {
            cardApp.match();

        } else {
            cardApp.unmatch();
        }
    }
}

//Main Card Match Function
cardApp.cardClick = function () {
    //Event Listener on any cardApp.card to execute function of flipCard

    cardApp.card.on('click', flipCard);
    //flipCard function toggles '.flip' class
    function flipCard() {

        this.classList.toggle('flip');

        //Once the card has been flipped, the card is pushed in a cardMatchContainer
        if (cardApp.card.hasClass('flip')) {
            cardApp.cardMatchContainer.push($(this))
        }


        // if length of cards is equal to 2, check to see if the two cards match based on data attribute of "type". If they do, run a match function. If they don't run a unmatched function. 
        cardApp.cardMatch();

        //lockboard prevents the game to crash. Additional clicks during the unmatch function are temporarily paused. Matched cards will not be allowed to flip back.
        
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
            const data = cardApp.cardMatchContainer[0].data('type')
            cardApp.lockMatched();
            $('#matchAudio')[0].play();
            cardApp.cardMatchContainer = [];
            $('.matchResultMessage').text(`You matched: ${data}`);
        }

        cardApp.unmatch = function () {
            cardApp.lockBoard();
            $('#noMatchAudio')[0].play();
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
    cardApp.playMainAudio();
    cardApp.pauseMainAudio();
    cardApp.scroll();
}
$(document).ready(function () {
    cardApp.init();
});
