import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import DonHero from "@/components/don/DonHero";
import DonUtilite from "@/components/don/DonUtilite";
import DonMateriel from "@/components/don/DonMateriel";
import DonAiderAutrement from "@/components/don/DonAiderAutrement";
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
        {/* Hero split : émotion + garanties à gauche, formulaire HelloAsso à droite. */}
        <DonHero hero={don.hero} reassurance={don.reassurance} widget={don.widget} />
        {don.utilite ? <DonUtilite data={don.utilite} /> : null}
        {don.autresActions ? <DonMateriel data={don.autresActions} /> : null}
        {don.autresActions ? <DonAiderAutrement data={don.autresActions} /> : null}
      </main>
      <Footer />
    </>
  );
}
