import { Character, CharacterId } from "../types/game";

export const governor: Character = {
  id: "governor",
  name: "Governor",
  description: "The corrupt ruler of Kraken Bay.",
  action: "Take 3 coins.",
  counterAction: "Block trade attempts.",
  img: "/images/characters/governor.png",
};

export const assassin: Character = {
  id: "assassin",
  name: "Assassin",
  description: "A silent killer hired from the docks.",
  action: "Pay 3 coins to assassinate another player.",
  img: "/images/characters/assassin.png",
};

export const thief: Character = {
  id: "thief",
  name: "Thief",
  description: "A sneaky pirate who steals from rivals.",
  action: "Steal 2 coins from another player.",
  counterAction: "Block stealing attempts.",
  img: "/images/characters/thief.png",
};

export const fortuneTeller: Character = {
  id: "fortune-teller",
  name: "Fortune Teller",
  description: "A mysterious fortune teller who manipulates fate.",
  action: "Exchange cards with the deck.",
  counterAction: "Block stealing attempts.",
  img: "/images/characters/fortune-teller.png",
};

export const guardian: Character = {
  id: "guardian",
  name: "Guardian",
  description: "A loyal protector.",
  action: "Blocks assassination.",
  counterAction: "Block Assassin.",
  img: "/images/characters/guardian.png",
};

export const characters = {
  governor,
  assassin,
  thief,
  "fortune-teller": fortuneTeller,
  guardian,
} satisfies Record<CharacterId, Character>;
