import type { CSSProperties } from "react";
import type { BackgroundConfig, PatternId } from "./types";

function patternImage(pattern: PatternId, accent: string): string {
  switch (pattern) {
    case "dots":
      return `radial-gradient(${accent} 1px, transparent 1px)`;
    case "grid":
      return `linear-gradient(${accent} 1px, transparent 1px), linear-gradient(90deg, ${accent} 1px, transparent 1px)`;
    case "diagonal":
      return `repeating-linear-gradient(45deg, ${accent} 0 1px, transparent 1px 12px)`;
    case "botanical":
      return `radial-gradient(circle at 20% 20%, ${accent}22 0 14%, transparent 15%), radial-gradient(circle at 80% 70%, ${accent}22 0 12%, transparent 13%)`;
  }
}

export function backgroundToStyle(
  background: BackgroundConfig,
  imageUrl?: string,
): CSSProperties {
  switch (background.type) {
    case "solid":
      return { backgroundColor: background.color };
    case "gradient":
      return {
        backgroundImage: `linear-gradient(${background.angle}deg, ${background.from}, ${background.to})`,
      };
    case "pattern":
      return {
        backgroundColor: background.base,
        backgroundImage: patternImage(background.pattern, background.accent),
        backgroundSize:
          background.pattern === "dots"
            ? "18px 18px"
            : background.pattern === "grid"
              ? "24px 24px"
              : undefined,
      };
    case "image": {
      const overlay = `rgba(0, 0, 0, ${background.overlay})`;
      return {
        backgroundColor: background.fallback,
        backgroundImage: imageUrl
          ? `linear-gradient(${overlay}, ${overlay}), url("${imageUrl}")`
          : undefined,
        backgroundSize: "cover",
        backgroundPosition: "center",
      };
    }
  }
}
