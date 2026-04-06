import React from 'react';
import { Shield, Trophy, Zap, Crown } from 'lucide-react';

export default function SpinLegendsLanding() {
  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-[#0a0a16] font-sans text-white">
      
      {/* 1. BACKGROUND GRID & GLOWS */}
      <div className="absolute inset-0 z-0">
        {/* Cyber Grid */}
        <div 
          className="absolute inset-0 opacity-10" 
          style={{
            backgroundImage: `linear-gradient(#3b82f6 1px, transparent 1px), linear-gradient(to right, #3b82f6 1px, transparent 1px)`,
            backgroundSize: '40px 40px'
          }}
        />
        {/* Radial Glows */}
        <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-[600px] h-[600px] bg-red-600/15 rounded-full blur-[150px]" />
      </div>

      {/* 2. NAVIGATION BAR */}
      <nav className="relative z-10 flex items-center justify-between px-6 py-4 backdrop-blur-md bg-[#0a0a16]/70 border-b border-white/5 md:px-12">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="relative w-8 h-8 bg-gradient-to-br from-red-500 to-blue-600 rounded-lg flex items-center justify-center font-bold text-sm shadow-[0_0_15px_rgba(239,68,68,0.5)]">
            SL
          </div>
          <span className="text-xl font-black tracking-wider uppercase">Spin Legends</span>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-400">
          <a href="#" className="hover:text-white transition-colors">Overview</a>
          <a href="#" className="hover:text-white transition-colors">Features</a>
          <a href="#" className="hover:text-white transition-colors">How It Works</a>
          <a href="#" className="hover:text-white transition-colors">Leaderboards</a>
          <a href="#" className="hover:text-white transition-colors">FAQ</a>
        </div>

        {/* Auth Buttons */}
        <div className="flex items-center gap-4">
          <button className="hidden sm:block text-sm font-medium text-gray-300 hover:text-white transition-colors">
            ACCOUNT
          </button>
          <button className="px-5 py-2 text-sm font-bold bg-[#9c243a] hover:bg-[#b82c46] rounded-md transition-all shadow-[0_4px_15px_rgba(156,36,58,0.4)]">
            SUBSCRIBE
          </button>
        </div>
      </nav>

      {/* 3. HERO CONTENT */}
      <main className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center max-w-7xl mx-auto px-6 py-12 md:px-12 lg:py-20">
        
        {/* Left Side: Copy & CTA */}
        <div className="lg:col-span-5 space-y-6">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black leading-tight tracking-tight">
            One Spin to Rule, <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-red-500 via-purple-500 to-blue-500">
              Multiple Names.
            </span>
          </h1>
          <p className="text-gray-400 text-base md:text-lg max-w-md leading-relaxed">
            The ultimate name-selector and decision-maker game. Spin the wheel and let fate decide! Fast, fair, and impossibly fun.
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

        {/* Right Side: The Visual HUD (Wheel & List) */}
        <div className="lg:col-span-7 relative flex justify-center lg:justify-end">
          
          {/* Main Visual Container */}
          <div className="relative w-full max-w-[550px] aspect-square flex items-center justify-center">
            
            {/* The Glowing Wheel */}
            <div className="relative w-[340px] h-[340px] md:w-[400px] md:h-[400px] rounded-full border-4 border-[#3b3b5c] bg-[#111126] shadow-[0_0_50px_rgba(59,130,246,0.2)] flex items-center justify-center overflow-hidden">
              
              {/* SPINNING LAYER */}
              <div className="absolute inset-0 animate-[spin_14s_linear_infinite]">
                
                {/* Outer Energy Ring */}
                <div className="absolute inset-0 rounded-full border-[10px] border-transparent border-t-red-500/40 border-r-blue-500/30 border-b-purple-500/30 border-l-cyan-500/20" />
                
                {/* Inner Circle Decals */}
                <div className="absolute inset-4 rounded-full border border-dashed border-blue-500/30" />
                <div className="absolute inset-12 rounded-full border border-red-500/20" />

                {/* Decorative Slice Lines */}
                <div className="absolute top-1/2 left-1/2 w-[2px] h-[45%] bg-gradient-to-b from-transparent via-blue-500/40 to-transparent -translate-x-1/2 -translate-y-full origin-bottom" />
                <div className="absolute top-1/2 left-1/2 w-[2px] h-[45%] bg-gradient-to-b from-transparent via-red-500/40 to-transparent -translate-x-1/2 -translate-y-full rotate-90 origin-bottom" />
                <div className="absolute top-1/2 left-1/2 w-[2px] h-[45%] bg-gradient-to-b from-transparent via-purple-500/40 to-transparent -translate-x-1/2 -translate-y-full rotate-45 origin-bottom" />
                <div className="absolute top-1/2 left-1/2 w-[2px] h-[45%] bg-gradient-to-b from-transparent via-cyan-500/40 to-transparent -translate-x-1/2 -translate-y-full -rotate-45 origin-bottom" />

                {/* Fake Segment Text */}
                <div className="absolute top-8 left-1/2 -translate-x-1/2 font-bold text-xs tracking-widest text-red-400 uppercase">
                  Decider
                </div>
                <div className="absolute right-8 top-1/2 -translate-y-1/2 font-bold text-xs tracking-widest text-blue-400 uppercase rotate-90">
                  Lucky Name
                </div>
                <div className="absolute left-8 top-1/2 -translate-y-1/2 font-bold text-xs tracking-widest text-blue-400 uppercase -rotate-90">
                  Spinwheel
                </div>
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 font-bold text-xs tracking-widest text-purple-400 uppercase">
                  Fortune
                </div>
              </div>

              {/* Center Spinner Node (DOES NOT SPIN) */}
              <div className="relative w-16 h-16 bg-gradient-to-br from-red-600 to-red-800 rounded-full flex items-center justify-center z-10 shadow-[0_0_30px_rgba(239,68,68,0.6)] border-2 border-red-400">
                <div className="w-4 h-4 bg-white rounded-full animate-pulse" />
              </div>

              {/* Pointer (DOES NOT SPIN) */}
              <div className="absolute top-2 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[12px] border-l-transparent border-r-[12px] border-r-transparent border-b-[24px] border-b-red-400 z-20" />
            </div>

            {/* Right Side Glassmorphic List HUD */}
            <div className="absolute top-1/2 -translate-y-1/2 right-0 w-[240px] h-[360px] bg-[#0c0c1e]/85 border border-[#ff3b5c]/30 rounded-xl shadow-[0_15px_35px_rgba(0,0,0,0.6),0_0_20px_rgba(255,59,92,0.15)] z-20 backdrop-blur-sm p-4 flex flex-col gap-3">
              
              <div className="border-b border-white/10 pb-2">
                <h3 className="font-bold text-xs text-white/50 uppercase tracking-wider">Registered Names</h3>
                <p className="text-[10px] text-gray-500">Current Session</p>
              </div>

              {/* Player Rows */}
              <div className="space-y-2 overflow-y-auto pr-1 custom-scrollbar text-xs">
                
                {/* Row 1 */}
                <div className="flex items-center justify-between p-2 bg-white/5 rounded-md border border-white/5 hover:border-blue-500/30 transition-all cursor-pointer">
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center text-[10px]">
                      <Crown size={10} />
                    </div>
                    <div>
                      <p className="font-bold text-white text-[11px]">CHANCE PICK</p>
                      <p className="text-[9px] text-gray-500">Level 10 <span className="text-green-500 ml-1">●</span></p>
                    </div>
                  </div>
                </div>

                {/* Row 2 */}
                <div className="flex items-center justify-between p-2 bg-white/5 rounded-md border border-white/5 hover:border-blue-500/30 transition-all cursor-pointer">
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 bg-purple-600 rounded-full flex items-center justify-center text-[10px]">
                      <Zap size={10} />
                    </div>
                    <div>
                      <p className="font-bold text-white text-[11px]">LUCKY NAME</p>
                      <p className="text-[9px] text-gray-500">Level 5 <span className="text-green-500 ml-1">●</span></p>
                    </div>
                  </div>
                </div>

                {/* Row 3 */}
                <div className="flex items-center justify-between p-2 bg-white/5 rounded-md border border-white/5 hover:border-blue-500/30 transition-all cursor-pointer">
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 bg-red-600 rounded-full flex items-center justify-center text-[10px]">
                      <Trophy size={10} />
                    </div>
                    <div>
                      <p className="font-bold text-white text-[11px]">FORTUNE SELECT</p>
                      <p className="text-[9px] text-gray-500">Level 12 <span className="text-green-500 ml-1">●</span></p>
                    </div>
                  </div>
                </div>

                {/* Row 4 */}
                <div className="flex items-center justify-between p-2 bg-white/5 rounded-md border border-white/5 hover:border-blue-500/30 transition-all cursor-pointer">
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 bg-green-600 rounded-full flex items-center justify-center text-[10px]">
                      <Shield size={10} />
                    </div>
                    <div>
                      <p className="font-bold text-white text-[11px]">DECIDER</p>
                      <p className="text-[9px] text-gray-500">Level 7 <span className="text-green-500 ml-1">●</span></p>
                    </div>
                  </div>
                </div>

              </div>
            </div>

            {/* Floating Live Indicator Badge */}
            <div className="absolute bottom-4 left-0 bg-[#0c0c1e]/90 border border-white/10 px-3 py-1.5 rounded-full text-[10px] font-bold flex items-center gap-2 z-30 shadow-lg">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              PLAYER 1: DECIDER
            </div>
            
          </div>
        </div>
      </main>

      {/* Mini scrollbar utility styling */}
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar { width: 3px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: rgba(255,255,255,0.05); }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(59, 130, 246, 0.3); border-radius: 10px; }
      `}</style>
    </div>
  );
}