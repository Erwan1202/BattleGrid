import Territory from "./territory.js";

export default class GameMap {
    constructor(width, height) {
        this.width = width;
        this.height = height;
        this.grid = [];

        for (let y = 0; y < height; y++) {
            const row = [];
            for (let x = 0; x < width; x++) {
                row.push(new Territory(x, y));
            }
            this.grid.push(row);
        }
    }

    getTerritory(x, y) {
        if (x < 0 || y < 0 || x >= this.width || y >= this.height) return null;
        return this.grid[y][x];
    }

    getNeighbours(x, y) {
        const dirs = [[0, -1], [0, 1], [-1, 0], [1, 0]];
        return dirs.map(([dx, dy]) => this.getTerritory(x + dx, y + dy)).filter(t => t !== null);
    }

    getAllTerritories() {
        return this.grid.flat();
    }

    printMap() {
        console.log("\n🗺️  Carte actuelle :");
        for (let y = 0; y < this.height; y++) {
            let row = "";
            for (let x = 0; x < this.width; x++) {
                const cell = this.grid[y][x];
                if (cell.owner) {
                    const letter = cell.owner.name === "Erwan" ? "E" : "B";
                    row += letter + (cell.city ? "🏛️" : "⬤") + " ";
                } else {
                    row += ".  ";
                }
            }
            console.log(row);
        }
        console.log("");
    }
}
