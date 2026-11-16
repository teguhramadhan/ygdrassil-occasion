"use client";

import { useEffect } from "react";
import { getFontPreset } from "@/lib/customizer/fonts";
import type {
  CustomizerConfig,
  SectionId,
  ThemePreset,
} from "@/lib/customizer/types";
import SectionRenderer from "./SectionRenderer";

type PreviewProps = {
  config: CustomizerConfig;
  preset: ThemePreset;
  images: Record<string, string>;
  opened: boolean;
  onOpen: () => void;
  selectedId?: SectionId | null;
};

export default function Preview({
  config,
  preset,
  images,
  opened,
  onOpen,
  selectedId,
}: PreviewProps) {
  const fontPreset = getFontPreset(config.fontId);
  const fonts = fontPreset.fonts;
  const activePreset: ThemePreset = { ...preset, fonts };
  const visible = config.order.filter(
    (id) => config.sections[id].visible,
  );
  const rendered = opened
    ? visible
    : visible.filter((id) => id === "envelope");

  useEffect(() => {
    if (!selectedId) return;
    const timeout = setTimeout(() => {
      const el = document.getElementById(`preview-section-${selectedId}`);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "nearest" });
      }
    }, 50);
    return () => clearTimeout(timeout);
  }, [selectedId, opened]);

  return (
    <div
      className={`${fonts.className} min-h-full`}
      style={{
        fontFamily: fonts.body,
        backgroundColor: preset.colors.surface,
        color: preset.colors.text,
      }}
    >
      {rendered.length === 0 ? (
        <div className="flex min-h-[60vh] items-center justify-center px-6 text-center">
          <p className="text-sm opacity-60">
            Semua section sedang disembunyikan.
          </p>
        </div>
      ) : (
        rendered.map((id) => (
          <div
            key={id}
            id={`preview-section-${id}`}
            className={
              selectedId === id
                ? "outline outline-2 outline-offset-[-2px] outline-[#c98b93]"
                : undefined
            }
          >
            <SectionRenderer
              id={id}
              invitation={config.data.invitation}
              label={config.data.labels[id]}
              style={config.sections[id]}
              preset={activePreset}
              images={images}
              onOpen={onOpen}
            />
          </div>
        ))
      )}
    </div>
  );
}
