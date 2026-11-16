import type { ComponentType } from "react";
import type { Invitation } from "./invitation";
import FloralWedding from "@/components/themes/FloralWedding";
import ElegantRed from "@/components/themes/ElegantRed";
import ModernMinimal from "@/components/themes/ModernMinimal";

export type ThemeComponent = ComponentType<{ invitation: Invitation }>;

const themeComponents: Record<string, ThemeComponent> = {
  floral: FloralWedding,
  "elegant-red": ElegantRed,
  "modern-minimal": ModernMinimal,
};

export { themeComponents };
