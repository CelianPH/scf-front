"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { AlertTriangle, ArrowRight, PawPrint, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/Button";
import type { CarteMatch } from "./MatchingExperience";

interface Props {
  chats: CarteMatch[];
  aDesLikes: boolean;
  onRecommencer: () => void;
  onVoirRecap: () => void;
}

/**
 * Écran des chats qui ne correspondent pas aux conditions d'accueil. Rupture de
 * forme voulue : pas une pile à swiper mais une liste de « dossiers » en toute
 * transparence, chacun expliquant pourquoi ça coince. Candidater reste possible.
 */
export default function DeckIncompatibles({
  chats,
  aDesLikes,
  onRecommencer,
  onVoirRecap,
}: Props) {
  const vide = chats.length === 0;

  return (
    <section className="mx-auto max-w-3xl px-5 py-14 md:px-8 md:py-20">
      <div className="text-center">
        <h1 className="font-display text-3xl font-bold text-text md:text-4xl">
          {aDesLikes ? "Les chats moins compatibles" : "Pas de match cette fois"}
        </h1>
        <p className="mt-2 text-text-secondary">
          {vide
            ? "Aucun autre chat à vous montrer pour le moment."
            : "Ces chats ne correspondent pas à vos conditions d'accueil actuelles — on vous explique pourquoi, en toute transparence."}
        </p>
      </div>

      {!vide && (
        <ul className="mt-10 space-y-5">
          {chats.map((c, i) => (
            <motion.li
              key={c.slug}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06, duration: 0.35 }}
              className="overflow-hidden rounded-2xl border-l-4 border-amber-400 bg-surface ring-1 ring-border"
            >
              <div className="flex flex-col gap-4 p-5 sm:flex-row">
                <Link
                  href={`/adoption/${c.slug}`}
                  className="relative block h-28 w-full shrink-0 overflow-hidden rounded-xl bg-primary-50 sm:w-28"
                >
                  {c.imageUrl ? (
                    <Image
                      src={c.imageUrl}
                      alt={c.imageAlt}
                      fill
                      sizes="7rem"
                      className="object-cover"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center text-primary/40">
                      <PawPrint className="h-10 w-10" aria-hidden="true" />
                    </div>
                  )}
                </Link>

                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h2 className="font-display text-lg font-bold text-text">{c.nom}</h2>
                    <span className="inline-flex items-center gap-1 rounded-full bg-amber-100 px-2 py-0.5 text-xs font-semibold text-amber-800">
                      Compatibilité limitée
                    </span>
                  </div>

                  {c.problemes.length > 0 && (
                    <ul className="mt-2 space-y-1 text-sm text-text-secondary">
                      {c.problemes.map((p) => (
                        <li key={p} className="flex items-start gap-2">
                          <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-amber-600" aria-hidden="true" />
                          {p}
                        </li>
                      ))}
                    </ul>
                  )}

                  <div className="mt-3 flex flex-wrap items-center gap-3">
                    <Button href={`/adoption/${c.slug}/demande`} variant="outlined-primary" size="sm" iconRight={ArrowRight}>
                      Candidater quand même
                    </Button>
                    <Link
                      href={`/adoption/${c.slug}`}
                      className="text-sm font-semibold text-primary transition hover:text-primary-dark"
                    >
                      Voir la fiche
                    </Link>
                  </div>
                </div>
              </div>
            </motion.li>
          ))}
        </ul>
      )}

      {!vide && (
        <p className="mt-6 rounded-xl bg-bg-alt/60 px-4 py-3 text-center text-sm text-text-secondary">
          Adopter malgré une incompatibilité reste possible : le bénévole
          référent en discutera avec vous.
        </p>
      )}

      <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
        <Button variant="outlined-primary" size="md" onClick={onRecommencer} iconLeft={RotateCcw}>
          Recommencer le matching
        </Button>
        {aDesLikes && (
          <button
            type="button"
            onClick={onVoirRecap}
            className="text-sm font-semibold text-text-secondary underline underline-offset-4 transition hover:text-text"
          >
            Revoir mes coups de cœur
          </button>
        )}
      </div>
    </section>
  );
}
