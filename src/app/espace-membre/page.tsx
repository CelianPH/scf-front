import Link from "next/link";
import { Inbox, Cat, CalendarOff, ArrowRight, type LucideIcon } from "lucide-react";
import Reveal from "@/components/layout/Reveal";
import EspaceMembreHero from "@/components/espace-membre/EspaceMembreHero";
import { getCurrentUser } from "@/lib/auth";
import { getBenevoleMe, getDemandesATraiter } from "@/lib/strapi-server";

const ACTIONS: {
  href: string;
  icon: LucideIcon;
  titre: string;
  description: string;
}[] = [
  {
    href: "/espace-membre/demandes",
    icon: Inbox,
    titre: "Demandes à traiter",
    description: "Prendre en charge, accepter ou refuser une demande.",
  },
  {
    href: "/espace-membre/absence",
    icon: CalendarOff,
    titre: "Mes absences",
    description: "Signaler une indisponibilité et passer la main aux backups.",
  },
  {
    href: "/adoption",
    icon: Cat,
    titre: "Le refuge",
    description: "Consulter les fiches des chats à l'adoption.",
  },
];

export default async function EspaceMembrePage() {
  const [user, { data: demandes }, { data: benevole }] = await Promise.all([
    getCurrentUser(),
    getDemandesATraiter(),
    getBenevoleMe(),
  ]);

  const enAttente = demandes.filter((d) => d.statut === "en_attente").length;
  const enCours = demandes.filter((d) => d.statut === "en_cours").length;
  const chatsSuivis = new Set(demandes.map((d) => d.chat?.slug)).size;

  const ouvertes = enAttente + enCours;

  return (
    <section className="mx-auto max-w-5xl px-5 py-10 md:px-8 md:py-14">
      <EspaceMembreHero
        prenom={user?.prenom ?? ""}
        absent={benevole?.absent ?? false}
        stats={[
          { label: "En attente", valeur: enAttente },
          { label: "En cours", valeur: enCours },
          { label: "Chats concernés", valeur: chatsSuivis },
        ]}
      />

      <ul className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {ACTIONS.map((action, i) => {
          const badge = action.href === "/espace-membre/demandes" ? ouvertes : 0;
          return (
            <Reveal
              key={action.href}
              as="li"
              delay={i * 80}
              className={action.href === "/adoption" ? "sm:col-span-2" : ""}
            >
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
                    {action.titre}
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
