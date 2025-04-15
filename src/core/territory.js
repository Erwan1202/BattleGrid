export default class Territory {
    constructor(x, y){
        this.x = x;
        this.y = y;
        this.owner = null;
        this.army = 0;
        this.resources = 0;
        this.construction = 0; 
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