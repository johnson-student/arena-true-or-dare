import React from "react";
import HeroSection from "../components/HeroSection";
import PlayerListHUD from "../components/PlayerListHUD";
import LiveBadge from "../components/LiveBadge";
import GameWheel from "../components/GameWheel";
import { Shield, Trophy, Zap, Crown } from "lucide-react";

export default function Home() {
  const players = [
    {
      name: "CHANCE PICK",
      lives: 3,
      icon: <Crown size={10} />,
      color: "bg-blue-600",
    },
    {
      name: "LUCKY NAME",
      lives: 3,
      icon: <Zap size={10} />,
      color: "bg-purple-600",
    },
    {
      name: "FORTUNE SELECT",
      lives: 3,
      icon: <Trophy size={10} />,
      color: "bg-red-600",
    },
    {
      name: "DECIDER",
      lives: 3,
      icon: <Shield size={10} />,
      color: "bg-green-600",
    },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center max-w-7xl mx-auto px-6 py-12 md:px-12 lg:py-20">
      <HeroSection />


      <div className="lg:col-span-7 relative flex justify-center lg:justify-end">
        <div className="relative w-full max-w-[550px] aspect-square flex items-center justify-center">
          <GameWheel
            showSpin={false}
            animation={true}
            players={players.map((p) => p.name)}
          />

          <PlayerListHUD players={players} />
          <LiveBadge />
        </div>
      </div>
    </div>
  );
}