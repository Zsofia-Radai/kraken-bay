import { PlayerData } from "@/app/types/game";
import RoleCard from "../RoleCard";

export default function ActivePlayer({
  playerData: { cards, isAlive },
}: {
  playerData: PlayerData;
}) {
  return (
    <div className="flex justify-center">
      <div className="inline-flex flex-col">
        <div className="mt-4 flex gap-6">
          {cards.map((card) => (
            <RoleCard key={card.id} card={card} size="large" isVisible={true} />
          ))}
        </div>
      </div>
    </div>
  );
}
