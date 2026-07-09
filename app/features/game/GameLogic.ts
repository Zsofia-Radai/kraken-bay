import { Card, GameState, PlayerData } from "@/app/types/game";

export function income(state: GameState): GameState {
  return addCoinsToCurrentPlayer(state, 1);
}

export function tax(state: GameState): GameState {
  return addCoinsToCurrentPlayer(state, 3);
}

export function exchange(
  state: GameState,
  selectedCards: Card[],
  drawnCards: Card[],
): GameState {
  const selectedCardIds = selectedCards.map((card) => card.id);
  const drawnCardIds = drawnCards.map((card) => card.id);

  const currentPlayer = state.players.find(
    (player) => player.profile.id === state.currentPlayerId,
  );

  if (!currentPlayer) return state;

  const returnedCards = [...currentPlayer.cards, ...drawnCards].filter(
    (card) => !selectedCardIds.includes(card.id),
  );

  return {
    ...state,
    players: state.players.map((player) =>
      player.profile.id === state.currentPlayerId
        ? { ...player, cards: selectedCards }
        : player,
    ),
    deck: [
      ...state.deck.filter((card) => !drawnCardIds.includes(card.id)),
      ...returnedCards,
    ],
  };
}

export function steal(state: GameState, selectedPlayerId: string): GameState {
  const target = state.players.find(
    (player) => player.profile.id === selectedPlayerId,
  );

  if (!target) {
    throw new Error("Selected player not found");
  }

  const amount = Math.min(target.coins, 2);

  let newState = state;
  newState = addCoinsToCurrentPlayer(newState, amount);
  newState = removeCoinsFromPlayer(newState, selectedPlayerId, amount);

  return newState;
}

export function assassinate(state: GameState, targetCardId: string): GameState {
  return {
    ...state,
    players: state.players.map((player) => {
      const hasTargetCard = player.cards.some(
        (card) => card.id === targetCardId,
      );

      if (!hasTargetCard) {
        return player;
      }

      const updatedCards = player.cards.map((card) =>
        card.id === targetCardId ? { ...card, revealed: true } : card,
      );

      return {
        ...player,
        cards: updatedCards,
        isAlive: updatedCards.some((card) => !card.revealed),
      };
    }),
  };
}

function addCoinsToCurrentPlayer(state: GameState, amount: number): GameState {
  return {
    ...state,
    players: state.players.map((player: PlayerData) =>
      player.profile.id === state.currentPlayerId
        ? { ...player, coins: player.coins + amount }
        : player,
    ),
  };
}

function removeCoinsFromPlayer(
  state: GameState,
  playerId: string,
  amount: number,
): GameState {
  return {
    ...state,
    players: state.players.map((player: PlayerData) =>
      player.profile.id === playerId
        ? { ...player, coins: player.coins - amount }
        : player,
    ),
  };
}
