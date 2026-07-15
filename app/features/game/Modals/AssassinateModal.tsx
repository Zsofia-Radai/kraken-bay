import { PlayerData } from "@/app/types/game";
import { useState } from "react";
import Profile from "../Players/Profile";
import InfluenceCardSelector from "./InfluenceCardSelector";

type AssassinateModalProps = {
  onConfirm: (targetCardId: string) => void;
  player: PlayerData;
};

export default function AssassinateModal({
  onConfirm,
  player,
}: AssassinateModalProps) {
  const [targetCardId, setTargetCardId] = useState<string>(player.cards[0].id);
  return (
    <div className="w-full fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
      <div className="max-w-3xl min-w-[500px] rounded-2xl border border-cyan-400/30 bg-slate-950 p-10 shadow-2xl">
        <div className="flex flex-col items-center gap-1 bg-teal-800/70 p-4 rounded-2xl border-2">
          <Profile player={player} />

          <InfluenceCardSelector
            cards={player.cards}
            selectedCardId={targetCardId}
            onSelectCard={setTargetCardId}
          />
        </div>

        <footer className="mt-8 flex justify-end gap-3">
          <button
            type="button"
            onClick={() => onConfirm(targetCardId)}
            className="rounded-lg bg-cyan-500 px-4 py-2 font-bold text-slate-950 disabled:cursor-not-allowed disabled:opacity-40 cursor-pointer hover:bg-cyan-600"
          >
            Confirm
          </button>
        </footer>
      </div>
    </div>
  );
}
