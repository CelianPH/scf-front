import { Calendar, PawPrint, Stethoscope, Package } from "lucide-react";
import Reveal from "./Reveal";

const stats = [
  { value: "10 ans", label: "Au service des chats du Rhône depuis 2015", icon: Calendar },
  { value: "1 066", label: "Chats libres pris en charge depuis la création", icon: PawPrint },
  { value: "1 638", label: "Stérilisations menées depuis 2016 avec les collectivités", icon: Stethoscope },
  { value: "8 058 kg", label: "Distribués en 2025 aux animaux des plus précaires", icon: Package },
];

export default function StatsSection() {
  return (
    <section aria-label="Notre impact en chiffres" className="bg-bg">
      <div className="mx-auto max-w-7xl px-5 py-12 md:px-8 md:py-16">
        <ul className="grid grid-cols-2 gap-x-6 gap-y-8 md:grid-cols-4 md:gap-x-8">
          {stats.map(({ value, label, icon: Icon }, i) => (
            <Reveal as="li" key={label} delay={i * 80} className="flex flex-col items-center text-center">
              <span className="mb-3 inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary-50 text-primary md:h-14 md:w-14">
                <Icon className="h-6 w-6 md:h-7 md:w-7" aria-hidden="true" />
              </span>
              <span className="font-display text-3xl font-bold text-primary tabular-nums md:text-4xl">
                {value}
              </span>
              <span className="mt-1 text-sm text-text-secondary md:text-base">{label}</span>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
