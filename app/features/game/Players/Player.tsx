import { cn } from "@/app/lib/utils";
import { PendingAction, PlayerData } from "@/app/types/game";
import ChallengeTimer from "../Actions/ChallengeTimer";
import ReactionsBar from "../Actions/ReactionsBar";
import RoleCard from "../RoleCard";
import Profile from "./Profile";

type PlayerProps = {
  player: PlayerData;
  active?: boolean;
  currentPlayerId: string;
  pendingAction?: PendingAction | null;
  responderPlayerId?: string;
  allowAction: () => void;
  challengeAction: (challengerId: string) => void;
};

export default function Player({
  player,
  currentPlayerId,
  pendingAction,
  responderPlayerId,
  allowAction,
  challengeAction,
}: PlayerProps) {
  const activePlayer = currentPlayerId === player.profile.id;
  const isResponderPlayer =
    (pendingAction?.targetPlayerId ?? responderPlayerId) === player.profile.id;

  return (
    <div
      className={cn(
        "rounded-2xl border p-4 shadow-lg",
        activePlayer
          ? "border-yellow-300 bg-teal-800/70"
          : "border-cyan-400/30 bg-teal-900/60",
      )}
    >
      <Profile player={player} />

      <div className="mt-4 flex justify-left gap-4">
        {player.cards.map((card) => (
          <RoleCard key={card.id} card={card} size="small" />
        ))}
      </div>

      {!activePlayer && pendingAction?.phase === "awaiting" && (
        <>
          <ReactionsBar
            isResponderPlayer={isResponderPlayer}
            onAllow={allowAction}
            onChallenge={() => challengeAction(player.profile.id)}
          />
          <ChallengeTimer key={pendingAction.id} onTimeout={allowAction} />
        </>
      )}
    </div>
  );
}
