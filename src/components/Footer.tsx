import Image from "next/image";
import { siteConfig } from "@/lib/site-config";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-dark text-white/60 px-5 py-10">
      <div className="max-w-lg mx-auto text-center">
        <div className="flex items-center justify-center gap-2.5 mb-1">
          <Image
            src={siteConfig.logo}
            alt={siteConfig.name}
            width={32}
            height={32}
            className="rounded-full opacity-90"
          />
          <p className="font-display text-xl font-semibold text-white">
            {siteConfig.name}
          </p>
        </div>
        <p className="text-sm mb-8 text-white/40">
          {siteConfig.description}
        </p>

        <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm mb-8">
          {siteConfig.footer.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="hover:text-secondary-lighter transition-colors duration-200"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="h-px bg-white/10 mb-6" />

        <p className="text-xs text-white/30">
          &copy; {year} {siteConfig.name}. Tous droits r&eacute;serv&eacute;s.
        </p>
      </div>
    </footer>
  );
}
