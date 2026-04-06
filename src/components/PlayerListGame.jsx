import React, { useState } from "react";

export default function PlayerListGame({ 
  players = [], 
  setPlayers, 
  globalLives = 3,
  globalAbilities = 2,
  playerStats = {}
}) {
  const [newPlayer, setNewPlayer] = useState("");

  const handleAddPlayer = () => {
    if (!newPlayer.trim()) return;

    const colors = ['bg-blue-600', 'bg-purple-600', 'bg-red-600', 'bg-green-600', 'bg-yellow-600', 'bg-pink-600'];
    const icons = ['🎯', '⚡', '🔥', '💀', '👑', '⭐'];
    
    const player = {
      name: newPlayer.trim().toUpperCase(),
      icon: icons[Math.floor(Math.random() * icons.length)],
      color: colors[Math.floor(Math.random() * colors.length)],
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

  // Get player's current stats
  const getPlayerStats = (playerName) => {
    const stats = playerStats[playerName];
    if (stats) {
      return {
        lives: stats.lives,
        abilities: stats.abilities,
        completedRounds: stats.completedRounds || 0
      };
    }
    return {
      lives: globalLives,
      abilities: globalAbilities,
      completedRounds: 0
    };
  };

  return (
    <div className="w-[350px] md:w-[400px] h-[500px] bg-[#0c0c1e]/90 border border-[#ff3b5c]/40 rounded-xl shadow-[0_15px_35px_rgba(0,0,0,0.8),0_0_20px_rgba(255,59,92,0.2)] backdrop-blur-md p-4 flex flex-col gap-3">
      {/* Input Section */}
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

      {/* Remove All Button */}
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
          Players List
        </h3>
        <p className="text-[10px] text-gray-400 text-center">Current Session</p>
      </div>

      {/* Player List */}
      <div className="space-y-2 overflow-y-auto pr-1 flex-1">
        {players.length === 0 ? (
          <div className="text-center text-gray-500 text-sm py-8">
            No players yet. Add some!
          </div>
        ) : (
          players.map((player, index) => {
            const stats = getPlayerStats(player.name);
            const isDead = stats.lives <= 0;
            
            return (
              <div
                key={index}
                className={`flex items-center justify-between p-2 rounded-md border transition-all ${
                  isDead 
                    ? 'bg-red-900/30 border-red-500/50 opacity-60' 
                    : 'bg-white/5 border-white/5 hover:border-blue-500/30'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-6 h-6 ${player.color} rounded-full flex items-center justify-center text-xs`}
                  >
                    {player.icon}
                  </div>
                  <div>
                    <p className={`font-bold text-sm ${isDead ? 'text-gray-400 line-through' : 'text-white'}`}>
                      {player.name}
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      {/* Lives display */}
                      <div className="flex items-center gap-0.5">
                        <span className="text-[9px] text-gray-400">❤️</span>
                        <span className={`text-[10px] font-bold ${stats.lives <= 1 && !isDead ? 'text-red-400' : 'text-white'}`}>
                          {stats.lives}
                        </span>
                      </div>
                      {/* Abilities display */}
                      <div className="flex items-center gap-0.5">
                        <span className="text-[9px] text-gray-400">⚡</span>
                        <span className={`text-[10px] font-bold ${stats.abilities > 0 ? 'text-yellow-400' : 'text-gray-500'}`}>
                          {stats.abilities}
                        </span>
                      </div>
                      {/* Completed rounds */}
                      <div className="flex items-center gap-0.5">
                        <span className="text-[9px] text-gray-400">🏆</span>
                        <span className="text-[10px] text-green-400 font-bold">
                          {stats.completedRounds}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Status Badge */}
                {isDead ? (
                  <span className="text-[10px] font-bold text-red-400 bg-red-500/20 px-2 py-0.5 rounded-full">
                    ELIMINATED
                  </span>
                ) : (
                  <button
                    onClick={() => handleRemovePlayer(index)}
                    className="text-red-500 font-bold px-2 py-1 text-xs rounded-md hover:bg-red-500/10 transition"
                  >
                    Remove
                  </button>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* Legend */}
      <div className="border-t border-white/10 pt-2 mt-1">
        <div className="flex justify-center gap-4 text-[9px] text-gray-500">
          <span className="flex items-center gap-1">❤️ Lives</span>
          <span className="flex items-center gap-1">⚡ Abilities</span>
          <span className="flex items-center gap-1">🏆 Rounds Won</span>
        </div>
      </div>
    </div>
  );
}