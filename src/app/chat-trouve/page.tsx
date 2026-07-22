import type { Metadata } from "next";
import {
  Lightbulb,
  AlertTriangle,
  PawPrint,
  Mail,
  ClipboardList,
  Check,
  Siren,
  ArrowUp,
} from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Reveal from "@/components/layout/Reveal";
import { Button } from "@/components/ui/Button";
import {
  SITUATIONS,
  INFOS_A_PREPARER,
  CONTACT_EMAIL,
} from "@/components/trouve/content";

export const metadata: Metadata = {
  title: "J'ai trouvé un chat : que faire ? | Sans Croquettes Fixes",
  description:
    "Chat errant, blessé, chatons, chat libre : les bons réflexes pour aider un chat trouvé, retrouver son propriétaire et joindre l'association.",
};

export default function ChatTrouvePage() {
  return (
    <>
      <Navbar />
      <main className="bg-bg">
        {/* Hero */}
        <section
          id="haut"
          className="relative isolate overflow-hidden bg-gradient-to-br from-secondary via-primary to-primary-vif"
        >
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
                Guide d&apos;urgence
              </span>
              <h1 className="mt-4 font-display text-3xl font-bold leading-[1.1] text-white sm:text-4xl sm:leading-[1.05] md:text-5xl lg:text-6xl">
                J&apos;ai trouvé un chat, que faire&nbsp;?
              </h1>
              <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/85 md:text-lg">
                Errant, blessé, une portée de chatons&nbsp;? Pas de panique.
                Voici les bons réflexes, étape par étape, pour aider un chat
                sans commettre d&apos;erreur — et retrouver sa famille si
                elle le cherche.
              </p>

              <nav aria-label="Sommaire" className="mt-8">
                <ul className="flex flex-wrap gap-2">
                  {SITUATIONS.map((s) => (
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

        {/* Bandeau urgence */}
        <section className="border-b border-red-200 bg-red-50">
          <div className="mx-auto flex max-w-7xl flex-col gap-3 px-5 py-4 md:flex-row md:items-center md:justify-between md:px-8">
            <p className="flex items-start gap-3 text-sm text-red-900 md:items-center md:text-base">
              <Siren className="mt-0.5 h-5 w-5 shrink-0 text-red-600 md:mt-0" aria-hidden="true" />
              <span>
                <strong className="font-semibold">Chat en danger immédiat&nbsp;?</strong>{" "}
                (blessé, percuté, très affaibli) — contactez un vétérinaire
                sans attendre.
              </span>
            </p>
            <a
              href="#urgence"
              className="shrink-0 self-start rounded-full bg-red-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-700 md:self-auto"
            >
              Voir la marche à suivre
            </a>
          </div>
        </section>

        {/* Corps : sommaire collant (lg) + situations */}
        <div className="mx-auto max-w-7xl px-5 py-12 md:px-8 md:py-16">
          <div className="lg:grid lg:grid-cols-[220px_1fr] lg:gap-12">
            <aside className="hidden lg:block">
              <nav
                aria-label="Situations"
                className="sticky top-24 rounded-2xl bg-surface p-4 shadow-sm ring-1 ring-border"
              >
                <p className="px-2 text-xs font-semibold uppercase tracking-wider text-text-muted">
                  Situations
                </p>
                <ul className="mt-2 space-y-0.5">
                  {SITUATIONS.map((s, i) => (
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
              {SITUATIONS.map((situation) => (
                <section
                  key={situation.id}
                  id={situation.id}
                  aria-labelledby={`${situation.id}-titre`}
                  className="scroll-mt-24"
                >
                  <Reveal>
                    <div className="flex items-center gap-3">
                      <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-primary-vif text-white shadow-md shadow-primary/25 md:h-12 md:w-12">
                        <situation.icon className="h-5 w-5 md:h-6 md:w-6" aria-hidden="true" />
                      </span>
                      <h2
                        id={`${situation.id}-titre`}
                        className="min-w-0 break-words font-display text-2xl font-bold text-text md:text-3xl"
                      >
                        {situation.titre}
                      </h2>
                    </div>
                    <p className="mt-4 max-w-3xl text-base leading-relaxed text-text-secondary md:text-lg">
                      {situation.chapo}
                    </p>
                  </Reveal>

                  <ol className="mt-6 space-y-3">
                    {situation.etapes.map((etape, i) => (
                      <Reveal as="li" key={etape.titre} delay={i * 60}>
                        <article className="flex gap-4 rounded-2xl bg-surface p-5 shadow-sm ring-1 ring-border transition hover:ring-primary/30">
                          <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary-50 font-display text-sm font-bold text-primary">
                            {i + 1}
                          </span>
                          <div className="min-w-0">
                            <h3 className="font-display text-base font-bold text-text md:text-lg">
                              {etape.titre}
                            </h3>
                            <p className="mt-1 text-sm leading-relaxed text-text-secondary md:text-base">
                              {etape.texte}
                            </p>
                          </div>
                        </article>
                      </Reveal>
                    ))}
                  </ol>

                  {situation.astuce ? (
                    <Reveal>
                      <div className="mt-4 rounded-r-2xl border-l-4 border-primary bg-primary-50/60 p-4 md:p-5">
                        <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-primary">
                          <Lightbulb className="h-4 w-4" aria-hidden="true" />
                          L&apos;astuce des bénévoles
                        </p>
                        <p className="mt-2 text-sm leading-relaxed text-text md:text-base">
                          {situation.astuce}
                        </p>
                      </div>
                    </Reveal>
                  ) : null}

                  {situation.danger ? (
                    <Reveal>
                      <div className="mt-4 rounded-r-2xl border-l-4 border-red-500 bg-red-50/70 p-4 md:p-5">
                        <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-red-600">
                          <AlertTriangle className="h-4 w-4" aria-hidden="true" />
                          Le danger à connaître
                        </p>
                        <p className="mt-2 text-sm leading-relaxed text-text md:text-base">
                          {situation.danger}
                        </p>
                      </div>
                    </Reveal>
                  ) : null}
                </section>
              ))}

              <div className="text-center lg:text-left">
                <a
                  href="#haut"
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary transition hover:gap-2.5"
                >
                  <ArrowUp className="h-4 w-4" aria-hidden="true" />
                  Revenir en haut
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Infos à préparer */}
        <section
          id="signaler"
          aria-labelledby="signaler-titre"
          className="scroll-mt-24 bg-bg-alt"
        >
          <div className="mx-auto max-w-5xl px-5 py-14 md:px-8 md:py-20">
            <Reveal className="mx-auto max-w-2xl text-center">
              <span className="inline-flex items-center gap-2 rounded-full bg-primary-50 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary">
                <ClipboardList className="h-3.5 w-3.5" aria-hidden="true" />
                Avant de nous contacter
              </span>
              <h2
                id="signaler-titre"
                className="mt-3 font-display text-3xl font-bold text-text md:text-4xl"
              >
                Les infos utiles à préparer
              </h2>
              <p className="mt-3 text-base text-text-secondary md:text-lg">
                Plus votre signalement est précis, plus vite nous pouvons agir.
              </p>
            </Reveal>

            <ul className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {INFOS_A_PREPARER.map((item, i) => (
                <Reveal as="li" key={item.label} delay={Math.min(i, 6) * 50}>
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

        {/* Contact */}
        <section aria-labelledby="contact-titre" className="bg-dark">
          <div className="relative overflow-hidden">
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(194,24,91,0.25),transparent_60%),radial-gradient(ellipse_at_bottom_left,rgba(123,31,162,0.3),transparent_55%)]"
            />
            <Reveal className="relative mx-auto max-w-7xl px-5 py-14 text-center md:px-8 md:py-20">
              <h2
                id="contact-titre"
                className="mx-auto max-w-2xl font-display text-3xl font-bold leading-tight text-white md:text-4xl lg:text-5xl"
              >
                Un doute&nbsp;? Écrivez-nous
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-base text-white/75 md:text-lg">
                Décrivez la situation et joignez une photo si possible :
                l&apos;équipe vous répond et vous accompagne pour la suite.
              </p>
              <div className="mt-8 flex justify-center">
                <Button
                  href={`mailto:${CONTACT_EMAIL}`}
                  variant="primary"
                  size="lg"
                  iconLeft={Mail}
                >
                  {CONTACT_EMAIL}
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
