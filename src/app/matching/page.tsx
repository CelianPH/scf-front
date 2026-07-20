import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, PawPrint, Sparkles, AlertTriangle } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Reveal from "@/components/layout/Reveal";
import { Button } from "@/components/ui/Button";
import { requireUser } from "@/lib/auth";
import { getCompatibilites } from "@/lib/strapi-server";
import { getChats, getStrapiMedia } from "@/lib/strapi";
import type { ChatScore, NiveauCompatibilite } from "@/types/strapi";

export const metadata: Metadata = {
  title: "Matching — vos chats les plus compatibles | Sans Croquettes Fixes",
  description:
    "Découvrez les chats les plus compatibles avec votre profil et vos conditions d'accueil.",
};

const COULEUR_JAUGE: Record<NiveauCompatibilite, string> = {
  excellent: "bg-green-600",
  bon: "bg-primary",
  moyen: "bg-amber-500",
  faible: "bg-text-muted",
};

const LIBELLE_NIVEAU: Record<NiveauCompatibilite, string> = {
  excellent: "Excellente compatibilité",
  bon: "Bonne compatibilité",
  moyen: "Compatibilité moyenne",
  faible: "Compatibilité faible",
};

/** Carte d'un chat scoré, image tirée du listing public. */
function CarteMatching({
  score,
  imageUrl,
  imageAlt,
}: {
  score: ChatScore;
  imageUrl: string | null;
  imageAlt: string;
}) {
  const forces = [...score.criteres]
    .filter((c) => c.max > 0)
    .sort((a, b) => b.points / b.max - a.points / a.max)
    .slice(0, 3);

  return (
    <article className="flex h-full flex-col overflow-hidden rounded-2xl bg-surface ring-1 ring-border">
      <Link href={`/adoption/${score.slug}`} className="group block">
        <div className="relative aspect-[4/3] w-full overflow-hidden bg-primary-50">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={imageAlt}
              fill
              sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw"
              className="object-cover transition duration-500 group-hover:scale-105 motion-reduce:group-hover:scale-100"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-primary/40">
              <PawPrint className="h-14 w-14" aria-hidden="true" />
            </div>
          )}
          <span className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-full bg-white px-2.5 py-1 text-sm font-bold text-text shadow-sm">
            {score.score}%
          </span>
        </div>
      </Link>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-center justify-between gap-2">
          <h2 className="font-display text-xl font-bold text-text">
            {score.nom}
          </h2>
          <span className="text-xs font-semibold text-text-secondary">
            {LIBELLE_NIVEAU[score.niveau]}
          </span>
        </div>

        <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-bg-alt">
          <div
            className={`h-full rounded-full ${COULEUR_JAUGE[score.niveau]}`}
            style={{ width: `${score.score}%` }}
          />
        </div>

        {score.alertes.length > 0 && (
          <ul className="mt-3 space-y-1">
            {score.alertes.map((a) => (
              <li key={a} className="flex items-start gap-1.5 text-xs text-amber-700">
                <AlertTriangle className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                {a}
              </li>
            ))}
          </ul>
        )}

        <ul className="mt-3 space-y-1 text-sm text-text-secondary">
          {forces.map((c) => (
            <li key={c.code} className="flex items-center justify-between gap-3">
              <span>{c.libelle}</span>
              <span className="font-medium text-text">
                {c.points}/{c.max}
              </span>
            </li>
          ))}
        </ul>

        <Link
          href={`/adoption/${score.slug}`}
          className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-primary transition-[gap] hover:gap-2.5"
        >
          Voir la fiche de {score.nom}
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </div>
    </article>
  );
}

export default async function MatchingPage() {
  await requireUser("/connexion?next=/matching");

  // Scores (triés décroissant côté back) + images du listing public.
  const [compat, chatsRes] = await Promise.all([
    getCompatibilites(),
    getChats({ includeAdopted: false, pageSize: 100 }),
  ]);

  const imagesParSlug = new Map(
    chatsRes.data.map((c) => [
      c.slug,
      {
        url: getStrapiMedia(c.image?.url) ?? null,
        alt: c.image?.alternativeText ?? c.nom,
      },
    ])
  );

  const profilIncomplet = !compat.meta.profilComplet;
  const manquants = compat.meta.champsManquants ?? [];

  return (
    <>
      <Navbar />
      <main className="bg-bg">
        <section className="bg-dark text-white">
          <div className="mx-auto max-w-6xl px-5 py-8 md:px-8 md:py-10">
            <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-white/60">
              <Sparkles className="h-4 w-4" aria-hidden="true" />
              Matching
            </p>
            <h1 className="mt-2 font-display text-3xl font-bold md:text-4xl">
              Vos chats les plus compatibles
            </h1>
            <p className="mt-2 max-w-2xl text-sm text-white/75 md:text-base">
              Classés selon votre profil et vos conditions d&apos;accueil. Cet
              indicateur informe votre choix : chaque adoption reste validée par
              l&apos;équipe après échange.
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-5 py-10 md:px-8 md:py-14">
          {profilIncomplet ? (
            <div className="flex flex-col items-center rounded-2xl border-2 border-dashed border-border bg-surface px-6 py-16 text-center">
              <span className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-primary-50 text-primary">
                <Sparkles className="h-8 w-8" aria-hidden="true" />
              </span>
              <h2 className="mt-5 font-display text-2xl font-bold text-text">
                Complétez votre profil
              </h2>
              <p className="mt-2 max-w-md text-sm text-text-secondary md:text-base">
                Le calcul de compatibilité a besoin de vos conditions
                d&apos;accueil.
                {manquants.length > 0
                  ? ` Il manque ${manquants.join(", ")}.`
                  : ""}
              </p>
              <Button variant="primary" size="md" href="/compte/profil" iconRight={ArrowRight} className="mt-5">
                Compléter mon profil
              </Button>
            </div>
          ) : compat.data.length === 0 ? (
            <div className="flex flex-col items-center rounded-2xl border-2 border-dashed border-border bg-surface px-6 py-16 text-center">
              <span className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-primary-50 text-primary">
                <PawPrint className="h-8 w-8" aria-hidden="true" />
              </span>
              <h2 className="mt-5 font-display text-2xl font-bold text-text">
                Aucun chat à l&apos;adoption pour le moment
              </h2>
              <p className="mt-2 max-w-md text-sm text-text-secondary md:text-base">
                Revenez bientôt : de nouveaux compagnons arrivent régulièrement.
              </p>
            </div>
          ) : (
            <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {compat.data.map((score, i) => {
                const img = imagesParSlug.get(score.slug);
                return (
                  <li key={score.slug}>
                    <Reveal delay={Math.min(i, 6) * 80}>
                      <CarteMatching
                        score={score}
                        imageUrl={img?.url ?? null}
                        imageAlt={img?.alt ?? score.nom}
                      />
                    </Reveal>
                  </li>
                );
              })}
            </ul>
          )}
        </section>
      </main>
      <Footer />
    </>
  );
}
