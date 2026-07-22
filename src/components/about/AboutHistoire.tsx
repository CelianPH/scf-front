"use client";

import { useLayoutEffect, useRef, useState, useEffect } from "react";
import {
  motion,
  useScroll,
  useTransform,
  type MotionValue,
} from "motion/react";
import Reveal from "@/components/layout/Reveal";
import { RichText } from "@/components/ui/RichText";
import type { AboutHistoire as AboutHistoireData, AboutJalon as Jalon } from "@/types/strapi";

// ViewBox 100x200 (path zigzag entre 5 nœuds)
const NODES = [
  { x: 25, y: 20 },
  { x: 75, y: 60 },
  { x: 25, y: 100 },
  { x: 75, y: 140 },
  { x: 25, y: 180 },
];

const PATH_D =
  "M 25 20 " +
  "C 25 40 75 40 75 60 " +
  "C 75 80 25 80 25 100 " +
  "C 25 120 75 120 75 140 " +
  "C 75 160 25 160 25 180";

// Pourcentages le long du path pour les empreintes (7 empreintes espacées)
const PAW_PROGRESSES = [0.06, 0.18, 0.3, 0.42, 0.55, 0.7, 0.85];

function CatHead() {
  return (
    <g className="text-primary">
      {/* oreilles (derrière la tête) */}
      <path d="M -3.8 -2.6 L -4.6 -6 L -1.4 -3.6 Z" fill="currentColor" />
      <path d="M 3.8 -2.6 L 4.6 -6 L 1.4 -3.6 Z" fill="currentColor" />
      {/* intérieur oreilles */}
      <path d="M -3.6 -3.1 L -4 -5.2 L -2.5 -3.7 Z" fill="#FFE4EF" />
      <path d="M 3.6 -3.1 L 4 -5.2 L 2.5 -3.7 Z" fill="#FFE4EF" />
      {/* tête */}
      <circle cx="0" cy="0" r="4.5" fill="currentColor" />
      {/* yeux (blanc + pupille) */}
      <ellipse cx="-1.7" cy="-0.5" rx="0.7" ry="1" fill="white" />
      <ellipse cx="1.7" cy="-0.5" rx="0.7" ry="1" fill="white" />
      <circle cx="-1.7" cy="-0.3" r="0.4" fill="#1a0e24" />
      <circle cx="1.7" cy="-0.3" r="0.4" fill="#1a0e24" />
      {/* nez */}
      <path d="M -0.5 0.9 L 0.5 0.9 L 0 1.6 Z" fill="#FFB3CE" />
      {/* bouche */}
      <path
        d="M 0 1.6 Q -0.7 2.3 -1.1 1.9 M 0 1.6 Q 0.7 2.3 1.1 1.9"
        stroke="#FFE4EF"
        strokeWidth="0.25"
        fill="none"
        strokeLinecap="round"
      />
      {/* moustaches gauches */}
      <line x1="-2.2" y1="0.9" x2="-5.5" y2="0.5" stroke="currentColor" strokeWidth="0.2" strokeLinecap="round" />
      <line x1="-2.2" y1="1.4" x2="-5.5" y2="1.6" stroke="currentColor" strokeWidth="0.2" strokeLinecap="round" />
      {/* moustaches droites */}
      <line x1="2.2" y1="0.9" x2="5.5" y2="0.5" stroke="currentColor" strokeWidth="0.2" strokeLinecap="round" />
      <line x1="2.2" y1="1.4" x2="5.5" y2="1.6" stroke="currentColor" strokeWidth="0.2" strokeLinecap="round" />
    </g>
  );
}

