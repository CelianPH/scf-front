"use client";

import { useEffect, useState } from "react";
import type { DonWidget as DonWidgetData } from "@/types/strapi";

interface DonWidgetProps {
  data: DonWidgetData;
  /** Classe appliquée au cadre extérieur (permet de le faire remplir sa colonne). */
  className?: string;
}

/** Ajoute `?lang=fr` à l'URL du widget HelloAsso (seul paramètre supporté par l'iframe). */
function buildWidgetUrl(baseUrl: string) {
  const clean = baseUrl.replace(/\/+$/, "") + "/widget";
  return clean.includes("?") ? `${clean}&lang=fr` : `${clean}?lang=fr`;
}

/**
 * Bloc formulaire HelloAsso, sans section propre : embarqué dans la colonne
 * droite du hero split (voir DonHero). Le cadre teinté à deux niveaux reprend
 * le thème du site et masque les coins carrés du contenu HelloAsso.
 *
 * On N'utilise PAS iFrameResizer : il étirerait l'iframe à la hauteur totale du
 * contenu HelloAsso (bien plus grande que l'écran), cassant l'objectif « le
 * split fait pile la hauteur d'écran ». À la place, l'iframe remplit son cadre
 * (`h-full`) et scrolle nativement (`scrolling="auto"`) — le bouton « Faire un
 * don » reste atteignable en scrollant dans le formulaire, sans scroller la page.
 */
export default function DonWidget({ data, className }: DonWidgetProps) {
  const widgetUrl = buildWidgetUrl(data.helloAssoUrlUnique);
  const [loaded, setLoaded] = useState(false);

  // Filet de sécurité : certaines iframes HelloAsso rechargent en interne sans
  // re-déclencher `onLoad`. On retire le spinner après un délai quoi qu'il
  // arrive, pour ne jamais laisser un voile masquer le formulaire.
  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 4000);
    return () => clearTimeout(t);
  }, []);

  return (
    <div
      className={`flex min-h-0 flex-col rounded-[1.125rem] bg-gradient-to-br from-primary-50 to-secondary-50 p-2 shadow-lg shadow-primary/10 md:p-2.5 ${className ?? ""}`}
    >
      <div className="relative flex min-h-[360px] flex-1 flex-col overflow-hidden rounded-[0.875rem] bg-surface ring-1 ring-black/[0.03]">
        {!loaded ? (
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center bg-surface"
          >
            <span className="h-9 w-9 animate-spin rounded-full border-2 border-primary/25 border-t-primary" />
          </div>
        ) : null}
        {/* L'iframe remplit son cadre et scrolle en interne. Hauteur bornée à
           l'écran sur mobile (80svh) ; sur desktop elle prend toute la hauteur
           disponible de la colonne (flex-1). */}
        <iframe
          id="haWidget"
          src={widgetUrl}
          scrolling="auto"
          title="Formulaire de don HelloAsso"
          allow="payment"
          loading="lazy"
          onLoad={() => setLoaded(true)}
          className="block h-[min(760px,80svh)] w-full flex-1 border-0 lg:h-full"
          style={{ WebkitOverflowScrolling: "touch" }}
        />
      </div>
    </div>
  );
}
