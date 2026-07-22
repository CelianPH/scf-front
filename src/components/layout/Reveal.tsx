"use client";

import { useEffect, useRef, useState, type ElementType, type ReactNode } from "react";

type Props = {
  as?:
    | "div"
    | "li"
    | "section"
    | "article"
    | "ul"
    | "span"
    | "header"
    | "h2"
    | "h3";
  delay?: number;
  className?: string;
  children: ReactNode;
};

/**
 * Révèle son enfant en fade + slide-up dès qu'il entre dans le viewport.
 * Respecte prefers-reduced-motion : pas d'animation, contenu visible immédiatement.
 */
export default function Reveal({ as = "div", delay = 0, className = "", children }: Props) {
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -60px 0px" }
    );
    // Décale l'observation d'une frame : si l'élément est déjà dans le
    // viewport au montage (page courte, carte haute dans la mise en page),
    // l'observer se déclenche sinon avant le premier paint et l'état
    // "invisible" n'est jamais rendu à l'écran, donc l'animation ne se voit pas.
    const raf = requestAnimationFrame(() => obs.observe(el));
    return () => {
      cancelAnimationFrame(raf);
      obs.disconnect();
    };
  }, []);

  const Tag = as as ElementType;
  const base =
    "transition-all duration-700 ease-out motion-reduce:transition-none motion-reduce:duration-0";
  const state = visible
    ? "opacity-100 translate-y-0"
    : "opacity-0 translate-y-6 motion-reduce:opacity-100 motion-reduce:translate-y-0";

  return (
    <Tag
      ref={ref as React.Ref<HTMLElement>}
      style={{ transitionDelay: `${delay}ms` }}
      className={`${base} ${state} ${className}`}
    >
      {children}
    </Tag>
  );
}
