// src/App.jsx
import React from "react";
import GameBoard from "./core/GameBoard";
import CommandInput from "./core/CommandInput";
import GuidePanel from "./core/GuidePanel";
import Footer from "./core/Footer";

export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="text-center text-2xl font-bold p-4 border-b">
        Battle Grid
      </header>

      <main className="flex flex-1">
        <div className="flex-1 flex flex-col">
          <div className="flex-1 p-6">
            <GameBoard />
          </div>
          <div className="border-t p-4">
            <CommandInput />
          </div>
        </div>

        <aside className="w-64 border-l p-4 bg-gray-50">
          <GuidePanel />
        </aside>
      </main>

      <Footer />
    </div>
  );
}


