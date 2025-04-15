export default class Player {
    constructor(name, pos_x, pos_y) {
        this.name = name;
        this.pos_x = pos_x;
        this.pos_y = pos_y;
        this.army = Math.floor(Math.random() * 1000)+1;
        this.resources = Math.floor(Math.random() * 1000)+1;
        this.gold = Math.floor(Math.random() * 1000)+1;
    }
    
    getName() {
        return this.name;
    }
    
    getPosX() {
        return this.pos_x;
    }

    getPosY() {
        return this.pos_y;
    }

    setPosX(pos_x) {
        this.pos_x = pos_x;
    }

    setPosY(pos_y) {
        this.pos_y = pos_y;
    }

    getArmy() {
        return this.army;
    }

    setArmy(army) {

        this.army = army;
    }

    getResources() {
        return this.resources;
    }

    setResources(resources) {
        this.resources = resources;
    }
    getGold() {
        return this.gold;
    }
    setGold(gold) {
        this.gold = gold;
    }
}