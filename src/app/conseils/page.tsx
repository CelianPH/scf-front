import type { Metadata } from "next";
import Link from "next/link";
import {
  Lightbulb,
  AlertTriangle,
  Check,
  PawPrint,
  ArrowRight,
  Heart,
  ListChecks,
  HelpCircle,
  Stethoscope,
} from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Reveal from "@/components/layout/Reveal";
import { Button } from "@/components/ui/Button";
import ConseilsFaq from "@/components/conseils/ConseilsFaq";
import {
  GUIDE_SECTIONS,
  GUIDE_FAQ,
  KIT_DEPART,
} from "@/components/conseils/content";

export const metadata: Metadata = {
  title: "Conseils : bien vivre avec son chat | Sans Croquettes Fixes",
  description:
    "Le guide complet pour adopter et prendre soin d'un chat : arrivée à la maison, alimentation, santé, litière, comportement, sécurité, cohabitation et budget.",
};

export default function ConseilsPage() {
  return (
    <>
      <Navbar />
      <main className="bg-bg">
        {/* Hero */}
        <section className="relative isolate overflow-hidden bg-gradient-to-br from-secondary via-primary to-primary-vif">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 -z-10"
          >
            <div className="absolute -left-16 -top-24 h-72 w-72 rounded-full bg-primary-accent/40 blur-3xl" />
            <div className="absolute -right-12 top-1/4 h-64 w-64 rounded-full bg-secondary-light/35 blur-3xl" />
            <div className="absolute bottom-[-4rem] left-1/3 h-56 w-56 rounded-full bg-white/10 blur-3xl" />
          </div>

          <div className="relative mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-24">
            <div className="max-w-3xl">
              <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-white backdrop-blur-sm">
                <PawPrint className="h-3.5 w-3.5" aria-hidden="true" />
                Le guide du chat
              </span>
              <h1 className="mt-4 font-display text-4xl font-bold leading-[1.05] text-white md:text-6xl">
                Bien vivre avec son chat
              </h1>
              <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/85 md:text-lg">
                Adopter un chat, c&apos;est une belle aventure — et quelques
                bons réflexes changent tout. De son arrivée à la maison à son
                bien-être au quotidien, voici l&apos;essentiel pour lui offrir
                une vie heureuse et en pleine santé.
              </p>

              {/* Sommaire rapide en pastilles */}
              <nav aria-label="Sommaire du guide" className="mt-8">
                <ul className="flex flex-wrap gap-2">
                  {GUIDE_SECTIONS.map((s) => (
                    <li key={s.id}>
                      <a
                        href={`#${s.id}`}
                        className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1.5 text-sm font-medium text-white backdrop-blur-sm transition hover:bg-white/25"
                      >
                        <s.icon className="h-3.5 w-3.5" aria-hidden="true" />
                        {s.navLabel}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </div>
        </section>

        {/* Corps : sommaire collant (lg) + sections */}
        <div className="mx-auto max-w-7xl px-5 py-12 md:px-8 md:py-16">
          <div className="lg:grid lg:grid-cols-[220px_1fr] lg:gap-12">
            <aside className="hidden lg:block">
              <nav
                aria-label="Sections du guide"
                className="sticky top-24 rounded-2xl bg-surface p-4 shadow-sm ring-1 ring-border"
              >
                <p className="px-2 text-xs font-semibold uppercase tracking-wider text-text-muted">
                  Sommaire
                </p>
                <ul className="mt-2 space-y-0.5">
                  {GUIDE_SECTIONS.map((s, i) => (
                    <li key={s.id}>
                      <a
                        href={`#${s.id}`}
                        className="group flex items-center gap-2.5 rounded-lg px-2 py-2 text-sm font-medium text-text-secondary transition hover:bg-primary-50 hover:text-primary"
                      >
                        <span className="w-5 shrink-0 font-display text-xs font-bold tabular-nums text-primary/40 transition group-hover:text-primary">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        {s.navLabel}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            </aside>

            <div className="space-y-14 md:space-y-20">
              {GUIDE_SECTIONS.map((section) => (
                <section
                  key={section.id}
                  id={section.id}
                  aria-labelledby={`${section.id}-titre`}
                  className="scroll-mt-24"
                >
                  <Reveal>
                    <div className="flex items-center gap-3">
                      <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-primary-vif text-white shadow-md shadow-primary/25">
                        <section.icon className="h-6 w-6" aria-hidden="true" />
                      </span>
                      <h2
                        id={`${section.id}-titre`}
                        className="font-display text-2xl font-bold text-text md:text-3xl"
                      >
                        {section.titre}
                      </h2>
                    </div>
                    <p className="mt-4 max-w-3xl text-base leading-relaxed text-text-secondary md:text-lg">
                      {section.chapo}
                    </p>
                  </Reveal>

                  <ul className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
                    {section.conseils.map((conseil, i) => (
                      <Reveal as="li" key={conseil.titre} delay={i * 60}>
                        <article className="flex h-full flex-col rounded-2xl bg-surface p-5 shadow-sm ring-1 ring-border transition hover:-translate-y-0.5 hover:shadow-md hover:ring-primary/30">
                          <h3 className="flex items-start gap-2 font-display text-base font-bold text-text md:text-lg">
                            <PawPrint
                              className="mt-1 h-4 w-4 shrink-0 text-primary"
                              aria-hidden="true"
                            />
                            {conseil.titre}
                          </h3>
                          <p className="mt-2 text-sm leading-relaxed text-text-secondary">
                            {conseil.texte}
                          </p>
                        </article>
                      </Reveal>
                    ))}
                  </ul>

                  {section.astuce ? (
                    <Reveal>
                      <div className="mt-4 rounded-r-2xl border-l-4 border-primary bg-primary-50/60 p-4 md:p-5">
                        <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-primary">
                          <Lightbulb className="h-4 w-4" aria-hidden="true" />
                          L&apos;astuce des bénévoles
                        </p>
                        <p className="mt-2 text-sm leading-relaxed text-text md:text-base">
                          {section.astuce}
                        </p>
                      </div>
                    </Reveal>
                  ) : null}

                  {section.danger ? (
                    <Reveal>
                      <div className="mt-4 rounded-r-2xl border-l-4 border-red-500 bg-red-50/70 p-4 md:p-5">
                        <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-red-600">
                          <AlertTriangle className="h-4 w-4" aria-hidden="true" />
                          Le danger à connaître
                        </p>
                        <p className="mt-2 text-sm leading-relaxed text-text md:text-base">
                          {section.danger}
                        </p>
                      </div>
                    </Reveal>
                  ) : null}
                </section>
              ))}

              <Reveal>
                <p className="flex items-start gap-3 rounded-2xl bg-bg-alt p-4 text-sm leading-relaxed text-text-secondary md:p-5">
                  <Stethoscope
                    className="mt-0.5 h-5 w-5 shrink-0 text-primary"
                    aria-hidden="true"
                  />
                  Ce guide donne des repères généraux pour bien démarrer. Il ne
                  remplace pas l&apos;avis d&apos;un professionnel : au moindre
                  doute sur la santé ou le comportement de votre chat, votre
                  vétérinaire reste votre meilleur interlocuteur.
                </p>
              </Reveal>
            </div>
          </div>
        </div>

        {/* Checklist : le kit de départ */}
        <section
          id="kit-depart"
          aria-labelledby="kit-titre"
          className="scroll-mt-24 bg-bg-alt"
        >
          <div className="mx-auto max-w-5xl px-5 py-14 md:px-8 md:py-20">
            <Reveal className="mx-auto max-w-2xl text-center">
              <span className="inline-flex items-center gap-2 rounded-full bg-primary-50 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary">
                <ListChecks className="h-3.5 w-3.5" aria-hidden="true" />
                Avant l&apos;adoption
              </span>
              <h2
                id="kit-titre"
                className="mt-3 font-display text-3xl font-bold text-text md:text-4xl"
              >
                Le kit de départ
              </h2>
              <p className="mt-3 text-base text-text-secondary md:text-lg">
                Ce qu&apos;il faut idéalement prévoir avant l&apos;arrivée de
                votre nouveau compagnon.
              </p>
            </Reveal>

            <ul className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {KIT_DEPART.map((item, i) => (
                <Reveal as="li" key={item.label} delay={Math.min(i, 8) * 50}>
                  <div className="flex items-start gap-3 rounded-2xl bg-surface p-4 shadow-sm ring-1 ring-border">
                    <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green-100 text-green-700">
                      <Check className="h-4 w-4" aria-hidden="true" />
                    </span>
                    <span>
                      <span className="block font-semibold text-text">
                        {item.label}
                      </span>
                      <span className="block text-sm text-text-secondary">
                        {item.detail}
                      </span>
                    </span>
                  </div>
                </Reveal>
              ))}
            </ul>
          </div>
        </section>

        {/* FAQ */}
        <section
          id="faq"
          aria-labelledby="faq-titre"
          className="scroll-mt-24 bg-bg"
        >
          <div className="mx-auto max-w-7xl px-5 py-14 md:px-8 md:py-20">
            <Reveal className="mx-auto mb-10 max-w-2xl text-center">
              <span className="inline-flex items-center gap-2 rounded-full bg-primary-50 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary">
                <HelpCircle className="h-3.5 w-3.5" aria-hidden="true" />
                Questions fréquentes
              </span>
              <h2
                id="faq-titre"
                className="mt-3 font-display text-3xl font-bold text-text md:text-4xl"
              >
                Vous vous posez sûrement ces questions
              </h2>
            </Reveal>
            <ConseilsFaq items={GUIDE_FAQ} />
          </div>
        </section>

        {/* CTA final */}
        <section aria-labelledby="conseils-cta-titre" className="bg-dark">
          <div className="relative overflow-hidden">
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(194,24,91,0.25),transparent_60%),radial-gradient(ellipse_at_bottom_left,rgba(123,31,162,0.3),transparent_55%)]"
            />
            <Reveal className="relative mx-auto max-w-7xl px-5 py-14 text-center md:px-8 md:py-20">
              <h2
                id="conseils-cta-titre"
                className="mx-auto max-w-2xl font-display text-3xl font-bold leading-tight text-white md:text-4xl lg:text-5xl"
              >
                Prêt·e à accueillir un compagnon ?
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-base text-white/75 md:text-lg">
                Nos chats n&apos;attendent qu&apos;un foyer aimant. Découvrez
                ceux qui cherchent une famille, ou soutenez l&apos;association
                pour nous aider à en sauver d&apos;autres.
              </p>
              <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Button href="/adoption" variant="primary" size="lg" iconRight={ArrowRight}>
                  Voir les chats à l&apos;adoption
                </Button>
                <Button href="/don" variant="outlined-light" size="lg" iconLeft={Heart}>
                  Faire un don
                </Button>
              </div>
            </Reveal>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
