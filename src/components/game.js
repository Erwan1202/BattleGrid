import GameMap from "./map";
//import Territory from "./territory";
import Player from "./player";
import Bot from "./bot";
//import readline from "readline";
//import CommandParser from "./commandParser.js";

export default class Game {
    constructor(width, height, playerName) {
        this.map = new GameMap(width, height);
        this.players = [new Player(playerName, 0, 0)];
        this.currentPlayerIndex = 0;
        this.gameOver = false;
        this.turn = 1;
        this.bots = [];
        this.initBots(3); 
    }

    initBots(numBots) {
        for (let i = 0; i < numBots; i++) {
            const botName = `Bot ${i + 1}`;
            const bot = new Bot(botName, i + 1);
            this.bots.push(bot);
            this.players.push(bot);
        }
    }

    startGame() {
        this.gameLoop();
    }

    gameLoop() {
        while (!this.gameOver) {
            this.playTurn();
            this.turn++;
        }
    }

    playTurn() {
        const currentPlayer = this.players[this.currentPlayerIndex];
        console.log(`Tour ${this.turn}: C'est au tour de ${currentPlayer.name}`);
        currentPlayer.collectIncome();
        this.map.printMap();

        // Player logic
        if (currentPlayer instanceof Player) {
            this.playerLogic(currentPlayer);
        } else if (currentPlayer instanceof Bot) {
            currentPlayer.game_logic();
        }

        // Check for game over condition
        if (this.checkGameOver()) {
            this.gameOver = true;
            console.log("Jeu terminé !");
            return;
        }

        // Switch to the next player
        this.currentPlayerIndex = (this.currentPlayerIndex + 1) % this.players.length;
    }

    playerLogic(player) {
        // Placeholder for player logic (e.g., move, attack, etc.)
        console.log(`[${player.name}] Tour ${this.turn}: Logique du joueur exécutée`);
    }

    checkGameOver() {
        // Placeholder for game over condition (e.g., one player left)
        return this.players.filter(p => p.territories.length > 0).length <= 1;
    }

    getCurrentPlayer() {
        return this.players[this.currentPlayerIndex];
    }
}
