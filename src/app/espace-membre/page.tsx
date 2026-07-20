import Link from "next/link";
import { Inbox, Cat, CalendarOff, ArrowRight } from "lucide-react";
import Reveal from "@/components/layout/Reveal";
import EspaceMembreHero from "@/components/espace-membre/EspaceMembreHero";
import { getCurrentUser } from "@/lib/auth";
import { getBenevoleMe, getDemandesATraiter } from "@/lib/strapi-server";

const ACTIONS = [
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
] as const;

export default async function EspaceMembrePage() {
  const [user, { data: demandes }, { data: benevole }] = await Promise.all([
    getCurrentUser(),
    getDemandesATraiter(),
    getBenevoleMe(),
  ]);

  const enAttente = demandes.filter((d) => d.statut === "en_attente").length;
  const enCours = demandes.filter((d) => d.statut === "en_cours").length;
  const chatsSuivis = new Set(demandes.map((d) => d.chat?.slug)).size;

  return (
    <>
      <EspaceMembreHero
        prenom={user?.prenom ?? ""}
        absent={benevole?.absent ?? false}
        stats={[
          { label: "En attente", valeur: enAttente },
          { label: "En cours", valeur: enCours },
          { label: "Chats concernés", valeur: chatsSuivis },
        ]}
      />

      <section className="bg-bg">
        <div className="mx-auto max-w-4xl px-5 py-10 md:px-8 md:py-12">
          <div className="grid gap-4 sm:grid-cols-2">
            {ACTIONS.map((action, i) => (
              <Reveal
                key={action.href}
                delay={i * 90}
                className={action.href === "/adoption" ? "sm:col-span-2" : ""}
              >
                <Link
                  href={action.href}
                  className="group flex items-start gap-4 rounded-2xl bg-surface p-5 shadow-sm ring-1 ring-border transition duration-200 ease-out hover:-translate-y-0.5 hover:shadow-lg hover:shadow-primary/10 hover:ring-primary/40"
                >
                  <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-primary-vif text-white shadow-md shadow-primary/25 transition group-hover:scale-105">
                    <action.icon className="h-6 w-6" aria-hidden="true" />
                  </span>
                  <span className="min-w-0">
                    <span className="flex items-center gap-1.5 font-display text-lg font-bold text-text">
                      {action.titre}
                      <ArrowRight
                        className="h-4 w-4 text-primary transition group-hover:translate-x-1"
                        aria-hidden="true"
                      />
                    </span>
                    <span className="mt-0.5 block text-sm text-text-secondary">
                      {action.description}
                    </span>
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
