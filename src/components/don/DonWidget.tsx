"use client";

import Script from "next/script";
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

  return (
    <section
      id="widget-don"
      aria-labelledby="don-widget-titre"
      className="scroll-mt-24 bg-bg"
    >
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
          <div className="overflow-hidden rounded-2xl bg-surface shadow-xl shadow-primary/5 ring-1 ring-border">
              <iframe
                id="haWidget"
                src={widgetUrl}
                scrolling="auto"
                title="Formulaire de don HelloAsso"
                allow="payment"
                loading="lazy"
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
        </Reveal>
      </div>
    </section>
  );
}