function PawPrint({
  progress,
  pathRef,
  pathLength,
  scrollYProgress,
}: {
  progress: number;
  pathRef: React.RefObject<SVGPathElement | null>;
  pathLength: number;
  scrollYProgress: MotionValue<number>;
}) {
  const [pos, setPos] = useState<{ x: number; y: number; angle: number } | null>(
    null,
  );

  useEffect(() => {
    if (pathRef.current && pathLength > 0) {
      const len = progress * pathLength;
      const p = pathRef.current.getPointAtLength(len);
      const ahead = pathRef.current.getPointAtLength(
        Math.min(pathLength, len + 0.5),
      );
      const angle =
        (Math.atan2(ahead.y - p.y, ahead.x - p.x) * 180) / Math.PI;
      setPos({ x: p.x, y: p.y, angle });
    }
  }, [pathRef, pathLength, progress]);

  const opacity = useTransform(scrollYProgress, (v) => {
    if (v < progress - 0.01) return 0;
    if (v > progress + 0.05) return 0.55;
    return ((v - (progress - 0.01)) / 0.06) * 0.55;
  });

  if (!pos) return null;

  // Pas alterné gauche/droite par rapport au path
  const side = Math.floor(progress * 100) % 2 === 0 ? -2 : 2;
  const offsetX = -Math.sin((pos.angle * Math.PI) / 180) * side;
  const offsetY = Math.cos((pos.angle * Math.PI) / 180) * side;

  return (
    <motion.g
      style={{ opacity }}
      transform={`translate(${pos.x + offsetX} ${pos.y + offsetY}) rotate(${
        pos.angle + 90
      })`}
      className="text-primary/55"
    >
      {/* coussinet central en forme de rein */}
      <path
        d="M -1.4 0.3 C -1.4 -0.7 -0.6 -0.9 0 -0.4 C 0.6 -0.9 1.4 -0.7 1.4 0.3 C 1.4 1.5 0.7 1.7 0 1.4 C -0.7 1.7 -1.4 1.5 -1.4 0.3 Z"
        fill="currentColor"
      />
      {/* 4 doigts en éventail */}
      <ellipse cx="-1.7" cy="-1.9" rx="0.6" ry="0.85" fill="currentColor" />
      <ellipse cx="-0.6" cy="-2.5" rx="0.6" ry="0.85" fill="currentColor" />
      <ellipse cx="0.6" cy="-2.5" rx="0.6" ry="0.85" fill="currentColor" />
      <ellipse cx="1.7" cy="-1.9" rx="0.6" ry="0.85" fill="currentColor" />
    </motion.g>
  );
}

function PathNode({
  x,
  y,
  index,
  total,
  scrollYProgress,
}: {
  x: number;
  y: number;
  index: number;
  total: number;
  scrollYProgress: MotionValue<number>;
}) {
  const nodeProgress = total > 1 ? index / (total - 1) : 0.5;

  const reached = useTransform(scrollYProgress, (v) =>
    v >= nodeProgress - 0.005 ? 1 : 0,
  );
  const r = useTransform(
    scrollYProgress,
    [nodeProgress - 0.04, nodeProgress, nodeProgress + 0.04],
    [2.2, 3.2, 2.6],
  );
  const ringR = useTransform(
    scrollYProgress,
    [nodeProgress - 0.05, nodeProgress, nodeProgress + 0.1],
    [3, 5, 6],
  );
  const ringOpacity = useTransform(
    scrollYProgress,
    [nodeProgress - 0.05, nodeProgress, nodeProgress + 0.1],
    [0, 0.6, 0],
  );

  return (
    <g>
      {/* anneau pulse au passage */}
      <motion.circle
        cx={x}
        cy={y}
        r={ringR}
        fill="none"
        stroke="currentColor"
        strokeWidth="0.4"
        className="text-primary"
        style={{ opacity: ringOpacity }}
      />
      {/* anneau gris en attente */}
      <circle
        cx={x}
        cy={y}
        r="2.6"
        fill="var(--color-bg)"
        stroke="var(--color-border)"
        strokeWidth="0.8"
      />
      {/* point coloré une fois atteint */}
      <motion.circle
        cx={x}
        cy={y}
        r={r}
        fill="currentColor"
        className="text-primary"
        style={{ opacity: reached }}
      />
    </g>
  );
}

function MilestoneContent({
  jalon,
  index,
  total,
  scrollYProgress,
}: {
  jalon: Jalon;
  index: number;
  total: number;
  scrollYProgress: MotionValue<number>;
}) {
  const cx = total > 1 ? index / (total - 1) : 0.5;
  const window = 0.5 / total; // demi-segment d'activation

  // Distance signée au centre du jalon
  const offset = useTransform(scrollYProgress, (v) => (v - cx) / window);
  // Opacité : fade-in serré juste avant l'arrivée du chat sur la bulle, puis hold, puis fade-out
  const opacity = useTransform(offset, [-0.35, 0, 0.85, 1.3], [0, 1, 1, 0]);
  // Slide-in vertical : vient du bas, sort par le haut
  const yOff = useTransform(offset, [-0.35, 0, 0.85, 1.3], [30, 0, 0, -30]);

  return (
    <motion.div
      style={{ opacity, y: yOff }}
      className="absolute left-0 right-0 top-1/2 mx-auto -translate-y-1/2 max-w-lg pl-10 will-change-transform"
    >
      <span className="inline-flex items-center rounded-full border border-primary/30 bg-primary/5 px-3 py-1 text-xs font-bold uppercase tracking-[0.25em] text-primary">
        {jalon.annee}
      </span>
      <h3 className="mt-4 font-display text-3xl font-bold leading-tight text-text lg:text-4xl">
        {jalon.titre}
      </h3>
      <RichText
        html={jalon.description}
        className="mt-4 text-base leading-relaxed text-text-secondary lg:text-lg [&_p:not(:first-child)]:mt-3 [&_a]:rounded-sm [&_a]:text-primary [&_a]:underline [&_a]:underline-offset-2 [&_a]:transition-colors [&_a]:duration-200 [&_a]:ease-out [&_a:hover]:text-primary-dark [&_a:focus-visible]:outline-2 [&_a:focus-visible]:outline-offset-2 [&_a:focus-visible]:outline-primary [&_strong]:font-semibold [&_strong]:text-text"
      />
    </motion.div>
  );
}

