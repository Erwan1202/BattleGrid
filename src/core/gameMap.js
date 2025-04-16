export default class GameMap {
    constructor(width, height) {
        this.width = width;
        this.height = height;
        this.grid = Array(height).fill(null).map((_, y) =>
            Array(width).fill(null).map((_, x) => ({
                x,
                y,
                owner: null,
                city: false,
                army: 0
            }))
        );
    }

    getTerritory(x, y) {
        return this.grid?.[y]?.[x] || null;
    }

    getNeighbours(x, y) {
        const directions = [
            [0, -1], [0, 1], [-1, 0], [1, 0]
        ];
        return directions
            .map(([dx, dy]) => this.getTerritory(x + dx, y + dy))
            .filter(Boolean);
    }

    printMap() {
        console.log("🗺️ Carte");
        for (let row of this.grid) {
            console.log(row.map(cell => {
                if (cell.owner?.startsWith("Bot")) return "B";
                if (cell.owner === "Player") return "E";
                return ".";
            }).join(" "));
        }
    }

    getAllTerritories() {
        return this.grid.flat();
    }
    getGrid() {
        return this.grid;
    }

    
}
