import Link from "next/link";
import {
  ArrowLeft,
  Settings,
  IdCard,
  ShieldCheck,
  LogOut,
  Mail,
  CheckCircle2,
  AlertCircle,
  CalendarCheck,
  UserRound,
  type LucideIcon,
} from "lucide-react";
import Reveal from "@/components/layout/Reveal";
import { getCurrentUser } from "@/lib/auth";
import LogoutButton from "@/components/compte/LogoutButton";

export default async function ParametresPage() {
  const user = (await getCurrentUser())!;

  return (
    <>
      <section className="relative isolate overflow-hidden border-b border-border bg-bg-alt">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10"
        >
          <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
          <div className="absolute -left-20 bottom-[-4rem] h-56 w-56 rounded-full bg-secondary/10 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-2xl px-5 py-9 md:px-8 md:py-12">
          <Reveal>
            <Link
              href="/compte"
              className="inline-flex items-center gap-1.5 rounded-full bg-surface px-3 py-1.5 text-sm font-medium text-text-secondary ring-1 ring-border transition hover:text-primary hover:ring-primary/40"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              Mon espace
            </Link>

            <div className="mt-5 flex items-center gap-3">
              <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-primary-vif text-white shadow-md shadow-primary/25">
                <Settings className="h-5 w-5" aria-hidden="true" />
              </span>
              <h1 className="font-display text-3xl font-bold text-text md:text-4xl">
                Paramètres
              </h1>
            </div>
            <p className="mt-3 text-text-secondary md:text-lg">
              Tes informations, tes données personnelles et ta session.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="bg-bg">
        <div className="mx-auto max-w-2xl space-y-6 px-5 py-10 md:px-8 md:py-12">
          <Block title="Informations du compte" icon={IdCard} delay={0}>
            <dl>
              <Row
                icon={UserRound}
                label="Nom"
                value={`${user.prenom} ${user.nom}`}
              />
              <Row icon={Mail} label="Email" value={user.email} />
              <Row
                icon={user.confirmed ? CheckCircle2 : AlertCircle}
                label="Email confirmé"
                value={
                  user.confirmed ? (
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-semibold text-green-800">
                      <CheckCircle2 className="h-3.5 w-3.5" aria-hidden="true" />
                      Confirmé
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-semibold text-amber-800">
                      <AlertCircle className="h-3.5 w-3.5" aria-hidden="true" />
                      À vérifier dans ta boîte mail
                    </span>
                  )
                }
              />
              <Row
                icon={CalendarCheck}
                label="CGU acceptées le"
                value={new Date(user.cguAcceptedAt).toLocaleDateString("fr-FR")}
              />
            </dl>
          </Block>

          <Block title="Mes données (RGPD)" icon={ShieldCheck} delay={90}>
            <div className="flex gap-3 rounded-xl bg-bg-alt p-4">
              <ShieldCheck
                className="h-5 w-5 shrink-0 text-primary"
                aria-hidden="true"
              />
              <p className="text-sm leading-relaxed text-text-secondary">
                Tes droits d&apos;accès, de rectification et de portabilité sont
                décrits dans notre{" "}
                <Link
                  href="/politique-de-confidentialite"
                  className="font-medium text-primary underline underline-offset-2"
                >
                  politique de confidentialité
                </Link>
                . Pour exporter ou supprimer tes données, contacte-nous à{" "}
                <a
                  href="mailto:contact@sanscroquettesfixes.fr"
                  className="font-medium text-primary underline underline-offset-2"
                >
                  contact@sanscroquettesfixes.fr
                </a>{" "}
                (un flow automatisé est prévu prochainement).
              </p>
            </div>
          </Block>

          <Block title="Session" icon={LogOut} delay={180}>
            <LogoutButton />
          </Block>
        </div>
      </section>
    </>
  );
}

function Block({
  title,
  icon: Icon,
  delay,
  children,
}: {
  title: string;
  icon: LucideIcon;
  delay: number;
  children: React.ReactNode;
}) {
  return (
    <Reveal delay={delay}>
      <section>
        <h2 className="flex items-center gap-2 font-display text-xl font-bold text-text">
          <Icon className="h-5 w-5 text-primary" aria-hidden="true" />
          {title}
        </h2>
        <div className="mt-3 rounded-2xl bg-surface p-5 shadow-sm ring-1 ring-border md:p-6">
          {children}
        </div>
      </section>
    </Reveal>
  );
}

function Row({
  icon: Icon,
  label,
  value,
}: {
  icon: LucideIcon;
  label: string;
  value: React.ReactNode;
}) {
  return (
    <div className="grid grid-cols-1 items-center gap-1 border-b border-border py-3 last:border-b-0 sm:grid-cols-[200px_1fr]">
      <dt className="flex items-center gap-2 text-sm font-semibold text-text-secondary">
        <Icon className="h-4 w-4 text-text-muted" aria-hidden="true" />
        {label}
      </dt>
      <dd className="text-sm text-text">{value}</dd>
    </div>
  );
}
