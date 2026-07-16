import { Card } from "@/app/types/game";
import RoleCard from "../RoleCard";
import { IconLetterX } from "@tabler/icons-react";
import { cn } from "@/app/lib/utils";

type ExchangeModalProps = {
  cards: Card[];
  selectedCardIds: string[];
  selectExchangeCard: (cardId: string) => void;
  onConfirm: () => void;
};

export default function ExchangeModal({
  cards,
  selectedCardIds,
  selectExchangeCard,
  onConfirm,
}: ExchangeModalProps) {
  const oneCardLeft = cards.some((card) => card.revealed);
  const canConfirm = oneCardLeft
    ? selectedCardIds.length == 1
    : selectedCardIds.length === 2;
  const description = oneCardLeft
    ? "Select ONE card to keep."
    : "Select 2 cards to keep.";

  return (
    <div className="w-full fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
      <div className="max-w-3xl rounded-2xl border border-cyan-400/30 bg-slate-950 p-10 shadow-2xl">
        <header className="mb-6 text-center">
          <h2 className="text-2xl font-bold text-cyan-100">Exchange Cards</h2>
          <p className="mt-2 text-sm text-slate-300">{description}</p>
        </header>

        <div className="grid grid-cols-2 gap-8 place-items-center">
          {cards.map((card) => {
            const isSelected = selectedCardIds.includes(card.id);

            return (
              <button
                key={card.id}
                disabled={card.revealed}
                type="button"
                onClick={() => selectExchangeCard(card.id)}
                className={cn(
                  "rounded-xl p-2 transition flex justify-center border-cyan-200",
                  "cursor-pointer hover:bg-cyan-200 hover:border-cyan-200",
                  "disabled:cursor-not-allowed",
                  "disabled:opacity-50",
                  "disabled:hover:bg-transparent",
                  "disabled:hover:border-cyan-200",
                  isSelected && "bg-cyan-200 border-cyan-200",
                )}
              >
                <div className="relative">
                  <RoleCard card={card} size="medium" isVisible={true} />

                  {card.revealed && (
                    <IconLetterX
                      className="absolute inset-0 m-auto text-red-600 drop-shadow-2xl"
                      size={300}
                      stroke={2}
                    />
                  )}
                </div>
              </button>
            );
          })}
        </div>

        <footer className="mt-8 flex justify-end gap-3">
          <button
            type="button"
            onClick={onConfirm}
            disabled={!canConfirm}
            className="rounded-lg bg-cyan-500 px-4 py-2 font-bold text-slate-950 disabled:cursor-not-allowed disabled:opacity-40 cursor-pointer hover:bg-cyan-600"
          >
            Keep selected
          </button>
        </footer>
      </div>
    </div>
  );
}
