export default function Leaderboard({ players, onBack }) {
  const sortedPlayers = [...players].sort((a, b) => b.totalWins - a.totalWins);

  return (
    <div className="h-screen bg-white flex flex-col p-6">
      <div className="flex-1 flex flex-col">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">
          Leaderboard Global
        </h2>

        <div className="flex-1 overflow-hidden flex flex-col">
          <div className="flex-1 overflow-y-auto space-y-3 mb-6">
            {sortedPlayers.map((player, index) => (
              <div
                key={player.id}
                className={`rounded-2xl p-5 ${
                  index === 0
                    ? "bg-yellow-400"
                    : index === 1
                      ? "bg-gray-300"
                      : index === 2
                        ? "bg-orange-300"
                        : "bg-gray-50"
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-4">
                    <span
                      className={`text-3xl font-bold ${
                        index < 3 ? "text-white" : "text-gray-400"
                      }`}
                    >
                      #{index + 1}
                    </span>
                    <span
                      className={`font-bold text-lg ${
                        index < 3 ? "text-white" : "text-gray-800"
                      }`}
                    >
                      {player.name}
                    </span>
                  </div>
                  <span
                    className={`text-2xl font-bold ${
                      index < 3 ? "text-white" : "text-gray-800"
                    }`}
                  >
                    🏆 {player.totalWins}
                  </span>
                </div>
                <div
                  className={`text-sm ${
                    index < 3 ? "text-white" : "text-gray-600"
                  }`}
                >
                  {player.gamesPlayed} game •{" "}
                  {new Date(player.lastPlayed).toLocaleDateString("id-ID")}
                </div>
              </div>
            ))}
          </div>

          {sortedPlayers.length === 0 && (
            <div className="flex-1 flex items-center justify-center text-gray-500 text-lg">
              Belum ada data pemain
            </div>
          )}
        </div>

        <button
          onClick={onBack}
          className="w-full bg-gray-800 text-white py-5 rounded-2xl font-bold text-xl"
        >
          Kembali
        </button>
      </div>
    </div>
  );
}
