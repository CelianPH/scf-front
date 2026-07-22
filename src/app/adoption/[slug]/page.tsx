import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import DOMPurify from "isomorphic-dompurify";
import {
  ArrowLeft,
  ArrowRight,
  Heart,
  PawPrint,
  Sparkles,
  UserPlus,
} from "lucide-react";
import { estAdoptable, statutLabel } from "@/lib/chat-statut";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ChatGallery from "@/components/adoption/ChatGallery";
import Reveal from "@/components/layout/Reveal";
import StickyAdoptionBar from "@/components/adoption/StickyAdoptionBar";
import FavoriteButton from "@/components/adoption/FavoriteButton";
import { Button } from "@/components/ui/Button";
import { getChatBySlug, getStrapiMedia } from "@/lib/strapi";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const res = await getChatBySlug(slug);
  if (!res) return { title: "Chat introuvable | Sans Croquettes Fixes" };
  const c = res.data;
  return {
    title: `${c.nom}, ${c.sexe === "Male" ? "mâle" : "femelle"} de ${c.age} — Sans Croquettes Fixes`,
    description:
      c.trait ||
      `Découvrez ${c.nom} et faites une demande d'adoption auprès de Sans Croquettes Fixes.`,
  };
}

export default async function ChatDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const res = await getChatBySlug(slug);
  if (!res) notFound();

  const c = res.data;
  const sexeLabel = c.sexe === "Male" ? "Mâle" : "Femelle";
  const statusLabel = statutLabel(c.statut);
  const adoptable = estAdoptable(c.statut);
  const demandeUrl = `/adoption/${slug}/demande`;
  const referentPhotoUrl = c.referent?.photo
    ? getStrapiMedia(c.referent.photo.url)
    : null;
  const safeDescription = c.description
    ? DOMPurify.sanitize(c.description)
    : null;

  return (
    <>
      <Navbar />
      <main>
        {/* ── TITRE ── */}
        <section aria-labelledby="chat-titre" className="bg-dark text-white">
          <div className="mx-auto max-w-3xl px-5 py-5 md:px-8 md:py-6">
            <Link
              href="/adoption"
              className="group inline-flex items-center gap-1.5 text-sm font-medium text-white/70 transition-colors hover:text-white focus-visible:rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
            >
              <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" aria-hidden="true" />
              Tous les chats
            </Link>

            <div className="mt-3 flex flex-wrap items-end justify-between gap-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/60">
                  {sexeLabel} · {c.age}
                </p>
                <h1
                  id="chat-titre"
                  className="mt-1.5 font-display text-3xl font-bold leading-tight tracking-tight text-white md:text-4xl lg:text-5xl"
                >
                  {c.nom}
                </h1>
                {c.trait ? (
                  <p className="mt-2 text-sm text-white/75 md:text-base">
                    {c.trait}
                  </p>
                ) : null}
              </div>

              <span
                className={`inline-flex shrink-0 items-center gap-2 rounded-full px-3 py-1.5 text-sm font-semibold ${
                  adoptable
                    ? "bg-white text-primary shadow-sm"
                    : "bg-white/15 text-white/80"
                }`}
              >
                {adoptable && (
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inset-0 animate-ping rounded-full bg-primary opacity-60 motion-reduce:hidden" />
                    <span className="relative h-2 w-2 rounded-full bg-primary" />
                  </span>
                )}
                {statusLabel}
              </span>
            </div>
          </div>
        </section>

        {/* ── CONTENU ── */}
        <section className="bg-bg py-10 md:py-14">
          <div className="mx-auto max-w-3xl px-5 md:px-8">

            {/* Galerie */}
            <Reveal>
              <ChatGallery main={c.image} gallery={c.gallery} catName={c.nom} />
            </Reveal>

            {/* Bloc adoption inline */}
            <Reveal delay={80}>
              <div id="adoption-cta" className="mt-6 rounded-2xl bg-primary-50 p-5 ring-1 ring-primary/15 md:p-6">
                {!adoptable ? (
                  <>
                    <p className="font-display text-lg font-bold text-text">
                      {c.nom} a trouvé son foyer
                    </p>
                    <p className="mt-1.5 text-sm leading-relaxed text-text-secondary">
                      Ce compagnon a trouvé son foyer. D&apos;autres attendent encore le leur.
                    </p>
                    <div className="mt-4 flex flex-wrap items-center gap-3">
                      <Button variant="primary" size="md" href="/adoption" iconLeft={PawPrint}>
                        Voir les chats disponibles
                      </Button>
                    </div>
                  </>
                ) : (
                  <div className="flex flex-wrap items-center justify-between gap-4 sm:flex-nowrap">
                    <div className="min-w-0">
                      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary-dark">
                        Faire connaissance avec {c.nom}
                      </p>
                      <p className="mt-1.5 text-sm leading-relaxed text-text-secondary">
                        Adoptions sur dossier, après échange avec l&apos;équipe.
                      </p>
                      {c.referent ? (
                        <div className="mt-3 flex items-center gap-2.5">
                          {referentPhotoUrl ? (
                            <Image
                              src={referentPhotoUrl}
                              alt={c.referent.photo?.alternativeText ?? c.referent.nom}
                              width={32}
                              height={32}
                              className="h-8 w-8 rounded-full object-cover ring-2 ring-primary/20"
                            />
                          ) : (
                            <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-primary to-secondary text-white">
                              <PawPrint className="h-3.5 w-3.5" aria-hidden="true" />
                            </span>
                          )}
                          <p className="truncate text-xs font-semibold text-text">
                            {c.referent.nom}
                            {c.referent.role ? (
                              <span className="font-normal text-text-secondary"> · {c.referent.role}</span>
                            ) : null}
                          </p>
                        </div>
                      ) : null}
                    </div>

                    <div className="flex shrink-0 flex-col gap-2">
                      <Button
                        href={demandeUrl}
                        variant="primary"
                        size="sm"
                        iconLeft={Heart}
                        iconRight={ArrowRight}
                      >
                        Faire une demande
                      </Button>
                      <FavoriteButton slug={c.slug} catName={c.nom} fullWidth={false} />
                    </div>
                  </div>
                )}
              </div>
            </Reveal>

            {/* Caractère */}
            {c.caracteres && c.caracteres.length > 0 ? (
              <Reveal delay={100}>
                <section aria-labelledby="caracteres" className="mt-8">
                  <h2
                    id="caracteres"
                    className="font-display text-xl font-bold text-text md:text-2xl"
                  >
                    Caractère
                  </h2>
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {c.caracteres.map((t) => (
                      <li
                        key={t}
                        className="inline-flex items-center gap-1.5 rounded-full bg-primary-50 px-4 py-2 text-sm font-medium text-text ring-1 ring-border-light"
                      >
                        <Sparkles className="h-3.5 w-3.5 text-primary" aria-hidden="true" />
                        {t}
                      </li>
                    ))}
                  </ul>
                </section>
              </Reveal>
            ) : null}

            {/* Description */}
            {safeDescription ? (
              <Reveal delay={150}>
                <section aria-labelledby="description" className="mt-8">
                  <h2
                    id="description"
                    className="font-display text-xl font-bold text-text md:text-2xl"
                  >
                    Description
                  </h2>
                  <div
                    className="mt-3 text-sm leading-relaxed text-text-secondary [&_p]:mb-3 [&_p:last-child]:mb-0 md:text-base"
                    dangerouslySetInnerHTML={{ __html: safeDescription }}
                  />
                </section>
              </Reveal>
            ) : null}

            {/* Infos pratiques */}
            <Reveal delay={200}>
              <section aria-labelledby="infos" className="mt-8">
                <h2
                  id="infos"
                  className="font-display text-xl font-bold text-text md:text-2xl"
                >
                  Informations pratiques
                </h2>
                <dl className="mt-4 overflow-hidden rounded-2xl bg-surface ring-1 ring-border">
                  <div className="grid gap-1 px-5 py-4 md:grid-cols-[200px_1fr] md:gap-6 md:px-7 md:py-5">
                    <dt className="text-sm font-semibold uppercase tracking-wider text-primary md:text-[13px]">
                      Frais d&apos;adoption
                    </dt>
                    <dd className="text-sm text-text md:text-base">
                      {c.fraisAdoption != null
                        ? `${c.fraisAdoption} €`
                        : "Non communiqué"}
                    </dd>
                  </div>
                  {c.infos?.map((info) => (
                    <div
                      key={info.id}
                      className="grid gap-1 border-t border-border px-5 py-4 md:grid-cols-[200px_1fr] md:gap-6 md:px-7 md:py-5"
                    >
                      <dt className="text-sm font-semibold uppercase tracking-wider text-primary md:text-[13px]">
                        {info.libelle}
                      </dt>
                      <dd className="text-sm text-text md:text-base">
                        {info.valeur}
                      </dd>
                    </div>
                  ))}
                </dl>
              </section>
            </Reveal>
          </div>
        </section>

        {/* ── SECTION FINALE ── */}
        <section aria-labelledby="cta-adoption" className="bg-primary text-white">
          <Reveal>
            <div className="mx-auto max-w-7xl px-5 py-12 md:px-8 md:py-16">
              <div className="relative grid gap-10 lg:grid-cols-2 lg:gap-0">
                <div aria-hidden="true" className="absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 bg-white/20 lg:block" />

                <div className="lg:px-12">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/60">
                    Adoption
                  </p>
                  <h2 id="cta-adoption" className="mt-2 font-display text-2xl font-bold leading-tight md:text-3xl">
                    Ils attendent aussi un foyer
                  </h2>
                  <p className="mt-3 text-sm leading-relaxed text-white/80">
                    Chaque adoption libère une place pour un chat de plus.
                  </p>
                  <Button
                    variant="white"
                    size="lg"
                    href="/adoption"
                    iconLeft={PawPrint}
                    className="mt-6"
                  >
                    Voir tous les chats
                  </Button>
                </div>

                <div className="border-t border-white/20 pt-10 lg:border-t-0 lg:px-12 lg:pt-0">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/60">
                    Soutien
                  </p>
                  <h2 id="cta-soutien" className="mt-2 font-display text-2xl font-bold leading-tight md:text-3xl">
                    Vous ne pouvez pas adopter&nbsp;?
                  </h2>
                  <p className="mt-3 text-sm leading-relaxed text-white/80">
                    Don, bénévolat, famille d&apos;accueil : chaque geste compte.
                  </p>
                  <div className="mt-6 flex flex-wrap gap-3">
                    <Button variant="outlined-light" size="md" href="/don" iconLeft={Heart}>
                      Faire un don
                    </Button>
                    <Button variant="outlined-light" size="md" href="/a-propos#benevoles" iconLeft={UserPlus}>
                      Devenir bénévole
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </section>
      </main>

      {adoptable && (
        <StickyAdoptionBar
          catName={c.nom}
          sexeLabel={sexeLabel}
          age={c.age}
          adoptionUrl={demandeUrl}
        />
      )}

      <Footer />
    </>
  );
}
