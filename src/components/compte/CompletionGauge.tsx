interface Props {
  pct: number;
}

export default function CompletionGauge({ pct }: Props) {
  const clamped = Math.min(100, Math.max(0, pct));
  return (
    <div>
      <div className="flex items-baseline justify-between">
        <p className="text-sm font-semibold text-text-secondary">
          Profil
        </p>
        <p className="font-display text-2xl font-bold text-primary">
          {clamped}%
        </p>
      </div>
      <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-bg-alt ring-1 ring-border">
        <div
          className="h-full rounded-full bg-gradient-to-r from-secondary via-primary to-primary-vif transition-[width] duration-500"
          style={{ width: `${clamped}%` }}
        />
      </div>
    </div>
  );
}
