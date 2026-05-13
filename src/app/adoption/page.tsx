import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AdoptionHero from "@/components/AdoptionHero";
import AdoptionList from "@/components/AdoptionList";
import { getAdoptionPage, getChats } from "@/lib/strapi";

export async function generateMetadata(): Promise<Metadata> {
  const { data } = await getAdoptionPage();
  const seo = data.seo;
  return {
    title: seo?.metaTitle ?? "Adopter un chat | Sans Croquettes Fixes",
    description:
      seo?.metaDescription ??
      "Découvrez les chats à l'adoption à Lyon et dans le Rhône.",
  };
}

export default async function AdoptionPage() {
  const [{ data: page }, { data: chats }] = await Promise.all([
    getAdoptionPage(),
    getChats({ includeAdopted: false, pageSize: 100 }),
  ]);

  return (
    <>
      <Navbar />
      <main>
        <AdoptionHero
          count={chats.length}
          hero={page.hero}
          matchingCta={page.matchingCta}
        />
        <AdoptionList chats={chats} />
      </main>
      <Footer />
    </>
  );
}
