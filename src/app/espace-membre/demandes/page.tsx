import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Inbox, UserRound, Clock, Hourglass, Check, X, ChevronDown } from "lucide-react";
import Reveal from "@/components/layout/Reveal";
import { getDemandesATraiter } from "@/lib/strapi-server";
import { getStrapiMedia } from "@/lib/strapi";
import DemandeActions from "@/components/espace-membre/DemandeActions";
import DossierAdoptantComplet from "@/components/espace-membre/DossierAdoptantComplet";
import {
  ACCES_EXTERIEUR_LABELS,
  AUTRES_ANIMAUX_LABELS,
  ENFANTS_LABELS,
  EXPERIENCE_CHATS_LABELS,
  PRESENCE_MAISON_LABELS,
  TYPE_LOGEMENT_LABELS,
  enumLabel,
} from "@/lib/profil-labels";
import type { DemandeATraiter } from "@/types/strapi";

const STATUT_LABEL: Record<
  string,
  { label: string; cls: string; icon: typeof Clock }
> = {
  en_attente: { label: "En attente", cls: "bg-amber-100 text-amber-800 ring-amber-200", icon: Hourglass },
  en_cours: { label: "En cours", cls: "bg-blue-100 text-blue-800 ring-blue-200", icon: Clock },
  acceptee: { label: "Acceptée", cls: "bg-green-100 text-green-800 ring-green-200", icon: Check },
  refusee: { label: "Refusée", cls: "bg-red-100 text-red-800 ring-red-200", icon: X },
};

/** Les demandes ouvertes passent devant : ce sont celles qui appellent une action. */
function trierParUrgence(a: DemandeATraiter, b: DemandeATraiter) {
  const ordre: Record<string, number> = {
    en_attente: 0,
    en_cours: 1,
    acceptee: 2,
    refusee: 3,
  };
  const diff = (ordre[a.statut] ?? 9) - (ordre[b.statut] ?? 9);
  if (diff !== 0) return diff;
  return +new Date(b.createdAt) - +new Date(a.createdAt);
}

function LigneProfil({ label, valeur }: { label: string; valeur?: unknown }) {
  if (valeur === null || valeur === undefined || valeur === "") return null;
  const texte =
    typeof valeur === "boolean" ? (valeur ? "Oui" : "Non") : String(valeur);
  return (
    <div>
      <dt className="text-xs text-text-muted">{label}</dt>
      <dd className="text-sm text-text">{texte}</dd>
    </div>
  );
}

