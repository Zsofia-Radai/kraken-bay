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
