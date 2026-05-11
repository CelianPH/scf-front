import { Button, type ButtonSize } from "@/components/ui/Button";
import { getIcon } from "@/lib/icons";
import type { SharedCta } from "@/types/strapi";

interface CtaButtonProps {
  cta: SharedCta | null | undefined;
  size?: ButtonSize;
  fullWidth?: boolean;
  className?: string;
}

export function CtaButton({ cta, size = "lg", fullWidth, className }: CtaButtonProps) {
  if (!cta) return null;

  const Icon = cta.iconName ? getIcon(cta.iconName) : undefined;
  const position = cta.iconPosition ?? "right";

  return (
    <Button
      href={cta.href}
      external={cta.external}
      variant={cta.variant}
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
