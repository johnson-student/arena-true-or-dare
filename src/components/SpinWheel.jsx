import React from "react";

export default function SpinWheel() {
  return (
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

      {/* Center Spinner Node */}
      <div className="relative w-16 h-16 bg-gradient-to-br from-red-600 to-red-800 rounded-full flex items-center justify-center z-10 shadow-[0_0_30px_rgba(239,68,68,0.6)] border-2 border-red-400">
        <div className="w-4 h-4 bg-white rounded-full animate-pulse" />
      </div>

      {/* Pointer */}
      <div className="absolute top-2 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[12px] border-l-transparent border-r-[12px] border-r-transparent border-b-[24px] border-b-red-400 z-20" />
    </div>
  );
}