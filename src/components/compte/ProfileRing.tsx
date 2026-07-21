"use client";

import { useEffect } from "react";
import {
  motion,
  useMotionValue,
  useTransform,
  animate,
} from "motion/react";

interface Props {
  pct: number;
  /** Diamètre du cercle en px. */
  size?: number;
  stroke?: number;
}

/**
 * Anneau de progression animé pour la complétion du profil.
 * Le tracé se remplit au montage et le pourcentage s'incrémente en parallèle.
 */
export default function ProfileRing({ pct, size = 132, stroke = 10 }: Props) {
  const clamped = Math.min(100, Math.max(0, pct));
  const r = (size - stroke) / 2;
  const circumference = 2 * Math.PI * r;

  const progress = useMotionValue(0);
  const dashoffset = useTransform(
    progress,
    (v) => circumference - (v / 100) * circumference
  );
  const rounded = useTransform(progress, (v) => Math.round(v));

  useEffect(() => {
    const controls = animate(progress, clamped, {
      duration: 1.1,
      ease: "easeOut",
    });
    return () => controls.stop();
  }, [clamped, progress]);

  return (
    <div
      className="relative shrink-0"
      style={{ width: size, height: size }}
      role="img"
      aria-label={`Profil complété à ${clamped}%`}
    >
      <svg width={size} height={size} className="-rotate-90">
        <defs>
          <linearGradient id="profile-ring" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="var(--color-secondary)" />
            <stop offset="55%" stopColor="var(--color-primary)" />
            <stop offset="100%" stopColor="var(--color-primary-vif)" />
          </linearGradient>
        </defs>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke="var(--color-bg-alt)"
          strokeWidth={stroke}
        />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke="url(#profile-ring)"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={circumference}
          style={{ strokeDashoffset: dashoffset }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="font-display text-3xl font-bold text-text">
          <motion.span>{rounded}</motion.span>%
        </span>
        <span className="text-xs font-semibold uppercase tracking-wider text-text-muted">
          Profil
        </span>
      </div>
    </div>
  );
}
