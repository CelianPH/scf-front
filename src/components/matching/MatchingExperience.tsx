"use client";

import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import type { NiveauCompatibilite } from "@/types/strapi";
import MatchingIntro from "./MatchingIntro";
import SwipeDeck from "./SwipeDeck";
import RecapLikes from "./RecapLikes";
import DeckIncompatibles from "./DeckIncompatibles";

/** Un chat prêt à afficher dans le deck (données croisées score + fiche). */
export interface CarteMatch {
  slug: string;
  nom: string;
  age: string;
  sexe: string;
  imageUrl: string | null;
  imageAlt: string;
  niveau: NiveauCompatibilite;
  plafonne: boolean;
  raisons: string[];
  problemes: string[];
}

type Etape = "intro" | "deck" | "recap" | "risques";

interface Props {
  compatibles: CarteMatch[];
  incompatibles: CarteMatch[];
}

const STORAGE_KEY = "scf-matching-v1";

interface EtatPersiste {
  empreinte: string;
  etape: Etape;
  index: number;
  likes: string[];
}

/** Empreinte de la liste : si le catalogue change, la reprise est invalidée. */
function empreinteDe(compatibles: CarteMatch[]): string {
  return compatibles.map((c) => c.slug).join(",");
}

export default function MatchingExperience({ compatibles, incompatibles }: Props) {
  const empreinte = empreinteDe(compatibles);
  // Pas de chats compatibles d'entrée : on démarre directement sur les
  // « coups de cœur risqués » (ou un écran vide géré plus bas).
  const etapeInitiale: Etape = compatibles.length === 0 ? "risques" : "intro";

  // État de session regroupé en un seul objet : la reprise depuis
  // sessionStorage n'applique alors qu'un seul setState (le linter React
  // interdit les setState en cascade dans un effet).
  const [session, setSession] = useState<{
    etape: Etape;
    index: number;
    likes: string[];
  }>({ etape: etapeInitiale, index: 0, likes: [] });
  const { etape, index, likes } = session;
  const [hydrate, setHydrate] = useState(false);

  const setEtape = useCallback(
    (e: Etape) => setSession((s) => ({ ...s, etape: e })),
    []
  );

  // Reprise de session, lue au montage (sessionStorage n'existe pas au SSR).
  useEffect(() => {
    let reprise: typeof session | null = null;
    try {
      const brut = sessionStorage.getItem(STORAGE_KEY);
      if (brut) {
        const p = JSON.parse(brut) as EtatPersiste;
        if (p.empreinte === empreinte) {
          reprise = { etape: p.etape, index: p.index, likes: p.likes };
        }
      }
    } catch {
      // sessionStorage indisponible : on démarre à neuf, sans bruit.
    }
    // Synchronisation depuis un système externe (sessionStorage) au montage :
    // c'est l'un des usages légitimes d'un effet. Un seul setState, pas de
    // cascade réelle.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (reprise) setSession(reprise);
    setHydrate(true);
  }, [empreinte]);

  // Sauvegarde à chaque décision, une fois l'hydratation faite.
  useEffect(() => {
    if (!hydrate) return;
    try {
      const p: EtatPersiste = { empreinte, etape, index, likes };
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(p));
    } catch {
      // idem : perte de reprise acceptable, pas d'erreur remontée.
    }
  }, [hydrate, empreinte, etape, index, likes]);

  // Chaque décision recalcule l'état complet (index + likes + écran) en un seul
  // setState : quand le deck est épuisé, on bascule vers le récap si au moins un
  // like, sinon vers les incompatibles.
  const decider = useCallback(
    (slug: string | null) => {
      setSession((s) => {
        const likesApres =
          slug && !s.likes.includes(slug) ? [...s.likes, slug] : s.likes;
        const prochain = s.index + 1;
        const fini = prochain >= compatibles.length;
        return {
          index: prochain,
          likes: likesApres,
          etape: fini
            ? likesApres.length > 0
              ? "recap"
              : "risques"
            : s.etape,
        };
      });
    },
    [compatibles.length]
  );

  const like = useCallback((slug: string) => decider(slug), [decider]);
  const pass = useCallback(() => decider(null), [decider]);

  const annuler = useCallback(() => {
    setSession((s) => {
      if (s.index === 0) return s;
      const precedent = compatibles[s.index - 1];
      return {
        ...s,
        index: s.index - 1,
        likes: s.likes.filter((sl) => sl !== precedent.slug),
      };
    });
  }, [compatibles]);

  const recommencer = useCallback(() => {
    setSession({
      etape: compatibles.length === 0 ? "risques" : "intro",
      index: 0,
      likes: [],
    });
    try {
      sessionStorage.removeItem(STORAGE_KEY);
    } catch {
      /* rien */
    }
  }, [compatibles.length]);

  const chatsLikes = compatibles.filter((c) => likes.includes(c.slug));

  // Le deck occupe tout l'écran (immersion) ; les autres écrans gardent le
  // cadre habituel avec Footer.
  const plein = etape === "intro" || etape === "deck";

  return (
    <>
      <Navbar />
      <main className={plein ? "relative" : "bg-bg"}>
        <AnimatePresence mode="wait">
          {etape === "intro" && (
            <motion.div
              key="intro"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <MatchingIntro
                total={compatibles.length}
                onStart={() => setEtape("deck")}
              />
            </motion.div>
          )}

          {etape === "deck" && (
            <motion.div
              key="deck"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <SwipeDeck
                cartes={compatibles}
                index={index}
                onLike={like}
                onPass={pass}
                onAnnuler={annuler}
              />
            </motion.div>
          )}

          {etape === "recap" && (
            <motion.div
              key="recap"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <RecapLikes
                chats={chatsLikes}
                aDesIncompatibles={incompatibles.length > 0}
                onRecommencer={recommencer}
                onVoirRisques={() => setEtape("risques")}
              />
            </motion.div>
          )}

          {etape === "risques" && (
            <motion.div
              key="risques"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <DeckIncompatibles
                chats={incompatibles}
                aDesLikes={chatsLikes.length > 0}
                onRecommencer={recommencer}
                onVoirRecap={() => setEtape("recap")}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>
      {!plein && <Footer />}
    </>
  );
}
