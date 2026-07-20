"use client";

import Image from "next/image";
import Link from "next/link";
import {
  motion,
  useMotionValue,
  useTransform,
  type PanInfo,
} from "motion/react";
import { Check, Info, PawPrint } from "lucide-react";
import type { CarteMatch } from "./MatchingExperience";
import { LIBELLE_NIVEAU_COURT } from "@/components/adoption/compatibilite-ui";

interface Props {
  carte: CarteMatch;
  /** Rang dans la pile : 0 = carte du dessus (interactive). */
  rang: number;
  /** Seule la carte du dessus est interactive (drag + boutons de fiche). */
  interactif: boolean;
  onDecide: (dir: 1 | -1) => void;
}

const SEUIL = 100;
const VITESSE = 500;

/**
 * Carte draggable du deck. La carte du dessus suit le doigt/souris, s'incline,
 * et révèle un tampon « ON MATCHE » / « PAS CETTE FOIS » selon le sens. Au
 * relâchement, un geste franc valide la décision, sinon la carte revient.
 */
export default function SwipeCard({
  carte,
  rang,
  interactif,
  onDecide,
}: Props) {
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-250, 250], [-14, 14]);
  const likeOpacity = useTransform(x, [30, 110], [0, 1]);
  const nopeOpacity = useTransform(x, [-110, -30], [1, 0]);

  // Cartes en arrière-plan : reculées et réduites, pour l'effet de pile.
  const dessus = rang === 0;
  const offsetY = rang * 14;
  const scale = 1 - rang * 0.05;

  function handleDragEnd(_: unknown, info: PanInfo) {
    if (info.offset.x > SEUIL || info.velocity.x > VITESSE) onDecide(1);
    else if (info.offset.x < -SEUIL || info.velocity.x < -VITESSE) onDecide(-1);
  }

  return (
    <motion.div
      className={`absolute inset-0 ${dessus && interactif ? "cursor-grab" : ""}`}
      // z-index explicite : les cartes de fond sont rendues après la carte du
      // dessus dans le DOM ; sans lui, elles peindraient par-dessus et
      // intercepteraient le geste de drag.
      style={
        dessus
          ? { x, rotate, touchAction: "pan-y", zIndex: 30 - rang * 10 }
          : { zIndex: 30 - rang * 10 }
      }
      initial={false}
      animate={{ y: offsetY, scale }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      // Le drag reste actif même en reduced-motion : un geste initié par
      // l'utilisateur n'est pas une animation décorative. Seule l'animation
      // de sortie est adoucie (fondu côté deck).
      drag={dessus && interactif ? "x" : false}
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.9}
      onDragEnd={dessus ? handleDragEnd : undefined}
      whileDrag={{ cursor: "grabbing" }}
    >
      <div className="relative h-full w-full overflow-hidden rounded-[1.75rem] bg-surface shadow-2xl shadow-dark/30 ring-1 ring-white/10">
        {/* Photo plein cadre */}
        {carte.imageUrl ? (
          <Image
            src={carte.imageUrl}
            alt={carte.imageAlt}
            fill
            sizes="(min-width:768px) 30rem, (min-width:640px) 24rem, 100vw"
            className="object-cover"
            draggable={false}
            priority={dessus}
          />
        ) : (
          <div className="flex h-full items-center justify-center bg-primary-50 text-primary/40">
            <PawPrint className="h-20 w-20" aria-hidden="true" />
          </div>
        )}

        {/* Badge niveau, discret en haut à gauche */}
        <span className="absolute left-4 top-4 inline-flex items-center gap-1 rounded-full bg-white/85 px-3 py-1 text-xs font-bold text-text shadow-sm backdrop-blur">
          {LIBELLE_NIVEAU_COURT[carte.niveau]}
        </span>

        {/* Tampons de décision — pilotés par la position horizontale */}
        {dessus && (
          <>
            <motion.span
              style={{ opacity: likeOpacity }}
              className="pointer-events-none absolute left-5 top-16 -rotate-12 rounded-xl border-4 border-green-500 px-4 py-1 font-display text-2xl font-extrabold uppercase tracking-wide text-green-500"
            >
              On matche
            </motion.span>
            <motion.span
              style={{ opacity: nopeOpacity }}
              className="pointer-events-none absolute right-5 top-16 rotate-12 rounded-xl border-4 border-rose-400 px-4 py-1 font-display text-2xl font-extrabold uppercase tracking-wide text-rose-400"
            >
              Pas cette fois
            </motion.span>
          </>
        )}

        {/* Dégradé + contenu bas */}
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/35 to-transparent p-5 pt-16">
          <h2 className="font-display text-3xl font-bold text-white drop-shadow-sm">
            {carte.nom}
          </h2>
          <p className="mt-0.5 text-sm font-medium text-white/85">
            {carte.sexe}
            {carte.age ? ` · ${carte.age}` : ""}
          </p>

          {carte.raisons.length > 0 && (
            <ul className="mt-3 flex flex-wrap gap-1.5">
              {carte.raisons.map((r) => (
                <li
                  key={r}
                  className="inline-flex items-center gap-1 rounded-full bg-white/15 px-2.5 py-1 text-xs font-medium text-white ring-1 ring-white/25 backdrop-blur"
                >
                  <Check className="h-3 w-3 shrink-0 text-green-300" aria-hidden="true" />
                  {r}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Vers la fiche, sans quitter le geste (bouton indépendant du drag) */}
        {dessus && (
          <Link
            href={`/adoption/${carte.slug}`}
            onPointerDownCapture={(e) => e.stopPropagation()}
            aria-label={`Voir la fiche de ${carte.nom}`}
            className="absolute right-4 top-4 inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/85 text-text shadow-sm backdrop-blur transition hover:bg-white focus-visible:outline-2 focus-visible:outline-primary"
          >
            <Info className="h-4 w-4" aria-hidden="true" />
          </Link>
        )}
      </div>
    </motion.div>
  );
}
