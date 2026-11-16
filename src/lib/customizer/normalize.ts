import type { Invitation } from "@/lib/invitation";
import { createDefaultConfig } from "./defaults";
import { defaultFontIdForTheme } from "./fonts";
import { customizerConfigSchema } from "./schema";
import { defaultOrder, sectionDefinitionMap } from "./sections";
import { SECTION_IDS } from "./types";
import type {
  CustomizerConfig,
  SectionId,
  SectionLabel,
  SectionStyle,
  ThemePreset,
} from "./types";

export function normalizeOrder(order: SectionId[]): SectionId[] {
  const seen = new Set<SectionId>();
  const result: SectionId[] = [];

  for (const id of order) {
    if (SECTION_IDS.includes(id) && !seen.has(id)) {
      seen.add(id);
      result.push(id);
    }
  }

  for (const id of defaultOrder) {
    if (!seen.has(id)) {
      result.push(id);
    }
  }

  return [
    "envelope",
    ...result.filter((id) => id !== "envelope" && id !== "closing"),
    "closing",
  ];
}

export function normalizeConfig(
  raw: unknown,
  invitation: Invitation,
  preset: ThemePreset,
): CustomizerConfig {
  const fallback = createDefaultConfig(invitation, preset);
  const parsed = customizerConfigSchema.safeParse(raw);

  if (!parsed.success) {
    return fallback;
  }

  const sections = Object.fromEntries(
    SECTION_IDS.map((id) => {
      const style = parsed.data.sections[id];
      const definition = sectionDefinitionMap[id];
      const base = fallback.sections[id];

      const merged: SectionStyle = {
        visible: definition.hideable ? (style?.visible ?? base.visible) : true,
        background: style?.background ?? base.background,
        textColor: style?.textColor ?? null,
        align: {
          ...base.align,
          ...(style?.align ?? {}),
        },
      };

      return [id, merged];
    }),
  ) as Record<SectionId, SectionStyle>;

  const labels = Object.fromEntries(
    SECTION_IDS.map((id) => {
      const base = fallback.data.labels[id];
      const value = parsed.data.data.labels[id];

      const merged: SectionLabel = {
        eyebrow: value?.eyebrow ?? base.eyebrow,
        heading: value?.heading ?? base.heading,
        note: value?.note ?? base.note,
      };

      return [id, merged];
    }),
  ) as Record<SectionId, SectionLabel>;

  return {
    version: 1,
    slug: invitation.slug,
    themeId: invitation.themeId,
    fontId:
      parsed.data.fontId ?? defaultFontIdForTheme(invitation.themeId),
    data: {
      invitation: parsed.data.data.invitation,
      labels,
    },
    order: normalizeOrder(parsed.data.order),
    sections,
  };
}
