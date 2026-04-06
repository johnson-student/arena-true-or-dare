import React from "react";

export default function Setting({
  lives,
  setLives,
  abilities,
  setAbilities,
  onClose
}) {
  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      
      <div className="bg-[#0c0c1e] w-[350px] p-6 rounded-xl border border-blue-500/30 shadow-[0_0_40px_rgba(59,130,246,0.2)] text-center">

        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">⚙️ Settings</h2>
          <button onClick={onClose} className="text-red-400">✕</button>
        </div>

        {/* ❤️ LIVES */}
        <p className="mb-2 text-gray-300">
          Lives: <span className="text-white font-bold">{lives}</span>
        </p>

        <input
          type="range"
          min="1"
          max="5"
          value={lives}
          onChange={(e) => setLives(Number(e.target.value))}
          className="w-full mb-4 accent-red-500 cursor-pointer"
        />

        <div className="text-xl mb-6">
          {"❤️".repeat(lives)}
        </div>

        {/* ⚡ ABILITIES */}
        <p className="mb-2 text-gray-300">
          Abilities: <span className="text-white font-bold">{abilities}</span>
        </p>

        <input
          type="range"
          min="1"
          max="5"
          value={abilities}
          onChange={(e) => setAbilities(Number(e.target.value))}
          className="w-full mb-4 accent-purple-500 cursor-pointer"
        />

        <div className="text-xl">
          {"⚡".repeat(abilities)}
        </div>

      </div>
    </div>
  );
}