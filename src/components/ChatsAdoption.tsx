import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import Reveal from "./Reveal";

type Chat = {
  slug: string;
  nom: string;
  age: string;
  sexe: "Femelle" | "Mâle";
  trait: string;
  image: string;
  badge?: string;
};

const chats: Chat[] = [
  {
    slug: "kavi",
    nom: "Kavi",
    age: "1 an",
    sexe: "Femelle",
    trait: "Petit gabarit, beaucoup d'énergie",
    image: "/images/chats/kavi.jpg",
  },
  {
    slug: "junior",
    nom: "Junior",
    age: "2 ans",
    sexe: "Mâle",
    trait: "Craintif au début, gros câlineur",
    image: "/images/chats/junior.jpg",
  },
  {
    slug: "argen",
    nom: "Argen",
    age: "1 an",
    sexe: "Mâle",
    trait: "Proche de l'humain, indépendant",
    image: "/images/chats/argen.jpg",
    badge: "A besoin d'extérieur",
  },
];

export default function ChatsAdoption() {
  return (
    <section aria-labelledby="chats-titre" className="bg-bg-alt">
      <div className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-24">
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2
            id="chats-titre"
            className="font-display text-3xl font-bold text-text md:text-4xl lg:text-5xl"
          >
            Ils cherchent une famille
          </h2>
          <p className="mt-3 text-base text-text-secondary md:mt-4 md:text-lg">
            Découvrez nos chats actuellement disponibles à l&apos;adoption.
          </p>
        </Reveal>

        <ul className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 md:mt-14 lg:grid-cols-3">
          {chats.map((chat, i) => (
            <Reveal as="li" key={chat.nom} delay={i * 100}>
              <article className="group flex h-full flex-col overflow-hidden rounded-lg border border-border bg-surface shadow-sm transition hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/10">
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-secondary-50">
                  <Image
                    src={chat.image}
                    alt={`${chat.nom}, chat ${chat.sexe.toLowerCase()} de ${chat.age}, à l'adoption`}
                    fill
                    sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw"
                    className="object-cover transition duration-500 group-hover:scale-105"
                  />
                  {chat.badge && (
                    <span className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full bg-primary px-2.5 py-1 text-xs font-semibold text-white shadow-sm">
                      <Sparkles className="h-3 w-3" aria-hidden="true" />
                      {chat.badge}
                    </span>
                  )}
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <h3 className="font-display text-xl font-bold text-text">{chat.nom}</h3>
                  <p className="mt-1 text-sm text-text-muted">
                    {chat.age} · {chat.sexe}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-text-secondary">{chat.trait}</p>
                  <Link
                    href={`/adoption/${chat.slug}`}
                    className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-primary transition group-hover:gap-2.5 hover:text-primary-dark"
                  >
                    Faire connaissance
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                </div>
              </article>
            </Reveal>
          ))}
        </ul>

        <Reveal className="mt-12 flex justify-center md:mt-16">
          <Link
            href="/adoption"
            className="inline-flex items-center gap-2 rounded-md border-2 border-primary px-6 py-3 text-base font-semibold text-primary transition hover:bg-primary hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            Voir tous les chats
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
