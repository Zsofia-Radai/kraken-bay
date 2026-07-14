import { getActionHistoryText } from "@/app/lib/actionUtils";
import { PendingAction, PlayerData } from "@/app/types/game";

type ActionHistoryProps = {
  pendingAction?: PendingAction;
  players: PlayerData[];
};

export default function ActionHistory({
  pendingAction,
  players,
}: ActionHistoryProps) {
  return (
    <div className="flex items-center justify-between text-xs text-cyan-100">
      <ul className="mt-2 space-y-2">
        <li className="text-sm text-cyan-200">
          {pendingAction ? getActionHistoryText(pendingAction, players) : null}
        </li>
      </ul>
    </div>
  );
}
