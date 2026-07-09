import {
  IconMoneybag,
  IconMoonStars,
  IconShieldHalf,
  IconCrown,
  IconSlice,
  IconCoin,
  IconCoins,
  IconSkull,
  Icon,
} from "@tabler/icons-react";
import { CharacterId } from "../types/game";

export type ActionId =
  | "income"
  | "tax"
  | "exchange"
  | "steal"
  | "assassinate"
  | "block-assassination"
  | "block-steal"
  | "trade"
  | "walk-the-plank";

export type Action = {
  id: ActionId;
  label: string;
  description: string;
  icon: Icon;
  requiredCharacter?: CharacterId;
  canTarget: boolean;
  cost?: number;
};

export const steal: Action = {
  id: "steal",
  label: "Steal",
  description: "Steal up to 2 coins from another player by claiming Thief.",
  icon: IconMoneybag,
  canTarget: true,
  requiredCharacter: "thief",
};

export const exchange: Action = {
  id: "exchange",
  label: "Exchange",
  description: "Exchange 2 cards with the deck by claiming Fortune Teller.",
  icon: IconMoonStars,
  canTarget: false,
  requiredCharacter: "fortune-teller",
};

export const blockAssassination: Action = {
  id: "block-assassination",
  label: "Block Assassination",
  description:
    "Block an assassination from another player by claiming Guardian.",
  icon: IconShieldHalf,
  canTarget: false,
  requiredCharacter: "guardian",
};

export const blockStealAsThief: Action = {
  id: "block-steal",
  label: "Block Steal",
  description: "Block a steal from another player by claiming Thief.",
  icon: IconMoneybag,
  canTarget: false,
  requiredCharacter: "thief",
};

export const blockStealAsFortuneTeller: Action = {
  id: "block-steal",
  label: "Block Steal",
  description: "Block a steal from another player by claiming Fortune Teller.",
  icon: IconMoonStars,
  canTarget: false,
  requiredCharacter: "fortune-teller",
};

export const tax: Action = {
  id: "tax",
  label: "Tax",
  description: "Take 3 coins from the treasury.",
  icon: IconCrown,
  canTarget: false,
  requiredCharacter: "governor",
};

export const assassinate: Action = {
  id: "assassinate",
  label: "Assassinate",
  description:
    "Pay 3 coins to assassinate an influence of another player by claiming Assassin.",
  icon: IconSlice,
  canTarget: true,
  cost: 3,
  requiredCharacter: "assassin",
};

export const income: Action = {
  id: "income",
  label: "Income",
  description: "Take 1 coin from the treasury.",
  icon: IconCoin,
  canTarget: false,
};

export const trade: Action = {
  id: "trade",
  label: "Trade",
  description: "Take 2 coins from the treasury.",
  icon: IconCoins,
  canTarget: false,
};

export const walkThePlank: Action = {
  id: "walk-the-plank",
  label: "Walk the Plank",
  description: "Pay 7 coins to force another player to discard a card.",
  icon: IconSkull,
  canTarget: true,
  cost: 7,
};

export const Actions = {
  Income: income,
  Tax: tax,
  Steal: steal,
  Exchange: exchange,
  Assassinate: assassinate,
} as const;

export const counterActions: Action[] = [
  blockAssassination,
  blockStealAsThief,
  blockStealAsFortuneTeller,
] as const;
