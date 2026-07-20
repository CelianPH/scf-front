"use client";

import { useState } from "react";
import Script from "next/script";
import { ShieldCheck, Receipt } from "lucide-react";
import Reveal from "@/components/layout/Reveal";
import type { DonWidget as DonWidgetData } from "@/types/strapi";

interface DonWidgetProps {
  data: DonWidgetData;
}

/** Ajoute `?lang=fr` à l'URL du widget HelloAsso (seul paramètre supporté par l'iframe). */
function buildWidgetUrl(baseUrl: string) {
  const clean = baseUrl.replace(/\/+$/, "") + "/widget";
  return clean.includes("?") ? `${clean}&lang=fr` : `${clean}?lang=fr`;
}

export default function DonWidget({ data }: DonWidgetProps) {
  const widgetUrl = buildWidgetUrl(data.helloAssoUrlUnique);
  const [loaded, setLoaded] = useState(false);

  return (
    <section
      id="widget-don"
      aria-labelledby="don-widget-titre"
      className="relative scroll-mt-24 overflow-hidden bg-bg"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,rgba(194,24,91,0.06),transparent_60%)]"
      />
      <div className="mx-auto max-w-7xl px-5 py-12 md:px-8 md:py-16">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-wider text-primary">
            Don sécurisé
          </span>
          <h2
            id="don-widget-titre"
            className="mt-2 font-display text-3xl font-bold text-text md:text-4xl"
          >
            {data.titre}
          </h2>
        </Reveal>

        {/* Formulaire HelloAsso natif (français), centré */}
        <Reveal delay={120} className="mx-auto mt-10 max-w-3xl md:mt-12">
          <div className="relative overflow-hidden rounded-2xl bg-surface shadow-xl shadow-primary/5 ring-1 ring-border">
            {!loaded ? (
              <div
                aria-hidden="true"
                className="absolute inset-0 z-10 flex items-center justify-center bg-surface"
              >
                <span className="h-9 w-9 animate-spin rounded-full border-2 border-primary/25 border-t-primary" />
              </div>
            ) : null}
            <iframe
              id="haWidget"
              src={widgetUrl}
              scrolling="auto"
              title="Formulaire de don HelloAsso"
              allow="payment"
              loading="lazy"
              onLoad={() => setLoaded(true)}
              style={{ width: "100%", height: "760px", border: "none", display: "block" }}
            />
          </div>

          <Script
            src="https://www.helloasso.com/js/iFrameResizer.min.js"
            strategy="lazyOnload"
            onLoad={() => {
              if (
                typeof window !== "undefined" &&
                typeof (window as any).iFrameResize === "function"
              ) {
                (window as any).iFrameResize({}, "#haWidget");
              }
            }}
          />

          <div className="mt-5 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-text-secondary md:text-sm">
            <span className="inline-flex items-center gap-1.5">
              <ShieldCheck className="h-4 w-4 text-primary" aria-hidden="true" />
              Paiement 100 % sécurisé via HelloAsso
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Receipt className="h-4 w-4 text-primary" aria-hidden="true" />
              Reçu fiscal envoyé automatiquement
            </span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