interface AboutHistoireProps {
  data: AboutHistoireData;
}

export default function AboutHistoire({ data }: AboutHistoireProps) {
  const jalons = data.jalons;
  const label = data.label ?? "Notre parcours";
  const titre = data.titre;
  const description = data.description;

  const containerRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const [pathLength, setPathLength] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  useLayoutEffect(() => {
    const compute = () => {
      if (pathRef.current) {
        setPathLength(pathRef.current.getTotalLength());
      }
    };
    compute();
    window.addEventListener("resize", compute);
    return () => window.removeEventListener("resize", compute);
  }, []);

  // Path qui se "remplit" : dashoffset va de pathLength → 0
  const dashOffset = useTransform(
    scrollYProgress,
    (v) => pathLength * (1 - v),
  );

  // Position du chat le long du path
  const catX = useTransform(scrollYProgress, (v) => {
    if (!pathRef.current || !pathLength) return NODES[0].x;
    return pathRef.current.getPointAtLength(v * pathLength).x;
  });
  const catY = useTransform(scrollYProgress, (v) => {
    if (!pathRef.current || !pathLength) return NODES[0].y;
    return pathRef.current.getPointAtLength(v * pathLength).y;
  });
  // Petite oscillation horizontale "marche" (pas frénétique)
  const catWobble = useTransform(scrollYProgress, (v) => {
    return Math.sin(v * 18) * 0.4;
  });

  const catXWithWobble = useTransform(
    [catX, catWobble] as MotionValue<number>[],
    ([x, w]: number[]) => x + w,
  );

  return (
    <section aria-labelledby="histoire-titre" className="bg-bg">
      {/* Mobile : timeline classique (toujours dans le DOM pour accessibilité) */}
      <div className="md:sr-only">
        <div className="mx-auto max-w-7xl px-5 py-16">
          <Reveal className="mx-auto max-w-2xl text-center">
            <span className="text-sm font-semibold uppercase tracking-wider text-primary">
              {label}
            </span>
            <h2
              id="histoire-titre"
              className="mt-2 font-display text-3xl font-bold text-text"
            >
              {titre}
            </h2>
            {description ? (
              <p className="mt-3 text-base text-text-secondary">
                {description}
              </p>
            ) : null}
          </Reveal>

          <ol
            aria-label="Chronologie de l'association"
            className="relative mx-auto mt-12 max-w-3xl"
          >
            <span
              aria-hidden="true"
              className="absolute left-[108px] bottom-3 top-3 w-px bg-gradient-to-b from-primary/40 via-secondary-light/40 to-border"
            />
            {jalons.map((j, i) => (
              <Reveal
                as="li"
                key={j.id}
                delay={i * 100}
                className="relative pl-[128px]"
              >
                <span className="absolute left-0 top-1 w-24 text-right font-display text-xs font-bold uppercase tracking-wider text-primary">
                  {j.annee}
                </span>
                <span
                  aria-hidden="true"
                  className="absolute left-[108px] top-2 h-2.5 w-2.5 -translate-x-1/2 rounded-full bg-primary ring-4 ring-bg"
                />
                <div
                  className={`pb-10 ${i === jalons.length - 1 ? "pb-0" : ""}`}
                >
                  <h3 className="font-display text-xl font-bold text-text">
                    {j.titre}
                  </h3>
                  <RichText
                    html={j.description}
                    className="mt-2 text-base leading-relaxed text-text-secondary [&_p:not(:first-child)]:mt-3 [&_a]:rounded-sm [&_a]:text-primary [&_a]:underline [&_a]:underline-offset-2 [&_a]:transition-colors [&_a]:duration-200 [&_a]:ease-out [&_a:hover]:text-primary-dark [&_a:focus-visible]:outline-2 [&_a:focus-visible]:outline-offset-2 [&_a:focus-visible]:outline-primary [&_strong]:font-semibold [&_strong]:text-text"
                  />
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>

      {/* Desktop : fil d'Ariane avec chat qui marche */}
      <div
        ref={containerRef}
        className="relative hidden md:block"
        style={{ height: `${jalons.length * 100}vh` }}
      >
        <div className="sticky top-0 h-screen w-full overflow-hidden">
          {/* En-tête fixe — purement décoratif. Le vrai H2 est dans la branche mobile (md:sr-only) pour rester unique. */}
          <div
            className="absolute left-1/2 top-10 z-20 -translate-x-1/2 text-center"
            aria-hidden="true"
          >
            <span className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">
              {label}
            </span>
            <p className="mt-2 font-display text-2xl font-bold text-text md:text-3xl">
              {titre}
            </p>
          </div>

          {/* Grille principale : SVG à gauche, contenus à droite */}
          <div className="relative mx-auto flex h-full max-w-6xl px-8 pb-12 pt-32">
            {/* SVG */}
            <div className="relative h-full w-[42%]">
              <svg
                viewBox="0 0 100 200"
                preserveAspectRatio="xMidYMid meet"
                className="absolute inset-0 h-full w-full"
                aria-hidden="true"
              >
                {/* Path "futur" : pointillés gris */}
                <path
                  d={PATH_D}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="0.7"
                  strokeDasharray="1.2 1.6"
                  strokeLinecap="round"
                  className="text-text-muted/40"
                />
                {/* Path "parcouru" : se remplit en primary */}
                <motion.path
                  ref={pathRef}
                  d={PATH_D}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.1"
                  strokeLinecap="round"
                  className="text-primary"
                  style={{
                    strokeDasharray: pathLength,
                    strokeDashoffset: dashOffset,
                  }}
                />

                {/* Empreintes de pattes */}
                {PAW_PROGRESSES.map((p) => (
                  <PawPrint
                    key={p}
                    progress={p}
                    pathRef={pathRef}
                    pathLength={pathLength}
                    scrollYProgress={scrollYProgress}
                  />
                ))}

                {/* Nœuds (jalons) */}
                {NODES.map((n, i) => (
                  <PathNode
                    key={i}
                    x={n.x}
                    y={n.y}
                    index={i}
                    total={NODES.length}
                    scrollYProgress={scrollYProgress}
                  />
                ))}

                {/* Le chat (face-on, toujours droit) */}
                <motion.g
                  style={{
                    x: catXWithWobble,
                    y: catY,
                  }}
                >
                  <CatHead />
                </motion.g>
              </svg>
            </div>

            {/* Contenus (cross-fade : un seul jalon visible à la fois) */}
            <div className="relative flex-1">
              {jalons.map((j, i) => (
                <MilestoneContent
                  key={j.id}
                  jalon={j}
                  index={i}
                  total={jalons.length}
                  scrollYProgress={scrollYProgress}
                />
              ))}
            </div>
          </div>

          {/* Hint de scroll (visible uniquement au démarrage) */}
          <ScrollHint scrollYProgress={scrollYProgress} />
        </div>
      </div>
    </section>
  );
}

function ScrollHint({
  scrollYProgress,
}: {
  scrollYProgress: MotionValue<number>;
}) {
  const opacity = useTransform(scrollYProgress, [0, 0.04], [1, 0]);
  const y = useTransform(scrollYProgress, [0, 1], [0, 8]);

  return (
    <motion.div
      style={{ opacity, y }}
      className="pointer-events-none absolute bottom-6 left-1/2 z-20 flex -translate-x-1/2 flex-col items-center gap-2 text-center"
      aria-hidden="true"
    >
      <span className="text-[11px] font-semibold uppercase tracking-[0.3em] text-text-muted">
        Scrollez pour suivre le chat
      </span>
      <svg
        width="14"
        height="20"
        viewBox="0 0 14 20"
        fill="none"
        className="text-text-muted"
      >
        <rect
          x="1"
          y="1"
          width="12"
          height="18"
          rx="6"
          stroke="currentColor"
          strokeWidth="1"
        />
        <motion.circle
          cx="7"
          cy="6"
          r="1.5"
          fill="currentColor"
          animate={{ cy: [6, 12, 6] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
        />
      </svg>
    </motion.div>
  );
}

