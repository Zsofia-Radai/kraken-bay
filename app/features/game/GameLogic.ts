import { shuffle } from "@/app/data/initialGameState";
import { Card, GameState, PlayerData } from "@/app/types/game";

const ASSASSINATION_PRICE = 3;
const WALK_tHE_PLANK_PRICE = 7;

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

  const newDeck = [
    ...state.deck.filter((card) => !drawnCardIds.includes(card.id)),
    ...returnedCards,
  ];

  return {
    ...state,
    players: state.players.map((player) =>
      player.profile.id === state.currentPlayerId
        ? { ...player, cards: selectedCards }
        : player,
    ),
    deck: shuffle(newDeck),
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
  const paidState = spendCoins(
    state,
    state.currentPlayerId,
    ASSASSINATION_PRICE,
  );
  return revealInfluence(paidState, targetCardId);
}

export function walkThePlank(
  state: GameState,
  targetCardId: string,
): GameState {
  const paidState = spendCoins(
    state,
    state.currentPlayerId,
    WALK_tHE_PLANK_PRICE,
  );
  return revealInfluence(paidState, targetCardId);
}

export function revealInfluence(
  state: GameState,
  targetCardId: string,
): GameState {
  return {
    ...state,
    players: state.players.map((player) => {
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

function spendCoins(
  state: GameState,
  playerId: string,
  amount: number,
): GameState {
  return {
    ...state,
    players: state.players.map((player) =>
      player.profile.id === playerId
        ? {
            ...player,
            coins: Math.max(0, player.coins - amount),
          }
        : player,
    ),
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
