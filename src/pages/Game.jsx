import React, { useState } from "react";
import SpinWheel from "../components/GameWheel";
import PlayerListGame from "../components/PlayerListGame";
import { Crown, Zap, Trophy, Shield } from "lucide-react";

const Game = () => {
  const [players, setPlayers] = useState([
    { name: "CHANCE PICK", level: 10, icon: <Crown size={12} />, color: "bg-blue-600" },
    { name: "LUCKY NAME", level: 5, icon: <Zap size={12} />, color: "bg-purple-600" },
    { name: "FORTUNE SELECT", level: 12, icon: <Trophy size={12} />, color: "bg-red-600" },
    { name: "DECIDER", level: 7, icon: <Shield size={12} />, color: "bg-green-600" },
  ]);

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-[#0a0a16] font-sans text-white">
            <div className="absolute inset-0 z-10">
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
      <div  className="flex flex-col md:flex-row items-center justify-center h-screen px-6 gap-4 md:gap-8">
        {/* 🎡 Spin Wheel */}
        {/* 📋 Player List Panel */}
        <PlayerListGame players={players} setPlayers={setPlayers} />
        <SpinWheel players={players.map(p => p.name)} />
      </div>
    </div>
  );
};

export default Game;