export default class CommandParser {
    constructor(game, hasPlayed = false) {
        this.game = game;
        this.hasPlayed = hasPlayed;
    }

    execute(commandStr) {
        const parts = commandStr.trim().split(" ");
        const command = parts[0];
        const args = parts.slice(1);
        const player = this.game.getCurrentPlayer();
        const map = this.game.map;


        switch (command) {
            case "spread": {
                if (this.hasPlayed) {
                    console.log("❌ Tu as déjà effectué une action ce tour. Termine avec 'end'.");
                    return "neutral";
                }
                const [x, y] = args.map(Number);
                const target = map.getTerritory(x, y);
                if (!target) {
                    console.log("❌ Territoire invalide.");
                    return "invalid";
                }

                const isAdjacent = map.getNeighbours(x, y).some(n => n.owner === player);
                if (!isAdjacent) {
                    console.log("❌ Ce territoire n'est pas adjacent à ta colonie.");
                    return "invalid";
                }
                if (target.owner === player) {
                    console.log("❌ Tu contrôles déjà ce territoire.");
                    return "invalid";
                }

                if (player.resources >= 10) {
                    target.changeOwner(player);
                    target.addUnits(1);
                    player.addTerritory(target);
                    player.resources -= 10;
                    console.log(`🌱 Expansion réussie vers (${x}, ${y})`);
                    map.printMap();
                    return "valid";
                } else {
                    console.log("❌ Pas assez d’énergie pour se propager.");
                    return "invalid";
                }
            }

            case "build": {
                if (this.hasPlayed) {
                    console.log("❌ Tu as déjà effectué une action ce tour. Termine avec 'end'.");
                    return "neutral";
                }
                const [x, y] = args.map(Number);
                const cell = map.getTerritory(x, y);
                if (cell && cell.owner === player && !cell.city) {
                    if (player.gold >= 50) {
                        player.gold -= 50;
                        cell.buildCity();
                        console.log(`🏛️ Structure créée à (${x},${y})`);
                        map.printMap();
                        return "valid";
                    } else {
                        console.log("❌ Pas assez d’or.");
                        return "invalid";
                    }
                } else {
                    console.log("❌ Construction impossible à cet endroit.");
                    return "invalid";
                }
            }

            case "status":
                console.log(player.toString());
                console.log("🌍 Colonies :");
                player.territories.forEach(t => {
                    console.log(`  - (${t.x},${t.y}) : ${t.army} biomasse${t.city ? " 🏛️" : ""}`);
                });
                return "neutral";

            case "help":
                console.log("📜 Commandes disponibles :");
                console.log(" - spread x y : étendre ton territoire");
                console.log(" - build x y : construire une ville");
                console.log(" - status : voir ton état actuel");
                console.log(" - end : terminer ton tour");
                return "neutral";

            case "end":
                return "end";

            default:
                console.log("❓ Commande inconnue. Essaie `spread`, `build`, `status`, `end`.");
                return "invalid";
        }
    }
}
