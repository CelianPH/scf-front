import Link from "next/link";
import {
  ArrowRight,
  Heart,
  MailQuestion,
  Settings,
  UserCog,
  Sparkles,
  CheckCircle2,
  type LucideIcon,
} from "lucide-react";
import Reveal from "@/components/layout/Reveal";
import { getCurrentUser } from "@/lib/auth";
import { getProfilAdoptant, getMesDemandes, getMesFavoris } from "@/lib/strapi-server";
import CompletionGauge from "@/components/compte/CompletionGauge";

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
    <>
      <section className="relative isolate overflow-hidden border-b border-border bg-bg-alt">
        {/* Halo léger : le dégradé signature en touche discrète, sans agresser. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10"
        >
          <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
          <div className="absolute -left-20 bottom-[-4rem] h-56 w-56 rounded-full bg-secondary/10 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-5xl px-5 py-9 md:px-8 md:py-12">
          <Reveal>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-primary-50 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary">
              <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
              Mon espace
            </span>
            <h1 className="mt-3 font-display text-3xl font-bold text-text md:text-4xl">
              Bonjour {user.prenom} 👋
            </h1>
            <p className="mt-2 text-text-secondary md:text-lg">
              Gère tes favoris, tes demandes d&apos;adoption et ton profil.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="bg-bg">
        <div className="mx-auto max-w-5xl px-5 py-10 md:px-8 md:py-12">
          <Reveal>
            <div
              className={`rounded-2xl p-6 shadow-sm ring-1 md:p-8 ${
                profilComplet
                  ? "bg-green-50 ring-green-200"
                  : "bg-surface ring-border"
              }`}
            >
              {profilComplet ? (
                <div className="flex items-start gap-4">
                  <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-green-100 text-green-700">
                    <CheckCircle2 className="h-6 w-6" aria-hidden="true" />
                  </span>
                  <div>
                    <p className="font-display text-lg font-bold text-green-900">
                      Ton profil est complet 🎉
                    </p>
                    <p className="mt-1 text-sm text-green-900/80">
                      Tu peux déposer une demande d&apos;adoption dès qu&apos;un
                      chat te plaît.
                    </p>
                    <Link
                      href="/adoption"
                      className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-green-800 hover:underline"
                    >
                      Voir les chats à l&apos;adoption
                      <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </Link>
                  </div>
                </div>
              ) : (
                <>
                  <CompletionGauge pct={profil.completionPct} />
                  <p className="mt-3 text-sm text-text-secondary">
                    Complète ton profil pour pouvoir faire une demande
                    d&apos;adoption.
                  </p>
                  <Link
                    href="/compte/profil"
                    className="group mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-primary"
                  >
                    Compléter mon profil
                    <ArrowRight
                      className="h-4 w-4 transition-transform group-hover:translate-x-1"
                      aria-hidden="true"
                    />
                  </Link>
                </>
              )}
            </div>
          </Reveal>

          <ul className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {ACTIONS.map((action, i) => {
              const badge = badges[action.href] ?? 0;
              return (
                <Reveal key={action.href} as="li" delay={i * 80}>
                  <Link
                    href={action.href}
                    className="group flex h-full items-start gap-4 rounded-2xl bg-surface p-5 shadow-sm ring-1 ring-border transition duration-200 ease-out hover:-translate-y-0.5 hover:shadow-lg hover:shadow-primary/10 hover:ring-primary/40"
                  >
                    <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-primary-vif text-white shadow-md shadow-primary/25 transition group-hover:scale-105">
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
                        <ArrowRight
                          className="ml-auto h-4 w-4 text-primary transition group-hover:translate-x-1"
                          aria-hidden="true"
                        />
                      </span>
                      <span className="mt-0.5 block text-sm text-text-secondary">
                        {action.description}
                      </span>
                    </span>
                  </Link>
                </Reveal>
              );
            })}
          </ul>
        </div>
      </section>
    </>
  );
}
