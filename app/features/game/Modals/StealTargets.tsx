import { cn } from "@/app/lib/utils";
import { PlayerData } from "@/app/types/game";
import { IconWallet } from "@tabler/icons-react";
import Image from "next/image";

type StealTargetProps = {
  players: PlayerData[];
  currentPlayerId: string;
  selectTargetPlayer: (id: string) => void;
  targetPlayerId?: string | null;
};

export default function StealTargets({
  players,
  currentPlayerId,
  selectTargetPlayer,
  targetPlayerId,
}: StealTargetProps) {
  const opponents = players.filter(
    (player) => player.profile.id !== currentPlayerId,
  );

  return (
    <div className="flex gap-6">
      {opponents.map((player) => {
        const profile = player.profile;
        return (
          <button
            type="button"
            key={profile.id}
            disabled={player.coins < 1}
            className={cn(
              "items-center gap-4 bg-teal-800/70 p-4 rounded-2xl border-2",
              "text-center cursor-pointer hover:bg-cyan-700",
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
            onClick={() => selectTargetPlayer(profile.id)}
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
          </button>
        );
      })}
    </div>
  );
}
