import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import StatsSection from "@/components/StatsSection";
import ChatsAdoption from "@/components/ChatsAdoption";
import QuiSommesNous from "@/components/QuiSommesNous";
import DistributionBandeau from "@/components/DistributionBandeau";
import GesteCompte from "@/components/GesteCompte";
import ActualitesSection from "@/components/ActualitesSection";
import CtaFinal from "@/components/CtaFinal";
import Footer from "@/components/Footer";
import { getHomePage } from "@/lib/strapi";

export default async function Home() {
  const { data: home } = await getHomePage();

  return (
    <>
      <Navbar />
      <main>
        <HeroSection data={home.hero} />
        {home.statsBlock ? <StatsSection data={home.statsBlock} /> : null}
        {home.chatsBlock ? <ChatsAdoption data={home.chatsBlock} /> : null}
        {home.quiSommesNous ? <QuiSommesNous data={home.quiSommesNous} /> : null}
        {home.distributionBandeau ? (
          <DistributionBandeau data={home.distributionBandeau} />
        ) : null}
        {home.gesteCompte ? <GesteCompte data={home.gesteCompte} /> : null}
        {home.actualitesBlock ? (
          <ActualitesSection data={home.actualitesBlock} />
        ) : null}
        {home.ctaFinal ? <CtaFinal data={home.ctaFinal} /> : null}
      </main>
      <Footer />
    </>
  );
}
