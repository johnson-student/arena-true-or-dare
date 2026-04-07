import React from "react";
import {
  Users,
  RotateCw,
  UserCheck,
  ScrollText,
  CheckCircle2,
  Heart,
  Skull,
  Sparkles,
} from "lucide-react";

const steps = [
  {
    number: "01",
    title: "Enter Player Names",
    description:
      "Start by adding all player names before the game begins. Each player will join the wheel and take part in the challenge.",
    icon: <Users className="w-7 h-7 text-pink-400" />,
  },
  {
    number: "02",
    title: "Spin the Wheel",
    description:
      "Once all players are added, spin the wheel to randomly select who will play the next turn.",
    icon: <RotateCw className="w-7 h-7 text-cyan-400" />,
  },
  {
    number: "03",
    title: "Selected Player Takes the Turn",
    description:
      "The wheel will stop on one player. That player is chosen to answer or complete the next challenge.",
    icon: <UserCheck className="w-7 h-7 text-yellow-400" />,
  },
  {
    number: "04",
    title: "Draw a Challenge",
    description:
      "The selected player clicks the Draw Challenge button to receive a random challenge from the system.",
    icon: <ScrollText className="w-7 h-7 text-purple-400" />,
  },
  {
    number: "05",
    title: "Truth or Dare Challenge",
    description:
      "Each challenge can be either a Truth question or a Dare task. The player must respond honestly or complete the action.",
    icon: <Sparkles className="w-7 h-7 text-green-400" />,
  },
  {
    number: "06",
    title: "Complete or Fail",
    description:
      "If the player successfully completes the challenge, the game continues normally. If the player refuses or fails, they lose 1 life.",
    icon: <CheckCircle2 className="w-7 h-7 text-emerald-400" />,
  },
  {
    number: "07",
    title: "Lose a Life",
    description:
      "Every player has a limited number of lives. Failing a challenge will reduce the player’s life by 1.",
    icon: <Heart className="w-7 h-7 text-red-400" />,
  },
  {
    number: "08",
    title: "Punishment at 0 Life",
    description:
      "If a player’s life reaches 0, they must face a punishment. This makes the game more exciting, competitive, and fun.",
    icon: <Skull className="w-7 h-7 text-orange-400" />,
  },
];

export default function HowToPlay() {
  return (
    <div className="relative min-h-screen overflow-hidden  text-white">
      {/* Background Glow */}
      <div className="absolute inset-0">
        <div className="absolute top-[-100px] left-[-100px] w-[300px] h-[300px] bg-pink-500/20 blur-[120px] rounded-full" />
        <div className="absolute top-[20%] right-[-100px] w-[300px] h-[300px] bg-cyan-500/20 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-100px] left-[30%] w-[350px] h-[350px] bg-purple-500/20 blur-[120px] rounded-full" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-16">
        {/* Hero */}
        <section className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-pink-500/20 bg-white/5 backdrop-blur-md mb-6">
            <Sparkles className="w-4 h-4 text-pink-400" />
            <span className="text-sm text-gray-300">Game Workflow</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-extrabold mb-6">
            How To <span className="text-pink-400">Play</span>
          </h1>

          <p className="max-w-3xl mx-auto text-gray-300 text-lg md:text-xl leading-relaxed">
            Learn the full flow of the game from adding players to facing
            punishment. Follow the steps below and enjoy the ultimate True or Dare experience.
          </p>
        </section>

        {/* Workflow Steps */}
        <section className="grid md:grid-cols-2 gap-8 mb-20">
          {steps.map((step, index) => (
            <div
              key={index}
              className="group rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-8 shadow-xl hover:scale-[1.02] transition-all duration-300 hover:shadow-pink-500/10"
            >
              <div className="flex items-start gap-5">
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center group-hover:bg-white/15 transition">
                    {step.icon}
                  </div>
                  <div className="w-[2px] h-16 bg-gradient-to-b from-pink-500/30 to-transparent mt-4 hidden md:block" />
                </div>

                <div className="flex-1">
                  <p className="text-sm font-semibold text-pink-400 mb-2">
                    STEP {step.number}
                  </p>
                  <h2 className="text-2xl font-bold mb-3">{step.title}</h2>
                  <p className="text-gray-300 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </section>

        {/* Rules Summary */}
        <section className="rounded-3xl border border-cyan-500/10 bg-gradient-to-r from-pink-500/10 via-purple-500/10 to-cyan-500/10 backdrop-blur-xl p-8 md:p-12 shadow-2xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center">
            Quick Rules Summary
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="rounded-2xl bg-white/5 border border-white/10 p-6 text-center">
              <h3 className="text-xl font-bold mb-2 text-pink-400">
                Add Players
              </h3>
              <p className="text-gray-300">
                Enter all players before starting the game.
              </p>
            </div>

            <div className="rounded-2xl bg-white/5 border border-white/10 p-6 text-center">
              <h3 className="text-xl font-bold mb-2 text-cyan-400">
                Complete Challenges
              </h3>
              <p className="text-gray-300">
                Finish Truth or Dare challenges to stay safe.
              </p>
            </div>

            <div className="rounded-2xl bg-white/5 border border-white/10 p-6 text-center">
              <h3 className="text-xl font-bold mb-2 text-red-400">
                Avoid Punishment
              </h3>
              <p className="text-gray-300">
                If your life reaches 0, punishment will be triggered.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}