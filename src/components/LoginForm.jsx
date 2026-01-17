import { useState } from "react";
import { getRandomColorPair } from "../utils/player";

export default function LoginForm({ onLogin }) {
  const [playerName, setPlayerName] = useState("");
  const [colors] = useState(getRandomColorPair());

  const handleSubmit = (e) => {
    e.preventDefault();
    if (playerName.trim()) {
      onLogin(playerName.trim());
    }
  };

  return (
    <div className="h-screen bg-white flex flex-col justify-center p-6">
      <div className="flex-1 flex flex-col justify-center">
        <h1 className={`text-5xl font-bold ${colors.text} mb-3 text-center`}>
          Trivia Game
        </h1>
        <p className="text-gray-600 text-xl mb-12 text-center">
          Ayo main kuis bareng teman-teman!
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <input
              type="text"
              placeholder="Masukkan nama"
              value={playerName}
              onChange={(e) => setPlayerName(e.target.value)}
              className="w-full px-6 py-5 text-xl border-2 border-gray-300 rounded-2xl focus:border-gray-800 outline-none"
            />
          </div>
          <button
            type="submit"
            className={`w-full ${colors.primary} text-white py-5 rounded-2xl font-bold text-xl`}
          >
            Lanjut
          </button>
        </form>
      </div>
    </div>
  );
}
