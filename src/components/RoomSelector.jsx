import { useState } from "react";

export default function RoomSelector({ playerName, onCreateRoom, onJoinRoom }) {
  const [roomCode, setRoomCode] = useState("");
  const [roomName, setRoomName] = useState("");

  const handleCreateRoom = (e) => {
    e.preventDefault();
    if (roomName.trim()) {
      onCreateRoom(roomName.trim());
    }
  };

  const handleJoinRoom = (e) => {
    e.preventDefault();
    if (roomCode.trim()) {
      onJoinRoom(roomCode.trim().toUpperCase());
    }
  };

  return (
    <div className="h-screen bg-white flex flex-col p-6">
      <div className="flex-1 flex flex-col justify-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">
          Halo, {playerName}!
        </h2>
        <p className="text-gray-600 text-lg mb-10">
          Pilih untuk buat atau gabung ruangan
        </p>

        <div className="space-y-8">
          <div>
            <h3 className="text-xl font-bold text-gray-800 mb-4">
              Buat Ruangan Baru
            </h3>
            <form onSubmit={handleCreateRoom} className="space-y-4">
              <input
                type="text"
                placeholder="Nama ruangan"
                value={roomName}
                onChange={(e) => setRoomName(e.target.value)}
                className="w-full px-6 py-5 text-xl border-2 border-gray-300 rounded-2xl focus:border-gray-800 outline-none"
              />
              <button
                type="submit"
                className="w-full bg-purple-500 text-white py-5 rounded-2xl font-bold text-xl"
              >
                Buat Ruangan
              </button>
            </form>
          </div>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t-2 border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-lg">
              <span className="px-4 bg-white text-gray-500 font-medium">
                atau
              </span>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold text-gray-800 mb-4">
              Gabung Ruangan
            </h3>
            <form onSubmit={handleJoinRoom} className="space-y-4">
              <input
                type="text"
                placeholder="Kode ruangan"
                value={roomCode}
                onChange={(e) => setRoomCode(e.target.value)}
                className="w-full px-6 py-5 text-xl border-2 border-gray-300 rounded-2xl uppercase focus:border-gray-800 outline-none"
                maxLength={6}
              />
              <button
                type="submit"
                className="w-full bg-pink-500 text-white py-5 rounded-2xl font-bold text-xl"
              >
                Gabung
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
