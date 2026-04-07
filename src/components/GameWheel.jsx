import React, { useState } from "react";

export default function SpinWheel({
  players = [],
  onSpinComplete,
  showSpin = true,
  animation = false,
  spintime
}) {
  const [rotation, setRotation] = useState(0);
  const [spinning, setSpinning] = useState(false);
  const [winner, setWinner] = useState(null);

  const spinWheel = () => {
    if (spinning || players.length === 0) return;

    setSpinning(true);

    const anglePerSlice = 360 / players.length;
    const extraSpins = 5 * 360;
    const randomOffset = Math.random() * 360;

    const newRotation = rotation + extraSpins + randomOffset;
    setRotation(newRotation);

    setTimeout(() => {
      const normalized = newRotation % 360;
      const index =
        Math.floor((360 - normalized) / anglePerSlice) % players.length;
      const winnerName = players[index];

      setSpinning(false);
      setWinner(winnerName);

      if (onSpinComplete) {
        onSpinComplete(winnerName);
      }
    }, spintime+500); // Add a small buffer to ensure animation completes
  };

  return (
    <div className="flex flex-col items-center gap-6">
      {/* WHEEL */}
      <div className="relative w-[340px] h-[340px] md:w-[500px] md:h-[500px] rounded-full border-4 border-[#3b3b5c] bg-[#111126] shadow-[0_0_50px_rgba(59,130,246,0.2)] flex items-center justify-center overflow-hidden">
        
        {/* Spinning layer */}
        <div
          className={`absolute inset-0 transition-transform ease-out ${
            animation ? "animate-[spin_14s_linear_infinite]" : ""
          }`}
          style={{ transform: `rotate(${rotation}deg)` ,
                  transitionDuration: spinning ? `${spintime}ms` : '0ms'}}
        >
          {/* Outer Energy Ring */}
          <div className="absolute inset-0 rounded-full border-[10px] border-transparent border-t-red-500/40 border-r-blue-500/30 border-b-purple-500/30 border-l-cyan-500/20" />

          {/* Inner Circles */}
          <div className="absolute inset-4 rounded-full border border-dashed border-blue-500/30" />
          <div className="absolute inset-12 rounded-full border border-red-500/20" />

          {/* Slices */}
          {players.map((player, i) => {
            const angle = 360 / players.length;
            const lineRotation = i * angle;
            const textRotation = i * angle + angle / 2;

            return (
              <React.Fragment key={i}>
                {/* Slice boundary line */}
                <div
                  className="absolute top-1/2 left-1/2 origin-bottom -translate-x-1/2 -translate-y-full"
                  style={{ transform: `rotate(${lineRotation}deg)` }}
                >
                  <div className="w-[2px] h-[250px] bg-gradient-to-b from-transparent via-blue-500/40 to-transparent" />
                </div>

                {/* Player name */}
                <div
                  className="absolute top-1/2 left-1/2 origin-center -translate-x-1/2 -translate-y-1/2 flex items-center justify-center"
                  style={{
                    transform: `rotate(${textRotation}deg) translateY(-225px)`,
                  }}
                >
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 text-[15px] font-bold whitespace-nowrap text-blue-400">
                    {player}
                  </div>
                </div>
              </React.Fragment>
            );
          })}
        </div>

        {/* Center */}
        <div className="relative w-16 h-16 bg-gradient-to-br from-red-600 to-red-800 rounded-full flex items-center justify-center z-10 shadow-[0_0_30px_rgba(239,68,68,0.6)] border-2 border-red-400">
          <div className="w-4 h-4 bg-white rounded-full animate-pulse" />
        </div>

        {/* Pointer */}
        <div className="absolute top-12 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[12px] border-l-transparent border-r-[12px] border-r-transparent border-b-[24px] border-b-red-400 z-20" />
      </div>

      {/* Spin Button */}
      {showSpin && (
        <button
          onClick={spinWheel}
          disabled={spinning || players.length === 0}
          className="cursor-pointer mt-10 px-10 py-5 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold shadow-lg hover:scale-105 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {spinning ? "Spinning..." : "SPIN"}
        </button>
      )}
    </div>
  );
}