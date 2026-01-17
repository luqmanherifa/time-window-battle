import { useState, useEffect } from "react";
import {
  doc,
  setDoc,
  onSnapshot,
  collection,
  getDoc,
} from "firebase/firestore";
import { db } from "./firebase";
import {
  getPlayerData,
  savePlayerData,
  generateRoomCode,
} from "./utils/player";
import { useGameLogic } from "./hooks/useGameLogic";
import LoginForm from "./components/LoginForm";
import RoomSelector from "./components/RoomSelector";
import WaitingRoom from "./components/WaitingRoom";
import GameFinished from "./components/GameFinished";
import PlayingGame from "./components/PlayingGame";
import Leaderboard from "./components/Leaderboard";

export default function App() {
  const [playerName, setPlayerName] = useState(null);
  const [roomCode, setRoomCode] = useState(null);
  const [isGameMaster, setIsGameMaster] = useState(false);
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const [leaderboardData, setLeaderboardData] = useState([]);

  const {
    room,
    onlinePlayers,
    timeLeft,
    answered,
    startGame,
    resetRoom,
    answer,
  } = useGameLogic(roomCode, playerName);

  useEffect(() => {
    const data = getPlayerData();
    if (data) {
      setPlayerName(data.name);
    }
  }, []);

  useEffect(() => {
    return onSnapshot(collection(db, "playerStats"), (snap) => {
      setLeaderboardData(
        snap.docs.map((d) => ({
          id: d.id,
          ...d.data(),
        })),
      );
    });
  }, []);

  const handleLogin = (name) => {
    setPlayerName(name);
    savePlayerData({ name });
  };

  const handleCreateRoom = async (roomName) => {
    const code = generateRoomCode();

    await setDoc(doc(db, "rooms", code), {
      code: code,
      roomName: roomName,
      gameMaster: playerName,
      status: "waiting",
      currentQuestion: 0,
      questionStartAt: null,
      createdAt: Date.now(),
    });

    setRoomCode(code);
    setIsGameMaster(true);
  };

  const handleJoinRoom = async (code) => {
    try {
      const roomRef = doc(db, "rooms", code);
      const roomSnap = await getDoc(roomRef);

      if (!roomSnap.exists()) {
        alert("Ruangan tidak ditemukan!");
        return;
      }

      setRoomCode(code);
      setIsGameMaster(false);
    } catch (error) {
      console.error("Error joining room:", error);
      alert("Gagal gabung ruangan. Cek kode dan coba lagi.");
    }
  };

  const leaveRoom = () => {
    setRoomCode(null);
    setIsGameMaster(false);
  };

  if (showLeaderboard) {
    return (
      <Leaderboard
        players={leaderboardData}
        onBack={() => setShowLeaderboard(false)}
      />
    );
  }

  if (!playerName) {
    return <LoginForm onLogin={handleLogin} />;
  }

  if (!roomCode) {
    return (
      <div className="h-screen bg-white flex flex-col">
        <div className="flex-1">
          <RoomSelector
            playerName={playerName}
            onCreateRoom={handleCreateRoom}
            onJoinRoom={handleJoinRoom}
          />
        </div>
        <div className="p-6">
          <button
            onClick={() => setShowLeaderboard(true)}
            className="w-full bg-green-500 text-white py-5 rounded-2xl font-bold text-xl"
          >
            🏆 Lihat Leaderboard
          </button>
        </div>
      </div>
    );
  }

  if (!room) {
    return (
      <div className="h-screen bg-white flex items-center justify-center">
        <p className="text-gray-600 text-xl">Memuat ruangan...</p>
      </div>
    );
  }

  if (room.status === "waiting") {
    return (
      <WaitingRoom
        room={room}
        onlinePlayers={onlinePlayers}
        playerName={playerName}
        startGame={startGame}
        isGameMaster={isGameMaster}
        leaveRoom={leaveRoom}
      />
    );
  }

  if (room.status === "finished") {
    return (
      <GameFinished
        onlinePlayers={onlinePlayers}
        playerName={playerName}
        resetRoom={resetRoom}
        isGameMaster={isGameMaster}
        leaveRoom={leaveRoom}
      />
    );
  }

  return (
    <PlayingGame
      room={room}
      onlinePlayers={onlinePlayers}
      playerName={playerName}
      timeLeft={timeLeft}
      answered={answered}
      answer={answer}
    />
  );
}
