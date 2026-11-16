import type { Invitation } from "@/lib/invitation";
import { defaultFontIdForTheme } from "./fonts";
import { getDefaultLabels, defaultOrder, sectionDefinitionMap } from "./sections";
import { SECTION_IDS } from "./types";
import type {
  CustomizerConfig,
  CustomizerData,
  InvitationContent,
  SectionStyle,
  ThemePreset,
} from "./types";

export function toInvitationContent(invitation: Invitation): InvitationContent {
  const { slug, status, themeId, accessCode, ...content } = invitation;
  void slug;
  void status;
  void themeId;
  void accessCode;
  return structuredClone(content);
}

function createSectionStyle(
  id: (typeof SECTION_IDS)[number],
  invitation: Invitation,
  preset: ThemePreset,
  index: number,
): SectionStyle {
  const definition = sectionDefinitionMap[id];
  const align = Object.fromEntries(
    definition.alignElements.map((element) => [element, preset.defaultAlign]),
  ) as SectionStyle["align"];

  return {
    visible: definition.defaultVisible(invitation),
    background: preset.backgrounds[index % preset.backgrounds.length],
    textColor: null,
    align,
  };
}

export function createDefaultData(
  invitation: Invitation,
): CustomizerData {
  const labels = getDefaultLabels(invitation);

  return {
    invitation: toInvitationContent(invitation),
    labels,
  };
}

export function createDefaultConfig(
  invitation: Invitation,
  preset: ThemePreset,
): CustomizerConfig {
  const sections = Object.fromEntries(
    SECTION_IDS.map((id, index) => [
      id,
      createSectionStyle(id, invitation, preset, index),
    ]),
  ) as Record<(typeof SECTION_IDS)[number], SectionStyle>;

  sections.envelope.visible = true;
  sections.closing.visible = true;

  return {
    version: 1,
    slug: invitation.slug,
    themeId: invitation.themeId,
    fontId: defaultFontIdForTheme(invitation.themeId),
    data: createDefaultData(invitation),
    order: [...defaultOrder],
    sections,
  };
}
