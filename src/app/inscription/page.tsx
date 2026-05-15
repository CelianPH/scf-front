import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import RegisterForm from "@/components/auth/RegisterForm";

export const metadata: Metadata = {
  title: "Créer un compte | Sans Croquettes Fixes",
};

export default function InscriptionPage() {
  return (
    <>
      <Navbar />
      <main className="bg-bg">
        <section className="mx-auto max-w-md px-5 py-20 md:py-28">
          <h1 className="font-display text-4xl font-bold text-text md:text-5xl">
            Créer un compte
          </h1>
          <p className="mt-3 text-text-secondary">
            Sauvegardez vos chats favoris et suivez vos demandes d&apos;adoption.
          </p>
          <div className="mt-8 rounded-2xl bg-surface p-6 shadow-sm ring-1 ring-border md:p-8">
            <RegisterForm />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
