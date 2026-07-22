import Reveal from "@/components/layout/Reveal";
import AdoptionCard from "@/components/adoption/AdoptionCard";
import { CtaButton } from "@/components/ui/CtaButton";
import { Section } from "@/components/ui/Section";
import type { HomeChatsBlock } from "@/types/strapi";

interface ChatsAdoptionProps {
  data: HomeChatsBlock;
}

export default function ChatsAdoption({ data }: ChatsAdoptionProps) {
  return (
    <Section aria-labelledby="chats-titre" bg="bg-alt">
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
          {data.chats.slice(0, 3).map((chat, i) => (
            <Reveal as="li" key={chat.id} delay={i * 100}>
              <AdoptionCard chat={chat} imageAspectClassName="aspect-[4/3]" />
            </Reveal>
          ))}
        </ul>

        {data.ctaSeeAll ? (
          <Reveal className="mt-10 flex justify-center md:mt-12">
            <CtaButton cta={data.ctaSeeAll} />
          </Reveal>
        ) : null}
    </Section>
  );
}
