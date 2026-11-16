import type { Invitation } from "@/lib/invitation";

export const SECTION_IDS = [
  "envelope",
  "hero",
  "quote",
  "couple",
  "countdown",
  "story",
  "events",
  "venue",
  "gallery",
  "video",
  "dresscode",
  "gift",
  "rsvp",
  "closing",
] as const;

export type SectionId = (typeof SECTION_IDS)[number];

export type Align = "left" | "center" | "right";

export const FONT_IDS = [
  "elegant-serif",
  "elegant-luxe",
  "modern-elegant",
  "cute-script",
  "cute-rounded",
  "casual-hand",
  "casual-clean",
] as const;

export type FontId = (typeof FONT_IDS)[number];

export type FontCategory = "elegant" | "cute" | "casual";

export type FontPreset = {
  id: FontId;
  name: string;
  category: FontCategory;
  fonts: ThemeFonts;
};

export type PatternId = "dots" | "grid" | "diagonal" | "botanical";

export type BackgroundConfig =
  | { type: "solid"; color: string }
  | { type: "gradient"; from: string; to: string; angle: number }
  | { type: "pattern"; pattern: PatternId; base: string; accent: string }
  | { type: "image"; imageId: string; overlay: number; fallback: string };

export type SectionStyle = {
  visible: boolean;
  background: BackgroundConfig;
  textColor: string | null;
  align: Record<string, Align>;
};

export type SectionLabel = {
  eyebrow: string;
  heading: string;
  note: string;
};

export type InvitationContent = Omit<
  Invitation,
  "slug" | "status" | "themeId" | "accessCode"
>;

export type CustomizerData = {
  invitation: InvitationContent;
  labels: Record<SectionId, SectionLabel>;
};

export type CustomizerConfig = {
  version: 1;
  slug: string;
  themeId: string;
  fontId: FontId;
  data: CustomizerData;
  order: SectionId[];
  sections: Record<SectionId, SectionStyle>;
};

export type FieldKind = "text" | "textarea" | "url" | "datetime" | "hex";

export type FieldDefinition = {
  path: string;
  label: string;
  kind: FieldKind;
  placeholder?: string;
};

export type SectionDefinition = {
  id: SectionId;
  label: string;
  defaultLabel: SectionLabel;
  defaultAlign: Record<string, Align>;
  alignElements: string[];
  lockedPosition: "first" | "last" | null;
  hideable: boolean;
  defaultVisible: (invitation: Invitation) => boolean;
  fields: FieldDefinition[];
};

export type ThemeFonts = {
  className: string;
  display: string;
  body: string;
  accent?: string;
};

export type ThemePreset = {
  id: string;
  name: string;
  fonts: ThemeFonts;
  colors: {
    text: string;
    muted: string;
    accent: string;
    surface: string;
    border: string;
  };
  defaultAlign: Align;
  backgrounds: BackgroundConfig[];
};

export type StoredImage = {
  id: string;
  slug: string;
  blob: Blob;
  mime: string;
  width: number;
  height: number;
  name: string;
  createdAt: number;
};
