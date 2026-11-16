import {
  Caveat,
  Cinzel,
  Cormorant_Garamond,
  DM_Serif_Display,
  Fredoka,
  Great_Vibes,
  Inter,
  Jost,
  Kalam,
  Nunito,
  Pacifico,
  Poppins,
  Quicksand,
} from "next/font/google";
import type { FontId, FontPreset, ThemeFonts } from "./types";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-cz-serif",
});

const greatVibes = Great_Vibes({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-cz-script",
});

const jost = Jost({
  subsets: ["latin"],
  variable: "--font-cz-sans",
});

const cinzel = Cinzel({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-cz-display",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-cz-min-sans",
});

const dmSerif = DM_Serif_Display({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-cz-min-serif",
});

const pacifico = Pacifico({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-cz-pacifico",
});

const quicksand = Quicksand({
  subsets: ["latin"],
  variable: "--font-cz-quicksand",
});

const caveat = Caveat({
  subsets: ["latin"],
  variable: "--font-cz-caveat",
});

const fredoka = Fredoka({
  subsets: ["latin"],
  variable: "--font-cz-fredoka",
});

const nunito = Nunito({
  subsets: ["latin"],
  variable: "--font-cz-nunito",
});

const kalam = Kalam({
  subsets: ["latin"],
  weight: ["300", "400", "700"],
  variable: "--font-cz-kalam",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-cz-poppins",
});

export const fontPresets: FontPreset[] = [
  {
    id: "elegant-serif",
    name: "Elegant Serif",
    category: "elegant",
    fonts: {
      className: `${cormorant.variable} ${greatVibes.variable} ${jost.variable}`,
      display: "var(--font-cz-serif)",
      body: "var(--font-cz-sans)",
      accent: "var(--font-cz-script)",
    },
  },
  {
    id: "elegant-luxe",
    name: "Elegant Luxe",
    category: "elegant",
    fonts: {
      className: `${cinzel.variable} ${cormorant.variable} ${jost.variable}`,
      display: "var(--font-cz-display)",
      body: "var(--font-cz-sans)",
      accent: "var(--font-cz-serif)",
    },
  },
  {
    id: "modern-elegant",
    name: "Modern Elegan",
    category: "elegant",
    fonts: {
      className: `${inter.variable} ${dmSerif.variable}`,
      display: "var(--font-cz-min-serif)",
      body: "var(--font-cz-min-sans)",
    },
  },
  {
    id: "cute-script",
    name: "Cute Script",
    category: "cute",
    fonts: {
      className: `${pacifico.variable} ${quicksand.variable} ${caveat.variable}`,
      display: "var(--font-cz-pacifico)",
      body: "var(--font-cz-quicksand)",
      accent: "var(--font-cz-caveat)",
    },
  },
  {
    id: "cute-rounded",
    name: "Cute Rounded",
    category: "cute",
    fonts: {
      className: `${fredoka.variable} ${nunito.variable} ${pacifico.variable}`,
      display: "var(--font-cz-fredoka)",
      body: "var(--font-cz-nunito)",
      accent: "var(--font-cz-pacifico)",
    },
  },
  {
    id: "casual-hand",
    name: "Casual Hand",
    category: "casual",
    fonts: {
      className: `${kalam.variable} ${nunito.variable} ${caveat.variable}`,
      display: "var(--font-cz-kalam)",
      body: "var(--font-cz-nunito)",
      accent: "var(--font-cz-caveat)",
    },
  },
  {
    id: "casual-clean",
    name: "Casual Clean",
    category: "casual",
    fonts: {
      className: `${poppins.variable} ${nunito.variable} ${caveat.variable}`,
      display: "var(--font-cz-poppins)",
      body: "var(--font-cz-nunito)",
      accent: "var(--font-cz-caveat)",
    },
  },
];

export const fontPresetMap = Object.fromEntries(
  fontPresets.map((preset) => [preset.id, preset]),
) as Record<FontId, FontPreset>;

export function defaultFontIdForTheme(themeId: string): FontId {
  if (themeId === "elegant-red") return "elegant-luxe";
  if (themeId === "modern-minimal") return "modern-elegant";
  return "elegant-serif";
}

export function getFontPreset(fontId: string | undefined): FontPreset {
  if (fontId && fontId in fontPresetMap) {
    return fontPresetMap[fontId as FontId];
  }

  return fontPresetMap["elegant-serif"];
}

export function getThemeFonts(themeId: string): ThemeFonts {
  return getFontPreset(defaultFontIdForTheme(themeId)).fonts;
}
