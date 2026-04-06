import { useState, useEffect } from 'react';

// === GAME DATA ===
const truthCards = [
  "What's the most embarrassing thing you've ever done?",
  "Have you ever lied to your best friend?",
  "What's a secret you've never told anyone here?",
  "What's the biggest trouble you've gotten into at school/work?",
  "Who in this room do you find most attractive?"
];

const dareCards = [
  "Do 10 jumping jacks right now.",
  "Send a text saying 'I love pickles' to the third person in your contacts.",
  "Let the group ask you one yes/no question and answer honestly.",
  "Act like a monkey for 10 seconds.",
  "Imitate the person to your right for 60 seconds."
];

// Reusable animated virtual card base
const VirtualCardBase = ({ type, text, children, isAbilityView }) => (
  <div className={`relative w-[28rem] min-h-[420px] max-w-lg p-12 rounded-3xl transition-all duration-500 transform border-b-8 animate-[cardReveal_0.5s_ease-out_forwards]
    ${isAbilityView ? 'bg-zinc-800/80 border-zinc-700' : type === 'truth' ? 'bg-brand-blue/90 border-brand-blue/70' : 'bg-brand-red/90 border-brand-red/70'}
    ${isAbilityView ? 'shadow-[0_0_20px_#ffffff22]' : type === 'truth' ? 'shadow-[0_0_30px_#3B82F6cc]' : 'shadow-[0_0_30px_#E13B31cc]'}
    `}>
    {/* Subtle card texture */}
    <div className="absolute inset-0 bg-brand-bg opacity-30" style={{ backgroundImage: 'linear-gradient(rgba(26, 29, 53, .1) 1px, transparent 1px), linear-gradient(90deg, rgba(26, 29, 53, .1) 1px, transparent 1px)', backgroundSize: '16px 16px' }} />
    
    {/* Holographic scanning effect */}
    <div className={`absolute top-0 left-0 right-0 h-1 bg-white opacity-30 blur-sm animate-[scanLine_4s_ease-in-out_infinite]`}></div>
    
    <div className="relative z-10 flex flex-col items-center justify-between h-full text-center">
      {isAbilityView ? (
        children
      ) : (
        <>
          <div className="text-white">
            <h3 className="text-xs font-black tracking-[0.4em] uppercase opacity-80 mb-10">
              {type === 'truth' ? '— THE HONEST TRUTH —' : '— THE WILD DARE —'}
            </h3>
            <div className="text-7xl mb-8">
              {type === 'truth' ? '📖' : '⚡'}
            </div>
            <p className="text-4xl font-medium leading-relaxed italic text-white/95">
              "{text}"
            </p>
          </div>
          {children}
        </>
      )}
    </div>
  </div>
);


