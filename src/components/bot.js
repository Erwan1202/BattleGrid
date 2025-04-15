import Player from './player.js';


export default class Bot extends Player {
    constructor(name, id) {
        super(name, id);
        this.pos_x = Math.floor(Math.random() * 10) + 1;
        this.pos_y = Math.floor(Math.random() * 10) + 1;
        this.army = Math.floor(Math.random() * 1000) + 1;
        this.resources = Math.floor(Math.random() * 1000) + 1;
        this.gold = Math.floor(Math.random() * 1000) + 1;
    }

    game_logic() {
        console.log("Bot logic executed");
    }

}
