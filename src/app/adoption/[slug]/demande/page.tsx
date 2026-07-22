import { redirect } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import DemandeForm from "@/components/adoption/DemandeForm";
import { requireUser } from "@/lib/auth";
import { getChatBySlug } from "@/lib/strapi";
import { getCompatibilites, getProfilAdoptant } from "@/lib/strapi-server";
import { raisonsNegatives } from "@/components/adoption/compatibilite-ui";

const REQUIRED_FIELDS = [
  "telephone",
  "dateNaissance",
  "ville",
  "codePostal",
  "typeLogement",
  "accesExterieur",
  "presenceMaison",
  "autresAnimaux",
  "enfants",
  "experienceChats",
] as const;

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function DemandePage({ params }: PageProps) {
  const { slug } = await params;
  await requireUser(`/connexion?next=/adoption/${slug}/demande`);

  const [chatRes, { data: profil }, compat] = await Promise.all([
    getChatBySlug(slug),
    getProfilAdoptant(),
    getCompatibilites(slug),
  ]);
  if (!chatRes) redirect("/adoption");

  // Ce chat est-il incompatible avec ce profil ? Si oui, on demandera une
  // justification (le serveur revérifie de toute façon).
  const score = compat.data?.[0];
  const incompatibilite =
    score?.plafonne ? { problemes: raisonsNegatives(score) } : null;

  const missing = REQUIRED_FIELDS.filter((k) => {
    const v = (profil as any)[k];
    return v === null || v === undefined || v === "";
  });

  if (missing.length > 0) {
    // On transmet les champs manquants pour que la page profil puisse les
    // nommer, plutôt que d'afficher un refus sans explication.
    redirect(
      `/compte/profil?gate=adoption&next=/adoption/${slug}/demande` +
        `&manquants=${missing.join(",")}`
    );
  }

  return (
    <>
      <Navbar />
      <main className="bg-bg">
        <section className="mx-auto max-w-2xl px-5 py-12 md:px-8 md:py-16">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
            Demande d&apos;adoption
          </p>
          <h1 className="mt-2 font-display text-4xl font-bold text-text md:text-5xl">
            Tu veux adopter {chatRes.data.nom}
          </h1>
          <p className="mt-3 text-text-secondary">
            Un bénévole reçoit ta demande et te recontacte par email pour la
            suite.
          </p>
          <div className="mt-10 rounded-2xl bg-surface p-6 shadow-sm ring-1 ring-border md:p-8">
            <DemandeForm
              chatSlug={slug}
              chatNom={chatRes.data.nom}
              incompatibilite={incompatibilite}
            />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
