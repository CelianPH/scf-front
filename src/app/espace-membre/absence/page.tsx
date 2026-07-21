import Link from "next/link";
import { ArrowLeft, CalendarOff, Cat } from "lucide-react";
import Reveal from "@/components/layout/Reveal";
import { getBenevoleMe } from "@/lib/strapi-server";
import AbsenceForm from "@/components/espace-membre/AbsenceForm";

export default async function AbsencePage() {
  const { data: benevole } = await getBenevoleMe();

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
        <div className="relative mx-auto max-w-2xl px-5 pt-10 pb-8 md:px-8 md:pt-14">
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
                <CalendarOff className="h-5 w-5" aria-hidden="true" />
              </span>
              <h1 className="font-display text-3xl font-bold text-white md:text-4xl">
                Mes absences
              </h1>
            </div>
            <p className="mt-3 text-white/80 md:text-lg">
              Préviens l&apos;association quand tu n&apos;es pas disponible
              pour traiter les demandes d&apos;adoption.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="bg-bg">
        <div className="mx-auto max-w-2xl px-5 py-10 md:px-8 md:py-12">
          <Reveal delay={100}>
            {benevole ? (
              <AbsenceForm benevole={benevole} />
            ) : (
              <p className="rounded-2xl bg-surface p-5 text-sm text-text-secondary ring-1 ring-border">
                Aucune fiche bénévole n&apos;est rattachée à ton compte.
                Contacte un·e administrateur·rice de l&apos;association.
              </p>
            )}
          </Reveal>

          {benevole?.chats?.length ? (
            <Reveal delay={180} className="mt-10">
              <h2 className="flex items-center gap-2 font-display text-xl font-bold text-text">
                <Cat className="h-5 w-5 text-primary" aria-hidden="true" />
                Chats dont tu es référent·e
              </h2>
              <ul className="mt-4 flex flex-wrap gap-2">
                {benevole.chats.map((c) => (
                  <li key={c.id}>
                    <Link
                      href={`/adoption/${c.slug}`}
                      className="inline-flex items-center gap-1.5 rounded-full bg-surface px-3.5 py-1.5 text-sm font-medium text-text shadow-sm ring-1 ring-border transition hover:-translate-y-0.5 hover:text-primary hover:ring-primary/40"
                    >
                      {c.nom}
                    </Link>
                  </li>
                ))}
              </ul>
            </Reveal>
          ) : null}
        </div>
      </section>
    </>
  );
}
