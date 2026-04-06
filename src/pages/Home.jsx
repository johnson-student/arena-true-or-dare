import React from "react";
import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import SpinWheel from "../components/SpinWheel";
import PlayerListHUD from "../components/PlayerListHUD";
import LiveBadge from "../components/LiveBadge";
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
    {
      name: "DECIDER",
      lives: 3,
      icon: <Shield size={10} />,
      color: "bg-green-600",
    },

  ];
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

      <Navbar />

      <main className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center max-w-7xl mx-auto px-6 py-12 md:px-12 lg:py-20">
        <HeroSection />

        <div className="lg:col-span-7 relative flex justify-center lg:justify-end">
          <div className="relative w-full max-w-[550px] aspect-square flex items-center justify-center">
            <SpinWheel players={players} />
            <PlayerListHUD players={players} />
            <LiveBadge/>
          </div>
        </div>
      </main>
    </div>
  );
}