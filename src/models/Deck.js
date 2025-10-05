export default class Deck{
    constructor(cards){
        this.cards = cards;
        this.unplayedCards = this.cards;
    }

    getFullDeck(){
        return this.cards
    }

    getUnplayedCards(){
        return this.unplayedCards
    }

    resetDeck(){
        this.unplayedCards = this.cards;
    }
    // https://coureywong.medium.com/how-to-shuffle-an-array-of-items-in-javascript-39b9efe4b567
    shuffle(){
        let i = this.unplayedCards.length, j, temp;
        while (--i > 0) {
            j = Math.floor(Math.random() * (i + 1));
            temp = this.unplayedCards[j];
            this.unplayedCards[j] = this.unplayedCards[i];
            this.unplayedCards[i] = temp;
        }
    }

    addCard(newCard){
        this.cards.push(newCard)
    }

    addCards(newCards){
        this.cards = [...this.cards, newCards]
    }

    drawCard(){
        if (this.unplayedCards.length > 0) {
            let i = Math.floor(Math.random() * this.unplayedCards.length);
            let drawnCard = this.unplayedCards[i];
            this.unplayedCards.splice(i, 1);
            return drawnCard;
        } else {
            // RESET UNPLAYED CARDS
            this.unplayedCards = this.cards;
            let i = Math.floor(Math.random() * this.unplayedCards.length);
            let drawnCard = this.unplayedCards[i];
            this.unplayedCards.splice(i, 1);
            return drawnCard;
        }
        
    }
}