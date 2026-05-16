import Reveal from "./Reveal";
import AdoptionCard from "@/components/AdoptionCard";
import { CtaButton } from "@/components/ui/CtaButton";
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
          {data.chats.map((chat, i) => (
            <Reveal as="li" key={chat.id} delay={i * 100}>
              <AdoptionCard chat={chat} />
            </Reveal>
          ))}
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
