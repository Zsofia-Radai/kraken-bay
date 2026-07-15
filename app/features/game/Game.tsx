"use client";

import { createInitialGameState } from "@/app/data/initialGameState";
import { GameState, PlayerData } from "@/app/types/game";
import { useState } from "react";
import ActionHistory from "./Actions/ActionHistory";
import ActivePlayer from "./Players/ActivePlayer";
import Player from "./Players/Player";
import ActionsBar from "./Actions/ActionsBar";
import { IconCards } from "@tabler/icons-react";
import { revealInfluence, steal, tax } from "./GameLogic";
import { actions } from "@/app/data/actions";
import ChallengeLostModal from "./Modals/ChallengeLostModal";

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
    setGameState((prev) => resolvePendingAction(prev));
  };

  const handleChallenge = (challengerId: string) => {
    setGameState((prev) => {
      const pendingAction = prev.pendingAction;

      if (!pendingAction) {
        return prev;
      }

      const claimedAction = actions[pendingAction.actionId];

      if (!("requiredCharacter" in claimedAction)) {
        return prev;
      }

      const requiredCharacter = claimedAction.requiredCharacter;

      const claimingPlayer = prev.players.find(
        (player) => player.profile.id === pendingAction.playerId,
      );

      if (!claimingPlayer) {
        return prev;
      }

      const hasClaimedCharacter = claimingPlayer.cards.some(
        (card) => !card.revealed && card.characterId === requiredCharacter,
      );

      const loserId = hasClaimedCharacter
        ? challengerId
        : claimingPlayer.profile.id;

      return {
        ...prev,
        pendingAction: {
          ...pendingAction,
          phase: "challenged",
        },
        pendingChallenge: {
          challengerId,
          loserId,
          wasClaimValid: hasClaimedCharacter,
        },
      };
    });
  };

  const resolvePendingAction = (state: GameState): GameState => {
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

      case "exchange":
        return {
          ...state,
          pendingAction: {
            ...pendingAction,
            phase: "allowed",
          },
        };

      case "assassinate":
        return {
          ...state,
          pendingAction: {
            ...pendingAction,
            phase: "allowed",
          },
        };

      default:
        return state;
    }

    return {
      ...resolvedState,
      pendingAction: null,
    };
  };

  const confirmReveal = (targetCardId: string) => {
    setGameState((prev) => {
      const revealedState = revealInfluence(prev, targetCardId);
      return clearPendingChallenge(revealedState);
    });
  };

  function clearPendingChallenge(state: GameState): GameState {
    return {
      ...state,
      pendingChallenge: null,
    };
  }

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
