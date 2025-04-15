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
            case "move": {
                const [x1, y1, x2, y2] = args.map(Number);
                const from = map.getTerritory(x1, y1);
                const to = map.getTerritory(x2, y2);
                if (from && to && from.owner === player && from.army > 0) {
                    const moved = Math.min(from.army, 5); // tu peux ajuster
                    from.removeUnits(moved);
                    to.addUnits(moved);
                    to.changeOwner(player);
                    player.addTerritory(to);
                    console.log(`👣 Déplacement de ${moved} unités de (${x1},${y1}) vers (${x2},${y2})`);
                } else {
                    console.log("❌ Déplacement impossible.");
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
                        console.log(`🏛️ Ville construite à (${x},${y})`);
                    } else {
                        console.log("❌ Pas assez d’or.");
                    }
                } else {
                    console.log("❌ Construction impossible.");
                }
                break;
            }

            case "end":
                return "end";

            default:
                console.log("Commande inconnue.");
        }

        return "continue";
    }
}
