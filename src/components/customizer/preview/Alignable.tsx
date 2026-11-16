import type { ReactNode } from "react";
import { backgroundToStyle } from "@/lib/customizer/background";
import { autoTextColor } from "@/lib/customizer/contrast";
import type { SectionId, SectionStyle } from "@/lib/customizer/types";
import { imageFor } from "./types";

type AlignableProps = {
  align: "left" | "center" | "right";
  className?: string;
  children: ReactNode;
};

export default function Alignable({
  align,
  className = "",
  children,
}: AlignableProps) {
  return (
    <div
      className={`alignable align-${align} ${className}`}
      style={{ textAlign: align }}
      data-align={align}
    >
      {children}
    </div>
  );
}

type SectionFrameProps = {
  id: SectionId;
  style: SectionStyle;
  images: Record<string, string>;
  className?: string;
  children: ReactNode;
};

export function SectionFrame({
  id,
  style,
  images,
  className = "",
  children,
}: SectionFrameProps) {
  const textColor = style.textColor ?? autoTextColor(style.background);

  return (
    <section
      id={`preview-${id}`}
      data-section-id={id}
      className={`relative overflow-hidden px-6 py-20 sm:py-24 ${className}`}
      style={{
        ...backgroundToStyle(style.background, imageFor(style, images)),
        color: textColor,
      }}
    >
      {children}
    </section>
  );
}
