import type { Metadata } from "next";
import { Mail } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Vérifie ton email | Sans Croquettes Fixes",
};

export default function VerifierEmailPage() {
  return (
    <>
      <Navbar />
      <main className="bg-bg">
        <section className="mx-auto max-w-lg px-5 py-20 text-center md:py-28">
          <span className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-primary-50 text-primary">
            <Mail className="h-8 w-8" aria-hidden="true" />
          </span>
          <h1 className="mt-6 font-display text-3xl font-bold text-text md:text-4xl">
            Vérifie ton email
          </h1>
          <p className="mt-3 text-text-secondary md:text-lg">
            On vient de t&apos;envoyer un lien pour confirmer ton adresse.
            Clique dessus pour activer ton compte, puis reviens te connecter.
          </p>
          <p className="mt-6 text-sm text-text-muted">
            Pas reçu ? Vérifie tes spams.
          </p>
        </section>
      </main>
      <Footer />
    </>
  );
}
