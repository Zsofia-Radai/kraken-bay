import { cn } from "@/app/lib/utils";
import { PlayerData } from "@/app/types/game";
import { IconSkull, IconWallet } from "@tabler/icons-react";
import Image from "next/image";
import RoleCard from "../RoleCard";

type TargetSelectorProps = {
  players: PlayerData[];
  currentPlayerId: string;
  onSelectTarget: (playerId: string) => void;
  targetPlayerId?: string | null;
};

export default function TargetSelector({
  players,
  currentPlayerId,
  onSelectTarget,
  targetPlayerId,
}: TargetSelectorProps) {
  const opponents = players.filter(
    (player) => player.profile.id !== currentPlayerId,
  );
  return (
    <div className="flex gap-3">
      {opponents.map((player) => {
        const profile = player.profile;
        return (
          <button
            type="button"
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
              targetPlayerId === profile.id
                ? "bg-cyan-700 border-slate-100 border-2"
                : "",
            )}
            onClick={() => {
              onSelectTarget(profile.id);
            }}
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

            <div className={cn("mt-4 flex justify-center gap-2")}>
              {player.cards.map((card) => {
                const isRevealed = card.revealed;
                return (
                  <div key={card.id} className="relative">
                    <RoleCard card={card} size="small" />

                    <div
                      className={cn(
                        "pointer-events-none absolute inset-0 flex items-center justify-center transition-all duration-200 ease-out",
                        isRevealed
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
                  </div>
                );
              })}
            </div>
          </button>
        );
      })}
    </div>
  );
}
