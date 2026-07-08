export type CharacterId =
  | "governor"
  | "assassin"
  | "thief"
  | "fortune-teller"
  | "guardian";

export type Character = {
  id: CharacterId;
  name: string;
  description: string;
  action: string;
  counterAction?: string;
  img: string;
};

export type Card = {
  id: string;
  characterId: CharacterId;
  revealed: boolean;
};

export type PlayerProfile = {
  id: string;
  name: string;
  avatar: string;
};

export type PlayerData = {
  profile: PlayerProfile;
  coins: number;
  cards: Card[];
  isAlive: boolean;
};

export type GameState = {
  players: PlayerData[];
  deck: Card[];
  currentPlayerId: string;
  log: string[];
  hiddenCards: Card[];
  discardPile: Card[];
};
