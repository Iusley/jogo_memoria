document.addEventListener('DOMContentLoaded', function () {
    const cards = document.querySelectorAll('.card');
    let flippedCards = [];
    let hasFlippedCard = false;
    let lockBoard = false;

    // Adiciona evento de clique a cada carta
    cards.forEach(card => card.addEventListener('click', flipCard));

    function flipCard() {
        if (lockBoard) return;
        if (this === flippedCards[0]) return;

        this.classList.add('flip');

        if (!hasFlippedCard) {
            hasFlippedCard = true;
            flippedCards[0] = this;
        } else {
            hasFlippedCard = false;
            flippedCards[1] = this;

            checkForMatch();
        }
    }

    function checkForMatch() {
        let isMatch = flippedCards[0].querySelector('img').src === flippedCards[1].querySelector('img').src;

        isMatch ? disableCards() : unflipCards();
    }

    function disableCards() {
        flippedCards.forEach(card => card.removeEventListener('click', flipCard));
        resetBoard();
    }

    function unflipCards() {
        lockBoard = true;

        setTimeout(() => {
            flippedCards.forEach(card => card.classList.remove('flip'));
            resetBoard();
        }, 1000);
    }

    function resetBoard() {
        [hasFlippedCard, lockBoard] = [false, false];
        [flippedCards[0], flippedCards[1]] = [null, null];
    }
});
