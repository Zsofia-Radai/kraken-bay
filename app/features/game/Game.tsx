"use client";

import { createInitialGameState } from "@/app/data/initialGameState";
import { PlayerData } from "@/app/types/game";
import { useState } from "react";
import ActionHistory from "./ActionHistory";
import ActivePlayer from "./ActivePlayer";
import Player from "./Player";
import ActionBar from "./ActionsBar";
import { IconCards } from "@tabler/icons-react";

export default function Game() {
  const [gameState, setGameState] = useState(createInitialGameState);

  const opponents = gameState.players.filter(
    (player) => player.profile.id !== gameState.currentPlayerId,
  );

  const activePlayer = gameState.players.find(
    (player) => player.profile.id === gameState.currentPlayerId,
  );

  if (!activePlayer) {
    return null;
  }

  return (
    <main className="min-h-screen bg-slate-950 flex items-center justify-center p-8">
      <div className="w-full max-w-[720px] aspect-[9/16] rounded-[12px] overflow-hidden bg-gradient-to-b from-teal-950 via-slate-900 to-slate-950 shadow-2xl">
        <section className="grid grid-cols-3 gap-3">
          {opponents.map((playerData: PlayerData) => (
            <Player playerData={playerData} key={playerData.profile.id} />
          ))}
        </section>

        <div className="bg-teal-950/60 rounded-2xl p-4 border-cyan-400/30">
          <section className="mt-4 border-cyan-400/30 bg-teal-950/60 p-4 rounded-2xl relative">
            <div className="absolute top-60 left-1 text-cyan-200 text-center">
              <IconCards size={35} />
              <div>{gameState.deck.length}</div>
            </div>
            <ActivePlayer playerData={activePlayer} />
          </section>

          <section className="mt-5 rounded-2xl bg-cyan-600 px-4 py-3 text-center shadow-lg shadow-cyan-400/20">
            <p className="text-xl font-bold">{gameState.status}</p>
          </section>

          <section className="mt-4 rounded-2xl border border-cyan-200/70 bg-cyan-950/60 p-3 shadow-lg shadow-cyan-400/20">
            <ActionHistory log={gameState.log} />
          </section>

          <section className="mt-5 flex justify-center">
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
