import { Action } from "@/app/data/actions";
import { cn } from "@/app/lib/utils";
import { PlayerData } from "@/app/types/game";
import { IconAlertHexagon, IconAlertTriangle } from "@tabler/icons-react";
import TargetSelector from "./TargetSelector";

type ModalProps = {
  action: Action;
  onCancel: () => void;
  onConfirm: () => void;
  isBluff: boolean;
  players: PlayerData[];
  currentPlayerId: string;
  targetPlayerId?: string | null;
  setTargetPlayerId: React.Dispatch<React.SetStateAction<string | null>>;
};

export default function ConfirmationModal({
  action,
  onCancel,
  onConfirm,
  isBluff,
  players,
  currentPlayerId,
  targetPlayerId,
  setTargetPlayerId,
}: ModalProps) {
  const Icon = action.icon;
  const requiresTarget = action.id === "steal" || action.id === "assassinate";
  const isConfirmDisabled = requiresTarget && !targetPlayerId;

  return (
    <div className="w-full fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
      <div
        className={cn(
          "w-full rounded-2xl border border-cyan-400/30",
          "bg-slate-950 p-10 shadow-2xl",
          requiresTarget ? "max-w-[800px]" : "max-w-[500px]",
        )}
      >
        <header className="mb-6 text-center">
          <h2 className="text-2xl font-bold text-cyan-100 relative align-center">
            <div>Confirm your action</div>
            {isBluff && (
              <IconAlertHexagon className="absolute right-2 top-2 h-6 w-6 text-yellow-300" />
            )}
          </h2>
          <div className="flex flex-col items-center p-4 gap-1">
            <div className="mt-2 text-cyan-200 text-2xl font-bold">
              {action.label}
            </div>
            <Icon className="text-cyan-200" />
            <div className="text-cyan-200">{action.description}</div>
          </div>
        </header>

        {action.id === "steal" && (
          <TargetSelector
            players={players}
            targetPlayerId={targetPlayerId}
            onSelectTarget={setTargetPlayerId}
            currentPlayerId={currentPlayerId}
          />
        )}

        {action.id === "assassinate" && (
          <TargetSelector
            players={players}
            targetPlayerId={targetPlayerId}
            onSelectTarget={setTargetPlayerId}
            currentPlayerId={currentPlayerId}
          />
        )}

        <footer className="mt-8 flex justify-between gap-3">
          <button
            type="button"
            onClick={onCancel}
            className="rounded-lg bg-slate-800 px-4 py-2 text-slate-200 hover:bg-slate-700 cursor-pointer"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={onConfirm}
            disabled={isConfirmDisabled}
            className="
              rounded-lg bg-cyan-500 px-4 py-2 
              font-bold text-slate-950 disabled:cursor-not-allowed 
              disabled:opacity-40 cursor-pointer hover:bg-cyan-600"
          >
            Confirm
          </button>
        </footer>

        <div className="flex text-cyan-200 gap-3 border-t-2 border-cyan-500 mt-10 p-2">
          <IconAlertTriangle />
          <div>Anyone can challenge your claim.</div>
        </div>
      </div>
    </div>
  );
}
