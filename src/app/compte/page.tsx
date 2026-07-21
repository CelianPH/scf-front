import Link from "next/link";
import {
  ArrowRight,
  Heart,
  MailQuestion,
  Settings,
  UserCog,
  CheckCircle2,
  type LucideIcon,
} from "lucide-react";
import Reveal from "@/components/layout/Reveal";
import { getCurrentUser } from "@/lib/auth";
import { getProfilAdoptant, getMesDemandes, getMesFavoris } from "@/lib/strapi-server";
import ProfileRing from "@/components/compte/ProfileRing";

const ACTIONS: {
  href: string;
  icon: LucideIcon;
  label: string;
  description: string;
}[] = [
  {
    href: "/compte/favoris",
    icon: Heart,
    label: "Mes favoris",
    description: "Les chats que tu as mis de côté.",
  },
  {
    href: "/compte/demandes",
    icon: MailQuestion,
    label: "Mes demandes d'adoption",
    description: "Suivre l'avancement de tes demandes.",
  },
  {
    href: "/compte/profil",
    icon: UserCog,
    label: "Mon profil",
    description: "Tes informations d'adoptant·e.",
  },
  {
    href: "/compte/parametres",
    icon: Settings,
    label: "Paramètres & RGPD",
    description: "Confidentialité, données et compte.",
  },
];

function initiales(prenom: string, nom?: string) {
  const a = prenom?.[0] ?? "";
  const b = nom?.[0] ?? "";
  return (a + b).toUpperCase() || "?";
}

export default async function ComptePage() {
  const user = (await getCurrentUser())!; // layout garantit la présence
  const [{ data: profil }, { data: demandes }, { data: favoris }] = await Promise.all([
    getProfilAdoptant(),
    getMesDemandes(),
    getMesFavoris(),
  ]);

  const enAttente = demandes.filter((d) => d.statut === "en_attente").length;
  const badges: Record<string, number> = {
    "/compte/favoris": favoris.length,
    "/compte/demandes": enAttente,
  };
  const profilComplet = profil.completionPct >= 100;

  return (
    <section className="mx-auto max-w-5xl px-5 py-10 md:px-8 md:py-14">
      {/* Carte d'accueil : avatar + salutation d'un côté, anneau de complétion de l'autre. */}
      <Reveal>
        <div className="relative isolate overflow-hidden rounded-3xl bg-surface p-6 shadow-sm ring-1 ring-border md:p-8">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 -z-10"
          >
            <div className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-primary/[0.07] blur-3xl" />
            <div className="absolute -left-16 bottom-[-3rem] h-48 w-48 rounded-full bg-secondary/[0.07] blur-3xl" />
          </div>

          <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-4 text-center sm:text-left">
              <span className="inline-flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-secondary via-primary to-primary-vif font-display text-xl font-bold text-white shadow-md shadow-primary/25">
                {initiales(user.prenom, user.nom)}
              </span>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
                  Mon espace
                </p>
                <h1 className="mt-1 font-display text-3xl font-bold text-text md:text-4xl">
                  Bonjour {user.prenom} 👋
                </h1>
              </div>
            </div>

            <div className="flex flex-col items-center gap-3">
              <ProfileRing pct={profil.completionPct} />
              {profilComplet ? (
                <span className="inline-flex items-center gap-1.5 rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-800">
                  <CheckCircle2 className="h-3.5 w-3.5" aria-hidden="true" />
                  Profil complet
                </span>
              ) : (
                <Link
                  href="/compte/profil"
                  className="group inline-flex items-center gap-1.5 text-sm font-semibold text-primary"
                >
                  Compléter mon profil
                  <ArrowRight
                    className="h-4 w-4 transition-transform group-hover:translate-x-1"
                    aria-hidden="true"
                  />
                </Link>
              )}
            </div>
          </div>

          {!profilComplet ? (
            <p className="mt-6 border-t border-border pt-4 text-center text-sm text-text-secondary sm:text-left">
              Complète ton profil pour pouvoir déposer une demande
              d&apos;adoption.
            </p>
          ) : null}
        </div>
      </Reveal>

      <ul className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {ACTIONS.map((action, i) => {
          const badge = badges[action.href] ?? 0;
          return (
            <Reveal key={action.href} as="li" delay={i * 80}>
              <Link
                href={action.href}
                className="group relative flex h-full items-center gap-4 overflow-hidden rounded-2xl bg-surface p-5 shadow-sm ring-1 ring-border transition duration-200 ease-out hover:-translate-y-0.5 hover:shadow-lg hover:shadow-primary/10 hover:ring-primary/40"
              >
                {/* Barre d'accent qui se révèle au survol */}
                <span
                  aria-hidden="true"
                  className="absolute inset-y-0 left-0 w-1 origin-top scale-y-0 bg-gradient-to-b from-secondary via-primary to-primary-vif transition-transform duration-200 group-hover:scale-y-100"
                />
                <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-primary-50 text-primary transition duration-200 group-hover:bg-primary group-hover:text-white">
                  <action.icon className="h-6 w-6" aria-hidden="true" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="flex items-center gap-2 font-display text-lg font-bold text-text">
                    {action.label}
                    {badge > 0 ? (
                      <span className="rounded-full bg-primary px-2 py-0.5 text-xs font-semibold text-white">
                        {badge}
                      </span>
                    ) : null}
                  </span>
                  <span className="mt-0.5 block text-sm text-text-secondary">
                    {action.description}
                  </span>
                </span>
                <ArrowRight
                  className="h-5 w-5 shrink-0 text-text-muted transition group-hover:translate-x-1 group-hover:text-primary"
                  aria-hidden="true"
                />
              </Link>
            </Reveal>
          );
        })}
      </ul>
    </section>
  );
}
