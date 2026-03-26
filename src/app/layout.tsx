import type { Metadata } from "next";
import { Fraunces, Outfit } from "next/font/google";
import "./globals.css";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  display: "swap",
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Sans Croquettes Fixes | Association de protection animale",
  description:
    "Sans Croquettes Fixes — Association de protection et de sauvetage animal. Prise en charge, stérilisation, adoption et sensibilisation.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="light scroll-smooth" style={{ colorScheme: "light" }}>
      <body
        className={`${fraunces.variable} ${outfit.variable} font-body antialiased bg-bg text-text`}
      >
        {children}
      </body>
    </html>
  );
}
