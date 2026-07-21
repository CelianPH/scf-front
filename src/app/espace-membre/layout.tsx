import type { ReactNode } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { requireBenevole } from "@/lib/auth";

export default async function EspaceMembreLayout({
  children,
}: {
  children: ReactNode;
}) {
  // Réservé au rôle « Membre de l'association » ; les autres comptes sont
  // renvoyés vers leur espace adoptant.
  await requireBenevole();

  return (
    <>
      <Navbar />
      <main className="bg-bg">{children}</main>
      <Footer />
    </>
  );
}
