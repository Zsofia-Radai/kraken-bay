import { cn } from "@/app/lib/utils";
import { PlayerData } from "@/app/types/game";
import { IconSkull, IconWallet } from "@tabler/icons-react";
import Image from "next/image";
import { useState } from "react";
import RoleCard from "../RoleCard";
import InfluenceCardSelector from "./InfluenceCardSelector";

type WalkThePlankModalProps = {
  players: PlayerData[];
  onConfirm: (targetCardId: string) => void;
  onCancel: () => void;
};

export default function WalkThePlankModal({
  players,
  onConfirm,
  onCancel,
}: WalkThePlankModalProps) {
  const [targetCardId, setTargetCardId] = useState<string | null>(null);
  return (
    <div className="w-full fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
      <div className="max-w-[800px] rounded-2xl border border-cyan-400/30 bg-slate-950 p-10 shadow-2xl">
        <div className="flex gap-6">
          {players.map((player) => {
            const profile = player.profile;
            return (
              <div
                key={profile.id}
                className={cn(
                  "items-center gap-1 bg-teal-800/70 p-4 rounded-2xl border-2",
                  "flex flex-col items-center text-center",
                  "text-center cursor-pointer",
                  "disabled:cursor-not-allowed",
                  "disabled:bg-gray-600",
                  "disabled:border-gray-500",
                  "disabled:text-gray-400",
                  "disabled:hover:bg-gray-600",
                  "disabled:opacity-50",
                )}
              >
                <div className="h-24 w-24 relative rounded-full border-4 border-yellow-400 bg-slate-200">
                  <Image
                    src={profile.avatar}
                    alt={profile.name}
                    fill
                    sizes="80px"
                    className="object-cover"
                  />
                </div>

                <div className="flex-1">
                  <h2 className="text-xl font-bold">{profile.name}</h2>
                  <div className="flex items-center gap-2 text-center">
                    <IconWallet className="h-5 w-5 text-cyan-200" />
                    <p className="text-cyan-100 font-semibold">
                      {player.coins} coins
                    </p>
                  </div>
                </div>

                <InfluenceCardSelector
                  cards={player.cards}
                  selectedCardId={targetCardId}
                  onSelectCard={setTargetCardId}
                />
              </div>
            );
          })}
        </div>

        <footer className="mt-8 flex justify-end gap-3">
          <button
            type="button"
            onClick={onCancel}
            className="rounded-lg bg-slate-800 px-4 py-2 text-slate-200 hover:bg-slate-700 cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="button"
            disabled={!targetCardId}
            onClick={() => {
              if (!targetCardId) return;
              onConfirm(targetCardId);
            }}
            className="rounded-lg bg-cyan-500 px-4 py-2 font-bold text-slate-950 disabled:cursor-not-allowed disabled:opacity-40 cursor-pointer hover:bg-cyan-600"
          >
            Confirm
          </button>
        </footer>
      </div>
    </div>
  );
}
