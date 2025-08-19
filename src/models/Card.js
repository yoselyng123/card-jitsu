export default class Card{
    constructor(id, number, color, element){
        this.id = id;
        this.number = number;
        this.color = color;
        this.element = element;
    }

    toString() {
        return `ID: ${this.id}, Number: ${this.number}, Color: ${this.color}, Element: ${this.element}`;
    }
}