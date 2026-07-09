import { cn } from "@/app/lib/utils";
import { PlayerData } from "@/app/types/game";
import { IconSkull, IconTarget, IconWallet } from "@tabler/icons-react";
import Image from "next/image";
import { useState } from "react";
import RoleCard from "./RoleCard";

type AssassinateModalProps = {
  onConfirm: (targetCardId: string) => void;
  isOpen: boolean;
  players: PlayerData[];
  currentPlayerId: string;
  closeModal: () => void;
};

export default function AssassinateModal({
  onConfirm,
  isOpen,
  players,
  currentPlayerId,
  closeModal,
}: AssassinateModalProps) {
  const [targetCardId, setTargetCardId] = useState<string | null>(null);
  const opponents = players.filter(
    (player) => player.profile.id !== currentPlayerId,
  );

  if (!isOpen) return null;

  return (
    <div className="w-full fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
      <div className="max-w-3xl rounded-2xl border border-cyan-400/30 bg-slate-950 p-6 shadow-2xl">
        <header className="mb-6 text-center">
          <h2 className="text-2xl font-bold text-cyan-100">
            Assassinate an influence
          </h2>
          <p className="mt-2 text-sm text-slate-300">
            Choose a card to reveal.
          </p>
        </header>

        <div className="flex gap-6">
          {opponents.map((player) => {
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
                          size="small"
                          selected={targetCardId === card.id}
                        />

                        <div
                          className={cn(
                            "absolute inset-0 flex items-center justify-center transition-all duration-200 ease-out",
                            isRevealed || isSelected
                              ? "opacity-100 scale-100"
                              : "opacity-0 scale-75 group-hover:opacity-100 group-hover:scale-100",
                          )}
                        >
                          {isRevealed ? (
                            <IconSkull className="h-10 w-10 text-white drop-shadow-lg" />
                          ) : (
                            <IconTarget className="h-10 w-10 text-red-600 drop-shadow-lg" />
                          )}

                          {isRevealed && (
                            <div className="absolute inset-0 bg-black/35" />
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        <footer className="mt-8 flex justify-end gap-3">
          <button
            type="button"
            onClick={() => {
              setTargetCardId(null);
              closeModal();
            }}
            className="rounded-lg bg-slate-800 px-4 py-2 text-slate-200 hover:bg-slate-700 cursor-pointer"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={() => {
              if (!targetCardId) return;
              onConfirm(targetCardId);
              setTargetCardId(null);
            }}
            className="rounded-lg bg-cyan-500 px-4 py-2 font-bold text-slate-950 disabled:cursor-not-allowed disabled:opacity-40 cursor-pointer hover:bg-cyan-600"
          >
            Confirm Kill
          </button>
        </footer>
      </div>
    </div>
  );
}