export default async function DemandesATraiterPage() {
  const { data } = await getDemandesATraiter();
  const demandes = [...data].sort(trierParUrgence);
  const ouvertes = demandes.filter(
    (d) => d.statut === "en_attente" || d.statut === "en_cours"
  ).length;

  return (
    <>
      <section className="relative isolate overflow-hidden bg-gradient-to-br from-secondary via-primary to-primary-vif">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10"
        >
          <div className="absolute -left-16 -top-20 h-64 w-64 rounded-full bg-primary-accent/40 blur-3xl" />
          <div className="absolute -right-14 bottom-[-3rem] h-56 w-56 rounded-full bg-secondary-light/35 blur-3xl" />
        </div>
        <div className="relative mx-auto max-w-4xl px-5 pt-10 pb-8 md:px-8 md:pt-14">
          <Reveal>
            <Link
              href="/espace-membre"
              className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1.5 text-sm font-medium text-white backdrop-blur-sm transition hover:bg-white/25"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              Espace membre
            </Link>

            <div className="mt-5 flex items-center gap-3">
              <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-white/15 text-white ring-1 ring-white/25 backdrop-blur-sm">
                <Inbox className="h-5 w-5" aria-hidden="true" />
              </span>
              <h1 className="font-display text-3xl font-bold text-white md:text-4xl">
                Demandes d&apos;adoption
              </h1>
            </div>
            <p className="mt-3 text-white/80 md:text-lg">
              {ouvertes === 0
                ? "Aucune demande en attente de traitement."
                : `${ouvertes} demande${ouvertes > 1 ? "s" : ""} à traiter.`}
            </p>
          </Reveal>
        </div>
      </section>

      <section className="bg-bg">
        <div className="mx-auto max-w-4xl px-5 py-10 md:px-8 md:py-12">
          {demandes.length === 0 ? (
            <Reveal>
              <div className="flex flex-col items-center rounded-3xl border-2 border-dashed border-border bg-surface px-6 py-16 text-center">
                <span className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-primary-50 text-primary">
                  <Inbox className="h-8 w-8" aria-hidden="true" />
                </span>
                <h2 className="mt-5 font-display text-2xl font-bold text-text">
                  Rien à traiter pour le moment
                </h2>
                <p className="mt-2 max-w-md text-sm text-text-secondary">
                  Les demandes déposées sur les chats dont tu es référent·e
                  apparaîtront ici.
                </p>
              </div>
            </Reveal>
          ) : (
            <ul className="space-y-5">
              {demandes.map((d, i) => {
                const photo = getStrapiMedia(d.chat?.image?.url);
                const statut = STATUT_LABEL[d.statut] ?? STATUT_LABEL.en_attente;
                const profil = d.user?.profil;
                const adoptant =
                  [d.user?.prenom, d.user?.nom].filter(Boolean).join(" ") ||
                  d.user?.email;

                return (
                  <Reveal key={d.id} as="li" delay={Math.min(i, 6) * 70}>
                    <article className="rounded-2xl bg-surface p-4 shadow-sm ring-1 ring-border transition hover:shadow-md md:p-5">
                      <div className="flex gap-4">
                        <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-primary-50 ring-1 ring-border">
                          {photo ? (
                            <Image
                              src={photo}
                              alt={d.chat.nom}
                              fill
                              sizes="80px"
                              className="object-cover"
                            />
                          ) : null}
                        </div>

                        <div className="min-w-0 flex-1">
                          <div className="flex flex-wrap items-center justify-between gap-2">
                            <Link
                              href={`/adoption/${d.chat.slug}`}
                              className="font-display text-lg font-bold text-text hover:text-primary md:text-xl"
                            >
                              {d.chat.nom}
                            </Link>
                            <span
                              className={`inline-flex shrink-0 items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ${statut.cls}`}
                            >
                              <statut.icon className="h-3.5 w-3.5" aria-hidden="true" />
                              {statut.label}
                            </span>
                          </div>

                          <p className="mt-1 flex items-center gap-1.5 text-sm text-text-secondary">
                            <UserRound className="h-4 w-4 shrink-0" aria-hidden="true" />
                            <span className="truncate">{adoptant}</span>
                            <a
                              href={`mailto:${d.user?.email}`}
                              className="text-primary hover:underline"
                            >
                              {d.user?.email}
                            </a>
                          </p>

                          {d.enRemplacement ? (
                            <p className="mt-2 rounded-lg bg-amber-50 px-3 py-2 text-xs text-amber-900">
                              Tu vois cette demande en tant que référent·e de
                              secours : le référent principal est indisponible.
                            </p>
                          ) : null}

                          <p className="mt-2 text-xs text-text-muted">
                            Reçue le{" "}
                            {new Date(d.createdAt).toLocaleDateString("fr-FR")}
                            {d.dateRencontreSouhaitee
                              ? ` · rencontre souhaitée le ${new Date(
                                  d.dateRencontreSouhaitee
                                ).toLocaleDateString("fr-FR")}`
                              : ""}
                          </p>
                        </div>
                      </div>

                      <div className="mt-4 rounded-lg bg-bg-alt p-3">
                        <p className="text-xs font-semibold uppercase tracking-wider text-primary-dark">
                          Message de l&apos;adoptant
                        </p>
                        <p className="mt-1 whitespace-pre-line text-sm text-text">
                          {d.message}
                        </p>
                      </div>

                      {d.justificationIncompatibilite ? (
                        <div className="mt-3 rounded-lg bg-amber-50 p-3 ring-1 ring-amber-200">
                          <p className="text-xs font-semibold uppercase tracking-wider text-amber-800">
                            ⚠ Adoption malgré une incompatibilité — réponse de
                            l&apos;adoptant
                          </p>
                          <p className="mt-1 whitespace-pre-line text-sm text-text">
                            {d.justificationIncompatibilite}
                          </p>
                        </div>
                      ) : null}

                      {profil ? (
                        <details className="group mt-3 rounded-lg bg-bg-alt p-3">
                          <summary className="flex cursor-pointer items-center justify-between text-xs font-semibold uppercase tracking-wider text-primary-dark">
                            Dossier de l&apos;adoptant
                            <ChevronDown
                              className="h-4 w-4 transition-transform duration-200 group-open:rotate-180"
                              aria-hidden="true"
                            />
                          </summary>
                          <dl className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-3">
                            <LigneProfil label="Téléphone" valeur={profil.telephone} />
                            <LigneProfil label="Ville" valeur={profil.ville} />
                            <LigneProfil label="Logement" valeur={enumLabel(TYPE_LOGEMENT_LABELS, profil.typeLogement)} />
                            <LigneProfil label="Extérieur" valeur={enumLabel(ACCES_EXTERIEUR_LABELS, profil.accesExterieur)} />
                            <LigneProfil label="Présence" valeur={enumLabel(PRESENCE_MAISON_LABELS, profil.presenceMaison)} />
                            <LigneProfil label="Enfants" valeur={enumLabel(ENFANTS_LABELS, profil.enfants)} />
                            <LigneProfil label="Autres animaux" valeur={enumLabel(AUTRES_ANIMAUX_LABELS, profil.autresAnimaux)} />
                            <LigneProfil label="Expérience" valeur={enumLabel(EXPERIENCE_CHATS_LABELS, profil.experienceChats)} />
                            <LigneProfil label="Foyer d'accord" valeur={profil.foyerDaccord} />
                            <LigneProfil label="Seul / jour" valeur={profil.heuresSeulParJour ? `${profil.heuresSeulParJour} h` : null} />
                            <LigneProfil label="Superficie" valeur={profil.superficieLogement ? `${profil.superficieLogement} m²` : null} />
                            <LigneProfil label="Sorties" valeur={profil.sortiesAutorisees} />
                          </dl>
                          <DossierAdoptantComplet
                            profil={profil}
                            adoptant={adoptant ?? "l'adoptant"}
                          />
                        </details>
                      ) : null}

                      {d.reponseBenevole ? (
                        <div className="mt-3 rounded-lg bg-primary-50 p-3">
                          <p className="text-xs font-semibold uppercase tracking-wider text-primary-dark">
                            Réponse envoyée
                          </p>
                          <p className="mt-1 text-sm text-text">
                            {d.reponseBenevole}
                          </p>
                        </div>
                      ) : null}

                      <DemandeActions demandeId={d.id} statut={d.statut} />
                    </article>
                  </Reveal>
                );
              })}
            </ul>
          )}
        </div>
      </section>
    </>
  );
}
