"use client";

import zxcvbn from "zxcvbn";

interface Props {
  password: string;
}

const LABELS = ["Très faible", "Faible", "Moyen", "Bon", "Excellent"];
const COLORS = ["bg-red-500", "bg-orange-500", "bg-amber-500", "bg-lime-500", "bg-green-600"];

export default function PasswordStrengthMeter({ password }: Props) {
  if (!password) return null;
  const score = zxcvbn(password).score; // 0..4
  const pct = ((score + 1) / 5) * 100;

  return (
    <div className="mt-2">
      <div className="h-1.5 w-full overflow-hidden rounded-full bg-border">
        <div
          className={`h-full ${COLORS[score]} transition-[width] duration-200`}
          style={{ width: `${pct}%` }}
        />
      </div>
      <p className="mt-1 text-xs text-text-secondary">
        Force : <span className="font-semibold text-text">{LABELS[score]}</span>
      </p>
    </div>
  );
}
