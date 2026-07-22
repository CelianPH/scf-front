import Link from "next/link";
import { AlertCircle, ArrowLeft } from "lucide-react";
import Reveal from "@/components/layout/Reveal";
import { getProfilAdoptant } from "@/lib/strapi-server";
import ProfilForm from "@/components/compte/ProfilForm";

/** Libellés affichés dans le formulaire, pour nommer les champs manquants. */
const LIBELLES: Record<string, string> = {
  telephone: "Téléphone",
  dateNaissance: "Date de naissance",
  ville: "Ville",
  codePostal: "Code postal",
  typeLogement: "Type de logement",
  accesExterieur: "Accès extérieur",
  presenceMaison: "Présence à la maison",
  autresAnimaux: "Autres animaux",
  enfants: "Enfants au foyer",
  experienceChats: "Expérience avec les chats",
};

export default async function ProfilPage({
  searchParams,
}: {
  searchParams: Promise<{ gate?: string; manquants?: string }>;
}) {
  const [{ data: profil }, params] = await Promise.all([
    getProfilAdoptant(),
    searchParams,
  ]);

  const manquants = (params.manquants ?? "").split(",").filter(Boolean);

  return (
    <section className="mx-auto max-w-7xl px-5 py-12 md:px-8 md:py-16">
      <Reveal>
        <Link
          href="/compte"
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-text-secondary transition hover:text-primary"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          Mon espace
        </Link>
        <h1 className="mt-6 font-display text-4xl font-bold text-text md:text-5xl">
          Mon profil
        </h1>
        <p className="mt-3 text-text-secondary">
          Plus ton profil est complet, plus on peut te proposer un chat adapté.
        </p>
      </Reveal>

      <div className="mx-auto max-w-2xl">
      {params.gate === "adoption" ? (
        <div
          role="alert"
          className="mt-6 flex gap-3 rounded-xl bg-amber-50 px-4 py-3 text-sm text-amber-900 ring-1 ring-amber-200"
        >
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
          <div>
            <p className="font-semibold">
              Il manque quelques infos pour envoyer ta demande.
            </p>
            {manquants.length > 0 ? (
              <p className="mt-1">
                À compléter :{" "}
                {manquants.map((k, i) => (
                  <span key={k}>
                    {i > 0 ? ", " : ""}
                    <a
                      href={`#champ-${k}`}
                      className="font-medium underline underline-offset-2 hover:text-amber-950"
                    >
                      {LIBELLES[k] ?? k}
                    </a>
                  </span>
                ))}
                .
              </p>
            ) : (
              <p className="mt-1">
                Complète les champs marqués d&apos;un astérisque, puis
                enregistre.
              </p>
            )}
          </div>
        </div>
      ) : null}

      <div className="mt-10">
        <ProfilForm profil={profil} manquants={manquants} />
      </div>
      </div>
    </section>
  );
}
