import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Politique de confidentialité | Sans Croquettes Fixes",
};

export default function Page() {
  return (
    <>
      <Navbar />
      <main className="bg-bg">
        <article className="mx-auto max-w-3xl px-5 py-16 md:px-8 md:py-24">
          <h1 className="font-display text-4xl font-bold text-text md:text-5xl">
            Politique de confidentialité
          </h1>
          <p className="mt-3 text-sm text-text-muted">
            Dernière mise à jour : 2026-05-15
          </p>

          <section className="prose mt-10 max-w-none text-text-secondary [&_h2]:font-display [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-text [&_h2]:mt-10 [&_h2]:mb-3 [&_p]:leading-relaxed [&_p]:mb-4">
            <h2>Qui collecte tes données ?</h2>
            <p>
              L&apos;association Sans Croquettes Fixes (loi 1901, SIRET 81819530700017),
              22 chemin de Boutary, 69300 Caluire-et-Cuire, contact@sanscroquettesfixes.fr.
            </p>

            <h2>Quelles données on collecte</h2>
            <p>
              <strong>À l&apos;inscription :</strong> prénom, nom, email, mot de passe (haché). On
              stocke aussi le timestamp d&apos;acceptation des CGU.
            </p>
            <p>
              <strong>Sur ton profil (optionnel) :</strong> téléphone, date de naissance, ville,
              code postal, type de logement, accès extérieur, présence à la maison, autres
              animaux, enfants au foyer, expérience avec les chats, préférences.
            </p>
            <p>
              <strong>Lors d&apos;une demande d&apos;adoption :</strong> ton message et la
              date de rencontre souhaitée.
            </p>

            <h2>Pourquoi on les collecte</h2>
            <p>
              Pour gérer ton compte, te recontacter au sujet d&apos;une demande
              d&apos;adoption, et te proposer des chats compatibles avec ton mode de vie.
              Aucune donnée n&apos;est utilisée à des fins commerciales.
            </p>

            <h2>Combien de temps on les garde</h2>
            <p>
              Tant que ton compte est actif. Tu peux le supprimer à tout moment depuis
              /compte/parametres. Les demandes d&apos;adoption sont conservées 3 ans sous
              forme anonymisée pour nos statistiques internes (intérêt légitime).
            </p>

            <h2>Qui y a accès</h2>
            <p>
              Les bénévoles référents des chats que tu sollicites peuvent voir ton profil
              pour traiter ta demande. Aucune donnée n&apos;est partagée avec des tiers.
            </p>

            <h2>Tes droits (RGPD)</h2>
            <p>
              Tu as un droit d&apos;accès, de rectification, d&apos;effacement, de portabilité et
              d&apos;opposition. La plupart sont accessibles directement depuis
              /compte/parametres. Pour les autres, écris à
              contact@sanscroquettesfixes.fr.
            </p>

            <h2>Cookies</h2>
            <p>
              On utilise un seul cookie technique nommé <code>scf-token</code>, strictement
              nécessaire au fonctionnement de l&apos;authentification. Aucun cookie de
              tracking ou publicitaire.
            </p>
          </section>
        </article>
      </main>
      <Footer />
    </>
  );
}
