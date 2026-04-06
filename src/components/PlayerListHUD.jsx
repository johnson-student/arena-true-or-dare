import React from "react";
import { Shield, Trophy, Zap, Crown } from "lucide-react";

export default function PlayerListHUD() {
  const players = [
    {
      name: "CHANCE PICK",
      level: 10,
      icon: <Crown size={10} />,
      color: "bg-blue-600",
    },
    {
      name: "LUCKY NAME",
      level: 5,
      icon: <Zap size={10} />,
      color: "bg-purple-600",
    },
    {
      name: "FORTUNE SELECT",
      level: 12,
      icon: <Trophy size={10} />,
      color: "bg-red-600",
    },
    {
      name: "DECIDER",
      level: 7,
      icon: <Shield size={10} />,
      color: "bg-green-600",
    },
  ];

  return (
    <div className="absolute top-1/2 -translate-y-1/2 right-0 w-[240px] h-[360px] bg-[#0c0c1e]/85 border border-[#ff3b5c]/30 rounded-xl shadow-[0_15px_35px_rgba(0,0,0,0.6),0_0_20px_rgba(255,59,92,0.15)] z-20 backdrop-blur-sm p-4 flex flex-col gap-3">
      <div className="border-b border-white/10 pb-2">
        <h3 className="font-bold text-xs text-white/50 uppercase tracking-wider">
          Registered Names
        </h3>
        <p className="text-[10px] text-gray-500">Current Session</p>
      </div>

      <div className="space-y-2 overflow-y-auto pr-1 custom-scrollbar text-xs">
        {players.map((player, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-2 bg-white/5 rounded-md border border-white/5 hover:border-blue-500/30 transition-all cursor-pointer"
          >
            <div className="flex items-center gap-2">
              <div
                className={`w-5 h-5 ${player.color} rounded-full flex items-center justify-center text-[10px]`}
              >
                {player.icon}
              </div>
              <div>
                <p className="font-bold text-white text-[11px]">{player.name}</p>
                <p className="text-[9px] text-gray-500">
                  Level {player.level}{" "}
                  <span className="text-green-500 ml-1">●</span>
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 3px;
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