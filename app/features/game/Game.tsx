"use client";

import { actions } from "@/app/data/actions";
import { createInitialGameState, shuffle } from "@/app/data/initialGameState";
import { GameState, PendingChallenge, PlayerData } from "@/app/types/game";
import { IconCards } from "@tabler/icons-react";
import { useState } from "react";
import ActionHistory from "./Actions/ActionHistory";
import ActionsBar from "./Actions/ActionsBar";
import {
  replaceClaimedCharacter,
  revealInfluence,
  steal,
  tax,
} from "./GameLogic";
import ChallengeLostModal from "./Modals/ChallengeLostModal";
import ActivePlayer from "./Players/ActivePlayer";
import Player from "./Players/Player";

export default function Game() {
  const [gameState, setGameState] = useState(createInitialGameState);
  const players = gameState.players;
  const challengeLoser = players.find(
    (player) => player.profile.id === gameState.pendingChallenge?.loserId,
  );

  const activePlayer = gameState.players.find(
    (player) => player.profile.id === gameState.currentPlayerId,
  );

  if (!activePlayer) {
    return null;
  }

  const handleAllow = () => {
    setGameState((prev) => advancePendingAction(prev));
  };

  const completeAction = (state: GameState): GameState => ({
    ...state,
    pendingAction: null,
  });

  const allowPendingAction = (state: GameState): GameState => {
    if (!state.pendingAction) return state;

    return {
      ...state,
      pendingAction: {
        ...state.pendingAction,
        phase: "allowed",
      },
    };
  };

  const handleChallenge = (challengerId: string) => {
    setGameState((prev) => {
      const pendingChallenge = createPendingChallenge(prev, challengerId);

      if (!pendingChallenge || !prev.pendingAction) {
        return prev;
      }

      return {
        ...prev,
        pendingAction: {
          ...prev.pendingAction,
          phase: "challenged",
        },
        pendingChallenge,
      };
    });
  };

  function createPendingChallenge(
    state: GameState,
    challengerId: string,
  ): PendingChallenge | null {
    const pendingAction = state.pendingAction;

    if (!pendingAction) return null;

    const claimedAction = actions[pendingAction.actionId];

    if (!("requiredCharacter" in claimedAction)) return null;

    const claimingPlayer = state.players.find(
      (player) => player.profile.id === pendingAction.playerId,
    );

    if (!claimingPlayer) return null;

    const wasClaimValid = claimingPlayer.cards.some(
      (card) =>
        !card.revealed && card.characterId === claimedAction.requiredCharacter,
    );

    return {
      challengerId,
      loserId: wasClaimValid ? challengerId : pendingAction.playerId,
      wasClaimValid,
    };
  }

  const advancePendingAction = (state: GameState): GameState => {
    const pendingAction = state.pendingAction;

    if (!pendingAction) return state;

    switch (pendingAction.actionId) {
      case "tax":
        return completeAction(tax(state));

      case "steal":
        return pendingAction.targetPlayerId
          ? completeAction(steal(state, pendingAction.targetPlayerId))
          : state;

      case "exchange":
      case "assassinate":
        return allowPendingAction(state);

      default:
        return state;
    }
  };

  const confirmReveal = (targetCardId: string) => {
    setGameState((prev) => {
      const pendingChallenge = prev.pendingChallenge;

      if (!pendingChallenge) {
        return prev;
      }

      const revealedState = revealInfluence(prev, targetCardId);

      if (!pendingChallenge.wasClaimValid) {
        return {
          ...revealedState,
          pendingChallenge: null,
          pendingAction: null,
        };
      }

      const replacedState = replaceClaimedCharacter(revealedState);

      return advancePendingAction({
        ...replacedState,
        pendingChallenge: null,
      });
    });
  };

  return (
    <main className="min-h-screen bg-slate-950 flex justify-center">
      <div className="w-full max-w-[960px] rounded-[12px] flex-1 bg-teal-950/60 shadow-2xl p-4">
        <section className="grid grid-cols-4 gap-3">
          {players.map((playerData: PlayerData) => (
            <Player
              currentPlayerId={gameState.currentPlayerId}
              player={playerData}
              key={playerData.profile.id}
              pendingAction={gameState.pendingAction}
              responderPlayerId={gameState.pendingAction?.responderPlayerId}
              allowAction={handleAllow}
              challengeAction={handleChallenge}
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
            <ActionsBar
              gameState={gameState}
              setGameState={setGameState}
              playerData={activePlayer}
            />
          </section>

          {challengeLoser && (
            <ChallengeLostModal
              player={challengeLoser}
              onConfirm={confirmReveal}
            />
          )}
        </div>
      </div>
    </main>
  );
}
