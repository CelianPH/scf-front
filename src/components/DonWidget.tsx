"use client";

import { useMemo, useState } from "react";
import { ArrowRight, Heart, ShieldCheck, Receipt, Sparkles } from "lucide-react";
import Reveal from "./Reveal";
import type { DonWidget as DonWidgetData } from "@/types/strapi";

type Frequence = "unique" | "mensuel";

interface DonWidgetProps {
  data: DonWidgetData;
}

export default function DonWidget({ data }: DonWidgetProps) {
  const defaultMontant =
    data.montants.find((m) => m.defaut)?.valeur ??
    data.montants[0]?.valeur ??
    20;

  const [frequence, setFrequence] = useState<Frequence>("unique");
  const [montant, setMontant] = useState<number>(defaultMontant);
  const [libre, setLibre] = useState<string>("");

  const montantFinal = libre ? Number(libre) || 0 : montant;

  const impactCourant = useMemo(() => {
    if (libre) return data.exempleImpactTexte;
    const m = data.montants.find((x) => x.valeur === montant);
    return m?.impactText ?? data.exempleImpactTexte;
  }, [libre, montant, data.montants, data.exempleImpactTexte]);

  const helloAssoUrl =
    frequence === "mensuel" && data.helloAssoUrlMensuel
      ? data.helloAssoUrlMensuel
      : data.helloAssoUrlUnique;

  const apresFiscal = Math.round(montantFinal * 0.34);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const url = new URL(helloAssoUrl);
    if (montantFinal > 0) url.searchParams.set("amount", String(montantFinal * 100));
    window.open(url.toString(), "_blank", "noopener,noreferrer");
  }

  return (
    <section
      id="widget-don"
      aria-labelledby="don-widget-titre"
      className="relative isolate bg-bg-alt"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,rgba(194,24,91,0.08),transparent_60%)]"
      />
      <div className="mx-auto max-w-7xl px-5 py-14 md:px-8 md:py-20">
        <Reveal>
          <div className="relative">
            <div
              aria-hidden="true"
              className="absolute -inset-[2px] rounded-[2.1rem] bg-gradient-to-br from-primary via-primary-accent to-secondary opacity-70 blur-[2px]"
            />
            <form
              onSubmit={handleSubmit}
              className="relative grid gap-8 rounded-[2rem] bg-surface p-7 shadow-xl shadow-primary/10 md:p-10 lg:grid-cols-[1.4fr_1fr] lg:gap-12 lg:p-12"
            >
              <div>
              <div className="flex items-start justify-between gap-4">
                <div>
                  <span className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
                    Don sécurisé
                  </span>
                  <h2
                    id="don-widget-titre"
                    className="mt-2 font-display text-3xl font-bold text-text md:text-4xl"
                  >
                    {data.titre}
                  </h2>
                </div>
                <span className="hidden rounded-full bg-primary-50 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary md:inline-flex">
                  HelloAsso
                </span>
              </div>

              <fieldset className="mt-7">
                <legend className="text-xs font-semibold uppercase tracking-wider text-text-secondary">
                  {data.frequenceLabel ?? "Fréquence"}
                </legend>
                <div
                  role="tablist"
                  className="relative mt-2 inline-grid w-full max-w-xs grid-cols-2 rounded-full bg-bg-alt p-1 ring-1 ring-border"
                >
                  <span
                    aria-hidden="true"
                    className={`absolute inset-y-1 w-[calc(50%-4px)] rounded-full bg-primary shadow-md shadow-primary/30 transition-transform duration-300 ease-out ${
                      frequence === "mensuel"
                        ? "translate-x-[calc(100%+4px)]"
                        : "translate-x-1"
                    }`}
                  />
                  {(["unique", "mensuel"] as const).map((f) => {
                    const label =
                      f === "unique"
                        ? data.frequenceUniqueLabel
                        : data.frequenceMensuelLabel;
                    const active = frequence === f;
                    return (
                      <button
                        key={f}
                        type="button"
                        role="tab"
                        aria-selected={active}
                        onClick={() => setFrequence(f)}
                        className={`relative z-10 rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                          active ? "text-white" : "text-text-secondary hover:text-text"
                        }`}
                      >
                        {label}
                      </button>
                    );
                  })}
                </div>
              </fieldset>

              <fieldset className="mt-7">
                <legend className="text-xs font-semibold uppercase tracking-wider text-text-secondary">
                  {data.montantLabel ?? "Montant"}
                </legend>
                <div className="mt-3 grid grid-cols-3 gap-2 sm:gap-3">
                  {data.montants.map((m) => {
                    const active = !libre && montant === m.valeur;
                    return (
                      <button
                        key={m.id}
                        type="button"
                        onClick={() => {
                          setMontant(m.valeur);
                          setLibre("");
                        }}
                        aria-pressed={active}
                        className={`relative rounded-xl border-2 px-3 py-4 text-lg font-bold transition duration-200 ease-out hover:-translate-y-px ${
                          active
                            ? "border-primary bg-gradient-to-br from-primary to-primary-vif text-white shadow-lg shadow-primary/30"
                            : "border-border bg-surface text-text hover:border-primary/40 hover:bg-primary-50/40"
                        }`}
                      >
                        {m.valeur}
                        <span
                          className={`ml-0.5 text-sm ${
                            active ? "text-white/90" : "text-text-muted"
                          }`}
                        >
                          €
                        </span>
                      </button>
                    );
                  })}
                </div>
                <label className="mt-3 block">
                  <span className="sr-only">
                    {data.labelMontantLibre ?? "Autre montant"}
                  </span>
                  <div className="relative">
                    <input
                      type="number"
                      min={1}
                      inputMode="numeric"
                      value={libre}
                      onChange={(e) => setLibre(e.target.value)}
                      placeholder={
                        data.placeholderMontantLibre ?? "Autre montant"
                      }
                      className="w-full rounded-xl border-2 border-border bg-bg-alt px-5 py-3 pr-10 text-base font-semibold text-text outline-none transition focus:border-primary focus:bg-surface"
                    />
                    <span
                      aria-hidden="true"
                      className="pointer-events-none absolute right-5 top-1/2 -translate-y-1/2 text-base font-bold text-text-muted"
                    >
                      €
                    </span>
                  </div>
                </label>
              </fieldset>
              </div>

              <aside className="lg:sticky lg:top-24 lg:self-start">
                <div className="overflow-hidden rounded-2xl bg-gradient-to-br from-primary-50 via-bg-alt to-secondary-50/70 p-6 ring-1 ring-primary-50 md:p-7">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary-dark">
                    Récapitulatif
                  </p>
                  <div className="mt-4 flex items-baseline gap-2">
                    <span className="font-display text-5xl font-bold leading-none text-text md:text-6xl">
                      {montantFinal || 0}
                    </span>
                    <span className="font-display text-2xl font-bold text-primary">€</span>
                    <span className="ml-1 text-sm text-text-secondary">
                      / {frequence === "mensuel" ? "mois" : "unique"}
                    </span>
                  </div>

                  {impactCourant ? (
                    <div className="mt-5 flex items-start gap-3 rounded-xl bg-surface/80 p-4 backdrop-blur-sm ring-1 ring-primary-50">
                      <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary text-white">
                        <Heart className="h-4 w-4" aria-hidden="true" />
                      </span>
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-wider text-primary-dark">
                          {data.exempleImpactLabel ?? "Votre impact"}
                        </p>
                        <p className="mt-1 text-sm leading-relaxed text-text">
                          {impactCourant}
                        </p>
                      </div>
                    </div>
                  ) : null}

                  {montantFinal > 0 ? (
                    <div className="mt-4 rounded-xl bg-surface/80 p-4 ring-1 ring-primary-50">
                      <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-primary-dark">
                        <Receipt className="h-4 w-4" aria-hidden="true" />
                        Déduction fiscale
                      </p>
                      <p className="mt-2 text-sm text-text-secondary">
                        Après déduction (66 %), votre don ne vous coûte
                        réellement que{" "}
                        <span className="font-bold text-text">{apresFiscal} €</span>.
                      </p>
                    </div>
                  ) : null}

                  <button
                    type="submit"
                    disabled={montantFinal <= 0}
                    className="group mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-primary via-primary-vif to-primary px-6 py-4 text-base font-semibold text-white shadow-lg shadow-primary/30 transition duration-200 ease-out hover:-translate-y-0.5 hover:shadow-xl hover:shadow-primary/40 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0"
                  >
                    {data.ctaSubmit?.label ?? "Continuer sur HelloAsso"}
                    <ArrowRight
                      className="h-5 w-5 transition-transform duration-200 group-hover:translate-x-1"
                      aria-hidden="true"
                    />
                  </button>

                  <ul className="mt-5 space-y-2 text-xs text-text-secondary">
                    <li className="flex items-center gap-2">
                      <ShieldCheck className="h-4 w-4 text-primary" aria-hidden="true" />
                      Paiement sécurisé HelloAsso
                    </li>
                    <li className="flex items-center gap-2">
                      <Sparkles className="h-4 w-4 text-primary" aria-hidden="true" />
                      Reçu fiscal automatique par email
                    </li>
                  </ul>
                </div>

                <p className="mt-4 text-center text-xs text-text-muted">
                  Vous serez redirigé(e) vers la page sécurisée HelloAsso.
                </p>
              </aside>
            </form>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
