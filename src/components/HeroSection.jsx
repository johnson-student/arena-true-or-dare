import React from "react";
import { Link } from "react-router-dom";

export default function HeroSection() {
  return (
    <div className="lg:col-span-5 space-y-6">
      <h1 className="text-4xl md:text-5xl lg:text-6xl font-black leading-tight tracking-tight">
        One Spin to Rule, <br />
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-red-500 via-purple-500 to-blue-500">
          True or Dare Awaits.
        </span>
      </h1>

      <p className="text-gray-400 text-base md:text-lg max-w-md leading-relaxed">
        Spin the wheel, let fate choose the player, and dive into exciting True
        or Dare challenges. Complete the dare, answer the truth, and survive
        without losing all your lives.
      </p>

      <div className="flex flex-wrap gap-4 pt-4">
        <Link
          to="/game"
          className="px-10 py-3.5 bg-[#9c243a] hover:bg-[#b82c46] rounded-md font-bold text-sm transition-all shadow-[0_5px_20px_rgba(156,36,58,0.5)] uppercase tracking-wider"
        >
          Play Game
        </Link>
      </div>
    </div>
  );
}