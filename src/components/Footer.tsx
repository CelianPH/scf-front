import Link from "next/link";
import { Heart, Mail, MapPin, Phone, PawPrint } from "lucide-react";
import { Button } from "@/components/ui/Button";

const navLinks = [
  { href: "/", label: "Accueil" },
  { href: "/a-propos", label: "À propos" },
  { href: "/adoption", label: "Adopter" },
  { href: "/don", label: "Faire un don" },
];

const legalLinks = [
  { href: "/mentions-legales", label: "Mentions légales" },
  { href: "/politique-de-confidentialite", label: "Politique de confidentialité" },
  { href: "/rgpd", label: "Données personnelles" },
  { href: "/cookies", label: "Cookies" },
];

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M13.5 21.95V13.5h2.86l.43-3.32H13.5V8.05c0-.96.27-1.62 1.65-1.62h1.76V3.46c-.85-.09-1.71-.13-2.57-.13-2.55 0-4.29 1.56-4.29 4.41v2.46H7.18v3.32h2.87v8.45h3.45Z" />
    </svg>
  );
}

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37Z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

function XIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231 5.45-6.231Zm-1.161 17.52h1.833L7.084 4.126H5.117l11.966 15.644Z" />
    </svg>
  );
}

function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5.8 20.1a6.34 6.34 0 0 0 10.86-4.43V8.83a8.16 8.16 0 0 0 4.77 1.52V6.91a4.85 4.85 0 0 1-1.84-.22Z" />
    </svg>
  );
}

const socials = [
  { href: "https://facebook.com/sanscroquettesfixes", label: "Facebook", Icon: FacebookIcon },
  { href: "https://instagram.com/sanscroquettesfixes", label: "Instagram", Icon: InstagramIcon },
  { href: "https://x.com/CroquettesFixes", label: "X (Twitter)", Icon: XIcon },
  { href: "https://tiktok.com/@sanscroquettesfixes", label: "TikTok", Icon: TikTokIcon },
];

export default function Footer() {
  return (
    <footer className="border-t border-dark-lighter bg-dark text-white/80">
      <div className="mx-auto max-w-7xl px-5 py-12 md:px-8 md:py-16">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link
              href="/"
              className="inline-flex items-center gap-2 font-display text-lg font-bold text-white transition hover:text-secondary-lighter"
            >
              <PawPrint className="h-5 w-5" aria-hidden="true" />
              Sans Croquettes Fixes
            </Link>
            <p className="mt-3 text-sm leading-relaxed text-white/65">
              Association lyonnaise loi 1901, 100 % bénévole, qui prend soin
              des chats et des humains qui les aiment depuis 2015.
            </p>
            <Button
              href="https://www.helloasso.com/associations/sans-croquettes-fixes/formulaires/1"
              external
              variant="secondary"
              size="sm"
              iconLeft={Heart}
              className="mt-5"
            >
              Soutenir via HelloAsso
            </Button>
          </div>

          <div>
            <h2 className="font-display text-sm font-bold uppercase tracking-wider text-white">
              Naviguer
            </h2>
            <ul className="mt-4 flex flex-col gap-2.5 text-sm">
              {navLinks.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-white/70 transition hover:text-white"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="font-display text-sm font-bold uppercase tracking-wider text-white">
              Nous joindre
            </h2>
            <ul className="mt-4 flex flex-col gap-3 text-sm text-white/70">
              <li className="flex items-start gap-2.5">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-secondary-lighter" aria-hidden="true" />
                <span className="flex flex-col gap-0.5">
                  <a href="mailto:contact@sanscroquettesfixes.fr" className="transition hover:text-white">
                    contact@sanscroquettesfixes.fr
                  </a>
                  <a href="mailto:distribution@sanscroquettesfixes.fr" className="text-xs text-white/55 transition hover:text-white/80">
                    distribution (1ʳᵉ visite)
                  </a>
                  <a href="mailto:dons@sanscroquettesfixes.fr" className="text-xs text-white/55 transition hover:text-white/80">
                    dons (matériel)
                  </a>
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-secondary-lighter" aria-hidden="true" />
                <a href="tel:+33618257238" className="transition hover:text-white">
                  06 18 25 72 38
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-secondary-lighter" aria-hidden="true" />
                <span>
                  22 chemin de Boutary
                  <br />
                  69300 Caluire-et-Cuire
                  <br />
                  <span className="text-xs text-white/45">
                    Boîte postale uniquement, ne pas s&apos;y présenter.
                  </span>
                </span>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="font-display text-sm font-bold uppercase tracking-wider text-white">
              Suivre l&apos;asso
            </h2>
            <ul className="mt-4 flex flex-wrap gap-2">
              {socials.map(({ href, label, Icon }) => (
                <li key={href}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-white/15 bg-white/5 text-white/80 transition hover:border-secondary-lighter hover:bg-white/10 hover:text-white"
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                </li>
              ))}
            </ul>

            <h2 className="mt-8 font-display text-sm font-bold uppercase tracking-wider text-white">
              Légal
            </h2>
            <ul className="mt-4 flex flex-col gap-2 text-sm">
              {legalLinks.map(({ href, label }) => (
                <li key={href}>
                  <Link href={href} className="text-white/65 transition hover:text-white">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-white/10 pt-6 text-xs text-white/50 md:flex-row md:items-center md:justify-between">
          <p>
            Association loi 1901 déclarée en août 2015. SIRET 818 195 307 00017. Reconnue d&apos;intérêt général.
          </p>
          <p>© {new Date().getFullYear()} Sans Croquettes Fixes</p>
        </div>
      </div>
    </footer>
  );
}
