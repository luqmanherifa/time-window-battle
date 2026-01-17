import { useState, useEffect } from "react";
import { getRandomColorPair } from "../utils/player";

export default function LoginForm({ onLogin, existingName }) {
  const [playerName, setPlayerName] = useState("");
  const [isRenaming, setIsRenaming] = useState(false);
  const [colors] = useState(getRandomColorPair());

  useEffect(() => {
    if (existingName) {
      setPlayerName(existingName);
    }
  }, [existingName]);

  const handleSubmit = () => {
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
        <div className="space-y-6">
          <div>
            <input
              type="text"
              placeholder="Masukkan nama"
              value={playerName}
              onChange={(e) => setPlayerName(e.target.value)}
              disabled={existingName && !isRenaming}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSubmit();
              }}
              className={`w-full px-6 py-5 text-xl border-2 border-gray-300 rounded-2xl focus:border-gray-800 outline-none ${
                existingName && !isRenaming ? "bg-gray-100 text-gray-700" : ""
              }`}
            />
          </div>

          {existingName && !isRenaming ? (
            <div className="space-y-3">
              <button
                onClick={handleSubmit}
                className={`w-full ${colors.primary} text-white py-5 rounded-2xl font-bold text-xl`}
              >
                Lanjut
              </button>
              <button
                onClick={() => setIsRenaming(true)}
                className="w-full bg-gray-500 text-white py-5 rounded-2xl font-bold text-xl"
              >
                Ganti Nama
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              <button
                onClick={handleSubmit}
                className={`w-full ${colors.primary} text-white py-5 rounded-2xl font-bold text-xl`}
              >
                {existingName && isRenaming ? "Simpan Nama Baru" : "Lanjut"}
              </button>
              {existingName && isRenaming && (
                <button
                  onClick={() => {
                    setPlayerName(existingName);
                    setIsRenaming(false);
                  }}
                  className="w-full bg-gray-300 text-gray-700 py-5 rounded-2xl font-bold text-xl"
                >
                  Batal
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
