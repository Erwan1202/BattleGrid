import GameMap from "./map.js";

const map = new GameMap(5, 5);

// Simule un joueur fictif
const player1 = { name: "Alice" };
const player2 = { name: "Bot" };

// Alice contrôle (0,0), Bot contrôle (2,3)
map.getTerritory(0, 0).changeOwner(player1);
map.getTerritory(2, 3).changeOwner(player2);

// Alice pose des unités
map.getTerritory(0, 0).addUnits(10);

// Affichage console
map.printMap();

// Affiche les voisins de (2,3)
const neighbors = map.getNeighbours(2, 3);
console.log("\nVoisins de (2,3) :");
neighbors.forEach(t => console.log(`(${t.x},${t.y})`));
