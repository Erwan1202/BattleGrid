import React, { useState} from "react";
import Game from "./core/game"; // Assure-toi que c'est bien un module ES compatible
import GameBoard from "./components/GameBoard";
import CommandInput from "./components/CommandInput";
import GuidePanel from "./components/GuidePanel";
import Footer from "./components/Footer";

export default function App() {
  const [game] = useState(() => new Game(5, 5, "Erwan"));
  const [map, setMap] = useState(game.map.getGrid());
  const [log, setLog] = useState([]);
  const [ setTurn] = useState(1);
  const [input, setInput] = useState("");
  const [hasPlayed, setHasPlayed] = useState(false);
  const [ setCurrentPlayer] = useState(game.getCurrentPlayer());

  // Met à jour la map et les infos
  const refreshState = () => {
    setMap([...game.map.getGrid()]);
    setCurrentPlayer(game.getCurrentPlayer());
    setTurn(game.turn);
  };

  const handleCommand = () => {
    const result = game.executeCommand(input.trim());

    if (result === "end") {
      game.currentPlayerIndex = (game.currentPlayerIndex + 1) % game.players.length;
      if (game.currentPlayerIndex === 0) game.turn++;
      game.getCurrentPlayer().collectIncome();
      setHasPlayed(false);
      refreshState();
    } else if (result === "valid") {
      if (hasPlayed) {
        addLog("❌ Tu as déjà joué. Utilise 'end' pour terminer ton tour.");
      } else {
        setHasPlayed(true);
        refreshState();
      }
    } else if (result === "invalid") {
      addLog("❌ Commande invalide.");
    } else if (result === "neutral") {
      // commandes comme status
      refreshState();
    }

    setInput("");
  };

  const addLog = (text) => {
    setLog(prev => [...prev, text]);
  };

  return (
    <div className="flex flex-col h-screen">
      <h1 className="text-3xl font-bold text-center p-4">🌿 Physarum</h1>

      <div className="flex flex-1">
        <div className="w-3/4 p-4">
          <GameBoard map={map} />
        </div>

        <div className="w-1/4 p-4 border-l">
          <h2 className="text-xl font-semibold mb-2">📖 Guide</h2>
          <GuidePanel />
          <div className="mt-6">
            <h3 className="font-bold">🎮 Commande</h3>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleCommand()}
              className="w-full border p-2 mt-2"
              placeholder="Ex: spread 2 3"
            />
          </div>
        </div>
      </div>

      <div className="bg-black text-white p-2 text-xs h-32 overflow-y-scroll">
        {log.map((line, idx) => (
          <div key={idx}>{line}</div>
        ))}
      </div>

      <Footer />
    </div>
  );
}
