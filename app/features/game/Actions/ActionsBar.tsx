import {
  Action,
  ActionId,
  actions,
  walkThePlankAction,
} from "@/app/data/actions";
import { getNextAlivePlayerId } from "@/app/lib/actionUtils";
import { playSound, sounds } from "@/app/lib/sounds";
import { Card, GameState, PlayerData } from "@/app/types/game";
import { useEffect, useState } from "react";
import {
  assassinate,
  exchange,
  income,
  steal,
  tax,
  walkThePlank,
} from "../GameLogic";
import AssassinateModal from "../Modals/AssassinateModal";
import ConfirmationModal from "../Modals/ConfirmationModal";
import ExchangeModal from "../Modals/ExchangeModal";
import WalkThePlankModal from "../Modals/WalkThePlankModal";
import ActionButton from "./ActionButton";

export default function ActionsBar({
  playerData: { cards, coins },
  gameState,
  setGameState,
}: {
  playerData: PlayerData;
  gameState: GameState;
  setGameState: React.Dispatch<React.SetStateAction<GameState>>;
}) {
  const [isWalkThePlankModalOpen, setIsWalkThePlankModalOpen] = useState(false);
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
  const [selectedAction, setSelectedAction] = useState<Action | null>(null);
  const [selectedTargetPlayerId, setSelectedTargetPlayerId] = useState<
    string | null
  >(null);
  const [selectedExchangeCardIds, setSelectedExchangeCardIds] = useState<
    string[]
  >([]);
  const isAssassinateAllowed =
    gameState.pendingAction?.actionId === "assassinate" &&
    gameState.pendingAction.phase === "allowed";

  const isExchangeAllowed =
    gameState.pendingAction?.actionId === "exchange" &&
    gameState.pendingAction.phase === "allowed";

  const currentPlayer = gameState.players.find(
    (player) => player.profile.id === gameState.currentPlayerId,
  );

  const drawnExchangeCards = isExchangeAllowed
    ? gameState.deck.slice(0, 2)
    : [];

  const exchangeCards =
    isExchangeAllowed && currentPlayer
      ? [...currentPlayer.cards, ...drawnExchangeCards]
      : [];

  const targetPlayer = gameState.players.find(
    (player) => player.profile.id === gameState.pendingAction?.targetPlayerId,
  );
  const opponents = gameState.players.filter(
    (player) => player.profile.id !== gameState.currentPlayerId,
  );

  const hasRequiredCharacter = (action: Action) => {
    if (!action.requiredCharacter) return true;

    return cards.some(
      (card) => card.characterId === action.requiredCharacter && !card.revealed,
    );
  };

  const handleIncome = () => {
    setGameState(income);
  };

  const confirmAssassinate = (targetCardId: string) => {
    setGameState((prev) => {
      const newState = assassinate(prev, targetCardId);

      return {
        ...newState,
        pendingAction: null,
      };
    });
  };

  const confirmExchange = () => {
    const selectedCards = exchangeCards.filter((card) =>
      selectedExchangeCardIds.includes(card.id),
    );

    setGameState((prev) => {
      const exchangedState = exchange(prev, selectedCards, drawnExchangeCards);

      return {
        ...exchangedState,
        pendingAction: null,
      };
    });

    setSelectedExchangeCardIds([]);
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

  const openConfirmationModal = () => {
    setIsConfirmationModalOpen(true);
  };

  const confirmAction = () => {
    if (!selectedAction) return;

    setGameState((prev) => ({
      ...prev,
      pendingAction: {
        id: crypto.randomUUID(),
        actionId: selectedAction.id,
        playerId: prev.currentPlayerId,
        targetPlayerId: selectedTargetPlayerId ?? undefined,
        responderPlayerId: getNextAlivePlayerId(
          prev.players,
          prev.currentPlayerId,
        ),
        phase: "awaiting",
      },
    }));

    setIsConfirmationModalOpen(false);
    setSelectedAction(null);
    setSelectedTargetPlayerId(null);
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
        {Object.values(actions).map((action) => {
          return (
            <ActionButton
              key={action.id}
              action={action}
              disabled={action === actions.assassinate && coins < 3}
              onClick={() => {
                if (action.id === "income") {
                  handleIncome();
                } else {
                  setSelectedAction(action);
                  openConfirmationModal();
                }
              }}
              variant="secondary"
              isBluff={!hasRequiredCharacter(action)}
            />
          );
        })}
      </div>

      {isExchangeAllowed && exchangeCards.length === 4 && (
        <ExchangeModal
          cards={exchangeCards}
          selectedCardIds={selectedExchangeCardIds}
          selectExchangeCard={selectExhangeCard}
          onConfirm={() => confirmExchange()}
        />
      )}

      {targetPlayer && isAssassinateAllowed && (
        <AssassinateModal
          player={targetPlayer}
          onConfirm={(targetCardId) => confirmAssassinate(targetCardId)}
        />
      )}

      {isWalkThePlankModalOpen && (
        <WalkThePlankModal
          players={opponents}
          onConfirm={(targetCardId) => {
            setGameState((prev) => walkThePlank(prev, targetCardId));
            playSound(sounds.flip);
            setIsWalkThePlankModalOpen(false);
          }}
          onCancel={() => {
            setIsWalkThePlankModalOpen(false);
          }}
        />
      )}

      {selectedAction && isConfirmationModalOpen && (
        <ConfirmationModal
          onCancel={() => {
            setIsConfirmationModalOpen(false);
            setSelectedAction(null);
          }}
          currentPlayerId={gameState.currentPlayerId}
          players={gameState.players}
          onConfirm={confirmAction}
          isBluff={!hasRequiredCharacter(selectedAction)}
          action={selectedAction}
          setTargetPlayerId={setSelectedTargetPlayerId}
          targetPlayerId={selectedTargetPlayerId}
        />
      )}
    </div>
  );
}
