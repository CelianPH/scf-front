import Link from "next/link";
import type { ComponentType, ReactNode, SVGProps } from "react";
import { cn } from "@/lib/cn";

type IconType = ComponentType<SVGProps<SVGSVGElement>>;

export type ButtonVariant =
  | "primary"
  | "secondary"
  | "outlined-primary"
  | "outlined-secondary"
  | "white"
  | "outlined-light";

export type ButtonSize = "sm" | "md" | "lg";

type CommonProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  iconLeft?: IconType;
  iconRight?: IconType;
  fullWidth?: boolean;
  className?: string;
  children: ReactNode;
};

type AsLink = CommonProps & {
  href: string;
  external?: boolean;
} & Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof CommonProps | "href">;

type AsButton = CommonProps & {
  href?: undefined;
} & Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, keyof CommonProps>;

export type ButtonProps = AsLink | AsButton;

const base =
  "inline-flex items-center justify-center gap-2 rounded-md font-semibold transition-[color,background-color,border-color,box-shadow,transform] duration-200 ease-out hover:-translate-y-px active:translate-y-0 active:duration-75 focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0 motion-reduce:hover:translate-y-0 motion-reduce:active:translate-y-0";

const sizeSolid: Record<ButtonSize, string> = {
  sm: "px-4 py-2.5 text-sm",
  md: "px-5 py-3 text-base",
  lg: "px-6 py-3.5 text-base",
};

// Outlined buttons trim 2px of padding to compensate for the 2px border
// so they align pixel-perfectly next to a solid button of the same size.
const sizeOutlined: Record<ButtonSize, string> = {
  sm: "px-4 py-2 text-sm",
  md: "px-5 py-2.5 text-base",
  lg: "px-6 py-3 text-base",
};

// Unified hover grammar across all variants: lift micro (handled in `base`),
// shadow tinted to the variant's brand color, color engagement on hover.
// Same gesture everywhere; only the costume changes.
const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-primary text-white shadow-md shadow-primary/25 hover:bg-primary-dark hover:shadow-lg hover:shadow-primary/40 focus-visible:outline-primary",
  secondary:
    "bg-secondary text-white shadow-md shadow-secondary/25 hover:bg-secondary-dark hover:shadow-lg hover:shadow-secondary/40 focus-visible:outline-secondary",
  "outlined-primary":
    "border-2 border-primary text-primary hover:bg-primary hover:text-white hover:shadow-md hover:shadow-primary/30 focus-visible:outline-primary",
  "outlined-secondary":
    "border-2 border-secondary text-secondary hover:bg-secondary hover:text-white hover:shadow-md hover:shadow-secondary/30 focus-visible:outline-secondary",
  white:
    "bg-white text-primary shadow-md shadow-primary/20 hover:bg-primary-50 hover:shadow-lg hover:shadow-primary/30 focus-visible:outline-white",
  "outlined-light":
    "border-2 border-white/80 bg-white/10 text-white backdrop-blur-sm hover:border-white hover:bg-white/20 hover:shadow-lg hover:shadow-black/30 focus-visible:outline-white",
};

const isOutlined = (v: ButtonVariant) => v.startsWith("outlined");

const iconSize: Record<ButtonSize, string> = {
  sm: "h-4 w-4",
  md: "h-5 w-5",
  lg: "h-5 w-5",
};

export function Button(props: ButtonProps) {
  const {
    variant = "primary",
    size = "lg",
    iconLeft: IconLeft,
    iconRight: IconRight,
    fullWidth,
    className,
    children,
    ...rest
  } = props;

  const sizing = isOutlined(variant) ? sizeOutlined[size] : sizeSolid[size];
  const merged = cn(
    base,
    sizing,
    variantClasses[variant],
    fullWidth && "w-full",
    className,
  );

  const inner = (
    <>
      {IconLeft ? <IconLeft className={iconSize[size]} aria-hidden="true" /> : null}
      {children}
      {IconRight ? <IconRight className={iconSize[size]} aria-hidden="true" /> : null}
    </>
  );

  if ("href" in props && props.href !== undefined) {
    const { href, external, ...anchorRest } = rest as AsLink;
    if (external) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={merged}
          {...anchorRest}
        >
          {inner}
        </a>
      );
    }
    return (
      <Link href={href} className={merged} {...anchorRest}>
        {inner}
      </Link>
    );
  }

  return (
    <button className={merged} {...(rest as React.ButtonHTMLAttributes<HTMLButtonElement>)}>
      {inner}
    </button>
  );
}
