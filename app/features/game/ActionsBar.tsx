import { Action, ActionId, Actions, walkThePlank } from "@/app/data/actions";
import { Card, GameState, PlayerData } from "@/app/types/game";
import { useState } from "react";
import ActionButton from "./ActionButton";
import ExchangeModal from "./ExchangeModal";
import { exchange, income, tax } from "./GameLogic";

export default function ActionBar({
  playerData: { cards, coins },
  gameState,
  setGameState,
}: {
  playerData: PlayerData;
  gameState: GameState;
  setGameState: React.Dispatch<React.SetStateAction<GameState>>;
}) {
  const [isExchangeOpen, setIsExchangeOpen] = useState(false);
  const [drawnExchangeCards, setDrawnExchangeCards] = useState<Card[]>([]);
  const [exchangeCards, setExchangeCards] = useState<Card[]>([]);
  const [selectedExchangeCardIds, setSelectedExchangeCardIds] = useState<
    string[]
  >([]);
  const hasRequiredCharacter = (action: Action) => {
    if (!action.requiredCharacter) return true;

    return cards.some(
      (card) => card.characterId === action.requiredCharacter && !card.revealed,
    );
  };

  const handleIncome = () => {
    setGameState(income);
  };

  const handleTax = () => {
    setGameState(tax);
  };

  const confirmExchange = () => {
    const selectedCards = exchangeCards.filter((card) =>
      selectedExchangeCardIds.includes(card.id),
    );

    setGameState((prev) => exchange(prev, selectedCards, drawnExchangeCards));

    setIsExchangeOpen(false);
  };

  const openExchangeModal = () => {
    const currentPlayer = gameState.players.find(
      (player) => player.profile.id === gameState.currentPlayerId,
    );

    if (!currentPlayer) return;

    const drawnCards = gameState.deck.slice(0, 2);

    setDrawnExchangeCards(drawnCards);
    setExchangeCards([...currentPlayer.cards, ...drawnCards]);

    setSelectedExchangeCardIds(currentPlayer.cards.map((card) => card.id));
    setIsExchangeOpen(true);
  };

  const selectExhangeCard = (cardId: string) => {
    setSelectedExchangeCardIds((prev) => {
      if (prev.includes(cardId)) {
        return prev.filter((id) => id !== cardId);
      }

      if (prev.length < 2) {
        return [...prev, cardId];
      }

      return [prev[0], cardId];
    });
  };

  const actionHandlers: Partial<Record<ActionId, () => void>> = {
    income: handleIncome,
    tax: handleTax,
    exchange: openExchangeModal,
  };

  return (
    <div>
      <div className="mb-4 flex justify-center">
        <ActionButton action={walkThePlank} disabled={coins < 7} />
      </div>

      <div className="flex items-center gap-1 text-center">
        {Object.values(Actions).map((action) => {
          return (
            <ActionButton
              key={action.id}
              action={action}
              onClick={actionHandlers[action.id]}
              variant="secondary"
              isBluff={!hasRequiredCharacter(action)}
            />
          );
        })}
      </div>

      <ExchangeModal
        isOpen={isExchangeOpen}
        cards={exchangeCards}
        selectedCardIds={selectedExchangeCardIds}
        selectExchangeCard={selectExhangeCard}
        onConfirm={() => confirmExchange()}
        onCancel={() => setIsExchangeOpen(false)}
      />
    </div>
  );
}
