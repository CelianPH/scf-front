import Link from "next/link";
import { ArrowRight, type LucideIcon } from "lucide-react";

interface ResourceCardProps {
  href: string;
  icon: LucideIcon;
  title: string;
  description: string;
  cta: string;
}

export default function ResourceCard({
  href,
  icon: Icon,
  title,
  description,
  cta,
}: ResourceCardProps) {
  return (
    <Link
      href={href}
      className="group block h-full rounded-2xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
    >
      <article className="flex h-full flex-col gap-4 rounded-2xl border border-border bg-surface p-6 shadow-sm transition duration-200 ease-out group-hover:-translate-y-1 group-hover:shadow-lg group-hover:shadow-primary/15 motion-reduce:transition-none motion-reduce:group-hover:translate-y-0 md:p-7">
        <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary-50 text-primary transition group-hover:bg-primary group-hover:text-white">
          <Icon className="h-6 w-6" aria-hidden="true" />
        </span>
        <h3 className="font-display text-lg font-bold leading-snug text-text transition group-hover:text-primary md:text-xl">
          <span className="bg-gradient-to-r from-primary to-primary bg-[length:0%_2px] bg-left-bottom bg-no-repeat pb-0.5 transition-[background-size] duration-300 ease-out group-hover:bg-[length:100%_2px] motion-reduce:transition-none">
            {title}
          </span>
        </h3>
        <p className="text-sm text-text-secondary md:text-base">{description}</p>
        <span className="mt-auto inline-flex items-center gap-1.5 pt-2 text-sm font-semibold text-primary transition-[gap] duration-200 group-hover:gap-2.5">
          {cta}
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </span>
      </article>
    </Link>
  );
}
