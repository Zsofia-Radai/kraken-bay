import { characters } from "@/app/data/characters";
import { PlayerData } from "@/app/types/game";
import RoleCard from "./RoleCard";
import { IconWallet } from "@tabler/icons-react";

export default function ActivePlayer({
  playerData: { profile: player, coins, cards, isAlive },
}: {
  playerData: PlayerData;
}) {
  return (
    <div className="flex flex-col items-center">
      <div className="flex items-center gap-4">
        <h2 className="text-xl font-bold">{player.name}</h2>

        <div className="flex items-center gap-2">
          <IconWallet className="h-5 w-5 text-cyan-200" />
          <p className="font-semibold text-cyan-100">{coins} coins</p>
        </div>
      </div>
      <div className="mt-4 flex justify-center gap-6">
        {cards.map((card) => (
          <RoleCard
            key={card.id}
            character={characters[card.characterId]}
            size="large"
          />
        ))}
      </div>
    </div>
  );
}
