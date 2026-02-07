import DontBlinkGame from "./DontBlinkGame";
import HoldBreakGame from "./HoldBreakGame";
import HoldBreakPhaseResult from "./HoldBreakPhaseResult";

export default function PlayingGame({
  room,
  onlinePlayers,
  playerName,
  timeLeft,
  answered,
  shuffledQuestions,
  answer,
  nextPhase,
}) {
  if (room.gameMode === "dontblink") {
    return (
      <DontBlinkGame
        room={room}
        onlinePlayers={onlinePlayers}
        playerName={playerName}
        timeLeft={timeLeft}
        answered={answered}
        shuffledQuestions={shuffledQuestions}
        answer={answer}
      />
    );
  }

  if (room.gameMode === "holdbreak") {
    if (room.status === "phaseResult") {
      return (
        <HoldBreakPhaseResult
          onlinePlayers={onlinePlayers}
          playerName={playerName}
          onNextPhase={nextPhase}
        />
      );
    }

    return (
      <HoldBreakGame
        room={room}
        onlinePlayers={onlinePlayers}
        playerName={playerName}
      />
    );
  }

  return null;
}
