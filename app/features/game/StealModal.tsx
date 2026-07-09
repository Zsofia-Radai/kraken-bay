import { cn } from "@/app/lib/utils";
import { PlayerData } from "@/app/types/game";
import { IconWallet } from "@tabler/icons-react";
import Image from "next/image";

type StealModalProps = {
  isOpen: boolean;
  players: PlayerData[];
  currentPlayerId: string;
  selectTargetPlayer: (id: string) => void;
  targetPlayerId: string | null;
  onConfirm: () => void;
  onCancel: () => void;
};

export default function StealModal({
  isOpen,
  players,
  currentPlayerId,
  selectTargetPlayer,
  targetPlayerId,
  onConfirm,
  onCancel,
}: StealModalProps) {
  const opponents = players.filter(
    (player) => player.profile.id !== currentPlayerId,
  );

  if (!isOpen) return null;

  return (
    <div className="w-full fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
      <div
        className="
            max-w-3xl rounded-2xl border 
            border-cyan-400/30 bg-slate-950 p-10 
            shadow-2xl items-center"
      >
        <header className="mb-6 text-center">
          <h2 className="text-2xl font-bold text-cyan-100">Steal coins</h2>
          <p className="mt-2 text-sm text-slate-300">
            Select a player to steal from.
          </p>
        </header>

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

        <footer className="flex justify-end mt-8 gap-3">
          <button
            type="button"
            onClick={onCancel}
            className="rounded-lg bg-slate-800 px-4 py-2 text-slate-200 hover:bg-slate-700 cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="button"
            disabled={!targetPlayerId}
            onClick={onConfirm}
            className="
                rounded-lg bg-cyan-500 px-4 py-2 
                font-bold text-slate-950 disabled:cursor-not-allowed 
                disabled:opacity-40 cursor-pointer hover:bg-cyan-600"
          >
            Confirm steal
          </button>
        </footer>
      </div>
    </div>
  );
}
