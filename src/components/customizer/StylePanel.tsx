"use client";

import { autoTextColor } from "@/lib/customizer/contrast";
import { sectionDefinitionMap } from "@/lib/customizer/sections";
import type {
  Align,
  BackgroundConfig,
  SectionId,
  SectionStyle,
} from "@/lib/customizer/types";
import AlignControl from "./AlignControl";
import BackgroundPicker from "./BackgroundPicker";
import ColorField from "./ColorField";

type StylePanelProps = {
  sectionId: SectionId;
  style: SectionStyle;
  slug: string;
  images: Record<string, string>;
  onChangeBackground: (background: BackgroundConfig) => void;
  onChangeTextColor: (color: string | null) => void;
  onChangeAlign: (element: string, align: Align) => void;
  onUploaded: (id: string, url: string) => void;
  onRemoved: (id: string) => void;
  onError: (message: string) => void;
};

export default function StylePanel({
  sectionId,
  style,
  slug,
  images,
  onChangeBackground,
  onChangeTextColor,
  onChangeAlign,
  onUploaded,
  onRemoved,
  onError,
}: StylePanelProps) {
  const definition = sectionDefinitionMap[sectionId];
  const auto = style.textColor === null;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-3">
        <p className="text-[10px] uppercase tracking-[0.2em] text-[#8a8375]">
          Background
        </p>
        <BackgroundPicker
          slug={slug}
          value={style.background}
          images={images}
          onChange={onChangeBackground}
          onUploaded={onUploaded}
          onRemoved={onRemoved}
          onError={onError}
        />
      </div>

      <div className="flex flex-col gap-3 border-t border-[#1b1a17]/10 pt-4">
        <p className="text-[10px] uppercase tracking-[0.2em] text-[#8a8375]">
          Warna teks
        </p>
        <label className="flex items-center gap-2 text-xs text-[#5f5a50]">
          <input
            type="checkbox"
            checked={auto}
            onChange={(event) =>
              onChangeTextColor(
                event.target.checked ? null : autoTextColor(style.background),
              )
            }
            className="h-4 w-4 accent-[#1b1a17]"
          />
          Auto kontras
        </label>
        {!auto && (
          <ColorField
            label="Warna teks"
            value={style.textColor ?? autoTextColor(style.background)}
            onChange={onChangeTextColor}
          />
        )}
      </div>

      <div className="flex flex-col gap-3 border-t border-[#1b1a17]/10 pt-4">
        <p className="text-[10px] uppercase tracking-[0.2em] text-[#8a8375]">
          Align per elemen
        </p>
        <AlignControl
          elements={definition.alignElements}
          value={style.align}
          onChange={onChangeAlign}
        />
      </div>
    </div>
  );
}
