const cardApp = {}
cardApp.card = $('.memoryCard')





cardApp.cardClick = function () {
    //Event Listener (click) on any $('.memoryCard') to execute function of flip Card  
    cardApp.card.on('click', flipCard);
    //flipCard function toggles '.flip' class
    function flipCard() {
        this.classList.toggle('flip');
        
    }

    }

};

cardApp.init = function () {
    cardApp.cardClick();
}
$(document).ready(function () {
    cardApp.init();
});