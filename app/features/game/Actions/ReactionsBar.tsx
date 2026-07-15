type ReactionsBarProps = {
  isResponderPlayer: boolean;
  onAllow: () => void;
  onChallenge: () => void;
};

export default function ReactionsBar({
  isResponderPlayer,
  onAllow,
  onChallenge,
}: ReactionsBarProps) {
  return (
    <div className="flex gap-4 mt-4 justify-center">
      <button
        className="flex-1 bg-red-600 p-2 rounded-3xl cursor-pointer text-slate-100"
        type="button"
        onClick={onChallenge}
      >
        Challenge
      </button>
      {isResponderPlayer && (
        <button
          className="flex-1 bg-green-600 p-1 rounded-3xl cursor-pointer text-slate-100"
          type="button"
          onClick={onAllow}
        >
          Allow
        </button>
      )}
    </div>
  );
}
