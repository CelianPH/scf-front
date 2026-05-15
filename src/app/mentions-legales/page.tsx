import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Mentions légales | Sans Croquettes Fixes",
};

export default function Page() {
  return (
    <>
      <Navbar />
      <main className="bg-bg">
        <article className="mx-auto max-w-3xl px-5 py-16 md:px-8 md:py-24">
          <h1 className="font-display text-4xl font-bold text-text md:text-5xl">
            Mentions légales
          </h1>

          <section className="prose mt-10 max-w-none text-text-secondary [&_h2]:font-display [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-text [&_h2]:mt-10 [&_h2]:mb-3 [&_p]:leading-relaxed [&_p]:mb-4">
            <h2>Éditeur du site</h2>
            <p>
              Association Sans Croquettes Fixes, loi 1901, déclarée en préfecture en août 2015.
              <br />SIRET : 81819530700017.
              <br />Siège : 22 chemin de Boutary, 69300 Caluire-et-Cuire.
              <br />Email : contact@sanscroquettesfixes.fr.
              <br />Responsable de la publication : Anaïs Hillion.
            </p>

            <h2>Hébergeur</h2>
            <p>
              [À compléter en prod — ex : Vercel Inc., 440 N Barranca Ave #4133, Covina, CA
              91723, USA]
            </p>

            <h2>Propriété intellectuelle</h2>
            <p>
              L&apos;ensemble des contenus (textes, photos, logos) est la propriété de
              l&apos;association Sans Croquettes Fixes. Toute reproduction sans autorisation est
              interdite.
            </p>

            <h2>Contact</h2>
            <p>
              Pour toute question relative au site : contact@sanscroquettesfixes.fr
            </p>
          </section>
        </article>
      </main>
      <Footer />
    </>
  );
}
