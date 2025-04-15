/* eslint-env node */

import Game from "../components/game.js";
import promptSync from "prompt-sync";
import Bot from "../components/bot.js";
const prompt = promptSync(); // Initialisation de prompt-sync

const game = new Game(5, 5, "Erwan");
game.init();

function playTurn() {
    const player = game.getCurrentPlayer();

    if (player instanceof Bot) {
        game.botTurn(player);
        game.currentPlayerIndex = (game.currentPlayerIndex + 1) % game.players.length;
        if (game.currentPlayerIndex === 0) game.turn++;
        setTimeout(playTurn, 1000);
    } else {
        const cmd = prompt(`🧠 [${player.name}] Commande > `);
        const result = game.executeCommand(cmd.trim());

        if (result === "end") {
            game.currentPlayerIndex = (game.currentPlayerIndex + 1) % game.players.length;
            if (game.currentPlayerIndex === 0) game.turn++;
            setTimeout(playTurn, 1000);
        } else {
            playTurn();
        }
    }
}

playTurn();
