import React from "react";

export default function LiveBadge() {
  return (
    <div className="absolute bottom-4 left-0 bg-[#0c0c1e]/90 border border-white/10 px-3 py-1.5 rounded-full text-[10px] font-bold flex items-center gap-2 z-30 shadow-lg">
      <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
      PLAYER 1: DECIDER
    </div>
  );
}