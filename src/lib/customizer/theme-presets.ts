import { getThemeFonts } from "./fonts";
import type { ThemePreset } from "./types";

const presets: ThemePreset[] = [
  {
    id: "floral",
    name: "Floral Wedding",
    fonts: getThemeFonts("floral"),
    colors: {
      text: "#5c4044",
      muted: "#8a9a7b",
      accent: "#c98b93",
      surface: "#fbf6ef",
      border: "#c98b93",
    },
    defaultAlign: "center",
    backgrounds: [
      { type: "solid", color: "#fbf6ef" },
      { type: "solid", color: "#ffffff" },
      { type: "gradient", from: "#f3d9dc", to: "#fbf6ef", angle: 135 },
      { type: "pattern", pattern: "dots", base: "#fbf6ef", accent: "#c98b93" },
    ],
  },
  {
    id: "elegant-red",
    name: "Elegant Red",
    fonts: getThemeFonts("elegant-red"),
    colors: {
      text: "#2b0b0b",
      muted: "#7a6a60",
      accent: "#c6a15b",
      surface: "#f5efe6",
      border: "#2b0b0b",
    },
    defaultAlign: "left",
    backgrounds: [
      { type: "solid", color: "#f5efe6" },
      { type: "solid", color: "#efe6d8" },
      { type: "gradient", from: "#2b0b0b", to: "#5b1a1a", angle: 160 },
      { type: "pattern", pattern: "grid", base: "#f5efe6", accent: "#c6a15b" },
    ],
  },
  {
    id: "modern-minimal",
    name: "Modern Minimal",
    fonts: getThemeFonts("modern-minimal"),
    colors: {
      text: "#111111",
      muted: "#6b6b63",
      accent: "#8b9585",
      surface: "#ffffff",
      border: "#d9d9d2",
    },
    defaultAlign: "left",
    backgrounds: [
      { type: "solid", color: "#ffffff" },
      { type: "solid", color: "#ecece7" },
      { type: "solid", color: "#111111" },
      {
        type: "pattern",
        pattern: "diagonal",
        base: "#ffffff",
        accent: "#8b9585",
      },
    ],
  },
];

export const themePresets = presets;

export function getThemePreset(themeId: string): ThemePreset {
  return presets.find((preset) => preset.id === themeId) ?? presets[0];
}
