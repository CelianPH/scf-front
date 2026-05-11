import type { LucideProps } from "lucide-react";
import { getIcon } from "@/lib/icons";

interface IconProps extends Omit<LucideProps, "ref" | "name"> {
  name: string | null | undefined;
}

export function Icon({ name, ...props }: IconProps) {
  const Component = getIcon(name);
  return <Component {...props} />;
}
