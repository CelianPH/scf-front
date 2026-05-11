import Image from "next/image";
import { Sparkles } from "lucide-react";
import Reveal from "./Reveal";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { CtaButton } from "@/components/ui/CtaButton";
import { getStrapiMedia } from "@/lib/strapi";
import type { HomeChatsBlock } from "@/types/strapi";

interface ChatsAdoptionProps {
  data: HomeChatsBlock;
}

export default function ChatsAdoption({ data }: ChatsAdoptionProps) {
  return (
    <section aria-labelledby="chats-titre" className="bg-bg-alt">
      <div className="mx-auto max-w-7xl px-5 py-12 md:px-8 md:py-16">
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2
            id="chats-titre"
            className="font-display text-3xl font-bold text-text md:text-4xl lg:text-5xl"
          >
            {data.titre}
          </h2>
          {data.description ? (
            <p className="mt-2 text-base text-text-secondary md:mt-3 md:text-lg">
              {data.description}
            </p>
          ) : null}
        </Reveal>

        <ul className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 md:mt-10 lg:grid-cols-3">
          {data.chats.map((chat, i) => {
            const sexeLabel = chat.sexe === "Male" ? "mâle" : "femelle";
            const imageUrl = getStrapiMedia(chat.image.url) ?? "";
            return (
              <Reveal as="li" key={chat.id} delay={i * 100}>
                <article className="group flex h-full flex-col overflow-hidden rounded-lg border border-border bg-surface shadow-sm transition duration-200 ease-out hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/15 motion-reduce:transition-none motion-reduce:hover:translate-y-0">
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-secondary-50">
                    <Image
                      src={imageUrl}
                      alt={
                        chat.image.alternativeText ??
                        `${chat.nom}, chat ${sexeLabel} de ${chat.age}, à l'adoption`
                      }
                      fill
                      sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw"
                      className="object-cover transition duration-500 group-hover:scale-105 motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                    />
                    {chat.badge ? (
                      <span className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full bg-primary px-2.5 py-1 text-xs font-semibold text-white shadow-sm">
                        <Sparkles className="h-3 w-3" aria-hidden="true" />
                        {chat.badge}
                      </span>
                    ) : null}
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    <h3 className="font-display text-xl font-bold text-text">
                      {chat.nom}
                    </h3>
                    <p className="mt-1 text-sm text-text-muted">
                      {chat.age} · {sexeLabel.charAt(0).toUpperCase() + sexeLabel.slice(1)}
                    </p>
                    <p className="mt-3 text-sm leading-relaxed text-text-secondary">
                      {chat.trait}
                    </p>
                    <ArrowLink
                      href={`/adoption/${chat.slug}`}
                      inGroup
                      className="mt-5"
                    >
                      Faire connaissance
                    </ArrowLink>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </ul>

        {data.ctaSeeAll ? (
          <Reveal className="mt-10 flex justify-center md:mt-12">
            <CtaButton cta={data.ctaSeeAll} />
          </Reveal>
        ) : null}
      </div>
    </section>
  );
}
