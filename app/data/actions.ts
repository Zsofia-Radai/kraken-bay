import {
  Icon,
  IconCoin,
  IconCrown,
  IconMoneybag,
  IconMoonStars,
  IconShieldHalf,
  IconSkull,
  IconSlice,
} from "@tabler/icons-react";
import { CharacterId } from "../types/game";

export type ActionId = "income" | "tax" | "steal" | "exchange" | "assassinate";

export type CounterActionId =
  | "blockAssassination"
  | "blockStealAsThief"
  | "blockStealAsFortuneTeller";

type BaseAction<TId extends string> = {
  id: TId;
  label: string;
  description: string;
  icon: Icon;
  canTarget: boolean;
};

export type Action = BaseAction<ActionId> & {
  requiredCharacter?: CharacterId;
  cost?: number;
};

export type CounterAction = BaseAction<CounterActionId> & {
  requiredCharacter: CharacterId;
  blocksActionId: ActionId;
};

export type WalkThePlankAction = BaseAction<"walkThePlank"> & {
  cost: 7;
  canTarget: true;
};

export const steal = {
  id: "steal",
  label: "Steal",
  description: "Steal up to 2 coins from another player by claiming Thief.",
  icon: IconMoneybag,
  canTarget: true,
  requiredCharacter: "thief",
} satisfies Action;

export const exchange = {
  id: "exchange",
  label: "Exchange",
  description: "Exchange 2 cards with the deck by claiming Fortune Teller.",
  icon: IconMoonStars,
  canTarget: false,
  requiredCharacter: "fortune-teller",
} satisfies Action;

export const blockAssassination = {
  id: "blockAssassination",
  label: "Block Assassination",
  description:
    "Block an assassination from another player by claiming Guardian.",
  icon: IconShieldHalf,
  canTarget: false,
  requiredCharacter: "guardian",
  blocksActionId: "assassinate",
} satisfies CounterAction;

export const blockStealAsThief = {
  id: "blockStealAsThief",
  label: "Block Steal",
  description: "Block a steal from another player by claiming Thief.",
  icon: IconMoneybag,
  canTarget: false,
  requiredCharacter: "thief",
  blocksActionId: "steal",
} satisfies CounterAction;

export const blockStealAsFortuneTeller = {
  id: "blockStealAsFortuneTeller",
  label: "Block Steal",
  description: "Block a steal from another player by claiming Fortune Teller.",
  icon: IconMoonStars,
  canTarget: false,
  requiredCharacter: "fortune-teller",
  blocksActionId: "steal",
} satisfies CounterAction;

export const tax = {
  id: "tax",
  label: "Tax",
  description: "Take 3 coins from the treasury by claiming Governor.",
  icon: IconCrown,
  canTarget: false,
  requiredCharacter: "governor",
} satisfies Action;

export const assassinate = {
  id: "assassinate",
  label: "Assassinate",
  description:
    "Pay 3 coins to assassinate an influence of another player by claiming Assassin.",
  icon: IconSlice,
  canTarget: true,
  cost: 3,
  requiredCharacter: "assassin",
} satisfies Action;

export const income = {
  id: "income",
  label: "Income",
  description: "Take 1 coin from the treasury.",
  icon: IconCoin,
  canTarget: false,
} satisfies Action;

export const walkThePlankAction: WalkThePlankAction = {
  id: "walkThePlank",
  label: "Walk the Plank",
  description: "Pay 7 coins to force another player to discard a card.",
  icon: IconSkull,
  canTarget: true,
  cost: 7,
};

export const actions = {
  income,
  tax,
  steal,
  exchange,
  assassinate,
} as const;

export const counterActions = [
  blockAssassination,
  blockStealAsThief,
  blockStealAsFortuneTeller,
] as const;
