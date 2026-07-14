import { Card, CharacterId, GameState } from "../types/game";
import { playerProfiles } from "./playerProfiles";

const createCard = (characterId: CharacterId): Card => ({
  id: crypto.randomUUID(),
  characterId,
  revealed: false,
});

const createDeck = (): Card[] => [
  createCard("governor"),
  createCard("governor"),
  createCard("governor"),

  createCard("assassin"),
  createCard("assassin"),
  createCard("assassin"),

  createCard("thief"),
  createCard("thief"),
  createCard("thief"),

  createCard("fortune-teller"),
  createCard("fortune-teller"),
  createCard("fortune-teller"),

  createCard("guardian"),
  createCard("guardian"),
  createCard("guardian"),
];

export function shuffle<T>(array: T[]): T[] {
  const result = [...array];

  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));

    [result[i], result[j]] = [result[j], result[i]];
  }

  return result;
}

export function createInitialGameState(): GameState {
  const deck = shuffle(createDeck());

  return {
    currentPlayerId: "monkey",
    players: [
      {
        profile: playerProfiles.monkey,
        coins: 2,
        cards: [drawCard(deck), drawCard(deck)],
        isAlive: true,
      },
      {
        profile: playerProfiles.sozerano,
        coins: 2,
        cards: [drawCard(deck), drawCard(deck)],
        isAlive: true,
      },
      {
        profile: playerProfiles.esperanza,
        coins: 2,
        cards: [drawCard(deck), drawCard(deck)],
        isAlive: true,
      },
      {
        profile: playerProfiles.parrot,
        coins: 2,
        cards: [drawCard(deck), drawCard(deck)],
        isAlive: true,
      },
    ],
    hiddenCards: [drawCard(deck), drawCard(deck)],
    deck,
    discardPile: [],
    log: ["Game started. Monkey's turn."],
    status: "Take your action",
    pendingAction: null,
    actionHistory: [],
  };
}

function drawCard(deck: Card[]): Card {
  const card = deck.pop();

  if (!card) {
    throw new Error("The deck is empty.");
  }

  return card;
}
