import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/cn";

type Tone = "primary" | "secondary";

interface ArrowLinkProps {
  href: string;
  external?: boolean;
  tone?: Tone;
  /**
   * Quand le lien est imbriqué dans un élément `group` (carte cliquable),
   * l'écart de la flèche réagit au hover du parent.
   */
  inGroup?: boolean;
  size?: "sm" | "md";
  className?: string;
  children: React.ReactNode;
}

const toneClasses: Record<Tone, string> = {
  primary:
    "text-primary hover:text-primary-dark focus-visible:outline-primary",
  secondary:
    "text-secondary hover:text-secondary-dark focus-visible:outline-secondary",
};

export function ArrowLink({
  href,
  external,
  tone = "primary",
  inGroup = false,
  size = "sm",
  className,
  children,
}: ArrowLinkProps) {
  const base = cn(
    "inline-flex items-center gap-1.5 font-semibold transition-[gap,color] duration-200 ease-out",
    "rounded-sm -mx-1 px-1 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:no-underline",
    "motion-reduce:transition-none",
    size === "sm" ? "text-sm" : "text-base",
    inGroup ? "group-hover:gap-2.5" : "hover:gap-2.5",
    toneClasses[tone],
    className,
  );

  const inner = (
    <>
      {children}
      <ArrowRight className="h-4 w-4 shrink-0" aria-hidden="true" />
    </>
  );

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={base}>
        {inner}
      </a>
    );
  }

  return (
    <Link href={href} className={base}>
      {inner}
    </Link>
  );
}
