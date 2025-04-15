export default class Player {
    constructor(name, pos_x, pos_y) {
        this.name = name;
        this.pos_x = pos_x;
        this.pos_y = pos_y;
        this.army = Math.floor(Math.random() * 1000)+1;
        this.resources = Math.floor(Math.random() * 1000)+1;
        this.gold = Math.floor(Math.random() * 1000)+1;
    }
    
    addTerritory(territory) {
        this.territories.push(territory);
    }

    removeTerritory(territory) {
        this.territories = this.territories.filter(t => t !== territory);
    }

    collectIncome() {
        const income = this.territories.length * 10;
        this.resources += income;
        this.gold += Math.floor(income / 2);
        return income;
    }

    toString() {
        return `${this.name} (Ressources: ${this.resources}, Or: ${this.gold}, Armée: ${this.army})`;
    }
}