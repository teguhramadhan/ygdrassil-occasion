"use client";

import { useState } from "react";
import { sectionDefinitionMap } from "@/lib/customizer/sections";
import type {
  Align,
  BackgroundConfig,
  CustomizerConfig,
  SectionId,
  SectionLabel,
} from "@/lib/customizer/types";
import DataPanel from "./DataPanel";
import StylePanel from "./StylePanel";

type SectionInspectorProps = {
  config: CustomizerConfig;
  selectedId: SectionId | null;
  slug: string;
  images: Record<string, string>;
  onInvitationChange: (path: string, value: unknown) => void;
  onLabelChange: (
    id: SectionId,
    field: keyof SectionLabel,
    value: string,
  ) => void;
  onToggleVisible: (id: SectionId) => void;
  onChangeBackground: (id: SectionId, background: BackgroundConfig) => void;
  onChangeTextColor: (id: SectionId, color: string | null) => void;
  onChangeAlign: (id: SectionId, element: string, align: Align) => void;
  onUploaded: (id: string, url: string) => void;
  onRemoved: (id: string) => void;
  onError: (message: string) => void;
};

export default function SectionInspector({
  config,
  selectedId,
  slug,
  images,
  onInvitationChange,
  onLabelChange,
  onToggleVisible,
  onChangeBackground,
  onChangeTextColor,
  onChangeAlign,
  onUploaded,
  onRemoved,
  onError,
}: SectionInspectorProps) {
  const [tab, setTab] = useState<"data" | "style">("data");

  if (!selectedId) {
    return (
      <div className="flex h-full items-center justify-center px-6 text-center">
        <p className="max-w-xs text-xs leading-relaxed text-[#8a8375]">
          Pilih section di panel kiri untuk mengedit data, background, dan
          align.
        </p>
      </div>
    );
  }

  const definition = sectionDefinitionMap[selectedId];
  const style = config.sections[selectedId];

  return (
    <div className="flex h-full flex-col">
      <div className="border-b border-[#1b1a17]/10 px-4 py-4">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-[10px] uppercase tracking-[0.25em] text-[#8a8375]">
              Section
            </p>
            <h2 className="text-sm font-semibold">{definition.label}</h2>
          </div>
          <button
            type="button"
            onClick={() => onToggleVisible(selectedId)}
            disabled={!definition.hideable}
            className="rounded-full border border-[#1b1a17]/15 px-3 py-1.5 text-[10px] uppercase tracking-[0.15em] transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-40"
          >
            {style.visible ? "Sembunyikan" : "Tampilkan"}
          </button>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-1 rounded-xl bg-[#ebe6dc] p-1">
          {(
            [
              ["data", "Data"],
              ["style", "Tampilan"],
            ] as const
          ).map(([value, label]) => (
            <button
              key={value}
              type="button"
              onClick={() => setTab(value)}
              className={`rounded-lg px-3 py-2 text-[10px] font-medium transition ${
                tab === value
                  ? "bg-white text-[#1b1a17] shadow-sm"
                  : "text-[#5f5a50] hover:bg-white/50"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-4">
        {tab === "data" ? (
          <DataPanel
            sectionId={selectedId}
            config={config}
            slug={slug}
            images={images}
            onInvitationChange={onInvitationChange}
            onLabelChange={onLabelChange}
            onUploaded={onUploaded}
            onRemoved={onRemoved}
            onError={onError}
          />
        ) : (
          <StylePanel
            sectionId={selectedId}
            style={style}
            slug={slug}
            images={images}
            onChangeBackground={(background) =>
              onChangeBackground(selectedId, background)
            }
            onChangeTextColor={(color) => onChangeTextColor(selectedId, color)}
            onChangeAlign={(element, align) =>
              onChangeAlign(selectedId, element, align)
            }
            onUploaded={onUploaded}
            onRemoved={onRemoved}
            onError={onError}
          />
        )}
      </div>
    </div>
  );
}
