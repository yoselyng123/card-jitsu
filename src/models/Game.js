import { COLORS, ELEMENTS, NUMBERS } from "../game_elements";
import Card from "./Card";
import Deck from "./Deck";

export default class Game{
    constructor(){
        this.gameHistory = [];
        this.roundTime = 20;
        this.gameTime = 0;
        // FULL 30 CARD DECK
        this.computerDeck = this.generateStartingDeck();
        this.playerDeck = this.generateStartingDeck();
        // HAND DECK (5 CARDS IN ROUND)
        this.playerHandDeck = this.setPlayerHandDeck(this.playerDeck);
        this.computerHandDeck = this.setPlayerHandDeck(this.computerDeck);
        // WINNING CARDS
        this.wonRoundsComputer = [];
        this.wonRoundsPlayer = [];
        // PLAYED CARDS
        this.playedCardsByPlayer = [];
        this.playedCardsByComputer = [];
        // Played Card by Round
        this.selectedPlayerCard = null;
        this.selectedComputerCard = null;
    }

    generateStartingDeck(){
        const NUMBER_OF_CARDS = 30;
        let cards = [];

        for (let i = 0; i < NUMBER_OF_CARDS; i++) {
            let colorIndex = Math.floor(Math.random() * COLORS.length);
            let numberIndex = Math.floor(Math.random() * NUMBERS.length);
            let elementIndex = Math.floor(Math.random() * ELEMENTS.length);

            let random_card = new Card(i + 1,NUMBERS[numberIndex], COLORS[colorIndex], ELEMENTS[elementIndex]);
            random_card.toString();
            cards.push(random_card);
        }

        return new Deck(cards);
    }

    pickRandomCardFromComputerHandDeck(){
        // Agarrar una carta de mi Computer Hand Deck
        let randomIndex = Math.floor(Math.random() * this.computerHandDeck.length);
        let randomCard = this.computerHandDeck[randomIndex];
        // Quitar la carta del computer hand deck
        this.computerHandDeck.splice(randomIndex, 1);
        // Agregar una nueva carta al hand deck
        this.computerHandDeck.push(this.computerDeck.drawCard());
        // Meter la carta en played cards para no poder jugarla otra vez
        this.playedCardsByComputer.push(randomCard);
        // Asignar carta seleccionada por la computadora
        this.selectedComputerCard = randomCard;
        return randomCard
    }

    pickPlayerCardFromPlayerHandDeck(playerCard){
        for (let i = 0; i < this.playerHandDeck.length; i++) {
            if (playerCard.id === this.playerHandDeck[i].id) {
                // Quitar la carta del computer hand deck
                this.playerHandDeck.splice(i, 1);
                // Agregar una nueva carta al hand deck
                this.playerHandDeck.push(this.playerDeck.drawCard());
                // Meter la carta en played cards para no poder jugarla otra vez
                this.playedCardsByPlayer.push(playerCard);
                // Asignar carta seleccionada por el jugador
                this.selectedPlayerCard = playerCard;
                return playerCard;
            }
        }
        return null;
    }

    battleCards(playerCard, computerCard){

        if(playerCard.element === computerCard.element){ 
            if(playerCard.number > computerCard.number){
                console.log("PLAYER WINS");
                this.wonRoundsPlayer.push(playerCard)
            }else if (computerCard.number > playerCard.number){
                console.log("COMPUTER WINS")
                this.wonRoundsComputer.push(computerCard)
            }else{
                console.log("TIE")
            }
        }else{
            if(playerCard.element === 'Fire' && computerCard.element === 'Snow'){
                console.log("PLAYER WINS")
                this.wonRoundsPlayer.push(playerCard)
            }else if(computerCard.element === 'Fire' && playerCard.element === 'Snow'){
                console.log("COMPUTER WINS")
                this.wonRoundsComputer.push(computerCard)
            }else if(playerCard.element === 'Fire' && computerCard.element === 'Water'){
                console.log("COMPUTER WINS")
                this.wonRoundsComputer.push(computerCard)
            }else if(computerCard.element === 'Fire' && playerCard.element === 'Water'){
                console.log("PLAYER WINS")
                this.wonRoundsPlayer.push(playerCard)
            }else if(playerCard.element === 'Water' && computerCard.element === 'Snow'){
                console.log("COMPUTER WINS")
                this.wonRoundsComputer.push(computerCard)
            }else if(computerCard.element === 'Water' && playerCard.element === 'Snow'){
                console.log("PLAYER WINS")
                this.wonRoundsPlayer.push(playerCard)
            }
        }

    }

    resetRoundTime(){
        this.time = 20
    }

    reset(){
        this.time = 20;
        this.wonRoundsComputer = []
        this.wonRoundsPlayer = []
        // RESET PLAYED CARDS IN DECK
        this.playerDeck.resetDeck();
        this.computerDeck.resetDeck();
        // HAND DECK (5 CARDS IN ROUND)
        this.playerHandDeck = this.setPlayerHandDeck(this.playerDeck);
        this.computerHandDeck = this.setPlayerHandDeck(this.computerDeck);
        // WINNING CARDS
        this.wonRoundsComputer = [];
        this.wonRoundsPlayer = [];
        // PLAYED CARDS
        this.playedCardsByPlayer = [];
        this.playedCardsByComputer = [];
        // Played Card by Round
        this.selectedPlayerCard = null;
        this.selectedComputerCard = null;
    }

    getPlayerDeck(){
        return this.playerDeck;
    }

    getSelectedPlayerCard(){
        return this.selectedPlayerCard;
    }

    getSelectedComputerCard(){
        return this.selectedComputerCard;
    }

    setPlayerHandDeck(deck){
        let newHandDeck = [];
        for (let i = 0; i < 5; i++) {
            newHandDeck.push(deck.drawCard());
        }
        return newHandDeck;
    }

    getPlayerHandDeck(){
        console.log(`PLAYER HAND DECK: ${this.playerHandDeck}`)
        return this.playerHandDeck;
    }

    getComputerHandDeck(){
        console.log(`COMPUTER HAND DECK: ${this.computerHandDeck}`)
        return this.computerHandDeck;
    }

    getWonRoundsComputer(){
        return this.wonRoundsComputer;
    }

    getWonRoundsPlayer(){
        return this.wonRoundsPlayer;
    }

    checkForWinner(){
        if(this.wonRoundsComputer.length > 2 || this.wonRoundsPlayer.length > 2){
            let grouppedElementsComputer = this.wonRoundsComputer.reduce((acc, item) => {
                if (!acc[item.element]) {
                acc[item.element] = [];
                }
                acc[item.element].push(item);
                return acc;
            }, {});

            if(Object.keys(grouppedElementsComputer).length === 3){
                return "Computer Wins"
            }else{
                //TODO: NO ESTA MOSTRANDO CUANDO EL PLAYER GANA SOLO CUANDO COMPUTER GANA
                let grouppedElementsPlayer = this.wonRoundsPlayer.reduce((acc, item) => {
                    if (!acc[item.element]) {
                    acc[item.element] = [];
                    }
                    acc[item.element].push(item);
                    return acc;
                }, {});

                if(Object.keys(grouppedElementsPlayer).length === 3){
                    return "Player Wins"
                }
            }
        }

        return null;
    }

    //TODO: Round timer

    // TODO: Select random card from player deck if timer ends

    //TODO: Pensar que sucede si se juegan todas las cartas del Deck - Unplayed Deck

    //TODO: start game

    // TODO: stop game
}