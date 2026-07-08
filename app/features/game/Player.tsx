import { characters } from "@/app/data/characters";
import { PlayerData } from "@/app/types/game";
import { IconWallet } from "@tabler/icons-react";
import Image from "next/image";
import RoleCard from "./RoleCard";

export default function Player({
  playerData: { profile: player, coins, cards, isAlive },
  active,
}: {
  playerData: PlayerData;
  active?: boolean;
}) {
  return (
    <div
      className={`rounded-2xl border p-4 ${
        active
          ? "border-yellow-300 bg-teal-800/70"
          : "border-cyan-400/30 bg-teal-950/60"
      }`}
    >
      <div className="flex items-center gap-4">
        <div className="h-20 w-20 relative rounded-full border-4 border-yellow-400 bg-slate-200">
          <Image
            src={player.avatar}
            alt={player.name}
            fill
            sizes="80px"
            className="object-cover"
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

      <div className="mt-4 grid grid-cols-2 gap-3">
        {cards.map((card) => (
          <RoleCard
            key={card.id}
            character={characters[card.characterId]}
            size="small"
          />
        ))}
      </div>
    </div>
  );
}
