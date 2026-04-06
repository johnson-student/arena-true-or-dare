import React from "react";

export default function LivesSelector({ lives, setLives }) {
  const maxLives = 5;

  return (
    <div className="flex flex-col items-center gap-4 mt-6">
      
      {/* Label */}
      <div className="text-blue-400 font-bold text-lg">
        Lives: {lives}
      </div>

      {/* Hearts */}
      <div className="flex gap-3">
        {[...Array(maxLives)].map((_, i) => {
          const active = i < lives;

          return (
            <button
              key={i}
              onClick={() => setLives(i + 1)}
              className={`text-3xl transition transform hover:scale-110 ${
                active
                  ? "text-red-500 drop-shadow-[0_0_8px_rgba(239,68,68,0.7)]"
                  : "text-gray-500 opacity-40"
              }`}
            >
              ❤️
            </button>
          );
        })}
      </div>

      {/* Optional slider (alternative control) */}
      <input
        type="range"
        min="1"
        max="5"
        value={lives}
        onChange={(e) => setLives(Number(e.target.value))}
        className="w-40 accent-purple-500"
      />
    </div>
  );
}