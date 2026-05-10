import Link from "next/link";
import { PawPrint } from "lucide-react";
import Reveal from "./Reveal";

export default function CtaFinal() {
  return (
    <section aria-labelledby="cta-titre" className="bg-dark">
      <div className="relative overflow-hidden">
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(194,24,91,0.25),transparent_60%),radial-gradient(ellipse_at_bottom_left,rgba(123,31,162,0.3),transparent_55%)]"
        />
        <Reveal className="relative mx-auto max-w-7xl px-5 py-16 text-center md:px-8 md:py-24">
          <h2
            id="cta-titre"
            className="mx-auto max-w-2xl font-display text-3xl font-bold leading-tight text-white md:text-4xl lg:text-5xl"
          >
            Ensemble, sauvons plus de chats
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base text-white/75 md:text-lg">
            Adoptez, donnez, devenez bénévole. Chaque action compte pour les chats
            de Lyon.
          </p>
          <Link
            href="/adoption"
            className="mt-8 inline-flex items-center gap-2 rounded-md bg-primary px-7 py-3.5 text-base font-semibold text-white shadow-lg shadow-primary/30 transition hover:bg-primary-vif hover:shadow-primary-vif/40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white md:text-lg"
          >
            <PawPrint className="h-5 w-5" aria-hidden="true" />
            Nous rejoindre
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
