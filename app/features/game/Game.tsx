"use client";

import { createInitialGameState } from "@/app/data/initialGameState";
import { GameState, PlayerData } from "@/app/types/game";
import { useState } from "react";
import ActionHistory from "./Actions/ActionHistory";
import ActivePlayer from "./Players/ActivePlayer";
import Player from "./Players/Player";
import ActionBar from "./Actions/ActionsBar";
import { IconCards } from "@tabler/icons-react";
import { steal, tax } from "./GameLogic";

export default function Game() {
  const [gameState, setGameState] = useState(createInitialGameState);
  const players = gameState.players;

  const activePlayer = gameState.players.find(
    (player) => player.profile.id === gameState.currentPlayerId,
  );

  if (!activePlayer) {
    return null;
  }

  const handleAllow = () => {
    setGameState((prev) => resolvePendingAction(prev));
  };

  function resolvePendingAction(state: GameState): GameState {
    const pendingAction = state.pendingAction;

    if (!pendingAction) {
      return state;
    }

    let resolvedState: GameState;

    switch (pendingAction.actionId) {
      case "tax":
        resolvedState = tax(state);
        break;

      case "steal":
        if (!pendingAction.targetPlayerId) {
          return state;
        }
        resolvedState = steal(state, pendingAction.targetPlayerId);
        break;

      default:
        return state;
    }

    return {
      ...resolvedState,
      pendingAction: null,
    };
  }

  return (
    <main className="min-h-screen bg-slate-950 flex justify-center">
      <div className="w-full max-w-[960px] rounded-[12px] flex-1 bg-teal-950/60 shadow-2xl p-4">
        <section className="grid grid-cols-4 gap-3">
          {players.map((playerData: PlayerData) => (
            <Player
              currentPlayerId={gameState.currentPlayerId}
              playerData={playerData}
              key={playerData.profile.id}
              pendingAction={gameState.pendingAction}
              responderPlayerId={gameState.pendingAction?.responderPlayerId}
              allowAction={handleAllow}
            />
          ))}
        </section>

        <div className="rounded-2xl p-4 border-cyan-400/30">
          <div className="flex justify-between items-end">
            <div className="text-cyan-200 text-center">
              <IconCards size={35} />
              <div>{gameState.deck.length}</div>
            </div>
            <section className="m-6">
              <ActivePlayer playerData={activePlayer} />
            </section>
            <button className="text-cyan-200 bg-cyan-600 p-3 rounded-2xl cursor-pointer">
              Done
            </button>
          </div>

          <section className="mt-5 rounded-2xl bg-cyan-600 px-4 py-3 text-center shadow-lg shadow-cyan-400/20">
            <p className="text-xl font-bold">{gameState.status}</p>
          </section>

          <section className="mt-4 rounded-2xl border border-cyan-200/70 bg-cyan-950/60 p-3 shadow-lg shadow-cyan-400/20">
            <ActionHistory
              players={gameState.players}
              pendingAction={gameState.pendingAction ?? undefined}
            />
          </section>

          <section className="mt-12 flex justify-center">
            <ActionBar
              gameState={gameState}
              setGameState={setGameState}
              playerData={activePlayer}
            />
          </section>
        </div>
      </div>
    </main>
  );
}
