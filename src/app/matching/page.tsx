import type { Metadata } from "next";
import { ArrowRight, PawPrint, Sparkles } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/Button";
import { requireUser } from "@/lib/auth";
import { getCompatibilites } from "@/lib/strapi-server";
import { getChats, getStrapiMedia } from "@/lib/strapi";
import MatchingExperience, {
  type CarteMatch,
} from "@/components/matching/MatchingExperience";
import { raisonsNegatives, raisonsPositives } from "@/components/adoption/compatibilite-ui";

export const metadata: Metadata = {
  title: "Trouve ton match — Sans Croquettes Fixes",
  description:
    "Découvre, en swipant, les chats faits pour ton foyer et pourquoi ils te correspondent.",
};

export default async function MatchingPage() {
  await requireUser("/connexion?next=/matching");

  // Scores (triés décroissant côté back, sans chiffres) + fiches pour l'image
  // et les infos d'affichage (âge, sexe, trait).
  const [compat, chatsRes] = await Promise.all([
    getCompatibilites(),
    getChats({ includeAdopted: false, pageSize: 100 }),
  ]);

  const infosParSlug = new Map(
    chatsRes.data.map((c) => [
      c.slug,
      {
        age: c.age,
        sexe: c.sexe,
        trait: c.trait,
        imageUrl: getStrapiMedia(c.image?.url) ?? null,
        imageAlt: c.image?.alternativeText ?? c.nom,
      },
    ])
  );

  const cartes: CarteMatch[] = compat.data.map((score) => {
    const infos = infosParSlug.get(score.slug);
    return {
      slug: score.slug,
      nom: score.nom,
      age: infos?.age ?? "",
      sexe: infos?.sexe === "Male" ? "Mâle" : "Femelle",
      imageUrl: infos?.imageUrl ?? null,
      imageAlt: infos?.imageAlt ?? score.nom,
      niveau: score.niveau,
      plafonne: score.plafonne,
      raisons: raisonsPositives(score),
      problemes: raisonsNegatives(score),
    };
  });

  const compatibles = cartes.filter((c) => !c.plafonne);
  const incompatibles = cartes.filter((c) => c.plafonne);

  // États de bord : profil incomplet ou aucun chat. Le swipe n'a alors pas
  // lieu d'être, on garde une page claire avec Navbar + Footer.
  if (!compat.meta.profilComplet) {
    const manquants = compat.meta.champsManquants ?? [];
    return (
      <>
        <Navbar />
        <main className="bg-bg">
          <section className="mx-auto max-w-2xl px-5 py-16 md:px-8 md:py-24">
            <div className="flex flex-col items-center rounded-2xl border-2 border-dashed border-border bg-surface px-6 py-16 text-center">
              <span className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-primary-50 text-primary">
                <Sparkles className="h-8 w-8" aria-hidden="true" />
              </span>
              <h1 className="mt-5 font-display text-2xl font-bold text-text">
                Complète ton profil
              </h1>
              <p className="mt-2 max-w-md text-sm text-text-secondary md:text-base">
                Le matching a besoin de tes conditions d&apos;accueil pour te
                proposer les bons chats.
                {manquants.length > 0 ? ` Il manque ${manquants.join(", ")}.` : ""}
              </p>
              <Button variant="primary" size="md" href="/compte/profil" iconRight={ArrowRight} className="mt-5">
                Compléter mon profil
              </Button>
            </div>
          </section>
        </main>
        <Footer />
      </>
    );
  }

  if (cartes.length === 0) {
    return (
      <>
        <Navbar />
        <main className="bg-bg">
          <section className="mx-auto max-w-2xl px-5 py-16 md:px-8 md:py-24">
            <div className="flex flex-col items-center rounded-2xl border-2 border-dashed border-border bg-surface px-6 py-16 text-center">
              <span className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-primary-50 text-primary">
                <PawPrint className="h-8 w-8" aria-hidden="true" />
              </span>
              <h1 className="mt-5 font-display text-2xl font-bold text-text">
                Aucun chat à l&apos;adoption pour le moment
              </h1>
              <p className="mt-2 max-w-md text-sm text-text-secondary md:text-base">
                Revenez bientôt : de nouveaux compagnons arrivent régulièrement.
              </p>
            </div>
          </section>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <MatchingExperience compatibles={compatibles} incompatibles={incompatibles} />
  );
}
