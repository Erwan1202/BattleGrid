import GameMap from "./map.js";
//import Territory from "./territory";
import Player from "./player.js";
import Bot from "./bot.js";
//import readline from "readline";
import CommandParser from "./commandParseur.js";


export default class Game {
    constructor(width, height, playerName) {
        this.map = new GameMap(width, height);
        this.players = [new Player(playerName, 1)];
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
        console.log(`\n🎲 Tour ${this.turn} — ${currentPlayer.name}`);
        currentPlayer.collectIncome();
    
        if (currentPlayer instanceof Player) {
            this.map.printMap();
            if (currentPlayer instanceof Player) {
                this.map.printMap();
                console.log(`🧠 [${currentPlayer.name}] à toi de jouer.`);
                return;
            }
            
            return; // attendre commande utilisateur
        }
    
        if (this.bots.includes(currentPlayer)) {
            this.botTurn(currentPlayer);
        }
    
        this.currentPlayerIndex = (this.currentPlayerIndex + 1) % this.players.length;
        if (this.currentPlayerIndex === 0) this.turn++;
        setTimeout(() => this.playTurn(), 1000);
    }
    
    playerLogic(player) {
        console.log(`[${player.name}] Tour ${this.turn}: Logique du joueur exécutée`);
    }

    checkGameOver() {
        return this.players.filter(p => p.territories.length > 0).length <= 1;
    }

    getCurrentPlayer() {
        return this.players[this.currentPlayerIndex];
    }

    init() {
        console.log("Initialisation du jeu...");
    
        const player = this.players[0];
        const all = this.map.getAllTerritories();
        const empty = all.filter(t => t.owner === null);
        const rand = empty[Math.floor(Math.random() * empty.length)];
        rand.changeOwner(player);
        rand.addUnits(5);
        player.addTerritory(rand);
    
        // Initialisation des bots
        this.bots.forEach(bot => {
            const available = this.map.getAllTerritories().filter(t => t.owner === null);
            const pos = available[Math.floor(Math.random() * available.length)];
            pos.changeOwner(bot);
            pos.addUnits(3);
            bot.addTerritory(pos);
        });
    
        this.players.forEach(p => {
            console.log(`Joueur: ${p.name}`);
        });
    
        console.log("Bots initialisés:");
        this.bots.forEach(bot => {
            console.log(`Bot: ${bot.name}`);
        });
    
        this.map.printMap();
        console.log("Jeu prêt à commencer !");
    }

    botTurn(bot) {
        console.log(`🤖 ${bot.name} réfléchit...`);
        bot.collectIncome();
        const map = this.map;
    
        let expanded = false;
        for (const t of bot.territories) {
            const neighbors = map.getNeighbours(t.x, t.y).filter(n => !n.owner);
            if (neighbors.length && bot.resources >= 10) {
                const choice = neighbors[Math.floor(Math.random() * neighbors.length)];
                choice.changeOwner(bot);
                choice.addUnits(1);
                bot.addTerritory(choice);
                bot.resources -= 10;
                console.log(`🤖 ${bot.name} étend son territoire vers (${choice.x},${choice.y})`);
                expanded = true;
                break;
            }
        }
    
        if (!expanded) {
            console.log(`🤖 ${bot.name} ne trouve pas d'endroit à étendre.`);
        }
    
        // Essaye de construire une ville
        for (const t of bot.territories) {
            if (!t.city && bot.gold >= 50) {
                t.buildCity();
                bot.gold -= 50;
                console.log(`🏗️ ${bot.name} construit une ville à (${t.x}, ${t.y})`);
                break;
            }
        }
    
        map.printMap();
    }


    

    executeCommand(cmd, hasPlayed = false) {
        const parser = new CommandParser(this, hasPlayed);
        return parser.execute(cmd);
    }
    
}