export default function ActionHistory({ log }: { log: string[] }) {
  return (
    <div className="flex items-center justify-between text-xs text-cyan-100">
      <ul className="mt-2 space-y-2">
        {log.map((entry, index) => (
          <li key={index} className="text-sm text-cyan-200">
            {entry}
          </li>
        ))}
      </ul>
    </div>
  );
}
