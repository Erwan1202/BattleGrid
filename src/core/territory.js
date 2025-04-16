export default class Territory {
    constructor(name, owner, units) {
        this.name = name;
        this.owner = owner;
        this.units = units;
    }

    buildCity() {
        if (!this.city) {
            this.city = true;
            return true;
        }
        return false;
    }

    changeOwner(newOwner) {
        this.owner = newOwner;
    }


    addUnits(n) {
        this.army += n;
    }

    removeUnits(n) {
        this.army = Math.max(0, this.army - n);
    }
}