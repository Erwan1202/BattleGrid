export default class CommandParser {
    constructor(game) {
        this.game = game;
    }

    execute(commandStr) {
        const parts = commandStr.trim().split(" ");
        const command = parts[0];
        const args = parts.slice(1);
        const player = this.game.getCurrentPlayer();
        const map = this.game.map;

        switch (command) {

            case "spread": {
                const [x, y] = args.map(Number);
                const target = map.getTerritory(x, y);
                if (!target) {
                    console.log("❌ Territoire invalide.");
                    break;
                }

                const isAdjacent = map.getNeighbours(x, y).some(n => n.owner === player);
                if (!isAdjacent) {
                    console.log("❌ Ce territoire n'est pas adjacent à ta colonie.");
                    break;
                }

                if (target.owner === player) {
                    console.log("❌ Tu contrôles déjà ce territoire.");
                    break;
                }

                if (player.resources >= 10) {
                    target.changeOwner(player);
                    target.addUnits(1);
                    player.addTerritory(target);
                    player.resources -= 10;
                    console.log(`🌱 Expansion réussie vers (${x}, ${y})`);
                } else {
                    console.log("❌ Pas assez d’énergie pour se propager.");
                }
                break;
            }

            case "build": {
                const [x, y] = args.map(Number);
                const cell = map.getTerritory(x, y);
                if (cell && cell.owner === player && !cell.city) {
                    if (player.gold >= 50) {
                        player.gold -= 50;
                        cell.buildCity();
                        console.log(`🏛️ Structure créée à (${x},${y})`);
                    } else {
                        console.log("❌ Pas assez d’or.");
                    }
                } else {
                    console.log("❌ Construction impossible à cet endroit.");
                }
                break;
            }

            case "status": {
                console.log(player.toString());
                console.log("🌍 Colonies :");
                player.territories.forEach(t => {
                    console.log(`  - (${t.x},${t.y}) : ${t.army} biomasse${t.city ? " 🏛️" : ""}`);
                });
                break;
            }

            case "move":
                console.log("❌ Le Physarum ne se déplace pas. Utilise plutôt `spread x y`.");
                break;

            case "end":
                return "end";

            default:
                console.log("❓ Commande inconnue. Essaie `spread`, `build`, `status`, `end`.");
        }

        return "continue";
    }
}
