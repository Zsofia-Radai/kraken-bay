"use client";

import { createInitialGameState } from "@/app/data/initialGameState";
import { PlayerData } from "@/app/types/game";
import { useState } from "react";
import ActionHistory from "./ActionHistory";
import ActivePlayer from "./ActivePlayer";
import Player from "./Player";

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

        <section className="mt-8">
          <ActivePlayer playerData={activePlayer} />
        </section>

        <section className="mt-5 rounded-2xl bg-rose-400/70 px-4 py-3 text-center shadow-lg shadow-rose-500/30">
          <p className="text-xl font-bold">Sozerano attempts a STEAL.</p>
        </section>

        <section className="mt-4 rounded-2xl border border-cyan-200/70 bg-cyan-950/60 p-3 shadow-lg shadow-cyan-400/20">
          <ActionHistory />
        </section>

        <section className="mt-5 grid grid-cols-2 gap-4">
          <button className="rounded-2xl bg-rose-600 py-3 text-lg font-bold shadow-lg shadow-rose-700/40">
            Challenge
          </button>
          <button className="rounded-2xl bg-green-600 py-3 text-lg font-bold shadow-lg shadow-green-700/40">
            Allow
          </button>
        </section>

        <section className="mt-5 grid grid-cols-2 gap-3">
          <BlockOption label="Block as Ambassador" />
          <BlockOption label="Block as Captain" />
        </section>
      </div>
    </main>
  );
}

function BlockOption({ label }: { label: string }) {
  return (
    <button className="rounded-2xl bg-cyan-500/80 p-4 text-sm font-bold uppercase shadow-lg shadow-cyan-500/20">
      {label}
    </button>
  );
}
