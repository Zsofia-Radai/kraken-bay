import { PlayerData } from "@/app/types/game";
import { IconWallet } from "@tabler/icons-react";
import Image from "next/image";
import RoleCard from "../RoleCard";

export default function ActivePlayer({
  playerData: { profile: player, coins, cards, isAlive },
}: {
  playerData: PlayerData;
}) {
  return (
    <div className="flex justify-center">
      <div className="inline-flex flex-col">
        <div className="flex items-center gap-4 bg-teal-800/70 rounded-xl p-2">
          <div className="h-15 w-15 relative rounded-full border-4 border-yellow-400 bg-slate-200">
            <Image
              src={player.avatar}
              alt={player.name}
              fill
              sizes="80px"
              className="object-cover"
            />
          </div>
          <h2 className="text-xl font-bold">{player.name}</h2>

          <div className="flex items-center gap-2">
            <IconWallet className="h-5 w-5 text-cyan-200" />
            <p className="font-semibold text-cyan-100">{coins} coins</p>
          </div>
        </div>
        <div className="mt-4 flex gap-6">
          {cards.map((card) => (
            <RoleCard key={card.id} card={card} size="large" isVisible={true} />
          ))}
        </div>
      </div>
    </div>
  );
}
