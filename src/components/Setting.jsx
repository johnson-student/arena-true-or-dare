import {useState} from "react";

export default function Setting({
  lives,
  setLives,
  abilities,
  setAbilities,
  spintime,
  setSpintime,
  setDareCards,
  setTruthCards,
  onClose
}) {

  const [newQuestion, setNewQuestion] = useState("");
  const [cardType, setCardType] = useState("truth");

  const handleAddQuestion = () => {
    if (!newQuestion.trim()) return;
    if (cardType === "truth") { 
      setTruthCards(prev => [...prev, newQuestion.trim()]);
    } else {
      setDareCards(prev => [...prev, newQuestion.trim()]);
    }
    setNewQuestion("");
    // Optional: Show success message
    alert(`New ${cardType} card added: "${newQuestion.trim()}"`);
    console.log(`Added new ${cardType} question:`, newQuestion.trim());
    
  };


  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <div className="bg-[#0c0c1e] w-[350px] p-6 rounded-xl border border-blue-500/30 shadow-[0_0_40px_rgba(59,130,246,0.2)] text-center">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">⚙️ Settings</h2>
          <button onClick={onClose} className="text-red-400 hover:text-red-300 transition">✕</button>
        </div>

        {/* Lives */}
        <p className="mb-2 text-gray-300">
          Lives: <span className="text-white font-bold">{lives}</span>
        </p>
        <input
          type="range"
          min="1"
          max="5"
          value={lives}
          onChange={(e) => setLives(Number(e.target.value))}
          className="w-full mb-4 accent-red-500 cursor-pointer"
        />
        <div className="text-xl mb-6">
          {"❤️".repeat(lives)}
        </div>

        {/* Abilities */}
        <p className="mb-2 text-gray-300">
          Abilities: <span className="text-white font-bold">{abilities}</span>
        </p>
        <input
          type="range"
          min="1"
          max="5"
          value={abilities}
          onChange={(e) => setAbilities(Number(e.target.value))}
          className="w-full mb-4 accent-purple-500 cursor-pointer"
        />
        <div className="text-xl">
          {"⚡".repeat(abilities)}
        </div>
        <p className="mb-2 text-gray-300">
          Spintime: <span className="text-white font-bold">{spintime} ms</span>
        </p>
        <input
          type="range"
          min="1000"
          max="10000"
          step="1000"
          value={spintime}
          onChange={(e) => setSpintime(Number(e.target.value))}
          className="w-full mb-4 accent-blue-500 cursor-pointer"
        />


        <div className="text-gray-300 mb-2 font-bold">Add Question..!</div>
        <input type="radio" name="cardType" value="truth" checked={cardType === "truth"} onChange={() => setCardType("truth")} />
        <label className="text-gray-300 mr-4">Truth</label>
        <input type="radio" name="cardType" value="dare" checked={cardType === "dare"} onChange={() => setCardType("dare")} />
        <label className="text-gray-300 mr-4">Dare</label>

        <input
          type="text"
          value={newQuestion}
          onChange={(e) => setNewQuestion(e.target.value)}
          placeholder="Add a new card phrase..."
          className="bg-[#0c0c1e] border border-blue-500/30 placeholder:text-gray-500 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleAddQuestion}
          disabled={!newQuestion.trim()}
          className={`mt-2 font-bold py-2 px-4 rounded transition-all ${
            !newQuestion.trim() 
              ? "bg-gray-600 text-gray-400 cursor-not-allowed opacity-60" 
              : "bg-blue-500 hover:bg-blue-600 text-white cursor-pointer hover:scale-105"
          }`}
        >
          Add Card
        </button>

        {newQuestion && (
          <p className="text-gray-300 mt-2">
            New question added: <span className="text-white">{newQuestion}</span> to {cardType === "truth" ? "Truth Cards" : "Dare Cards"}
          </p>
        )}
      </div>
    </div>
  );
}