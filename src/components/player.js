export default class Player {
    constructor(name, id) {
        this.name = name;
        this.id = id;
        this.territories = [];

        this.biomass = Math.floor(Math.random*1000); // unités de croissance
        this.resources = Math.floor(Math.random*1000); // énergie / nutriments
        this.gold = Math.floor(Math.random*100); // pour la construction
    }

    addTerritory(territory) {
        this.territories.push(territory);
    }

    removeTerritory(territory) {
        this.territories = this.territories.filter(t => t !== territory);
    }

    collectIncome() {
        const n = this.territories.length;
        const energyGain = n * 10;
        const goldGain = Math.floor(n * 2);
        const biomassGain = Math.floor(n * 5);

        this.resources += energyGain;
        this.gold += goldGain;
        this.biomass += biomassGain;

        console.log(`🦠 ${this.name} a absorbé : +${energyGain} énergie, +${biomassGain} biomasse, +${goldGain} or`);
    }

    toString() {
        return `${this.name} — Biomasse : ${this.biomass}, Énergie : ${this.resources}, Or : ${this.gold}`;
    }
}