import React, { useState } from "react";


export default function TruthDareGame({ 
  playerName, 
  initialLives, 
  initialAbilities,
  initialCompletedRounds = 0,
  maxAbilities = 5, // Maximum abilities limit from settings
  onBackToSpin,
  dareCards = [],
  truthCards = [],
  updatePlayerStats 
}) {
  const [lives, setLives] = useState(initialLives);
  const [abilities, setAbilities] = useState(initialAbilities);
  const [completedRounds, setCompletedRounds] = useState(initialCompletedRounds);
  const [currentChallenge, setCurrentChallenge] = useState(null);
  const [gameState, setGameState] = useState('lobby');
  const [justEarnedAbility, setJustEarnedAbility] = useState(false);
  const [maxAbilitiesReached, setMaxAbilitiesReached] = useState(false);

  const drawChallenge = () => {
    const isTruth = Math.random() < 0.5;
    const type = isTruth ? 'truth' : 'dare';
    const source = isTruth ? truthCards : dareCards;
    const randomIndex = Math.floor(Math.random() * source.length);
    
    setCurrentChallenge({ type, text: source[randomIndex] });
    setGameState('challenge');
    setJustEarnedAbility(false);
    setMaxAbilitiesReached(false);
  };

  const useAbility = () => {
    if (abilities <= 0) return;
    
    const newAbilities = abilities - 1;
    setAbilities(newAbilities);
    
    // Send ability usage update to parent
    if (updatePlayerStats) {
      updatePlayerStats(playerName, lives, newAbilities, completedRounds);
    }
    
    const newType = currentChallenge.type === 'truth' ? 'dare' : 'truth';
    const source = newType === 'truth' ? truthCards : dareCards;
    const randomIndex = Math.floor(Math.random() * source.length);
    
    setCurrentChallenge({ type: newType, text: source[randomIndex] });
  };

  const completeChallenge = (success) => {
    let newLives = lives;
    let newAbilities = abilities;
    let newCompleted = completedRounds;
    let earnedAbility = false;
    
    if (success) {
      // COMPLETE - gain progress
      newCompleted = completedRounds + 1;
      console.log(`${playerName} completed challenge! Progress: ${completedRounds} -> ${newCompleted}`);
      
      // Check if player completed 3 rounds - RESET and give +1 ability (if under max limit)
      if (newCompleted >= 3) {
        // Check if current abilities are already at max limit
        if (abilities >= maxAbilities) {
          // Max ability limit reached, cannot earn more
          console.log(`${playerName} reached max ability limit (${maxAbilities})! Cannot earn more.`);
          setMaxAbilitiesReached(true);
          setJustEarnedAbility(true);
          // Still reset progress but don't add ability
          newCompleted = 0;
        } else {
          // Can earn new ability
          newAbilities = abilities + 1;
          earnedAbility = true;
          setJustEarnedAbility(true);
          console.log(`${playerName} earned an ability! New abilities: ${newAbilities} (Max: ${maxAbilities})`);
          
          // Reset completed rounds counter after earning ability
          newCompleted = 0;
        }
      }
      
      setCompletedRounds(newCompleted);
      setAbilities(newAbilities);
    } else {
      // GIVE UP - lose 1 life
      newLives = lives - 1;
      setLives(newLives);
      console.log(`${playerName} gave up! Lives: ${lives} -> ${newLives}`);
    }
    
    // Check if player hit 0 lives - trigger punishment
    if (newLives <= 0) {
      console.log(`${playerName} hit 0 lives! Triggering punishment...`);
      if (updatePlayerStats) {
        updatePlayerStats(playerName, 0, newAbilities, newCompleted);
      }
      if (onBackToSpin) {
        onBackToSpin();
      }
      return;
    }
    
    // Update parent component with latest stats
    if (updatePlayerStats) {
      console.log(`Sending to parent: ${playerName}, Lives=${newLives}, Abilities=${newAbilities}, Completed=${newCompleted}`);
      updatePlayerStats(playerName, newLives, newAbilities, newCompleted);
    }
    
    // Show ability earned message briefly before returning
    if (earnedAbility) {
      setTimeout(() => {
        if (onBackToSpin) {
          onBackToSpin();
        }
      }, 1500);
    } else {
      // Return to spin wheel
      if (onBackToSpin) {
        onBackToSpin();
      }
    }
  };

  // const resetGame = () => {
  //   setLives(initialLives);
  //   setAbilities(initialAbilities);
  //   setCompletedRounds(initialCompletedRounds);
  //   setCurrentChallenge(null);
  //   setGameState('lobby');
  //   setJustEarnedAbility(false);
  //   setMaxAbilitiesReached(false);
  // };

  const cardRevealStyle = `
    @keyframes cardReveal {
      0% { opacity: 0; transform: scale(0.9) translateY(20px); }
      100% { opacity: 1; transform: scale(1) translateY(0); }
    }
    @keyframes abilityPop {
      0% { transform: scale(0); opacity: 0; }
      50% { transform: scale(1.2); }
      100% { transform: scale(1); opacity: 1; }
    }
    @keyframes maxReachedPop {
      0% { transform: scale(0); opacity: 0; }
      50% { transform: scale(1.2); }
      100% { transform: scale(1); opacity: 1; }
    }
  `;

  return (
    <>
      <style>{cardRevealStyle}</style>
      <div className="flex flex-col items-center gap-8 max-w-2xl w-full">
        {/* Ability Earned Notification */}
        {justEarnedAbility && !maxAbilitiesReached && (
          <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-2xl p-6 text-center shadow-2xl animate-[abilityPop_0.5s_ease-out] border-2 border-yellow-300">
            <div className="text-5xl mb-2">✨</div>
            <h3 className="text-2xl font-bold text-white">ABILITY EARNED!</h3>
            <p className="text-white/90 mt-2">+1 Switch Ability</p>
          </div>
        )}

        {/* Max Ability Reached Notification */}
        {justEarnedAbility && maxAbilitiesReached && (
          <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 bg-gradient-to-r from-gray-600 to-gray-800 rounded-2xl p-6 text-center shadow-2xl animate-[maxReachedPop_0.5s_ease-out] border-2 border-gray-400">
            <div className="text-5xl mb-2">⚠️</div>
            <h3 className="text-2xl font-bold text-white">MAX ABILITIES REACHED!</h3>
            <p className="text-white/90 mt-2">You have reached the limit of {maxAbilities} abilities</p>
          </div>
        )}

        {/* Player Stats Display */}
        <div className="text-center bg-[#0c0c1e]/80 p-6 rounded-2xl border border-blue-500/30 w-full animate-[cardReveal_0.3s_ease-out]">
          <h2 className="text-3xl font-bold text-white">{playerName}</h2>
          <div className="flex gap-8 mt-4 justify-center">
            <div>
              <p className="text-sm text-gray-400">Lives</p>
              <div className="text-2xl">
                {lives > 0 ? '❤️'.repeat(lives) : '💀'}
              </div>
            </div>
            <div>
              <p className="text-sm text-gray-400">Abilities</p>
              <div className="text-2xl">
                {abilities > 0 ? '⚡'.repeat(abilities) : '⚡'.repeat(0)}
              </div>
              <p className="text-xs text-gray-500 mt-1">Max: {maxAbilities}</p>
            </div>
            <div>
              <p className="text-sm text-gray-400">Progress</p>
              <div className="text-2xl font-bold text-green-400">
                {completedRounds}/3
              </div>
            </div>
          </div>
          {/* Progress bar */}
          <div className="mt-4 w-full bg-gray-700 rounded-full h-2 overflow-hidden">
            <div 
              className="bg-gradient-to-r from-green-500 to-green-400 h-full rounded-full transition-all duration-500"
              style={{ width: `${(completedRounds / 3) * 100}%` }}
            />
          </div>
          <p className="text-xs text-gray-500 mt-2">
            {abilities >= maxAbilities 
              ? `✨ Max abilities reached (${maxAbilities}/${maxAbilities}) ✨` 
              : `Complete 3 challenges to earn an ability! (${abilities}/${maxAbilities})`}
          </p>
        </div>

        {/* Challenge Card */}
        {gameState === 'challenge' && currentChallenge && (
          <div className={`w-full p-8 rounded-2xl text-center ${
            currentChallenge.type === 'truth' 
              ? 'bg-blue-600/90 border-blue-400' 
              : 'bg-red-600/90 border-red-400'
          } border-2 shadow-2xl animate-[cardReveal_0.3s_ease-out]`}>
            <h3 className="text-xs font-black tracking-widest uppercase opacity-80 mb-4">
              {currentChallenge.type === 'truth' ? '— TRUTH —' : '— DARE —'}
            </h3>
            <div className="text-6xl mb-6">
              {currentChallenge.type === 'truth' ? '📖' : '⚡'}
            </div>
            <p className="text-xl md:text-2xl font-medium italic leading-relaxed">
              "{currentChallenge.text}"
            </p>
            
            <div className="flex gap-4 justify-center mt-8 flex-wrap">
              <button
                onClick={() => completeChallenge(true)}
                className="px-6 py-2 rounded-lg bg-green-600 text-white font-bold hover:bg-green-500 transition"
              >
                ✅ Complete
              </button>
              <button
                onClick={() => completeChallenge(false)}
                className="px-6 py-2 rounded-lg bg-red-700 text-white font-bold hover:bg-red-600 transition"
              >
                ❌ Give Up (-1 Life)
              </button>
            </div>
            
            {abilities > 0 && (
              <button
                onClick={useAbility}
                className="mt-4 text-sm text-white/70 hover:text-white transition flex items-center gap-1 mx-auto"
              >
                🔄 Use Ability to Switch ({abilities} left)
              </button>
            )}
          </div>
        )}

        {/* Draw Button */}
        {gameState === 'lobby' && (
          <button
            onClick={drawChallenge}
            className="px-8 py-4 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold text-lg shadow-lg hover:scale-105 transition animate-[cardReveal_0.3s_ease-out]"
          >
            🎴 Draw Challenge
          </button>
        )}
      </div>
    </>
  );
}