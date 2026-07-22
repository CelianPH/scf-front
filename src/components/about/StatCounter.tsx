"use client";

import { useEffect, useRef } from "react";
import {
  motion,
  animate,
  useInView,
  useMotionValue,
  useTransform,
} from "motion/react";

interface StatCounterProps {
  /** Valeur telle que saisie en base, ex. "1 200", "10 ans", "100 %", "2015". */
  value: string;
}

/**
 * Extrait la partie numérique d'une valeur libre pour pouvoir l'animer,
 * en conservant le préfixe et le suffixe (unité, %, mot…).
 */
function parseValue(value: string) {
  const match = value.match(/\d[\d\s .,]*\d|\d/);
  if (!match) return null;

  const raw = match[0];
  const start = match.index ?? 0;
  const normalized = raw.replace(/[\s ]/g, "").replace(",", ".");
  const num = Number(normalized);
  if (!Number.isFinite(num)) return null;

  return {
    prefix: value.slice(0, start),
    suffix: value.slice(start + raw.length),
    num,
    decimals: (normalized.split(".")[1] ?? "").length,
  };
}

export default function StatCounter({ value }: StatCounterProps) {
  const parsed = parseValue(value);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15% 0px" });

  const mv = useMotionValue(0);
  const text = useTransform(mv, (v) =>
    v.toLocaleString("fr-FR", {
      minimumFractionDigits: parsed?.decimals ?? 0,
      maximumFractionDigits: parsed?.decimals ?? 0,
    })
  );

  useEffect(() => {
    if (!parsed || !inView) return;
    const controls = animate(mv, parsed.num, { duration: 1.4, ease: "easeOut" });
    return () => controls.stop();
  }, [inView, parsed, mv]);

  // Valeur non numérique (ou animations réduites gérées par motion) : rendu brut.
  if (!parsed) return <span ref={ref}>{value}</span>;

  return (
    <span ref={ref}>
      {parsed.prefix}
      <motion.span>{text}</motion.span>
      {parsed.suffix}
    </span>
  );
}
