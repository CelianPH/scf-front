import Image from "next/image";
import Link from "next/link";
import { Heart, PawPrint } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative isolate overflow-hidden">
      <div className="relative h-[68svh] min-h-[520px] w-full md:h-[78svh]">
        <Image
          src="/images/hero.jpg"
          alt="Chat tigré au regard expressif, accueilli par l'association"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-b from-dark/40 via-dark/55 to-dark/80"
        />

        <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col justify-end px-5 pb-12 pt-24 md:px-8 md:pb-20 md:pt-32 lg:justify-center">
          <div className="max-w-2xl">
            <span className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1.5 text-xs font-medium text-white backdrop-blur-sm md:text-sm">
              <PawPrint className="h-3.5 w-3.5" aria-hidden="true" />
              Association lyonnaise · loi 1901 · depuis 2015
            </span>
            <h1 className="font-display text-4xl font-bold leading-[1.05] text-white md:text-6xl lg:text-7xl">
              Adoptez un chat,
              <br />
              <span className="text-secondary-lighter">offrez-lui une seconde chance</span>
            </h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-white/85 md:mt-6 md:text-lg">
              Sans Croquettes Fixes accompagne les chats en détresse et les
              humains qui en prennent soin, à Lyon et dans toute la région
              Auvergne-Rhône-Alpes.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row md:mt-9">
              <Link
                href="/adoption"
                className="inline-flex items-center justify-center gap-2 rounded-md bg-primary px-6 py-3.5 text-base font-semibold text-white shadow-lg shadow-primary/30 transition hover:bg-primary-dark hover:shadow-primary/40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                <PawPrint className="h-5 w-5" aria-hidden="true" />
                Adopter un chat
              </Link>
              <Link
                href="/don"
                className="inline-flex items-center justify-center gap-2 rounded-md border-2 border-white/80 bg-white/10 px-6 py-3.5 text-base font-semibold text-white backdrop-blur-sm transition hover:border-white hover:bg-white/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                <Heart className="h-5 w-5" aria-hidden="true" />
                Faire un don
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
