import React, { useState } from "react";
import { ChevronDown, HelpCircle, Sparkles } from "lucide-react";

const faqData = [
  {
    question: "What is this True or Dare website?",
    answer:
      "This website is an interactive party game platform where players can enjoy fun and exciting True or Dare challenges online with friends.",
  },
  {
    question: "How do I play the game?",
    answer:
      "Simply add players, spin the wheel, and let the selected player choose between Truth or Dare. Then complete the challenge and continue the fun!",
  },
  {
    question: "How many players can join?",
    answer:
      "You can add multiple players depending on how your game setup is designed. It is made for group fun and social interaction.",
  },
  {
    question: "Can I play this game with my friends?",
    answer:
      "Yes! This game is designed to be played with friends, classmates, or anyone looking for a fun challenge together.",
  },
  {
    question: "Do I need to create an account?",
    answer:
      "No, the game is designed to be simple and easy to access without requiring a complicated sign-up process.",
  },
  {
    question: "Can I customize the players?",
    answer:
      "Yes, players can usually be added and edited before starting the game so you can personalize the experience.",
  },
  {
    question: "How does the spinning wheel work?",
    answer:
      "The spinning wheel randomly selects one player from the list, making the game fair, exciting, and unpredictable.",
  },
  {
    question: "Can I play on mobile or tablet?",
    answer:
      "Yes, the website is designed to be responsive so it can work across desktop, tablet, and mobile devices.",
  },
  {
    question: "Is this website free to use?",
    answer:
      "Yes, this project is free to use and was created for entertainment and fun experiences.",
  },
  {
    question: "Who created this website?",
    answer:
      "This website was created by a team of students/developers who wanted to turn the classic True or Dare game into a modern web experience.",
  },
];

function FAQItem({ question, answer, isOpen, onClick }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl overflow-hidden transition-all duration-300">
      <button
        onClick={onClick}
        className="w-full flex items-center justify-between text-left px-6 py-5 hover:bg-white/5 transition"
      >
        <span className="text-lg font-semibold text-white">{question}</span>
        <ChevronDown
          className={`w-5 h-5 text-pink-400 transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      <div
        className={`grid transition-all duration-300 ease-in-out ${
          isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <p className="px-6 pb-5 text-gray-300 leading-relaxed">{answer}</p>
        </div>
      </div>
    </div>
  );
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#050816] text-white">
      {/* Background Glow */}
      <div className="absolute inset-0">
        <div className="absolute top-[-100px] left-[-100px] w-[300px] h-[300px] bg-pink-500/20 blur-[120px] rounded-full" />
        <div className="absolute top-[20%] right-[-100px] w-[300px] h-[300px] bg-cyan-500/20 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-100px] left-[30%] w-[350px] h-[350px] bg-purple-500/20 blur-[120px] rounded-full" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 py-16">
        {/* Hero */}
        <section className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-pink-500/20 bg-white/5 backdrop-blur-md mb-6">
            <HelpCircle className="w-4 h-4 text-pink-400" />
            <span className="text-sm text-gray-300">Need Help?</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-extrabold mb-6">
            Frequently Asked <span className="text-pink-400">Questions</span>
          </h1>

          <p className="max-w-2xl mx-auto text-gray-300 text-lg leading-relaxed">
            Got questions? We’ve got answers. Learn more about how our True or Dare
            game works and how to enjoy the best experience.
          </p>
        </section>

        {/* FAQ List */}
        <section className="space-y-4">
          {faqData.map((faq, index) => (
            <FAQItem
              key={index}
              question={faq.question}
              answer={faq.answer}
              isOpen={openIndex === index}
              onClick={() => toggleFAQ(index)}
            />
          ))}
        </section>

        {/* Bottom Note */}
        <section className="mt-16 text-center">
          <div className="rounded-3xl border border-cyan-500/10 bg-gradient-to-r from-pink-500/10 via-purple-500/10 to-cyan-500/10 backdrop-blur-xl p-8 shadow-2xl">
            <Sparkles className="w-8 h-8 mx-auto text-cyan-400 mb-4" />
            <h2 className="text-2xl md:text-3xl font-bold mb-3">
              Still have questions?
            </h2>
            <p className="text-gray-300 max-w-xl mx-auto">
              Explore the website, spin the wheel, and enjoy the game. Sometimes
              the best way to understand it is to start playing.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}