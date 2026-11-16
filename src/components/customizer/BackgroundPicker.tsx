"use client";

import { backgroundToStyle } from "@/lib/customizer/background";
import type { BackgroundConfig, PatternId } from "@/lib/customizer/types";
import ColorField from "./ColorField";
import ImageUpload from "./ImageUpload";

type BackgroundPickerProps = {
  slug: string;
  value: BackgroundConfig;
  images: Record<string, string>;
  onChange: (background: BackgroundConfig) => void;
  onUploaded: (id: string, url: string) => void;
  onRemoved: (id: string) => void;
  onError: (message: string) => void;
};

const types: Array<{ value: BackgroundConfig["type"]; label: string }> = [
  { value: "solid", label: "Solid" },
  { value: "gradient", label: "Gradient" },
  { value: "pattern", label: "Pattern" },
  { value: "image", label: "Gambar" },
];

const patterns: PatternId[] = ["dots", "grid", "diagonal", "botanical"];

function baseColor(value: BackgroundConfig): string {
  switch (value.type) {
    case "solid":
      return value.color;
    case "gradient":
      return value.from;
    case "pattern":
      return value.base;
    case "image":
      return value.fallback;
  }
}

export default function BackgroundPicker({
  slug,
  value,
  images,
  onChange,
  onUploaded,
  onRemoved,
  onError,
}: BackgroundPickerProps) {
  const currentBase = baseColor(value);
  const imageUrl = value.type === "image" ? images[value.imageId] : undefined;

  function changeType(type: BackgroundConfig["type"]) {
    if (type === value.type) return;

    switch (type) {
      case "solid":
        onChange({ type: "solid", color: currentBase });
        break;
      case "gradient":
        onChange({
          type: "gradient",
          from: currentBase,
          to: "#ffffff",
          angle: 135,
        });
        break;
      case "pattern":
        onChange({
          type: "pattern",
          pattern: "dots",
          base: currentBase,
          accent: "#c98b93",
        });
        break;
      case "image":
        onChange({
          type: "image",
          imageId: "",
          overlay: 0.25,
          fallback: currentBase,
        });
        break;
    }
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-4 gap-1 rounded-xl bg-[#ebe6dc] p-1">
        {types.map((type) => (
          <button
            key={type.value}
            type="button"
            onClick={() => changeType(type.value)}
            className={`rounded-lg px-2 py-2 text-[10px] font-medium transition ${
              value.type === type.value
                ? "bg-white text-[#1b1a17] shadow-sm"
                : "text-[#5f5a50] hover:bg-white/50"
            }`}
          >
            {type.label}
          </button>
        ))}
      </div>

      <div
        className="h-20 w-full rounded-xl border border-[#1b1a17]/10"
        style={backgroundToStyle(value, imageUrl)}
      />

      {value.type === "solid" && (
        <ColorField
          label="Warna"
          value={value.color}
          onChange={(color) => onChange({ type: "solid", color })}
        />
      )}

      {value.type === "gradient" && (
        <>
          <ColorField
            label="Dari"
            value={value.from}
            onChange={(from) => onChange({ ...value, from })}
          />
          <ColorField
            label="Ke"
            value={value.to}
            onChange={(to) => onChange({ ...value, to })}
          />
          <label className="flex flex-col gap-2 text-[10px] uppercase tracking-[0.2em] text-[#8a8375]">
            Sudut: {value.angle}°
            <input
              type="range"
              min={0}
              max={360}
              value={value.angle}
              onChange={(event) =>
                onChange({ ...value, angle: Number(event.target.value) })
              }
              className="accent-[#1b1a17]"
            />
          </label>
        </>
      )}

      {value.type === "pattern" && (
        <>
          <label className="flex flex-col gap-2 text-[10px] uppercase tracking-[0.2em] text-[#8a8375]">
            Pola
            <select
              value={value.pattern}
              onChange={(event) =>
                onChange({
                  ...value,
                  pattern: event.target.value as PatternId,
                })
              }
              className="rounded-lg border border-[#1b1a17]/15 px-3 py-2 text-xs tracking-normal text-[#1b1a17] outline-none focus:border-[#1b1a17]"
            >
              {patterns.map((pattern) => (
                <option key={pattern} value={pattern}>
                  {pattern}
                </option>
              ))}
            </select>
          </label>
          <ColorField
            label="Warna dasar"
            value={value.base}
            onChange={(base) => onChange({ ...value, base })}
          />
          <ColorField
            label="Warna aksen"
            value={value.accent}
            onChange={(accent) => onChange({ ...value, accent })}
          />
        </>
      )}

      {value.type === "image" && (
        <>
          <ImageUpload
            slug={slug}
            value={value.imageId || undefined}
            previewUrl={imageUrl}
            onChange={(imageId) => {
              if (!imageId) {
                onChange({ type: "solid", color: value.fallback });
                return;
              }
              onChange({ ...value, imageId });
            }}
            onUploaded={onUploaded}
            onRemoved={onRemoved}
            onError={onError}
          />
          <label className="flex flex-col gap-2 text-[10px] uppercase tracking-[0.2em] text-[#8a8375]">
            Overlay: {Math.round(value.overlay * 100)}%
            <input
              type="range"
              min={0}
              max={0.8}
              step={0.05}
              value={value.overlay}
              onChange={(event) =>
                onChange({ ...value, overlay: Number(event.target.value) })
              }
              className="accent-[#1b1a17]"
            />
          </label>
          <ColorField
            label="Warna cadangan"
            value={value.fallback}
            onChange={(fallback) => onChange({ ...value, fallback })}
          />
        </>
      )}
    </div>
  );
}
