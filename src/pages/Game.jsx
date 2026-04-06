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
  const [players, setPlayers] = useState([
    { name: 'CHANCE PICK', icon: <Crown size={12} />, color: 'bg-blue-600' },
    { name: 'LUCKY NAME', icon: <Zap size={12} />, color: 'bg-purple-600' },
    { name: 'FORTUNE SELECT', icon: <Trophy size={12} />, color: 'bg-red-600' },
    { name: 'DECIDER', icon: <Shield size={12} />, color: 'bg-green-600' },
  ]);

  const [lives, setLives] = useState(3);
  const [showSettings, setShowSettings] = useState(false);
  const [abilities, setAbilities] = useState(2);
  const [showPunishment, setShowPunishment] = useState(false);
  const [punishedPlayer, setPunishedPlayer] = useState(null);
  
  // Game phase: 'spin' or 'card'
  const [gamePhase, setGamePhase] = useState('spin');
  const [currentPlayer, setCurrentPlayer] = useState(null);
  
  // Track stats for each player
  const [playerStats, setPlayerStats] = useState({});

  const handleSpinComplete = (winner) => {
    // Check if player is eliminated
    const playerStat = playerStats[winner];
    if (playerStat && playerStat.lives <= 0) {
      alert(`${winner} is eliminated! Please remove them or reset.`);
      return;
    }
    setCurrentPlayer(winner);
    setGamePhase('card');
  };

  const handleBackToSpin = () => {
    setGamePhase('spin');
    setCurrentPlayer(null);
  };

  const handleGameOver = () => {
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

      {/* Settings Modal */}
      {showSettings && (
        <Setting
          lives={lives}
          setLives={setLives}
          abilities={abilities}
          setAbilities={setAbilities}
          onClose={() => setShowSettings(false)}
        />
      )}

      <div className="relative z-10 flex flex-col md:flex-row items-center justify-center min-h-screen px-6 gap-12 py-20">
        
        {gamePhase === 'spin' ? (
          <>
            <SpinWheel 
              players={players.map((p) => p.name)} 
              onSpinComplete={handleSpinComplete}
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
            onGameOver={handleGameOver}
            onBackToSpin={handleBackToSpin}
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