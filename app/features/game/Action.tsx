export default function Action({ label }: { label: string }) {
  return (
    <div className="flex flex-col items-center gap-1">
      <div className="grid h-10 w-10 place-items-center rounded-full bg-cyan-700/80">
        ⚓
      </div>
      <span>{label}</span>
    </div>
  );
}
