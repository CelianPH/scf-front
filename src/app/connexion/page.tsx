import type { Metadata } from "next";
import { Suspense } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LoginForm from "@/components/auth/LoginForm";

export const metadata: Metadata = {
  title: "Se connecter | Sans Croquettes Fixes",
};

export default function ConnexionPage() {
  return (
    <>
      <Navbar />
      <main className="bg-bg">
        <section className="mx-auto max-w-md px-5 py-20 md:py-28">
          <h1 className="font-display text-4xl font-bold text-text md:text-5xl">
            Connexion
          </h1>
          <div className="mt-8 rounded-2xl bg-surface p-6 shadow-sm ring-1 ring-border md:p-8">
            <Suspense fallback={null}>
              <LoginForm />
            </Suspense>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
