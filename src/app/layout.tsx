import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Sans Croquettes Fixes | Association de protection animale",
  description:
    "Sans Croquettes Fixes, association de protection et de sauvetage animal. Prise en charge, stérilisation, adoption et sensibilisation.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      className={`${fraunces.variable} ${inter.variable} light scroll-smooth`}
      style={{ colorScheme: "light" }}
    >
      <body className="font-body antialiased bg-bg text-text">
        {children}
      </body>
    </html>
  );
}
