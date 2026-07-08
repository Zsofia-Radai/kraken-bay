import {
  IconMoneybag,
  IconMoonStars,
  IconShieldHalf,
  IconCrown,
  IconSlice,
  IconCoin,
  IconCoins,
  IconSkull,
} from "@tabler/icons-react";

export const steal = {
  id: "steal",
  label: "Steal",
  description: "Steal up to 2 coins from another player.",
  icon: IconMoneybag,
};

export const exchange = {
  id: "exchange",
  label: "Exchange",
  description: "Exchange 2 cards with the deck.",
  icon: IconMoonStars,
};

export const block = {
  id: "block",
  label: "Block",
  description: "Block an assassination from another player.",
  icon: IconShieldHalf,
};

export const tax = {
  id: "tax",
  label: "Tax",
  description: "Take 3 coins from the treasury.",
  icon: IconCrown,
};

export const assassinate = {
  id: "assassinate",
  label: "Assassinate",
  description: "Pay 3 coins to assassinate another player.",
  icon: IconSlice,
};

export const income = {
  id: "income",
  label: "Income",
  description: "Take 1 coin from the treasury.",
  icon: IconCoin,
};

export const trade = {
  id: "trade",
  label: "Trade",
  description: "Take 2 coins from the treasury.",
  icon: IconCoins,
};

export const walkThePlank = {
  id: "walk-the-plank",
  label: "Walk the Plank",
  description: "Force another player to discard a card.",
  icon: IconSkull,
};
