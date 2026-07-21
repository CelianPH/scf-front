"use client";

import { useEffect } from "react";
import Link from "next/link";
import { motion, useMotionValue, useTransform, animate } from "motion/react";
import { Inbox, Clock, Cat, CalendarOff, Sparkles } from "lucide-react";

interface StatItem {
  label: string;
  valeur: number;
}

interface EspaceMembreHeroProps {
  prenom: string;
  absent: boolean;
  stats: StatItem[]; // ordre attendu : En attente, En cours, Chats concernés
}

const STAT_ICONS = [Inbox, Clock, Cat];

function CountUp({ value }: { value: number }) {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (v) => Math.round(v));

  useEffect(() => {
    const controls = animate(count, value, { duration: 1, ease: "easeOut" });
    return () => controls.stop();
  }, [value, count]);

  return <motion.span>{rounded}</motion.span>;
}

export default function EspaceMembreHero({
  prenom,
  absent,
  stats,
}: EspaceMembreHeroProps) {
  return (
    <section className="relative isolate overflow-hidden border-b border-border bg-bg-alt">
      {/* Halo léger : le dégradé signature reste présent, mais très diffus et discret. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
      >
        <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute -left-20 bottom-[-4rem] h-56 w-56 rounded-full bg-secondary/10 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-4xl px-5 py-9 md:px-8 md:py-12">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <span className="inline-flex items-center gap-1.5 rounded-full bg-primary-50 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary">
            <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
            Espace membre
          </span>
          <h1 className="mt-3 font-display text-3xl font-bold text-text md:text-4xl">
            Bonjour {prenom} 👋
          </h1>
          <p className="mt-2 text-text-secondary md:text-lg">
            Retrouve ici les demandes d&apos;adoption dont tu as la charge.
          </p>
        </motion.div>

        {absent ? (
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.4 }}
            className="mt-5 flex flex-wrap items-center gap-2 rounded-xl bg-amber-50 px-4 py-3 text-sm text-amber-900 ring-1 ring-amber-200"
          >
            <CalendarOff className="h-4 w-4 shrink-0 text-amber-700" aria-hidden="true" />
            Tu es déclaré·e absent·e : tes demandes sont redirigées vers tes
            référent·es de secours.{" "}
            <Link
              href="/espace-membre/absence"
              className="font-semibold text-amber-900 underline underline-offset-2"
            >
              Gérer
            </Link>
          </motion.p>
        ) : null}

        <dl className="mt-7 grid grid-cols-3 gap-3 md:gap-4">
          {stats.map((s, i) => {
            const Icon = STAT_ICONS[i] ?? Inbox;
            return (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 0.2 + i * 0.1,
                  duration: 0.4,
                  ease: "easeOut",
                }}
                className="group flex flex-col items-center rounded-2xl bg-surface p-4 text-center shadow-sm ring-1 ring-border transition duration-200 hover:-translate-y-0.5 hover:shadow-md hover:ring-primary/30 md:flex-row md:items-center md:gap-3 md:p-5 md:text-left"
              >
                <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-primary-vif text-white shadow-sm shadow-primary/25 transition group-hover:scale-105">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <div className="mt-2 md:mt-0">
                  <dd className="font-display text-2xl font-bold tabular-nums text-text md:text-3xl">
                    <CountUp value={s.valeur} />
                  </dd>
                  <dt className="mt-0.5 text-xs text-text-secondary md:text-sm">
                    {s.label}
                  </dt>
                </div>
              </motion.div>
            );
          })}
        </dl>
      </div>
    </section>
  );
}
