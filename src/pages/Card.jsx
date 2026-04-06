import React, { useState } from "react";

const truths = [
  "What is your biggest fear?",
  "Have you ever lied to your best friend?",
  "What is your most embarrassing moment?",
];

const dares = [
  "Do 10 push-ups",
  "Sing a song loudly",
  "Dance for 30 seconds",
];

function Card() {
  const [selected, setSelected] = useState(null); // "truth" or "dare"
  const [revealed, setRevealed] = useState(false);
  const [question, setQuestion] = useState("");
  const [mode, setMode] = useState(null); // "ask" or "random"

  const handlePick = (type) => {
    if (selected) return;

    // randomly decide truth or dare regardless of click
    const result = Math.random() > 0.5 ? "truth" : "dare";

    setSelected(result);
    setTimeout(() => setRevealed(true), 500);
  };

  const generateQuestion = () => {
    if (selected === "truth") {
      const q = truths[Math.floor(Math.random() * truths.length)];
      setQuestion(q);
    } else {
      const q = dares[Math.floor(Math.random() * dares.length)];
      setQuestion(q);
    }
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-[#0a0a16] text-white">

      {/* Background */}
      <div className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `linear-gradient(#3b82f6 1px, transparent 1px), linear-gradient(to right, #3b82f6 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
        }}
      />

      <div className="relative z-10 flex flex-col items-center justify-center h-screen gap-8">

        {/* CARD CHOICE */}
        {!revealed && (
          <div className="flex gap-10">
            {["truth", "dare"].map((type) => (
              <div
                key={type}
                onClick={() => handlePick(type)}
                className="w-[160px] h-[220px] bg-[#111126] border border-blue-500/30 rounded-xl flex items-center justify-center cursor-pointer hover:scale-105 transition"
              >
                <span className="text-xl uppercase tracking-widest text-blue-400">
                  ?
                </span>
              </div>
            ))}
          </div>
        )}

        {/* RESULT */}
        {revealed && (
          <div className="flex flex-col items-center gap-6">

            {/* Revealed Card */}
            <div className="w-[200px] h-[260px] bg-[#111126] border border-purple-500/30 rounded-xl flex items-center justify-center text-3xl font-bold uppercase shadow-lg">
              {selected}
            </div>

            {/* Options */}
            {!question && (
              <div className="flex gap-4">
                <button
                  onClick={() => setMode("ask")}
                  className="px-4 py-2 bg-blue-600 rounded-lg"
                >
                  Ask in Real Life
                </button>

                <button
                  onClick={() => {
                    setMode("random");
                    generateQuestion();
                  }}
                  className="px-4 py-2 bg-purple-600 rounded-lg"
                >
                  Random Question
                </button>
              </div>
            )}

            {/* Question */}
            {question && (
              <div className="text-center max-w-md">
                <p className="text-xl text-green-400 mb-6">{question}</p>

                <div className="flex gap-4 justify-center">
                  <button className="px-4 py-2 bg-green-600 rounded-lg">
                    <link to="/game">Done</link>
                  </button>

                  <button className="px-4 py-2 bg-red-600 rounded-lg">
                    <link to="/game">Give up(lost 1 life)</link>
                  </button>
                </div>
              </div>
            )}

          </div>
        )}
      </div>
    </div>
  );
}

export default Card;