import React, { useState } from "react";
import SpinWheel from "../components/GameWheel";
import PlayerListGame from "../components/PlayerListGame";
import Setting from "../components/Setting";
import { Crown, Zap, Trophy, Shield, Settings as SettingsIcon } from "lucide-react";

const Game = () => {
  const [players, setPlayers] = useState([
    { name: "CHANCE PICK", icon: <Crown size={12} />, color: "bg-blue-600" },
    { name: "LUCKY NAME", icon: <Zap size={12} />, color: "bg-purple-600" },
    { name: "FORTUNE SELECT", icon: <Trophy size={12} />, color: "bg-red-600" },
    { name: "DECIDER", icon: <Shield size={12} />, color: "bg-green-600" },
  ]);

  // ✅ ADD THIS
  const [lives, setLives] = useState(3);
  const [showSettings, setShowSettings] = useState(false);
  const [abilities, setAbilities] = useState(2)

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-[#0a0a16] font-sans text-white">
            {/* Background */}
      <div className="absolute inset-0 z-0">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `linear-gradient(#3b82f6 1px, transparent 1px), linear-gradient(to right, #3b82f6 1px, transparent 1px)`,
            backgroundSize: "40px 40px",
          }}
        />
        <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-[600px] h-[600px] bg-red-600/15 rounded-full blur-[150px]" />
      </div>
      
      {/* ⚙️ SETTINGS BUTTON */}
      <button
        onClick={() => setShowSettings(true)}
        className="absolute top-6 right-6 z-30 p-3 rounded-lg bg-[#111126] border border-blue-500/30 hover:bg-blue-600/20 transition"
      >
        <SettingsIcon size={20} />
      </button>

      {/* ⚙️ SETTINGS MODAL */}
{showSettings && (
  <Setting
    lives={lives}
    setLives={setLives}
    abilities={abilities}
    setAbilities={setAbilities}
    onClose={() => setShowSettings(false)}
  />
)}

      <div className=" relative z-10 flex flex-col md:flex-row items-center justify-center h-screen px-6 gap-4 md:gap-8 z-10">
        <SpinWheel players={players.map(p => p.name)} />
        <PlayerListGame
          players={players}
          setPlayers={setPlayers}
          lives={lives}
          abilities={abilities}
        />
      </div>
    </div>
  );
};

export default Game;