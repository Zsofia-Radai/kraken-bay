import { Card } from "@/app/types/game";
import RoleCard from "../RoleCard";

type ExchangeModalProps = {
  isOpen: boolean;
  cards: Card[];
  selectedCardIds: string[];
  selectExchangeCard: (cardId: string) => void;
  onConfirm: () => void;
  onCancel: () => void;
};

export default function ExchangeModal({
  isOpen,
  cards,
  selectedCardIds,
  selectExchangeCard,
  onConfirm,
  onCancel,
}: ExchangeModalProps) {
  if (!isOpen) return null;

  const canConfirm = selectedCardIds.length === 2;

  return (
    <div className="w-full fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
      <div className="max-w-3xl rounded-2xl border border-cyan-400/30 bg-slate-950 p-10 shadow-2xl">
        <header className="mb-6 text-center">
          <h2 className="text-2xl font-bold text-cyan-100">Exchange Cards</h2>
          <p className="mt-2 text-sm text-slate-300">Choose 2 cards to keep.</p>
        </header>

        <div className="grid grid-cols-2 gap-8 place-items-center">
          {cards.map((card) => {
            const isSelected = selectedCardIds.includes(card.id);

            return (
              <button
                key={card.id}
                type="button"
                onClick={() => selectExchangeCard(card.id)}
                className={[
                  "rounded-xl p-2 transition",
                  "hover:bg-cyan-200",
                  "flex justify-center",
                  "cursor-pointer",
                  isSelected
                    ? "border-cyan-200 bg-cyan-200"
                    : "border-cyan-200 hover:border-cyan-200",
                ].join(" ")}
              >
                <RoleCard card={card} size="medium" isVisible={true} />
              </button>
            );
          })}
        </div>

        <footer className="mt-8 flex justify-end gap-3">
          <button
            type="button"
            onClick={onCancel}
            className="rounded-lg bg-slate-800 px-4 py-2 text-slate-200 hover:bg-slate-700 cursor-pointer"
          >
            Cancel
          </button>

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
