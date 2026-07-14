import {
  ActionHistoryEntry,
  GameState,
  PendingAction,
  PlayerData,
} from "../types/game";

export function addActionToHistory(
  state: GameState,
  action: ActionHistoryEntry,
): GameState {
  return {
    ...state,
    actionHistory: [action, ...state.actionHistory].slice(0, 10),
  };
}

export function getActionHistoryText(
  entry: PendingAction,
  players: PlayerData[],
) {
  const player = players.find((p) => p.profile.id === entry.playerId);

  return `${player?.profile.name ?? "Unknown"} attempts to ${entry.actionId.toLowerCase()}.`;
}

export function getNextAlivePlayerId(
  players: PlayerData[],
  currentPlayerId: string,
) {
  const currentPlayerIndex = players.findIndex(
    (player) => player.profile.id === currentPlayerId,
  );

  for (let offset = 1; offset < players.length; offset++) {
    const nextIndex = (currentPlayerIndex + offset) % players.length;
    const nextPlayer = players[nextIndex];

    if (nextPlayer.isAlive) {
      return nextPlayer.profile.id;
    }
  }

  return currentPlayerId;
}
