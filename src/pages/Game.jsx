import React, { useState } from 'react';
import SpinWheel from '../components/GameWheel';
import PlayerListGame from '../components/PlayerListGame';
import Setting from '../components/Setting';
import TruthDareGame from '../components/TruthDareGame';
import {
  Crown,
  Zap,
  Trophy,
  Shield,
  Settings as SettingsIcon,
  ArrowLeft,
} from 'lucide-react';

const Game = () => {
  const [truthCards, setTruthCards] = useState([
    "What's the most embarrassing thing you've ever done?",
    "Have you ever lied to your best friend?",
    "What's a secret you've never told anyone here?",
    "What's the biggest trouble you've gotten into?",
    "Who in this room do you find most attractive?",
    "What's something you're afraid of?",
    "What's the last lie you told?",
    "Have you ever pretended to be sick to avoid something?",
    "What's the worst gift you've ever given someone?",
    "Have you ever stolen something?",
    "What's something you regret saying?",
    "What's the biggest risk you've ever taken?",
    "Have you ever broken something and hidden it?",
    "What's something you're insecure about?",
    "What's the biggest mistake you've made at work/school?",
    "Have you ever pretended to be someone else online?",
    "What's something you've never told your parents?",
    "What's the worst date you've ever been on?",
    "Have you ever cheated on a test?",
    "What's something you're jealous of?",
    "What's the biggest argument you've had with a friend?",
    "Have you ever ghosted someone? Why?",
    "What's something you've been blamed for that wasn't your fault?",
    "What's your biggest pet peeve about someone in this room?",
    "Have you ever pretended to be busy to avoid someone?",
    "What's something you've lied about to make yourself look better?",
    "What's the most trouble you've gotten into at school/work?",
    "Have you ever read someone else's messages without permission?",
    "What's something you've done that no one knows about?",
    "What's the biggest lesson you've learned from a failure?",
    "What's something you've been pretending to like?",
    "Have you ever ignored a friend in need?",
    "What's something you're ashamed of?",
    "What's the meanest thing you've ever said to someone?",
    "Have you ever spread a rumor?",
    "What's something you've been holding back from saying?",
    "What's your biggest fear about the future?",
    "Have you ever lied to get out of trouble?",
    "What's something you'd change about your past?",
    "What's the most childish thing you still do?"
  ]);

  const [dareCards, setDareCards] = useState([
    "Do 10 jumping jacks right now.",
    "Send a text saying 'I love pickles' to someone.",
    "Let the group ask you one question and answer honestly.",
    "Act like a monkey for 10 seconds.",
    "Imitate the person to your right for 60 seconds.",
    "Show your last 3 photos on your phone.",
    "Sing the chorus of your favorite song.",
    "Make a funny face and freeze for 5 seconds.",
    "Do 15 squats right now.",
    "Send a selfie to the 3rd person in your contacts.",
    "Let someone write something on your forehead.",
    "Dance like no one's watching for 15 seconds.",
    "Speak in a funny accent for the next 2 rounds.",
    "Show your search history to the group.",
    "Do 5 pushups right now.",
    "Post an embarrassing photo on your story.",
    "Let the group choose your profile picture for 1 hour.",
    "Pretend to be a famous person until your next turn.",
    "Send a voice note saying something silly to a friend.",
    "Do a dramatic reading of the last text you sent.",
    "Let someone tickle you for 5 seconds.",
    "Trade an item of clothing with someone.",
    "Make three animal sounds in a row.",
    "Show the last thing you Googled.",
    "Do 20 high knees right now.",
    "Send 'I love you' to your 5th contact.",
    "Let someone give you a nickname for the rest of the game.",
    "Act out your favorite movie scene.",
    "Say something flirty to the person on your left.",
    "Do a handstand against the wall (or try to).",
    "Let the group ask you a personal question.",
    "Pretend to be a waiter and take everyone's order.",
    "Send a random emoji to your last chat.",
    "Do 10 arm circles forward and backward.",
    "Let someone look through your camera roll for 10 seconds.",
    "Make up a short rap about someone in the room.",
    "Do a dramatic slow-motion walk across the room.",
    "Imitate a famous celebrity until your next turn.",
    "Send a text with only emojis and have someone guess what it means.",
    "Let the group give you a challenge to complete before your next turn."
  ]);
  const [players, setPlayers] = useState([
    { name: 'CHANCE PICK', icon: <Crown size={12} />, color: 'bg-blue-600' },
    { name: 'LUCKY NAME', icon: <Zap size={12} />, color: 'bg-purple-600' },
    { name: 'FORTUNE SELECT', icon: <Trophy size={12} />, color: 'bg-red-600' },
    { name: 'DECIDER', icon: <Shield size={12} />, color: 'bg-green-600' },
  ]);

  console.log("truth cards:", truthCards);
  console.log("dare cards:", dareCards);
  console.log("players:", players);

  const [lives, setLives] = useState(3);
  const [rotation, setRotation] = useState(45);
  const [showSettings, setShowSettings] = useState(false);
  const [abilities, setAbilities] = useState(2);
  const [showPunishment, setShowPunishment] = useState(false);
  const [punishedPlayer, setPunishedPlayer] = useState(null);
  const [spintime, setSpintime] = useState(4000);
  
  // Game phase: 'spin' or 'card'
  const [gamePhase, setGamePhase] = useState('spin');
  const [currentPlayer, setCurrentPlayer] = useState(null);
  
  // Track stats for each player
  const [playerStats, setPlayerStats] = useState({});

  const handleSpinComplete = (winner) => {
    // Check if player is eliminated
    const playerStat = playerStats[winner];
    if (playerStat && playerStat.lives <= 0) {

      return;
    }
    setCurrentPlayer(winner);
    setGamePhase('card');
  };

  const handleBackToSpin = () => {
    setGamePhase('spin');
    setCurrentPlayer(null);
  };

  // Handle punishment when life hits 0
  const handlePunishment = (playerName) => {
    setPunishedPlayer(playerName);
    setShowPunishment(true);
    
    // Reset player's life based on settings, keep abilities (but cap at max)
    setPlayerStats(prev => ({
      ...prev,
      [playerName]: {
        lives: lives, // Reset to current lives setting
        abilities: Math.min(prev[playerName]?.abilities ?? abilities, abilities), // Keep abilities but cap at max
        completedRounds: 0 // Reset completed rounds on punishment
      }
    }));
    
    // Auto close punishment modal after 3 seconds
    setTimeout(() => {
      setShowPunishment(false);
      setPunishedPlayer(null);
    }, 3000);
  };

  const handlePlayerStatsUpdate = (playerName, newLives, newAbilities, newCompletedRounds) => {
    // Cap abilities at the max limit from settings
    const cappedAbilities = Math.min(newAbilities, abilities);
    
    console.log(`Updating ${playerName}: Lives=${newLives}, Abilities=${cappedAbilities} (max=${abilities}), Completed=${newCompletedRounds}`);
    
    // Check if life hit 0 - trigger punishment
    if (newLives <= 0) {
      handlePunishment(playerName);
      return; // Don't update stats with 0 lives, punishment will reset them
    }
    
    setPlayerStats(prev => ({
      ...prev,
      [playerName]: {
        lives: newLives,
        abilities: cappedAbilities,
        completedRounds: newCompletedRounds || 0
      }
    }));
  };

  // Get current player's stats
  const getCurrentPlayerStats = () => {
    if (!currentPlayer) return { lives, abilities, completedRounds: 0 };
    const stats = playerStats[currentPlayer];
    return {
      lives: stats?.lives ?? lives,
      abilities: stats?.abilities ?? abilities,
      completedRounds: stats?.completedRounds ?? 0
    };
  };

  const rotateWheel = ()=>{
      const getRandom = Math.random() * (360 - rotation) + 80 ;
      
      setRotation(getRandom);
  }

  const currentStats = getCurrentPlayerStats();

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-[#0a0a16] font-sans text-white">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `linear-gradient(#3b82f6 1px, transparent 1px), linear-gradient(to right, #3b82f6 1px, transparent 1px)`,
            backgroundSize: '40px 40px',
          }}
        />
        <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-[600px] h-[600px] bg-red-600/15 rounded-full blur-[150px]" />
      </div>

      {/* Punishment Modal */}
      {showPunishment && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 animate-in fade-in duration-300">
          <div className="bg-gradient-to-br from-red-900 to-red-700 rounded-2xl p-8 text-center shadow-2xl border-2 border-red-400 animate-bounce-in max-w-md mx-4">
            <div className="text-8xl mb-4">💀</div>
            <h2 className="text-3xl font-bold text-white mb-2">PUNISHMENT!</h2>
            <p className="text-xl text-white/90 mb-4">
              {punishedPlayer} has been punished!
            </p>
            <p className="text-white/80 mb-6">
              Lives reset to {lives} ❤️
            </p>
            <div className="w-16 h-1 bg-white/50 mx-auto rounded-full animate-pulse" />
          </div>
        </div>
      )}

      {/* Settings Button */}
      <button
        onClick={() => setShowSettings(true)}
        className="absolute top-6 right-6 z-30 p-3 rounded-lg bg-[#111126] border border-blue-500/30 hover:bg-blue-600/20 transition"
      >
        <SettingsIcon size={20} />
      </button>

      {/* Settings Modal */}
      {showSettings && (
        <Setting
          lives={lives}
          setLives={setLives}
          abilities={abilities}
          setAbilities={setAbilities}
          spintime={spintime}
          setSpintime={setSpintime}
          setDareCards={setDareCards}
          setTruthCards={setTruthCards}

          onClose={() => setShowSettings(false)}
        />
      )}



      {/* Back Button (only in card phase) */}
      {gamePhase === 'card' && (
        <button
          onClick={handleBackToSpin}
          className="absolute top-6 left-6 z-30 p-3 rounded-lg bg-[#111126] border border-blue-500/30 hover:bg-blue-600/20 transition flex items-center gap-2"
        >
          <ArrowLeft size={20} />
          Back to Spin
        </button>
      )}


      <div className="relative z-10 flex flex-col md:flex-row items-center justify-center min-h-screen px-6 gap-12 py-20">
        
        {gamePhase === 'spin' ? (
          <>
            <SpinWheel 
              rotation = {rotation}
              setRotation = {setRotation}
              players={players.map((p) => p.name)} 
              onSpinComplete={handleSpinComplete}
              spintime={spintime}

            />
            <PlayerListGame
              players={players}
              setPlayers={setPlayers}
              globalLives={lives}
              globalAbilities={abilities}
              playerStats={playerStats}
            />
           
          </>
        ) : (
          <TruthDareGame
            key={currentPlayer}
            playerName={currentPlayer}
            initialLives={currentStats.lives}
            initialAbilities={currentStats.abilities}
            initialCompletedRounds={currentStats.completedRounds}
            maxAbilities={abilities}  // ← ADD THIS LINE - passes ability limit from settings
            onBackToSpin={handleBackToSpin}
            dareCards={dareCards}
            truthCards={truthCards}
            updatePlayerStats={handlePlayerStatsUpdate}
          />
        )}
      </div>

      {/* Animation styles */}
      <style jsx>{`
        @keyframes bounce-in {
          0% {
            opacity: 0;
            transform: scale(0.3);
          }
          50% {
            opacity: 1;
            transform: scale(1.05);
          }
          70% {
            transform: scale(0.9);
          }
          100% {
            transform: scale(1);
          }
        }
        .animate-bounce-in {
          animation: bounce-in 0.5s ease-out forwards;
        }
        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        .animate-in {
          animation: fade-in 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default Game;