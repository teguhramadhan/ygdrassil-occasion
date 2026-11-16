import type { BackgroundConfig } from "./types";

export function isHexColor(value: string): boolean {
  return /^#[0-9a-fA-F]{6}$/.test(value);
}

export function hexToRgb(hex: string): [number, number, number] {
  const value = hex.replace("#", "");
  return [
    Number.parseInt(value.slice(0, 2), 16),
    Number.parseInt(value.slice(2, 4), 16),
    Number.parseInt(value.slice(4, 6), 16),
  ];
}

export function mixHex(from: string, to: string, ratio = 0.5): string {
  const a = hexToRgb(from);
  const b = hexToRgb(to);
  const mixed = a.map((channel, index) =>
    Math.round(channel * (1 - ratio) + b[index] * ratio),
  );
  return `#${mixed.map((channel) => channel.toString(16).padStart(2, "0")).join("")}`;
}

export function relativeLuminance(hex: string): number {
  const [r, g, b] = hexToRgb(hex).map((channel) => {
    const value = channel / 255;
    return value <= 0.03928
      ? value / 12.92
      : Math.pow((value + 0.055) / 1.055, 2.4);
  });

  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

export function backgroundBaseColor(background: BackgroundConfig): string {
  switch (background.type) {
    case "solid":
      return background.color;
    case "gradient":
      return mixHex(background.from, background.to);
    case "pattern":
      return background.base;
    case "image":
      return background.fallback;
  }
}

export function autoTextColor(background: BackgroundConfig): string {
  return relativeLuminance(backgroundBaseColor(background)) > 0.5
    ? "#1b1a17"
    : "#f7f3ec";
}
