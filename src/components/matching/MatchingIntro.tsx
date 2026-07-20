"use client";

import { motion, useReducedMotion } from "motion/react";
import { Heart, Sparkles, X } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface Props {
  total: number;
  onStart: () => void;
}

/**
 * Écran d'accueil du matching : pose la règle du jeu (swipe droite / gauche)
 * avec une fausse carte qui oscille pour montrer le geste, sur fond sombre à
 * halos — le même univers que le deck qui suit.
 */
export default function MatchingIntro({ total, onStart }: Props) {
  const reduced = useReducedMotion() ?? false;

  return (
    <section className="relative isolate flex min-h-[calc(100vh-4rem)] items-center overflow-hidden bg-dark">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -left-24 -top-16 h-80 w-80 rounded-full bg-primary/30 blur-3xl" />
        <div className="absolute -right-16 bottom-0 h-72 w-72 rounded-full bg-secondary/30 blur-3xl" />
      </div>

      <div className="mx-auto max-w-md px-5 py-16 text-center md:py-20">
        {/* Fausse carte qui oscille pour illustrer le swipe */}
        <motion.div
          className="mx-auto mb-8 h-40 w-32 rounded-2xl bg-gradient-to-br from-primary via-primary-vif to-secondary shadow-xl shadow-primary/30 ring-1 ring-white/20"
          animate={reduced ? undefined : { x: [0, -18, 18, 0], rotate: [0, -6, 6, 0] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
          aria-hidden="true"
        >
          <div className="flex h-full items-center justify-center">
            <Heart className="h-10 w-10 text-white/90" aria-hidden="true" />
          </div>
        </motion.div>

        <motion.span
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-white backdrop-blur"
        >
          <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
          Matching
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.4 }}
          className="mt-3 font-display text-4xl font-bold text-white md:text-5xl"
        >
          Trouvez votre match
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.4 }}
          className="mt-3 text-white/80"
        >
          Nous avons analysé votre profil et vos conditions d&apos;accueil.
          Swipez à droite si le cœur dit oui, à gauche pour passer.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.4 }}
          className="mt-6 flex items-center justify-center gap-6 text-sm text-white/70"
        >
          <span className="inline-flex items-center gap-1.5">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/10 ring-1 ring-white/20">
              <X className="h-4 w-4" aria-hidden="true" />
            </span>
            Passer
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-primary to-primary-vif">
              <Heart className="h-4 w-4 text-white" aria-hidden="true" />
            </span>
            Choisir
          </span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.4 }}
        >
          <Button variant="white" size="lg" onClick={onStart} iconLeft={Heart} className="mt-8">
            C&apos;est parti
          </Button>
          <p className="mt-4 text-xs text-white/55">
            {total} chat{total > 1 ? "s" : ""} correspond
            {total > 1 ? "ent" : ""} à votre profil
          </p>
        </motion.div>
      </div>
    </section>
  );
}
