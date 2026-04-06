import React from "react";

export default function HeroSection() {
  return (
    <div className="lg:col-span-5 space-y-6">
      <h1 className="text-4xl md:text-5xl lg:text-6xl font-black leading-tight tracking-tight">
        One Spin to Rule, <br />
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-red-500 via-purple-500 to-blue-500">
          Multiple Names.
        </span>
      </h1>

      <p className="text-gray-400 text-base md:text-lg max-w-md leading-relaxed">
        The ultimate name-selector and decision-maker game. Spin the wheel and
        let fate decide! Fast, fair, and impossibly fun.
      </p>

      <div className="flex flex-wrap gap-4 pt-4">
        <button className="px-7 py-3.5 bg-[#9c243a] hover:bg-[#b82c46] rounded-md font-bold text-sm transition-all shadow-[0_5px_20px_rgba(156,36,58,0.5)] uppercase tracking-wider">
          Start Spin
        </button>

        <button className="px-7 py-3.5 bg-transparent border-2 border-[#3b3b5c] hover:border-blue-500 rounded-md font-bold text-sm transition-all uppercase tracking-wider hover:shadow-[0_0_15px_rgba(59,130,246,0.3)]">
          Customize Names
        </button>
      </div>
    </div>
  );
}