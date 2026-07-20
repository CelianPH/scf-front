import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ForgotPasswordForm from "@/components/auth/ForgotPasswordForm";

export const metadata: Metadata = { title: "Mot de passe oublié | SCF" };

export default function Page() {
  return (
    <>
      <Navbar />
      <main className="bg-bg">
        <section className="mx-auto max-w-md px-5 py-20 md:py-28">
          <h1 className="font-display text-4xl font-bold text-text md:text-5xl">
            Mot de passe oublié
          </h1>
          <p className="mt-3 text-text-secondary">
            Entre ton email, on t&apos;envoie un lien pour le réinitialiser.
          </p>
          <div className="mt-8 rounded-2xl bg-surface p-6 shadow-sm ring-1 ring-border md:p-8">
            <ForgotPasswordForm />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
