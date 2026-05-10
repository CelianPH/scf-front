import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import StatsSection from "@/components/StatsSection";
import ChatsAdoption from "@/components/ChatsAdoption";
import QuiSommesNous from "@/components/QuiSommesNous";
import GesteCompte from "@/components/GesteCompte";
import ActualitesSection from "@/components/ActualitesSection";
import CtaFinal from "@/components/CtaFinal";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <StatsSection />
        <ChatsAdoption />
        <QuiSommesNous />
        <GesteCompte />
        <ActualitesSection />
        <CtaFinal />
      </main>
      <Footer />
    </>
  );
}
