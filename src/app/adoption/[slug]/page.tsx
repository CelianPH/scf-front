import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  ExternalLink,
  Heart,
  PawPrint,
  Sparkles,
  UserPlus,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ChatGallery from "@/components/ChatGallery";
import FavoriteButton from "@/components/FavoriteButton";
import { Button } from "@/components/ui/Button";
import { getChatBySlug, getStrapiMedia } from "@/lib/strapi";

const ADOPTION_FORM_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLScsuZRgyy778u5XklovaF_hyGjdbl6ySO3GIA_uDByLN8OHVw/viewform";

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
      c.trait ??
      `Découvrez ${c.nom} et faites une demande d'adoption auprès de Sans Croquettes Fixes.`,
  };
}

export default async function ChatDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const res = await getChatBySlug(slug);
  if (!res) notFound();

  const c = res.data;
  const sexeLabel = c.sexe === "Male" ? "Mâle" : "Femelle";
  const statusLabel = c.adopted ? "Adopté" : "Disponible";
  const referentPhotoUrl = c.referent?.photo
    ? getStrapiMedia(c.referent.photo.url)
    : null;

  return (
    <>
      <Navbar />
      <main className="bg-bg">
        <section
          aria-labelledby="chat-titre"
          className="relative isolate overflow-hidden"
        >
          <div
            aria-hidden="true"
            className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,rgba(194,24,91,0.12),transparent_60%)]"
          />
          <div className="mx-auto max-w-7xl px-5 pb-16 pt-20 md:px-8 md:pb-24 md:pt-28">
            <Link
              href="/adoption"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-text-secondary transition-[gap] hover:gap-2.5 hover:text-primary"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              Tous les chats
            </Link>

            <div className="mt-6 grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:gap-12">
              <div>
                <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
                      {sexeLabel} · {c.age}
                    </p>
                    <h1
                      id="chat-titre"
                      className="mt-2 font-display text-5xl font-bold leading-[1.02] tracking-tight text-text md:text-6xl"
                    >
                      {c.nom}
                    </h1>
                    {c.trait ? (
                      <p className="mt-3 max-w-xl text-lg text-text-secondary">
                        {c.trait}
                      </p>
                    ) : null}
                  </div>

                  <span
                    className={`inline-flex shrink-0 items-center gap-2 rounded-full px-3.5 py-1.5 text-sm font-semibold shadow-sm ${
                      c.adopted
                        ? "bg-text-muted text-white"
                        : "bg-white text-primary ring-1 ring-primary/15"
                    }`}
                  >
                    {!c.adopted && (
                      <span className="relative flex h-2 w-2">
                        <span className="absolute inset-0 animate-ping rounded-full bg-primary opacity-60 motion-reduce:hidden" />
                        <span className="relative h-2 w-2 rounded-full bg-primary" />
                      </span>
                    )}
                    {statusLabel}
                  </span>
                </div>

                <ChatGallery main={c.image} gallery={c.gallery} catName={c.nom} />

                {c.caracteres && c.caracteres.length > 0 ? (
                  <section aria-labelledby="caracteres" className="mt-10">
                    <h2
                      id="caracteres"
                      className="font-display text-2xl font-bold text-text md:text-3xl"
                    >
                      Caractère
                    </h2>
                    <ul className="mt-4 flex flex-wrap gap-2">
                      {c.caracteres.map((t) => (
                        <li
                          key={t}
                          className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-br from-primary-50 to-secondary-50 px-4 py-2 text-sm font-medium text-text ring-1 ring-primary-50"
                        >
                          <Sparkles
                            className="h-3.5 w-3.5 text-primary"
                            aria-hidden="true"
                          />
                          {t}
                        </li>
                      ))}
                    </ul>
                  </section>
                ) : null}

                {c.description ? (
                  <section aria-labelledby="description" className="mt-10">
                    <h2
                      id="description"
                      className="font-display text-2xl font-bold text-text md:text-3xl"
                    >
                      Description
                    </h2>
                    <div
                      className="prose-don mt-4 text-base leading-relaxed text-text-secondary [&_p]:mb-4 [&_p:last-child]:mb-0 md:text-lg"
                      dangerouslySetInnerHTML={{ __html: c.description }}
                    />
                  </section>
                ) : null}

                {c.infos && c.infos.length > 0 ? (
                  <section aria-labelledby="infos" className="mt-10">
                    <h2
                      id="infos"
                      className="font-display text-2xl font-bold text-text md:text-3xl"
                    >
                      Informations pratiques
                    </h2>
                    <dl className="mt-4 overflow-hidden rounded-2xl bg-surface ring-1 ring-border">
                      {c.infos.map((info, i) => (
                        <div
                          key={info.id}
                          className={`grid gap-1 px-5 py-4 md:grid-cols-[200px_1fr] md:gap-6 md:px-7 md:py-5 ${
                            i > 0 ? "border-t border-border" : ""
                          }`}
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
                ) : null}
              </div>

              <aside className="lg:sticky lg:top-24 lg:self-start">
                <div className="rounded-3xl bg-surface p-6 shadow-xl shadow-primary/5 ring-1 ring-border md:p-7">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary-dark">
                    Faire connaissance avec {c.nom}
                  </p>
                  <p className="mt-2 text-sm text-text-secondary">
                    Les adoptions se font sur dossier, après échange avec
                    l&apos;équipe. Première étape : le formulaire.
                  </p>

                  <Button
                    href={ADOPTION_FORM_URL}
                    external
                    variant="primary"
                    size="lg"
                    fullWidth
                    className="mt-5"
                    iconLeft={Heart}
                    iconRight={ExternalLink}
                  >
                    Demande d&apos;adoption
                  </Button>

                  <div className="mt-3">
                    <FavoriteButton slug={c.slug} catName={c.nom} />
                  </div>

                  {c.referent ? (
                    <div className="mt-6 border-t border-border pt-6">
                      <p className="text-xs font-semibold uppercase tracking-wider text-text-secondary">
                        Bénévole référent·e
                      </p>
                      <div className="mt-3 flex items-center gap-3">
                        {referentPhotoUrl ? (
                          <Image
                            src={referentPhotoUrl}
                            alt={c.referent.photo?.alternativeText ?? c.referent.nom}
                            width={48}
                            height={48}
                            className="h-12 w-12 rounded-full object-cover ring-2 ring-primary-50"
                          />
                        ) : (
                          <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-primary to-secondary text-white">
                            <PawPrint className="h-5 w-5" aria-hidden="true" />
                          </span>
                        )}
                        <div className="min-w-0">
                          <p className="truncate text-sm font-semibold text-text md:text-base">
                            {c.referent.nom}
                          </p>
                          {c.referent.role ? (
                            <p className="truncate text-xs text-text-secondary">
                              {c.referent.role}
                            </p>
                          ) : null}
                        </div>
                      </div>
                    </div>
                  ) : null}
                </div>

                <div className="mt-5 overflow-hidden rounded-3xl bg-gradient-to-br from-secondary via-primary to-primary-vif p-6 text-white shadow-xl shadow-primary/10 md:p-7">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/80">
                    Soutenir l&apos;asso
                  </p>
                  <h3 className="mt-2 font-display text-xl font-bold leading-tight md:text-2xl">
                    Vous ne pouvez pas adopter ?
                  </h3>
                  <p className="mt-2 text-sm text-white/85">
                    Chaque don ou bénévole permet de sauver un chat de plus.
                  </p>
                  <div className="mt-5 flex flex-col gap-2">
                    <Link
                      href="/don"
                      className="group inline-flex items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-primary shadow-md transition hover:-translate-y-px hover:shadow-lg"
                    >
                      <Heart className="h-4 w-4" aria-hidden="true" />
                      Faire un don
                      <ArrowRight
                        className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                        aria-hidden="true"
                      />
                    </Link>
                    <Link
                      href="/a-propos#benevoles"
                      className="group inline-flex items-center justify-center gap-2 rounded-xl border-2 border-white/80 bg-white/10 px-5 py-3 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white/20"
                    >
                      <UserPlus className="h-4 w-4" aria-hidden="true" />
                      Devenir bénévole
                    </Link>
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
