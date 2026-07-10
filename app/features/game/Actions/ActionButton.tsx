import { Action } from "@/app/data/actions";
import { IconAlertHexagon } from "@tabler/icons-react";
import { cn } from "@/app/lib/utils";

type ActionButtonProps = {
  action: Action;
  variant?: "primary" | "secondary";
  onClick?: () => void;
  disabled?: boolean;
  isBluff?: boolean;
};

export default function ActionButton({
  action,
  variant = "primary",
  onClick,
  disabled,
  isBluff,
}: ActionButtonProps) {
  const Icon = action.icon;

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "relative",
        "rounded-2xl p-4 transition place-items-center rounded-2xl text-cyan-200",
        "enabled:hover:-translate-y-0.5",
        "transition-all duration-150",
        "cursor-pointer",
        "disabled:cursor-not-allowed",
        "disabled:bg-gray-600/70",
        "disabled:text-gray-400",
        "disabled:hover:bg-gray-600/70",
        variant === "primary"
          ? "h-18 w-128 bg-rose-700/80 p-2 text-center hover:bg-rose-800/80"
          : "h-30 w-25 p-3 content-center bg-cyan-700/80 hover:bg-cyan-800/80",
      )}
    >
      {isBluff && (
        <IconAlertHexagon className="absolute left-2 top-2 h-6 w-6 text-yellow-300" />
      )}
      <Icon className="mx-auto h-8 w-8" />
      <span>{action.label}</span>
    </button>
  );
}
