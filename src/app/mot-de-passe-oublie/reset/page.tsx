import type { Metadata } from "next";
import { Suspense } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ResetPasswordForm from "@/components/auth/ResetPasswordForm";

export const metadata: Metadata = { title: "Nouveau mot de passe | SCF" };

export default function Page() {
  return (
    <>
      <Navbar />
      <main className="bg-bg">
        <section className="mx-auto max-w-md px-5 py-20 md:py-28">
          <h1 className="font-display text-4xl font-bold text-text md:text-5xl">
            Nouveau mot de passe
          </h1>
          <div className="mt-8 rounded-2xl bg-surface p-6 shadow-sm ring-1 ring-border md:p-8">
            <Suspense fallback={null}>
              <ResetPasswordForm />
            </Suspense>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
