import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import DonHero from "@/components/don/DonHero";
import DonReassurance from "@/components/don/DonReassurance";
import DonWidget from "@/components/don/DonWidget";
import DonUtilite from "@/components/don/DonUtilite";
import DonCampagnes from "@/components/don/DonCampagnes";
import DonAutresActions from "@/components/don/DonAutresActions";
import { getDonPage } from "@/lib/strapi";

export async function generateMetadata(): Promise<Metadata> {
  const { data } = await getDonPage();
  const seo = data.seo;
  return {
    title: seo?.metaTitle ?? "Faire un don | Sans Croquettes Fixes",
    description:
      seo?.metaDescription ??
      "Soutenez l'association Sans Croquettes Fixes : soins, nourriture, stérilisations. Don sécurisé via HelloAsso, 66 % déductible.",
  };
}

export default async function DonPage() {
  const { data: don } = await getDonPage();

  return (
    <>
      <Navbar />
      <main>
        <DonHero data={don.hero} />
        {don.reassurance ? <DonReassurance data={don.reassurance} /> : null}
        {don.utilite ? <DonUtilite data={don.utilite} /> : null}
        {don.campagnes ? <DonCampagnes data={don.campagnes} /> : null}
        {don.widget ? <DonWidget data={don.widget} /> : null}
        {don.autresActions ? <DonAutresActions data={don.autresActions} /> : null}
      </main>
      <Footer />
    </>
  );
}
