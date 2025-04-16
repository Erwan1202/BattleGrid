// src/core/Game.js
import Player from "./Player";
import Bot from "./Bot";
import GameMap from "./GameMap";

export default class Game {
  constructor(width, height, playerName) {
    this.map = new GameMap(width, height);
    this.players = [new Player(playerName, 1)];
    this.bots = [];
    this.currentPlayerIndex = 0;
    this.turn = 1;
    this.initBots(3);
    this.initPlayerPosition();
  }

  initBots(n) {
    for (let i = 0; i < n; i++) {
      const bot = new Bot(`Bot ${i + 1}`, i + 2);
      bot.setStrategy();
      this.bots.push(bot);
      this.players.push(bot);
    }
  }

  initPlayerPosition() {
    const all = this.map.getAllTerritories();
    const empty = all.filter(t => !t.owner);
    for (let i = 0; i < this.players.length; i++) {
      const spot = empty.splice(Math.floor(Math.random() * empty.length), 1)[0];
      spot.changeOwner(this.players[i]);
      spot.addUnits(5);
      this.players[i].addTerritory(spot);
    }
  }

  getCurrentPlayer() {
    return this.players[this.currentPlayerIndex];
  }

  spread(player, x, y) {
    const t = this.map.getTerritory(x, y);
    if (!t) return { status: "invalid", message: "Territoire invalide." };
    const isAdjacent = this.map.getNeighbours(x, y).some(n => n.owner === player);
    if (!isAdjacent) return { status: "invalid", message: "Pas adjacent." };
    if (t.owner === player) return { status: "invalid", message: "Déjà contrôlé." };
    if (player.resources < 10) return { status: "invalid", message: "Pas assez de ressources." };

    if (t.owner && t.owner !== player) {
      if (t.army < 2) {
        t.owner.removeTerritory(t);
        t.changeOwner(player);
        t.army = 1;
        player.addTerritory(t);
        player.resources -= 10;
        return { status: "valid", message: `Attaque réussie sur (${x},${y})` };
      } else {
        return { status: "invalid", message: `Trop bien défendu.` };
      }
    } else {
      t.changeOwner(player);
      t.addUnits(1);
      player.addTerritory(t);
      player.resources -= 10;
      return { status: "valid", message: `Expansion vers (${x},${y})` };
    }
  }

  build(player, x, y) {
    const t = this.map.getTerritory(x, y);
    if (t && t.owner === player && !t.city && player.gold >= 50) {
      t.buildCity();
      player.gold -= 50;
      return { status: "valid", message: `Ville construite à (${x},${y})` };
    }
    return { status: "invalid", message: "Construction impossible." };
  }

  endTurn() {
    this.currentPlayerIndex = (this.currentPlayerIndex + 1) % this.players.length;
    if (this.currentPlayerIndex === 0) this.turn++;
  }

  playBotTurn() {
    const bot = this.getCurrentPlayer();
    if (!(bot instanceof Bot)) return;
    bot.collectIncome();
    const res = bot.play(this.map);
    this.endTurn();
    return res;
  }

  collectIncome() {
    this.getCurrentPlayer().collectIncome();
  }

  getMap() {
    return this.map.toDisplay();
  }
}