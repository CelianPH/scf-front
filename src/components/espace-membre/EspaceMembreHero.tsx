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
    <section className="relative isolate overflow-hidden bg-gradient-to-br from-secondary via-primary to-primary-vif">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
      >
        <div className="absolute -left-16 -top-24 h-72 w-72 rounded-full bg-primary-accent/40 blur-3xl" />
        <div className="absolute -right-12 top-1/4 h-64 w-64 rounded-full bg-secondary-light/35 blur-3xl" />
        <div className="absolute bottom-[-4rem] left-1/3 h-56 w-56 rounded-full bg-white/10 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-4xl px-5 py-14 md:px-8 md:py-20">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-white backdrop-blur-sm">
            <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
            Espace membre
          </span>
          <h1 className="mt-3 font-display text-4xl font-bold text-white md:text-5xl">
            Bonjour {prenom} 👋
          </h1>
          <p className="mt-2 text-white/80 md:text-lg">
            Retrouve ici les demandes d&apos;adoption dont tu as la charge.
          </p>
        </motion.div>

        {absent ? (
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.4 }}
            className="mt-5 flex flex-wrap items-center gap-2 rounded-xl bg-white/15 px-4 py-3 text-sm text-white backdrop-blur-sm ring-1 ring-white/20"
          >
            <CalendarOff className="h-4 w-4 shrink-0" aria-hidden="true" />
            Tu es déclaré·e absent·e : tes demandes sont redirigées vers tes
            référent·es de secours.{" "}
            <Link
              href="/espace-membre/absence"
              className="font-semibold underline underline-offset-2"
            >
              Gérer
            </Link>
          </motion.p>
        ) : null}

        <dl className="mt-8 grid grid-cols-3 gap-3 md:gap-4">
          {stats.map((s, i) => {
            const Icon = STAT_ICONS[i] ?? Inbox;
            return (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 0.2 + i * 0.1,
                  duration: 0.4,
                  ease: "easeOut",
                }}
                className="rounded-2xl bg-white/15 p-4 text-center backdrop-blur-md ring-1 ring-white/20 md:p-5"
              >
                <span className="mx-auto flex h-9 w-9 items-center justify-center rounded-full bg-white/20 text-white">
                  <Icon className="h-4 w-4" aria-hidden="true" />
                </span>
                <dd className="mt-2 font-display text-3xl font-bold tabular-nums text-white md:text-4xl">
                  <CountUp value={s.valeur} />
                </dd>
                <dt className="mt-1 text-xs text-white/75 md:text-sm">
                  {s.label}
                </dt>
              </motion.div>
            );
          })}
        </dl>
      </div>
    </section>
  );
}
