import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import AboutHero from "@/components/about/AboutHero";
import AboutHistoire from "@/components/about/AboutHistoire";
import AboutMissions from "@/components/about/AboutMissions";
import AboutFelinsOmbre from "@/components/about/AboutFelinsOmbre";
import AboutStatsBand from "@/components/about/AboutStatsBand";
import AboutTemoignages from "@/components/about/AboutTemoignages";
import AboutValeurs from "@/components/about/AboutValeurs";
import AboutCta from "@/components/about/AboutCta";
import { getAboutPage } from "@/lib/strapi";

export async function generateMetadata(): Promise<Metadata> {
  const { data } = await getAboutPage();
  const seo = data.seo;
  return {
    title: seo?.metaTitle ?? "À propos | Sans Croquettes Fixes",
    description:
      seo?.metaDescription ??
      "Sans Croquettes Fixes, association lyonnaise loi 1901, 100 % bénévole, dédiée à la protection des chats et au soutien des humains qui les aiment depuis 2015.",
  };
}

export default async function AProposPage() {
  const { data: about } = await getAboutPage();

  return (
    <>
      <Navbar />
      <main>
        <AboutHero data={about.hero} />
        {about.histoire ? <AboutHistoire data={about.histoire} /> : null}
        {about.missions ? <AboutMissions data={about.missions} /> : null}
        {about.felinsOmbre ? <AboutFelinsOmbre data={about.felinsOmbre} /> : null}
        {about.statsBand ? <AboutStatsBand data={about.statsBand} /> : null}
        {about.temoignages ? <AboutTemoignages data={about.temoignages} /> : null}
        {about.valeurs ? <AboutValeurs data={about.valeurs} /> : null}
        {about.ctaFinal ? <AboutCta data={about.ctaFinal} /> : null}
      </main>
      <Footer />
    </>
  );
}
