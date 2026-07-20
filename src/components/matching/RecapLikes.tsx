"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { ArrowRight, Check, Heart, PawPrint, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { JaugeNiveau, LIBELLE_NIVEAU } from "@/components/adoption/compatibilite-ui";
import type { CarteMatch } from "./MatchingExperience";

interface Props {
  chats: CarteMatch[];
  aDesIncompatibles: boolean;
  onRecommencer: () => void;
  onVoirRisques: () => void;
}

/**
 * Écran de fin quand l'adoptant a eu au moins un coup de cœur : on lui rappelle
 * pourquoi chaque chat choisi lui va bien, et on l'invite à déposer une demande.
 */
export default function RecapLikes({
  chats,
  aDesIncompatibles,
  onRecommencer,
  onVoirRisques,
}: Props) {
  const reduced = useReducedMotion() ?? false;

  return (
    <section className="relative mx-auto max-w-4xl px-5 py-14 md:px-8 md:py-20">
      {/* Cœurs flottants en fond, discrets */}
      {!reduced && (
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
          {[0, 1, 2, 3].map((i) => (
            <motion.span
              key={i}
              className="absolute text-primary/10"
              style={{ left: `${12 + i * 24}%`, bottom: -40 }}
              animate={{ y: [-40, -320], opacity: [0, 1, 0] }}
              transition={{ duration: 6 + i, repeat: Infinity, delay: i * 1.2, ease: "easeOut" }}
            >
              <Heart className="h-10 w-10" />
            </motion.span>
          ))}
        </div>
      )}

      <div className="text-center">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-primary-50 px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary">
          <Heart className="h-3.5 w-3.5" aria-hidden="true" />
          Vos coups de cœur
        </span>
        <h1 className="mt-3 font-display text-3xl font-bold text-text md:text-4xl">
          {chats.length} coup{chats.length > 1 ? "s" : ""} de cœur
        </h1>
        <p className="mt-2 text-text-secondary">
          Voici pourquoi {chats.length > 1 ? "ils iraient" : "il irait"} bien
          avec toi.
        </p>
      </div>

      <ul className="mt-10 grid gap-6 sm:grid-cols-2">
        {chats.map((c, i) => (
          <motion.li
            key={c.slug}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08, duration: 0.4, ease: "easeOut" }}
            className="flex flex-col overflow-hidden rounded-2xl bg-surface ring-1 ring-border"
          >
            <Link href={`/adoption/${c.slug}`} className="group relative block aspect-[4/3] overflow-hidden bg-primary-50">
              {c.imageUrl ? (
                <Image
                  src={c.imageUrl}
                  alt={c.imageAlt}
                  fill
                  sizes="(min-width:640px) 20rem, 100vw"
                  className="object-cover transition duration-500 group-hover:scale-105 motion-reduce:group-hover:scale-100"
                />
              ) : (
                <div className="flex h-full items-center justify-center text-primary/40">
                  <PawPrint className="h-14 w-14" aria-hidden="true" />
                </div>
              )}
            </Link>

            <div className="flex flex-1 flex-col p-5">
              <div className="flex items-center justify-between gap-2">
                <h2 className="font-display text-xl font-bold text-text">{c.nom}</h2>
              </div>
              <p className="mt-1 text-xs font-medium text-text-secondary">
                {LIBELLE_NIVEAU[c.niveau]}
              </p>
              <div className="mt-2">
                <JaugeNiveau niveau={c.niveau} />
              </div>

              {c.raisons.length > 0 && (
                <ul className="mt-3 space-y-1.5 text-sm text-text-secondary">
                  {c.raisons.map((r) => (
                    <li key={r} className="flex items-start gap-2">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-green-600" aria-hidden="true" />
                      {r}
                    </li>
                  ))}
                </ul>
              )}

              <div className="mt-4 flex flex-col gap-2">
                <Button href={`/adoption/${c.slug}/demande`} variant="primary" size="sm" iconLeft={Heart} iconRight={ArrowRight}>
                  Faire une demande d&apos;adoption
                </Button>
                <Link
                  href={`/adoption/${c.slug}`}
                  className="text-center text-sm font-semibold text-primary transition hover:text-primary-dark"
                >
                  Voir la fiche de {c.nom}
                </Link>
              </div>
            </div>
          </motion.li>
        ))}
      </ul>

      <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
        <Button variant="outlined-primary" size="md" onClick={onRecommencer} iconLeft={RotateCcw}>
          Recommencer
        </Button>
        {aDesIncompatibles && (
          <button
            type="button"
            onClick={onVoirRisques}
            className="text-sm font-semibold text-text-secondary underline underline-offset-4 transition hover:text-text"
          >
            Voir les chats moins compatibles
          </button>
        )}
      </div>
    </section>
  );
}
