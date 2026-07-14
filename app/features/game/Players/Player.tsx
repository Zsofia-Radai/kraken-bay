import { cn } from "@/app/lib/utils";
import { PendingAction, PlayerData } from "@/app/types/game";
import { IconWallet } from "@tabler/icons-react";
import Image from "next/image";
import ChallengeTimer from "../Actions/ChallengeTimer";
import ReactionsBar from "../Actions/ReactionsBar";
import RoleCard from "../RoleCard";

type PlayerProps = {
  playerData: PlayerData;
  active?: boolean;
  currentPlayerId: string;
  pendingAction?: PendingAction | null;
  responderPlayerId?: string;
  allowAction: () => void;
};

export default function Player({
  playerData: { profile: player, coins, cards },
  currentPlayerId,
  pendingAction,
  responderPlayerId,
  allowAction,
}: PlayerProps) {
  const activePlayer = currentPlayerId === player.id;
  const isResponderPlayer =
    (pendingAction?.targetPlayerId ?? responderPlayerId) === player.id;

  return (
    <div
      className={cn(
        "rounded-2xl border p-4 shadow-lg",
        activePlayer
          ? "border-yellow-300 bg-teal-800/70"
          : "border-cyan-400/30 bg-teal-900/60",
      )}
    >
      <div className="flex items-center gap-4">
        <div className="h-20 w-20 relative rounded-full border-4 border-yellow-400 bg-slate-200">
          <Image
            src={player.avatar}
            alt={player.name}
            fill
            sizes="80px"
            className="cover"
          />
        </div>

        <div className="flex-1">
          <h2 className="text-xl font-bold">{player.name}</h2>
          <div className="mt-1 flex items-center gap-2">
            <IconWallet className="h-5 w-5 text-cyan-200" />
            <p className="text-cyan-100 font-semibold">{coins} coins</p>
          </div>
        </div>
      </div>

      <div className="mt-4 flex justify-left gap-4">
        {cards.map((card) => (
          <RoleCard key={card.id} card={card} size="small" />
        ))}
      </div>

      {!activePlayer && pendingAction?.phase === "awaiting" && (
        <>
          <ReactionsBar
            isResponderPlayer={isResponderPlayer}
            onAllow={allowAction}
          />
          <ChallengeTimer key={pendingAction.id} onTimeout={allowAction} />
        </>
      )}
    </div>
  );
}