function UpgradedFateCardGame() {
  // === PLAYER & ABILITY CONFIG ===
  const PLAYER_NAME = "Unknown Player"; // Placeholder, can be dynamically set
  const INITIAL_LIVES = 3;
  const ABILITY_ROUND_FREQUENCY = 3; // Get ability every 3 *completed* rounds

  // === GAME STATE ===
  const [gameState, setGameState] = useState('lobby'); // 'lobby', 'card-reveal', 'ability-reveal', 'game-over'
  const [currentChallenge, setCurrentChallenge] = useState({ type: null, text: null });
  
  // === PLAYER STATE ===
  const [playerLives, setPlayerLives] = useState(INITIAL_LIVES);
  const [abilityStock, setAbilityStock] = useState(0);
  const [completedRounds, setCompletedRounds] = useState(0);
  const [lastChallengeType, setLastChallengeType] = useState(null); // Track type for switch logic

  // Effect to grant ability stock
  useEffect(() => {
    if (completedRounds > 0 && completedRounds % ABILITY_ROUND_FREQUENCY === 0) {
      setAbilityStock(prev => prev + 1);
    }
  }, [completedRounds, ABILITY_ROUND_FREQUENCY]);


  // === GAME LOGIC ===

  // 1. Draw a random challenge (50/50 chance)
  const drawRandomChallenge = () => {
    // 50/50 Chance Logic
    const isTruth = Math.random() < 0.5;
    const type = isTruth ? 'truth' : 'dare';
    const source = isTruth ? truthCards : dareCards;
    
    const randomIndex = Math.floor(Math.random() * source.length);
    setCurrentChallenge({ type, text: source[randomIndex] });
    setGameState('card-reveal');
    setLastChallengeType(type); // Store for switch function
  };

  // 2. Use the "Switch" ability
  const useSwitchAbility = () => {
    if (abilityStock <= 0) return;
    setAbilityStock(prev => prev - 1);
    
    // Switch logic (reverse of last type)
    const newType = lastChallengeType === 'truth' ? 'dare' : 'truth';
    const source = newType === 'truth' ? truthCards : dareCards;
    const randomIndex = Math.floor(Math.random() * source.length);
    setCurrentChallenge({ type: newType, text: source[randomIndex] });
    setGameState('card-reveal'); // Go back to card reveal with the new challenge
  };

  // 3. Round completion logic
  const completeRound = (success) => {
    if (success) {
      setCompletedRounds(prev => prev + 1);
    } else {
      setPlayerLives(prev => {
        const newLives = prev - 1;
        if (newLives <= 0) {
          setGameState('game-over');
        }
        return newLives;
      });
    }

    if (gameState !== 'game-over') {
        // Option A: Check for ability grant immediately
        if (completedRounds > 0 && (completedRounds + 1) % ABILITY_ROUND_FREQUENCY === 0) {
          setGameState('ability-reveal');
        } else {
          setGameState('lobby'); // Return to lobby if not an ability turn
        }
    }
  };


  // === UI HELPER COMPONENTS ===

  const ActionButton = ({ text, onClick, variant = 'primary', className='' }) => (
    <button
      onClick={onClick}
      className={`px-8 py-3 w-max font-bold rounded-full shadow-lg transition-all duration-150 uppercase text-sm tracking-widest ${
        variant === 'primary' ? 'bg-white text-zinc-950 hover:bg-zinc-100 shadow-[0_0_10px_#ffffff55] hover:shadow-[0_0_20px_#ffffffbb] active:scale-95' :
        variant === 'secondary' ? 'bg-zinc-800 text-white hover:bg-zinc-700 active:scale-95 border border-zinc-700' :
        variant === 'ability' ? 'bg-gradient-to-br from-zinc-700 to-zinc-900 text-white border border-zinc-700 shadow-[0_0_15px_#ffffff22]' :
        ''
      } ${className}`}
    >
      {text}
    </button>
  );

  const PlayerStats = () => (
    <div className="flex flex-col items-center gap-6 text-white w-[28rem] min-h-[420px] max-w-lg p-12 bg-white/5 border border-white/10 rounded-3xl shadow-[0_0_15px_#ffffff22] animate-[cardReveal_0.5s_ease-out_forwards]">
        {/* Subtle texture */}
        <div className="absolute inset-0 bg-brand-bg opacity-30" style={{ backgroundImage: 'linear-gradient(rgba(26, 29, 53, .1) 1px, transparent 1px), linear-gradient(90deg, rgba(26, 29, 53, .1) 1px, transparent 1px)', backgroundSize: '16px 16px' }} />
        
        <div className="relative z-10 flex flex-col items-center justify-between h-full w-full">
            <div className="text-center">
                <h2 className="text-4xl font-extrabold text-white tracking-widest mb-1">{PLAYER_NAME}</h2>
                <div className="text-xs font-black text-white/60 tracking-widest uppercase">Player Stats</div>
            </div>
            
            <div className="flex flex-col items-center gap-6 w-full text-zinc-200">
                <div className="w-full h-px bg-white/10" />
                
                <div className="text-center">
                    <div className="text-xs font-black tracking-widest uppercase opacity-80 mb-1">Hearts</div>
                    <div className="text-8xl flex items-center gap-2">
                        {/* Repeat heart emoji for lives */}
                        {[...Array(playerLives)].map((_, i) => <span key={i} className="text-brand-red">❤️</span>)}
                    </div>
                </div>

                <div className="w-full h-px bg-white/10" />
                
                <div className="flex items-center gap-6 justify-center w-full">
                    <div className="text-center w-1/2 p-4 rounded-xl bg-white/5 border border-white/10">
                        <div className="text-xs font-black tracking-widest uppercase opacity-80 mb-1">ROUNDS</div>
                        <div className="text-6xl font-extrabold text-zinc-300">{completedRounds}</div>
                    </div>
                    
                    <div className="text-center w-1/2 p-4 rounded-xl bg-white/5 border border-white/10 relative group">
                        <div className="text-xs font-black tracking-widest uppercase opacity-80 mb-1">SWITCHES</div>
                        <div className="text-6xl font-extrabold text-zinc-300">{abilityStock}</div>
                        
                        {/* Inline use-ability option */}
                        {abilityStock > 0 && gameState === 'lobby' && (
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full p-2 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-zinc-950/80 rounded-xl">
                                <ActionButton text="USE FATE SWITCH" onClick={useSwitchAbility} variant="ability" />
                            </div>
                        )}
                    </div>
                </div>
            </div>
            
            <ActionButton text="GET QUESTION" onClick={drawRandomChallenge} className="mt-8 w-full" />
        </div>
    </div>
  );


  return (
    <div className="min-h-screen bg-brand-bg relative font-sans text-white overflow-hidden" style={{ backgroundImage: 'linear-gradient(rgba(26, 29, 53, .1) 1px, transparent 1px), linear-gradient(90deg, rgba(26, 29, 53, .1) 1px, transparent 1px)', backgroundSize: '24px 24px' }}>
      
      {/* Background atmospheric glows */}
      <div className="fixed inset-0 pointer-events-none opacity-20">
        <div className="absolute -top-1/4 -right-1/4 w-[1000px] h-[1000px] rounded-full bg-brand-red blur-[200px]" />
        <div className="absolute -bottom-1/4 -left-1/4 w-[1000px] h-[1000px] rounded-full bg-brand-blue blur-[200px]" />
      </div>

      <main className="flex flex-col items-center justify-center min-h-screen p-10 gap-16 relative z-10">
        
        {/* Title / Main Text */}
        {gameState !== 'game-over' && (
            <div className="text-center">
              <h2 className="text-6xl font-black text-white uppercase tracking-[0.2em] mb-4">
                THE CHOSEN <span className="text-brand-red">FATE</span>
              </h2>
              <p className="text-zinc-400 text-lg max-w-xl mx-auto">Face the 50/50 challenge or use your fate switches to alter destiny.</p>
            </div>
        )}

        {/* 1. Lobby State (Wait to draw) */}
        {gameState === 'lobby' && (
            <PlayerStats />
        )}

        {/* 2. Card Reveal State */}
        {gameState === 'card-reveal' && (
          <div className="flex flex-col items-center gap-10">
            <VirtualCardBase type={currentChallenge.type} text={currentChallenge.text}>
              <div className="mt-12 flex flex-col sm:flex-row gap-6 items-center">
                <ActionButton text="COMPLETE" onClick={() => completeRound(true)} variant="primary" />
                <ActionButton text="FAILED" onClick={() => completeRound(false)} variant="secondary" />
              </div>
            </VirtualCardBase>
            
            {/* If ability exists, allow switching *from* this view */}
            {abilityStock > 0 && (
                <button onClick={useSwitchAbility} className="text-zinc-500 text-sm hover:text-white transition-colors">
                    Alter Fate? Use 1 Switch ({abilityStock} left)
                </button>
            )}
          </div>
        )}

        {/* 3. Ability Grant State */}
        {gameState === 'ability-reveal' && (
            <VirtualCardBase isAbilityView>
                <div className="text-center">
                    <h3 className="text-xs font-black tracking-[0.4em] uppercase text-zinc-400 mb-10">— ABILITY GRANTED —</h3>
                    <div className="text-8xl mb-8">🔄</div>
                    <p className="text-4xl font-medium leading-relaxed italic text-white/95">
                        FATE SWITCH RECEIVED!
                    </p>
                    <p className="text-zinc-400 mt-4 max-w-sm">Use this switch to change your drawn Fate once per stock.</p>
                </div>
                <ActionButton text="NEXT PLAYER &gt; RETURN" onClick={() => setGameState('lobby')} className="mt-10" />
            </VirtualCardBase>
        )}

        {/* 4. Game Over State */}
        {gameState === 'game-over' && (
            <div className="flex flex-col items-center gap-10 text-center text-white border-white/10 rounded-3xl animate-[cardReveal_0.5s_ease-out_forwards]">
                <h1 className="text-9xl font-black uppercase text-brand-red">LEGEND FADED</h1>
                <p className="text-6xl font-extrabold text-white mt-10">GAME OVER</p>
                <p className="text-zinc-400 text-lg max-w-sm mx-auto mt-4">All hearts lost. Re-evaluate your fate or try again.</p>
                <ActionButton text="TRY AGAIN" onClick={() => {
                    setGameState('lobby');
                    setPlayerLives(INITIAL_LIVES);
                    setAbilityStock(0);
                    setCompletedRounds(0);
                }} className="mt-10" />
            </div>
        )}

      </main>
    </div>
  );
}

export default UpgradedFateCardGame;