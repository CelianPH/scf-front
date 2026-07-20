import Link from "next/link";
import { Inbox, Cat, CalendarOff, ArrowRight } from "lucide-react";
import { getCurrentUser } from "@/lib/auth";
import { getBenevoleMe, getDemandesATraiter } from "@/lib/strapi-server";

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
    <section className="mx-auto max-w-4xl px-5 py-12 md:px-8 md:py-16">
      <p className="text-sm font-semibold uppercase tracking-wider text-primary">
        Espace membre
      </p>
      <h1 className="mt-1 font-display text-4xl font-bold text-text md:text-5xl">
        Bonjour {user?.prenom ?? ""}
      </h1>
      <p className="mt-2 text-text-secondary">
        Retrouve ici les demandes d&apos;adoption dont tu as la charge.
      </p>

      {benevole?.absent ? (
        <p className="mt-4 flex items-center gap-2 rounded-xl bg-amber-50 px-4 py-3 text-sm text-amber-900 ring-1 ring-amber-200">
          <CalendarOff className="h-4 w-4 shrink-0" />
          Tu es déclaré·e absent·e : tes demandes sont redirigées vers tes
          référent·es de secours.{" "}
          <Link
            href="/espace-membre/absence"
            className="font-semibold underline"
          >
            Gérer
          </Link>
        </p>
      ) : null}

      <dl className="mt-8 grid grid-cols-3 gap-3">
        {[
          { label: "En attente", valeur: enAttente },
          { label: "En cours", valeur: enCours },
          { label: "Chats concernés", valeur: chatsSuivis },
        ].map((s) => (
          <div
            key={s.label}
            className="rounded-2xl bg-surface p-4 text-center ring-1 ring-border"
          >
            <dd className="font-display text-3xl font-bold tabular-nums text-primary">
              {s.valeur}
            </dd>
            <dt className="mt-1 text-xs text-text-secondary">{s.label}</dt>
          </div>
        ))}
      </dl>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        <Link
          href="/espace-membre/demandes"
          className="group flex items-start gap-3 rounded-2xl bg-surface p-5 ring-1 ring-border transition hover:ring-primary"
        >
          <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary-50 text-primary">
            <Inbox className="h-5 w-5" />
          </span>
          <span className="min-w-0">
            <span className="flex items-center gap-1 font-display text-lg font-bold text-text">
              Demandes à traiter
              <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
            </span>
            <span className="mt-0.5 block text-sm text-text-secondary">
              Prendre en charge, accepter ou refuser une demande.
            </span>
          </span>
        </Link>

        <Link
          href="/espace-membre/absence"
          className="group flex items-start gap-3 rounded-2xl bg-surface p-5 ring-1 ring-border transition hover:ring-primary"
        >
          <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary-50 text-primary">
            <CalendarOff className="h-5 w-5" />
          </span>
          <span className="min-w-0">
            <span className="flex items-center gap-1 font-display text-lg font-bold text-text">
              Mes absences
              <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
            </span>
            <span className="mt-0.5 block text-sm text-text-secondary">
              Signaler une indisponibilité et passer la main aux backups.
            </span>
          </span>
        </Link>

        <Link
          href="/adoption"
          className="group flex items-start gap-3 rounded-2xl bg-surface p-5 ring-1 ring-border transition hover:ring-primary"
        >
          <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary-50 text-primary">
            <Cat className="h-5 w-5" />
          </span>
          <span className="min-w-0">
            <span className="flex items-center gap-1 font-display text-lg font-bold text-text">
              Le refuge
              <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
            </span>
            <span className="mt-0.5 block text-sm text-text-secondary">
              Consulter les fiches des chats à l&apos;adoption.
            </span>
          </span>
        </Link>
      </div>
    </section>
  );
}
