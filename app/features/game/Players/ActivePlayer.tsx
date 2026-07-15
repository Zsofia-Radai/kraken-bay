import { PlayerData } from "@/app/types/game";
import RoleCard from "../RoleCard";
import { IconLetterX } from "@tabler/icons-react";

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
            <div key={card.id} className="relative">
              <RoleCard card={card} size="large" isVisible />

              {card.revealed && (
                <IconLetterX
                  className="absolute inset-0 m-auto text-red-600 drop-shadow-2xl"
                  size={300}
                  stroke={2}
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
