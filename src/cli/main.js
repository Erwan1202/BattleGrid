/* eslint-env node */

import Game from "../components/game.js";
import promptSync from "prompt-sync";

const prompt = promptSync(); // Initialisation de prompt-sync

const game = new Game(5, 5, "Erwan");
game.init();

function promptPlayer() {
  const player = game.getCurrentPlayer();
  if (player.isBot) {
    player.game_logic(game);
    game.nextTurn();
    promptPlayer();
  } else {
    const cmd = prompt(`🧠 [${player.name}] Commande > `);
    const result = game.executeCommand(cmd.trim());
    if (result === "end") {
      game.nextTurn();
    }
    promptPlayer();
  }
}

promptPlayer();