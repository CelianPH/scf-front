import { getProfilAdoptant } from "@/lib/strapi";
import ProfilForm from "@/components/compte/ProfilForm";

export default async function ProfilPage() {
  const { data: profil } = await getProfilAdoptant();
  return (
    <section className="mx-auto max-w-3xl px-5 py-12 md:px-8 md:py-16">
      <h1 className="font-display text-4xl font-bold text-text md:text-5xl">
        Mon profil
      </h1>
      <p className="mt-3 text-text-secondary">
        Plus ton profil est complet, plus on peut te proposer un chat adapté.
      </p>
      <div className="mt-10">
        <ProfilForm profil={profil} />
      </div>
    </section>
  );
}
