import { getPageAccueil } from "@/lib/strapi";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import NotreHistoire from "@/components/NotreHistoire";
import MissionsSection from "@/components/MissionsSection";
import ChiffresSection from "@/components/ChiffresSection";
import EquipeSection from "@/components/EquipeSection";
import PartenairesSection from "@/components/PartenairesSection";
import CtaSection from "@/components/CtaSection";
import Footer from "@/components/Footer";

export default async function Home() {
  let data;

  try {
    const response = await getPageAccueil();
    data = response.data;
  } catch {
    return (
      <div className="min-h-screen flex items-center justify-center p-6 bg-bg">
        <div className="text-center max-w-sm">
          <div className="w-16 h-16 rounded-full bg-primary-50 flex items-center justify-center mx-auto mb-5">
            <span className="text-2xl">&#x26A0;&#xFE0F;</span>
          </div>
          <h1 className="font-display text-2xl font-semibold text-text mb-3">
            Impossible de charger la page
          </h1>
          <p className="text-text-muted text-sm leading-relaxed">
            V&eacute;rifiez que le serveur Strapi est bien lanc&eacute; sur{" "}
            <code className="bg-primary-50 text-primary px-1.5 py-0.5 rounded text-xs font-mono">
              localhost:1337
            </code>{" "}
            et que la page d&apos;accueil est publi&eacute;e.
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <main>
        <HeroSection
          titre={data.Hero_titre}
          description={data.Hero_description}
          image={data.Hero_image}
        />
        <NotreHistoire content={data.Notre_histoire} />
        <MissionsSection missions={data.Missions ?? []} />
        <ChiffresSection chiffres={data.Chiffres ?? []} />
        <EquipeSection equipe={data.Equipe ?? []} />
        <PartenairesSection partenaires={data.Partenaires ?? []} />
        <CtaSection
          titre={data.Cta_titre}
          bouton1={data.Cta_bouton_1}
          bouton2={data.Cta_bouton_2}
        />
      </main>
      <Footer />
    </>
  );
}
