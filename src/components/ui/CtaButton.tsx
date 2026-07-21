import { Button, type ButtonSize, type ButtonVariant } from "@/components/ui/Button";
import { getIcon } from "@/lib/icons";
import type { SharedCta } from "@/types/strapi";

interface CtaButtonProps {
  cta: SharedCta | null | undefined;
  size?: ButtonSize;
  fullWidth?: boolean;
  className?: string;
  /** Force la variante, en surchargeant celle fournie par Strapi (`cta.variant`). */
  variant?: ButtonVariant;
}

export function CtaButton({ cta, size = "lg", fullWidth, className, variant }: CtaButtonProps) {
  if (!cta) return null;

  const Icon = cta.iconName ? getIcon(cta.iconName) : undefined;
  const position = cta.iconPosition ?? "right";

  return (
    <Button
      href={cta.href}
      external={cta.external}
      variant={variant ?? cta.variant}
      size={size}
      fullWidth={fullWidth}
      className={className}
      iconLeft={Icon && position === "left" ? Icon : undefined}
      iconRight={Icon && position === "right" ? Icon : undefined}
    >
      {cta.label}
    </Button>
  );
}
