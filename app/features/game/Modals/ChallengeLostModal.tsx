import { cn } from "@/app/lib/utils";
import { GameState, PlayerData } from "@/app/types/game";
import { IconSkull } from "@tabler/icons-react";
import { useState } from "react";
import RoleCard from "../RoleCard";
import { revealInfluence } from "../GameLogic";

type ChallengeLostModalProps = {
  player: PlayerData;
  isFatal?: boolean;
  onReveal: (cardId: string) => void;
  gameState: GameState;
  setGameState: React.Dispatch<React.SetStateAction<GameState>>;
};

export default function ChallengeLostModal({
  player,
  isFatal,
  onReveal,
  gameState,
  setGameState,
}: ChallengeLostModalProps) {
  const [targetCardId, setTargetCardId] = useState(player.cards[0].id);
  const isResolvingFatal =
    gameState.pendingAction?.actionId === "assassinate" &&
    gameState.pendingAction.phase === "fatal";
  const fatalAssassinationCard =
    gameState.pendingAction?.phase === "fatal"
      ? gameState.players
          .find(
            (player) =>
              player.profile.id === gameState.pendingAction?.targetPlayerId,
          )
          ?.cards.find((card) => !card.revealed)
      : undefined;

  const handleConfirm = () => {
    if (!targetCardId || isResolvingFatal) return;

    onReveal(targetCardId);
  };

  const closeFatalChallenge = () => {
    setGameState((prev) => ({
      ...prev,
      pendingChallenge: null,
      pendingAction: null,
    }));
  };

  const confirmFatalAssassination = (cardId: string) => {
    setGameState((prev) => {
      if (
        prev.pendingAction?.actionId !== "assassinate" ||
        prev.pendingAction.phase !== "fatal"
      ) {
        return prev;
      }

      const eliminatedState = revealInfluence(prev, cardId);

      return {
        ...eliminatedState,
        pendingChallenge: null,
        pendingAction: null,
      };
    });
  };

  return (
    <div className="w-full fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
      <div className="max-w-3xl min-w-[500px] rounded-2xl border border-cyan-400/30 bg-slate-950 p-10 shadow-2xl">
        <header className="mb-6 text-center">
          <h2 className="text-2xl font-bold text-cyan-100">
            {isResolvingFatal
              ? "The assassination still succeeds"
              : "Choose an influence to reveal"}
          </h2>
        </header>
        <div className={cn("mt-4 grid grid-cols-2 gap-3")}>
          {player.cards.map((card) => {
            const isRevealed = card.revealed;
            const isSelected = targetCardId === card.id;
            return (
              <button
                onClick={() => setTargetCardId(card.id)}
                type="button"
                key={card.id}
                className={cn(
                  "relative group",
                  card.revealed ? "cursor-default" : "cursor-pointer",
                )}
                disabled={card.revealed}
              >
                <RoleCard
                  card={card}
                  size="medium"
                  selected={targetCardId === card.id}
                  isVisible={true}
                  isBeingEliminated={
                    isResolvingFatal && card.id === fatalAssassinationCard?.id
                  }
                  onEliminationAnimationEnd={() => {
                    console.log("confirm fatal", card.id);
                    confirmFatalAssassination(card.id);
                  }}
                />

                <div
                  className={cn(
                    "absolute inset-0 flex items-center justify-center transition-all duration-200 ease-out",
                    isRevealed || isSelected
                      ? "opacity-100 scale-100"
                      : "opacity-0 scale-75 group-hover:opacity-100 group-hover:scale-100",
                  )}
                >
                  {isRevealed && (
                    <IconSkull className="h-10 w-10 text-white drop-shadow-lg" />
                  )}

                  {isRevealed && (
                    <div className="absolute inset-0 bg-black/35" />
                  )}
                </div>
              </button>
            );
          })}
        </div>

        <footer className="mt-8 flex justify-between gap-3">
          <button
            type="button"
            onClick={isResolvingFatal ? closeFatalChallenge : handleConfirm}
            className="
              rounded-lg bg-cyan-500 px-4 py-2 
              font-bold text-slate-950 disabled:cursor-not-allowed 
              disabled:opacity-40 cursor-pointer hover:bg-cyan-600"
          >
            {isResolvingFatal ? "OK" : "Confirm"}
          </button>
        </footer>
      </div>
    </div>
  );
}
