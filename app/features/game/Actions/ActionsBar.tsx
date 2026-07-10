import {
  Action,
  ActionId,
  Actions,
  walkThePlankAction,
} from "@/app/data/actions";
import { Card, GameState, PlayerData } from "@/app/types/game";
import { useState } from "react";
import ActionButton from "./ActionButton";
import ExchangeModal from "../Modals/ExchangeModal";
import {
  assassinate,
  exchange,
  income,
  steal,
  tax,
  walkThePlank,
} from "../GameLogic";
import StealModal from "../Modals/StealModal";
import AssassinateModal from "../Modals/AssassinateModal";
import WalkThePlankModal from "../Modals/WalkThePlankModal";

export default function ActionBar({
  playerData: { cards, coins },
  gameState,
  setGameState,
}: {
  playerData: PlayerData;
  gameState: GameState;
  setGameState: React.Dispatch<React.SetStateAction<GameState>>;
}) {
  const [isExchangeModalOpen, setIsExchangeModalOpen] = useState(false);
  const [isStealModalOpen, setIsStealModalOpen] = useState(false);
  const [isAssassinateModalOpen, setIsAssassinateModalOpen] = useState(false);
  const [isWalkThePlankModalOpen, setIsWalkThePlankModalOpen] = useState(false);
  const [drawnExchangeCards, setDrawnExchangeCards] = useState<Card[]>([]);
  const [exchangeCards, setExchangeCards] = useState<Card[]>([]);
  const [targetPlayerId, setTargetPlayerId] = useState<string | null>(null);
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

  const confirmSteal = () => {
    if (!targetPlayerId) return;
    setGameState((prev) => steal(prev, targetPlayerId));
    setTargetPlayerId(null);
    setIsStealModalOpen(false);
  };

  const confirmExchange = () => {
    const selectedCards = exchangeCards.filter((card) =>
      selectedExchangeCardIds.includes(card.id),
    );

    setGameState((prev) => exchange(prev, selectedCards, drawnExchangeCards));

    setIsExchangeModalOpen(false);
  };

  const openStealModal = () => {
    setIsStealModalOpen(true);
  };

  const openAssassinateModal = () => {
    setIsAssassinateModalOpen(true);
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
    setIsExchangeModalOpen(true);
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
    steal: openStealModal,
    assassinate: openAssassinateModal,
  };

  return (
    <div>
      <div className="mb-4 flex justify-center">
        <ActionButton
          onClick={() => setIsWalkThePlankModalOpen(true)}
          action={walkThePlankAction}
          disabled={coins < 7}
        />
      </div>

      <div className="flex items-center gap-1 text-center">
        {Object.values(Actions).map((action) => {
          return (
            <ActionButton
              key={action.id}
              action={action}
              disabled={action === Actions.Assassinate && coins < 3}
              onClick={actionHandlers[action.id]}
              variant="secondary"
              isBluff={!hasRequiredCharacter(action)}
            />
          );
        })}
      </div>

      <ExchangeModal
        isOpen={isExchangeModalOpen}
        cards={exchangeCards}
        selectedCardIds={selectedExchangeCardIds}
        selectExchangeCard={selectExhangeCard}
        onConfirm={() => confirmExchange()}
        onCancel={() => setIsExchangeModalOpen(false)}
      />

      <StealModal
        isOpen={isStealModalOpen}
        players={gameState.players}
        currentPlayerId={gameState.currentPlayerId}
        selectTargetPlayer={(targetPlayerId) =>
          setTargetPlayerId(targetPlayerId)
        }
        targetPlayerId={targetPlayerId}
        onConfirm={() => confirmSteal()}
        onCancel={() => {
          setTargetPlayerId(null);
          setIsStealModalOpen(false);
        }}
      />

      <AssassinateModal
        isOpen={isAssassinateModalOpen}
        players={gameState.players}
        currentPlayerId={gameState.currentPlayerId}
        onConfirm={(targetCardId) => {
          setGameState((prev) => assassinate(prev, targetCardId));
          setIsAssassinateModalOpen(false);
        }}
        closeModal={() => {
          setIsAssassinateModalOpen(false);
        }}
      />

      <WalkThePlankModal
        isOpen={isWalkThePlankModalOpen}
        players={gameState.players}
        currentPlayerId={gameState.currentPlayerId}
        onConfirm={(targetCardId) => {
          setGameState((prev) => walkThePlank(prev, targetCardId));
          setIsWalkThePlankModalOpen(false);
        }}
        closeModal={() => {
          setIsWalkThePlankModalOpen(false);
        }}
      />
    </div>
  );
}
