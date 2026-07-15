import { cn } from "@/app/lib/utils";
import { Card } from "@/app/types/game";
import { IconSkull } from "@tabler/icons-react";
import RoleCard from "../RoleCard";

type InfluenceCardSelectorProps = {
  cards: Card[];
  selectedCardId: string | null;
  onSelectCard: (targetCardId: string) => void;
};

export default function InfluenceCardSelector({
  cards,
  selectedCardId,
  onSelectCard,
}: InfluenceCardSelectorProps) {
  return (
    <div className={cn("mt-4 grid grid-cols-2 gap-4")}>
      {cards.map((card) => {
        const isRevealed = card.revealed;
        const isSelected = selectedCardId === card.id;
        return (
          <button
            onClick={() => onSelectCard(card.id)}
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
              selected={selectedCardId === card.id}
            />

            <div
              className={cn(
                "absolute inset-0 flex items-center justify-center transition-all duration-200 ease-out",
                isRevealed || isSelected
                  ? "opacity-100 scale-100"
                  : "opacity-0 scale-75 group-hover:opacity-100 group-hover:scale-100",
              )}
            >
              {isRevealed && (
                <IconSkull className="h-10 w-10 text-white drop-shadow-lg" />
              )}

              {isRevealed && <div className="absolute inset-0 bg-black/35" />}
            </div>
          </button>
        );
      })}
    </div>
  );
}
