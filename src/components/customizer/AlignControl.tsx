"use client";

import type { Align } from "@/lib/customizer/types";

type AlignControlProps = {
  elements: string[];
  value: Record<string, Align>;
  onChange: (element: string, align: Align) => void;
};

const options: Array<{ value: Align; label: string; icon: string }> = [
  { value: "left", label: "Kiri", icon: "⇤" },
  { value: "center", label: "Tengah", icon: "↔" },
  { value: "right", label: "Kanan", icon: "⇥" },
];

export default function AlignControl({
  elements,
  value,
  onChange,
}: AlignControlProps) {
  return (
    <div className="flex flex-col gap-3">
      {elements.map((element) => (
        <div
          key={element}
          className="flex items-center justify-between gap-3 rounded-xl border border-[#1b1a17]/10 bg-white/60 px-3 py-2"
        >
          <span className="text-[10px] uppercase tracking-[0.18em] text-[#5f5a50]">
            {element}
          </span>
          <div className="flex gap-1">
            {options.map((option) => {
              const active = (value[element] ?? "center") === option.value;
              return (
                <button
                  key={option.value}
                  type="button"
                  title={option.label}
                  aria-label={option.label}
                  aria-pressed={active}
                  onClick={() => onChange(element, option.value)}
                  className={`flex h-7 w-8 items-center justify-center rounded-md border text-xs transition ${
                    active
                      ? "border-[#1b1a17] bg-[#1b1a17] text-[#f7f3ec]"
                      : "border-[#1b1a17]/10 bg-white hover:bg-[#f4f1ea]"
                  }`}
                >
                  {option.icon}
                </button>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
