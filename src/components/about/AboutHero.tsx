import Image from "next/image";
import { Icon } from "@/components/ui/Icon";
import { getStrapiMedia } from "@/lib/strapi";
import type { AboutHero as AboutHeroData } from "@/types/strapi";

interface AboutHeroProps {
  data: AboutHeroData;
}

export default function AboutHero({ data }: AboutHeroProps) {
  const imageUrl = getStrapiMedia(data.image.url) ?? "/images/about-hero.jpg";
  const imageAlt = data.imageAlt ?? data.image.alternativeText ?? "";

  return (
    <section className="relative isolate overflow-hidden">
      <div className="relative flex min-h-[58svh] w-full flex-col justify-end md:min-h-[62svh] lg:h-[70svh] lg:min-h-[600px] lg:justify-center">
        <Image
          src={imageUrl}
          alt={imageAlt}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-br from-dark/55 via-dark/45 to-primary/35"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-dark/70"
        />

        <div className="relative z-10 mx-auto w-full max-w-7xl px-5 pb-14 pt-28 md:px-8 md:pb-16 md:pt-32">
          <div className="max-w-3xl">
            {data.badgeText ? (
              <span className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1.5 text-xs font-medium text-white backdrop-blur-sm md:text-sm">
                {data.badgeIconName ? (
                  <Icon
                    name={data.badgeIconName}
                    className="h-3.5 w-3.5"
                    aria-hidden="true"
                  />
                ) : null}
                {data.badgeText}
              </span>
            ) : null}
            <h1 className="font-display text-4xl font-bold leading-[1.05] text-white md:text-6xl lg:text-7xl">
              {data.titreL1}
              {data.titreL2Highlighted ? (
                <>
                  <br />
                  <span className="text-secondary-lighter">
                    {data.titreL2Highlighted}
                  </span>
                </>
              ) : null}
            </h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-white/85 md:mt-6 md:text-lg">
              {data.description}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
