import { useState } from "react";

export default function RoomSelector({ playerName, onCreateRoom, onJoinRoom }) {
  const [roomCode, setRoomCode] = useState("");
  const [roomName, setRoomName] = useState("");
  const [createRoomCode, setCreateRoomCode] = useState("");
  const [errorCreate, setErrorCreate] = useState("");
  const [errorJoin, setErrorJoin] = useState("");

  const handleCreateRoom = () => {
    setErrorCreate("");

    if (!roomName.trim()) {
      setErrorCreate("Nama ruangan tidak boleh kosong");
      return;
    }

    if (!createRoomCode.trim()) {
      setErrorCreate("Kode ruangan tidak boleh kosong");
      return;
    }

    if (createRoomCode.trim().length < 4) {
      setErrorCreate("Kode ruangan minimal 4 karakter");
      return;
    }

    onCreateRoom(roomName.trim(), createRoomCode.trim().toUpperCase());
  };

  const handleJoinRoom = () => {
    setErrorJoin("");

    if (!roomCode.trim()) {
      setErrorJoin("Kode ruangan tidak boleh kosong");
      return;
    }

    onJoinRoom(roomCode.trim().toUpperCase());
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
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Nama ruangan"
                value={roomName}
                onChange={(e) => {
                  setRoomName(e.target.value);
                  setErrorCreate("");
                }}
                className="w-full px-6 py-5 text-xl border-2 border-gray-300 rounded-2xl focus:border-gray-800 outline-none"
              />
              <input
                type="text"
                placeholder="Kode ruangan (min. 4 karakter)"
                value={createRoomCode}
                onChange={(e) => {
                  setCreateRoomCode(e.target.value);
                  setErrorCreate("");
                }}
                className="w-full px-6 py-5 text-xl border-2 border-gray-300 rounded-2xl uppercase focus:border-gray-800 outline-none"
              />
              {errorCreate && (
                <p className="text-red-500 text-sm px-2">{errorCreate}</p>
              )}
              <button
                onClick={handleCreateRoom}
                className="w-full bg-purple-500 text-white py-5 rounded-2xl font-bold text-xl"
              >
                Buat Ruangan
              </button>
            </div>
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
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Kode ruangan"
                value={roomCode}
                onChange={(e) => {
                  setRoomCode(e.target.value);
                  setErrorJoin("");
                }}
                className="w-full px-6 py-5 text-xl border-2 border-gray-300 rounded-2xl uppercase focus:border-gray-800 outline-none"
              />
              {errorJoin && (
                <p className="text-red-500 text-sm px-2">{errorJoin}</p>
              )}
              <button
                onClick={handleJoinRoom}
                className="w-full bg-pink-500 text-white py-5 rounded-2xl font-bold text-xl"
              >
                Gabung
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
