import type { InvitationContent, SectionLabel, SectionStyle, ThemePreset, Align } from "@/lib/customizer/types";

export type SectionComponentProps = {
  invitation: InvitationContent;
  label: SectionLabel;
  style: SectionStyle;
  preset: ThemePreset;
  images: Record<string, string>;
};

export function alignFor(
  style: SectionStyle,
  preset: ThemePreset,
  element: string,
): Align {
  return style.align[element] ?? preset.defaultAlign;
}

export function imageFor(
  style: SectionStyle,
  images: Record<string, string>,
): string | undefined {
  return style.background.type === "image"
    ? images[style.background.imageId]
    : undefined;
}
