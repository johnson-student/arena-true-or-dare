import React, { useState } from "react";
import Settings from "./Setting";

export default function PlayerListGame({ players = [], setPlayers, lives, abilities }) {
  const [newPlayer, setNewPlayer] = useState("");
  const [abCount, setAbCount] = useState(2);
  const handleAddPlayer = () => {
    if (!newPlayer.trim()) return;

    const player = {
      name: newPlayer.trim(),
      icon: "🎯",
      color: "bg-blue-500",
      lives: lives,
    };

    setPlayers(prev => [...prev, player]);
    setNewPlayer("");
  };

  const handleRemovePlayer = (index) => {
    setPlayers(prev => prev.filter((_, i) => i !== index));
  };

  const handleRemoveAll = () => {
    setPlayers([]);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") handleAddPlayer();
  };

  return (
    <div className="absolute top-1/2 -translate-y-1/2 right-6 w-[350px] md:w-[400px] h-[500px] bg-[#0c0c1e]/90 border border-[#ff3b5c]/40 rounded-xl shadow-[0_15px_35px_rgba(0,0,0,0.8),0_0_20px_rgba(255,59,92,0.2)] z-20 backdrop-blur-md p-4 flex flex-col gap-3">

      {/* 🔹 Input Section */}
      <div className="flex gap-2 mb-2">
        <input
          type="text"
          value={newPlayer}
          onChange={e => setNewPlayer(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder="Enter player name"
          className="flex-1 px-3 py-2 rounded-md border border-white/20 bg-[#111126] text-white text-sm placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
        <button
          onClick={handleAddPlayer}
          disabled={!newPlayer.trim()}
          className={`px-4 py-2 rounded-md text-white font-bold transition ${
            newPlayer.trim()
              ? "bg-blue-600 hover:bg-blue-500"
              : "bg-gray-700 cursor-not-allowed"
          }`}
        >
          Add
        </button>
      </div>

      {/* 🔹 Remove All Button */}
      {players.length > 0 && (
        <button
          onClick={handleRemoveAll}
          className="w-full px-3 py-1 text-xs font-bold text-red-500 border border-red-500/50 rounded-md hover:bg-red-500/10 transition"
        >
          Remove All Players
        </button>
      )}

      {/* Header */}
      <div className="border-b border-white/10 pb-2">
        <h3 className="font-bold text-center text-sm text-white/60 uppercase tracking-wider">
          Players
        </h3>
        <p className="text-[10px] text-gray-400 text-center">Current Session</p>
      </div>

      {/* Player List */}
      <div className="space-y-2 overflow-y-auto pr-1 custom-scrollbar text-sm flex-1">
        {players.map((player, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-2 bg-white/5 rounded-md border border-white/5 hover:border-blue-500/30 transition-all"
          >
            <div className="flex items-center gap-3">
              <div
                className={`w-6 h-6 ${player.color} rounded-full flex items-center justify-center text-xs`}
              >
                {player.icon}
              </div>
              <div>
                <p className="font-bold text-white">{player.name}</p>
                <p className="text-[10px] text-gray-400">
                  {"❤️".repeat(lives)} <span className="text-green-500 ml-1">●</span>
                </p>
                <p className="text-[10px] text-gray-400">
                  {abCount >= abilities ? "Unlimited Abilities 🔥" : `Abilities: ${"⚡".repeat(abCount)}`} 
                </p>
              </div>
            </div>
            {/* 🔹 Remove Single Player Button */}
            <button
              onClick={() => handleRemovePlayer(index)}
              className="text-red-500 font-bold px-2 py-1 text-xs rounded-md hover:bg-red-500/10 transition"
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      {/* Scrollbar styles */}
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.05);
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(59, 130, 246, 0.3);
          border-radius: 10px;
        }
      `}</style>
    </div>
  );
}