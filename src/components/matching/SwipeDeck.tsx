"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Heart, RotateCcw, X } from "lucide-react";
import type { CarteMatch } from "./MatchingExperience";
import SwipeCard from "./SwipeCard";

interface Props {
  cartes: CarteMatch[];
  index: number;
  onLike: (slug: string) => void;
  onPass: () => void;
  onAnnuler: () => void;
}

/**
 * Sortie de la carte validée : elle part en fling du côté choisi. En
 * reduced-motion, simple fondu. `custom` porte { dir, reduced }.
 */
const exitVariants = {
  exit: ({ dir, reduced }: { dir: 1 | -1; reduced: boolean }) =>
    reduced
      ? { opacity: 0, transition: { duration: 0.15 } }
      : {
          x:
            dir *
            (typeof window !== "undefined" ? window.innerWidth : 500) *
            1.1,
          rotate: dir * 22,
          opacity: 0,
          transition: { duration: 0.35, ease: "easeOut" as const },
        },
};

/**
 * La pile de cartes. La carte du dessus est draggable ; les deux suivantes sont
 * visibles en léger retrait. Les boutons ✕ / ❤ rejouent la même décision que le
 * geste (et restent le seul chemin en reduced-motion). L'exit part sur le côté
 * choisi via AnimatePresence.
 */
export default function SwipeDeck({
  cartes,
  index,
  onLike,
  onPass,
  onAnnuler,
}: Props) {
  const reduced = useReducedMotion() ?? false;
  const [sortie, setSortie] = useState<1 | -1>(1);
  const [annonce, setAnnonce] = useState("");
  const conteneur = useRef<HTMLDivElement>(null);

  const carteActuelle = cartes[index];
  // On garde jusqu'à 3 cartes empilées (dessus + 2 en fond).
  const pile = cartes.slice(index, index + 3);

  const decider = useCallback(
    (dir: 1 | -1) => {
      const c = cartes[index];
      if (!c) return;
      setSortie(dir);
      setAnnonce(dir === 1 ? `${c.nom} : choisi` : `${c.nom} : passé`);
      if (dir === 1) onLike(c.slug);
      else onPass();
    },
    [cartes, index, onLike, onPass]
  );

  // Flèches clavier : ← passer, → choisir.
  useEffect(() => {
    const el = conteneur.current;
    if (!el) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        decider(-1);
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        decider(1);
      }
    };
    el.addEventListener("keydown", onKey);
    return () => el.removeEventListener("keydown", onKey);
  }, [decider]);

  const restants = cartes.length - index;

  return (
    <section className="relative isolate min-h-[calc(100vh-4rem)] overflow-hidden bg-dark">
      {/* Ambiance : halos colorés en fond sombre pour faire ressortir la photo */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -left-20 top-0 h-80 w-80 rounded-full bg-primary/30 blur-3xl" />
        <div className="absolute -right-16 top-1/3 h-72 w-72 rounded-full bg-secondary/30 blur-3xl" />
        <div className="absolute bottom-0 left-1/3 h-64 w-64 rounded-full bg-primary-accent/20 blur-3xl" />
      </div>

      {/* Images à venir préchargées, hors écran */}
      <div className="sr-only" aria-hidden="true">
        {cartes.slice(index + 1, index + 3).map((c) =>
          c.imageUrl ? (
            <Image key={c.slug} src={c.imageUrl} alt="" width={1} height={1} />
          ) : null
        )}
      </div>

      <div
        ref={conteneur}
        tabIndex={0}
        role="group"
        aria-label="Cartes de chats à choisir. Flèche gauche pour passer, flèche droite pour choisir."
        className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-sm flex-col items-center justify-center px-5 py-8 outline-none"
      >
        {/* Progression en points, jamais en chiffres */}
        <div className="mb-5 flex items-center gap-1.5" aria-hidden="true">
          {cartes.map((c, i) => (
            <span
              key={c.slug}
              className={`h-1.5 rounded-full transition-all ${
                i < index
                  ? "w-1.5 bg-white/30"
                  : i === index
                    ? "w-6 bg-white"
                    : "w-1.5 bg-white/40"
              }`}
            />
          ))}
        </div>

        {/* La pile */}
        <div className="relative aspect-[3/4] w-full">
          <AnimatePresence custom={{ dir: sortie, reduced }}>
            {carteActuelle && (
              <motion.div
                key={carteActuelle.slug}
                className="absolute inset-0"
                custom={{ dir: sortie, reduced }}
                variants={exitVariants}
                exit="exit"
              >
                <SwipeCard
                  carte={carteActuelle}
                  rang={0}
                  interactif
                  reduced={reduced}
                  onDecide={decider}
                />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Cartes de fond (statiques, non interactives) */}
          {pile.slice(1).map((c, i) => (
            <SwipeCard
              key={c.slug}
              carte={c}
              rang={i + 1}
              interactif={false}
              reduced={reduced}
              onDecide={() => {}}
            />
          ))}
        </div>

        {/* Boutons — fallback geste + chemin unique en reduced-motion */}
        <div className="mt-6 flex items-center gap-5">
          <button
            type="button"
            onClick={() => decider(-1)}
            aria-label="Passer ce chat"
            className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-white/10 text-white ring-1 ring-white/25 backdrop-blur transition hover:bg-white hover:text-rose-500 focus-visible:outline-2 focus-visible:outline-white"
          >
            <X className="h-6 w-6" aria-hidden="true" />
          </button>

          <button
            type="button"
            onClick={onAnnuler}
            disabled={index === 0}
            aria-label="Annuler la dernière décision"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white/80 ring-1 ring-white/20 backdrop-blur transition hover:bg-white/20 disabled:opacity-30 focus-visible:outline-2 focus-visible:outline-white"
          >
            <RotateCcw className="h-4 w-4" aria-hidden="true" />
          </button>

          <button
            type="button"
            onClick={() => decider(1)}
            aria-label="Choisir ce chat"
            className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-primary to-primary-vif text-white shadow-lg shadow-primary/40 transition hover:scale-105 focus-visible:outline-2 focus-visible:outline-white"
          >
            <Heart className="h-7 w-7" aria-hidden="true" />
          </button>
        </div>

        <p className="mt-5 text-center text-xs text-white/50">
          {restants > 1 ? `Encore ${restants} chats à découvrir` : "Dernier chat !"}
          <span className="mx-2 hidden sm:inline">·</span>
          <span className="hidden sm:inline">← passer &nbsp; choisir →</span>
        </p>

        <p aria-live="polite" className="sr-only">
          {annonce}
        </p>
      </div>
    </section>
  );
}
