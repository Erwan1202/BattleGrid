/* eslint-env node */

import Game from "../components/game.js";
import promptSync from "prompt-sync";
import Bot from "../components/bot.js";
const prompt = promptSync(); // Initialisation de prompt-sync

const game = new Game(5, 5, "Erwan");
game.init();

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Injecter une stratégie IA aléatoire à chaque bot
for (const bot of game.bots) {
    bot.play = function(game) {
        const map = game.map;
        const action = Math.random();

        // 0 - 0.4 : expansion, 0.4 - 0.7 : construction, > 0.7 : rien
        if (action < 0.4) {
            for (const t of this.territories) {
                const neighbors = map.getNeighbours(t.x, t.y).filter(n => n.owner !== this);
                if (neighbors.length && this.resources >= 10) {
                    const choice = neighbors[Math.floor(Math.random() * neighbors.length)];

                    if (choice.owner && choice.owner !== this) {
                        if (choice.army < 2) {
                            console.log(`⚔️ ${this.name} attaque ${choice.owner.name} à (${choice.x},${choice.y}) et prend le contrôle !`);
                            choice.owner.removeTerritory(choice);
                            choice.changeOwner(this);
                            choice.army = 1;
                            this.addTerritory(choice);
                            this.resources -= 10;
                            return;
                        } else {
                            console.log(`🛡️ ${this.name} échoue à prendre (${choice.x},${choice.y}) contrôlé par ${choice.owner.name}. Trop bien défendu.`);
                            return;
                        }
                    }

                    if (!choice.owner) {
                        choice.changeOwner(this);
                        choice.addUnits(1);
                        this.addTerritory(choice);
                        this.resources -= 10;
                        console.log(`🌱 ${this.name} s'étend vers (${choice.x},${choice.y})`);
                        return;
                    }
                }
            }
        } else if (action < 0.7) {
            for (const t of this.territories) {
                if (!t.city && this.gold >= 50) {
                    t.buildCity();
                    this.gold -= 50;
                    console.log(`🏛️ ${this.name} construit à (${t.x}, ${t.y})`);
                    return;
                }
            }
        }

        console.log(`💤 ${this.name} ne fait rien ce tour.`);
    };
}

async function playTurn() {
    const player = game.getCurrentPlayer();

    console.log("\n──────────────");
    console.log(`🎲 Tour ${game.turn} — ${player.name}`);

    if (player instanceof Bot) {
        player.collectIncome();
        player.play(game);
        game.currentPlayerIndex = (game.currentPlayerIndex + 1) % game.players.length;
        if (game.currentPlayerIndex === 0) game.turn++;
        await delay(1000);
        playTurn();
    } else {
        let hasPlayed = false;
        player.collectIncome();

        while (true) {
            const cmd = prompt(`🧠 [${player.name}] Commande > `);
            const result = game.executeCommand(cmd.trim(), hasPlayed);

            if (result === "end") {
                game.currentPlayerIndex = (game.currentPlayerIndex + 1) % game.players.length;
                if (game.currentPlayerIndex === 0) game.turn++;
                await delay(500);
                playTurn();
                break;
            } else if (result === "valid") {
                if (hasPlayed) {
                    console.log("❌ Tu as déjà effectué une action ce tour. Termine avec 'end'.");
                } else {
                    hasPlayed = true;
                }
            } else if (result === "invalid") {
                console.log("❌ Commande invalide. Essayez à nouveau.");
            } else if (result === "neutral") {
                // commande neutre comme 'status'
                continue;
            } else {
                console.log("❌ Résultat de commande inconnu.");
            }
        }
    }
}

playTurn();