import Link from "next/link";
import { ArrowRight, Heart, MailQuestion, Settings, UserCog } from "lucide-react";
import { getCurrentUser } from "@/lib/auth";
import { getProfilAdoptant, getMesDemandes, getMesFavoris } from "@/lib/strapi-server";
import CompletionGauge from "@/components/compte/CompletionGauge";

export default async function ComptePage() {
  const user = (await getCurrentUser())!; // layout garantit la présence
  const [{ data: profil }, { data: demandes }, { data: favoris }] = await Promise.all([
    getProfilAdoptant(),
    getMesDemandes(),
    getMesFavoris(),
  ]);

  const enAttente = demandes.filter((d) => d.statut === "en_attente").length;

  return (
    <section className="mx-auto max-w-5xl px-5 py-12 md:px-8 md:py-16">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
        Mon espace
      </p>
      <h1 className="mt-2 font-display text-4xl font-bold text-text md:text-5xl">
        Bonjour {user.prenom} 👋
      </h1>

      <div className="mt-8 rounded-2xl bg-surface p-6 shadow-sm ring-1 ring-border md:p-8">
        <CompletionGauge pct={profil.completionPct} />
        <p className="mt-3 text-sm text-text-secondary">
          Complète ton profil pour pouvoir faire une demande d&apos;adoption.
        </p>
        <Link
          href="/compte/profil"
          className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-primary"
        >
          Compléter mon profil
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      <ul className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <CardLink
          href="/compte/favoris"
          icon={<Heart className="h-5 w-5" />}
          label="Mes favoris"
          badge={favoris.length}
        />
        <CardLink
          href="/compte/demandes"
          icon={<MailQuestion className="h-5 w-5" />}
          label="Mes demandes d'adoption"
          badge={enAttente}
        />
        <CardLink
          href="/compte/profil"
          icon={<UserCog className="h-5 w-5" />}
          label="Mon profil"
        />
        <CardLink
          href="/compte/parametres"
          icon={<Settings className="h-5 w-5" />}
          label="Paramètres & RGPD"
        />
      </ul>
    </section>
  );
}

function CardLink({
  href,
  icon,
  label,
  badge,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
  badge?: number;
}) {
  return (
    <li>
      <Link
        href={href}
        className="group flex items-center justify-between rounded-xl bg-surface p-5 ring-1 ring-border transition hover:-translate-y-0.5 hover:shadow-md hover:shadow-primary/15"
      >
        <span className="flex items-center gap-3">
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-md bg-primary-50 text-primary">
            {icon}
          </span>
          <span className="font-semibold text-text">{label}</span>
        </span>
        <span className="flex items-center gap-2">
          {badge != null && badge > 0 ? (
            <span className="rounded-full bg-primary px-2 py-0.5 text-xs font-semibold text-white">
              {badge}
            </span>
          ) : null}
          <ArrowRight className="h-4 w-4 text-text-muted transition-transform group-hover:translate-x-1" />
        </span>
      </Link>
    </li>
  );
}
