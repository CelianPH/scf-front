"use client";

import { useEffect, useRef } from "react";
import {
  motion,
  animate,
  useInView,
  useMotionValue,
  useTransform,
} from "motion/react";

interface CollecteProgressProps {
  progress: number; // 0–100
  collected: number;
  remaining: number;
}

/**
 * Jauge de collecte : la barre se remplit et le pourcentage s'incrémente
 * quand la section entre dans le viewport (une seule fois).
 */
export default function CollecteProgress({
  progress,
  collected,
  remaining,
}: CollecteProgressProps) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15% 0px" });

  const mv = useMotionValue(0);
  const width = useTransform(mv, (v) => `${v}%`);
  const pctText = useTransform(mv, (v) => `${Math.round(v)}%`);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(mv, progress, { duration: 1.4, ease: "easeOut" });
    return () => controls.stop();
  }, [inView, progress, mv]);

  return (
    <figure
      ref={ref}
      aria-label={`Avancement de la collecte : ${progress}%`}
      className="mt-7 rounded-xl border border-border bg-surface p-5 shadow-sm md:p-6"
    >
      <div className="flex items-baseline justify-between gap-3">
        <span className="font-display text-2xl font-bold text-primary md:text-3xl">
          <motion.span>{pctText}</motion.span>
        </span>
        <span className="text-sm text-text-muted md:text-base">
          de l&apos;objectif global atteint
        </span>
      </div>
      <div
        className="mt-3 h-2.5 w-full overflow-hidden rounded-full bg-primary-50"
        role="progressbar"
        aria-valuenow={progress}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-secondary to-primary"
          style={{ width }}
        />
      </div>
      <figcaption className="mt-3 text-sm text-text-secondary">
        <strong className="font-semibold text-text">
          {collected.toLocaleString("fr-FR")} €
        </strong>{" "}
        déjà collectés en phase 1.{" "}
        <strong className="font-semibold text-text">
          {remaining.toLocaleString("fr-FR")} €
        </strong>{" "}
        restent à réunir pour finir l&apos;enclos extérieur.
      </figcaption>
    </figure>
  );
}
