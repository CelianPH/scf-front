import {
  ArrowRight,
  Calendar,
  Clock,
  Eye,
  HandHeart,
  HelpCircle,
  Heart,
  Home,
  Mail,
  MapPin,
  Megaphone,
  Package,
  PawPrint,
  Phone,
  Sparkles,
  Stethoscope,
  UserPlus,
  Users,
  Wheat,
  type LucideIcon,
} from "lucide-react";
import type { IconName } from "@/types/strapi";

export const ICON_MAP: Record<IconName, LucideIcon> = {
  PawPrint,
  Heart,
  HandHeart,
  Home,
  Stethoscope,
  Wheat,
  Users,
  Eye,
  Megaphone,
  Clock,
  MapPin,
  Mail,
  Phone,
  Package,
  UserPlus,
  Calendar,
  ArrowRight,
  Sparkles,
};

export const FALLBACK_ICON: LucideIcon = HelpCircle;

export function getIcon(name: string | null | undefined): LucideIcon {
  if (!name) return FALLBACK_ICON;
  const icon = ICON_MAP[name as IconName];
  if (!icon) {
    if (process.env.NODE_ENV !== "production") {
      console.warn(
        `[icons] Icône inconnue "${name}". Ajoutez-la à ICON_MAP ou à l'enum Strapi IconName.`
      );
    }
    return FALLBACK_ICON;
  }
  return icon;
}
