import React from "react";
import {
  Users,
  Target,
  Sparkles,
  Trophy,
  Zap,
  Shield,
  Crown,
} from "lucide-react";

const teamMembers = [
  {
    name: "Johnson",
    role: "Frontend Developer",
    bio: "Builds the UI, animations, and game interactions to make the experience fun and smooth.",
    icon: <Crown className="w-8 h-8 text-yellow-400" />,
  },
  {
    name: "Kimneng",
    role: "Frontend Developer",
    bio: "Builds the UI, animations, and game interactions to make the experience fun and smooth.",
    icon: <Shield className="w-8 h-8 text-cyan-400" />,
  },
  {
    name: "Udom",
    role: "Frontend Developer",
    bio: "Builds the UI, animations, and game interactions to make the experience fun and smooth.",
    icon: <Zap className="w-8 h-8 text-pink-400" />,
  },
];

const stats = [
  {
    label: "Team Members",
    value: "3",
    icon: <Users className="w-6 h-6" />,
  },
  {
    label: "Fun Project",
    value: "1",
    icon: <Trophy className="w-6 h-6" />,
  },
  {
    label: "Chaos Energy",
    value: "100%",
    icon: <Sparkles className="w-6 h-6" />,
  },
  {
    label: "Mission",
    value: "Fun",
    icon: <Target className="w-6 h-6" />,
  },
];

export default function About() {
  return (
    <div className="relative min-h-screen overflow-hidden  text-white">
      {/* Background Glow */}
      <div className="absolute inset-0">
        <div className="absolute top-[-100px] left-[-100px] w-[300px] h-[300px] bg-pink-500/20 blur-[120px] rounded-full" />
        <div className="absolute top-[20%] right-[-100px] w-[300px] h-[300px] bg-cyan-500/20 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-100px] left-[30%] w-[350px] h-[350px] bg-purple-500/20 blur-[120px] rounded-full" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-16">
        {/* Hero Section */}
        <section className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-pink-500/20 bg-white/5 backdrop-blur-md mb-6">
            <Sparkles className="w-4 h-4 text-pink-400" />
            <span className="text-sm text-gray-300">Meet Our Team</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-6">
            About <span className="text-pink-400">Us</span>
          </h1>

          <p className="max-w-3xl mx-auto text-gray-300 text-lg md:text-xl leading-relaxed">
            We are the team behind this True or Dare experience — building a fun,
            interactive, and exciting platform to make every game night more memorable.
          </p>
        </section>

        {/* Mission Section */}
        <section className="mb-20">
          <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-8 md:p-12 shadow-2xl">
            <div className="flex items-center gap-3 mb-4">
              <Target className="w-8 h-8 text-cyan-400" />
              <h2 className="text-3xl font-bold">Our Mission</h2>
            </div>
            <p className="text-gray-300 text-lg leading-relaxed">
              Our mission is to transform a classic party game into a modern digital
              experience where players can laugh, compete, spin, and create unforgettable
              memories together. We wanted to build something simple, fun, and full of energy.
            </p>
          </div>
        </section>

        {/* Team Members */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-3">Our Team</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Three minds, one fun project, and a lot of creative energy.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <div
                key={index}
                className="group rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-8 hover:scale-[1.03] transition-all duration-300 shadow-xl hover:shadow-pink-500/10"
              >
                <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center mb-6 group-hover:bg-white/15 transition">
                  {member.icon}
                </div>

                <h3 className="text-2xl font-bold mb-2">{member.name}</h3>
                <p className="text-pink-400 font-medium mb-4">{member.role}</p>
                <p className="text-gray-300 leading-relaxed">{member.bio}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Stats Section */}
        <section className="mb-20">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 text-center shadow-lg hover:scale-[1.02] transition-all duration-300"
              >
                <div className="flex justify-center mb-4 text-cyan-400">
                  {stat.icon}
                </div>
                <h3 className="text-3xl font-extrabold mb-2">{stat.value}</h3>
                <p className="text-gray-400">{stat.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Closing Section */}
        <section className="text-center">
          <div className="rounded-3xl border border-pink-500/10 bg-gradient-to-r from-pink-500/10 via-purple-500/10 to-cyan-500/10 backdrop-blur-xl p-10 shadow-2xl">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Built for Fun 🎉
            </h2>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto leading-relaxed">
              This project was created to bring people together through laughter,
              challenges, and unforgettable moments. Because every great game starts
              with one spin.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}