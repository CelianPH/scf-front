import Navbar from "@/components/layout/Navbar";
import HeroSection from "@/components/home/HeroSection";
import StatsSection from "@/components/home/StatsSection";
import ChatsAdoption from "@/components/home/ChatsAdoption";
import QuiSommesNous from "@/components/home/QuiSommesNous";
import DistributionBandeau from "@/components/home/DistributionBandeau";
import GesteCompte from "@/components/home/GesteCompte";
import ActualitesSection from "@/components/home/ActualitesSection";
import Footer from "@/components/layout/Footer";
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
      </main>
      <Footer />
    </>
  );
}
