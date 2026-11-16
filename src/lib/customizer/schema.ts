import { z } from "zod";
import { invitationSchema } from "@/lib/invitation";
import { FONT_IDS, SECTION_IDS } from "./types";

export const sectionIdSchema = z.enum(SECTION_IDS);

export const fontIdSchema = z.enum(FONT_IDS);

export const alignSchema = z.enum(["left", "center", "right"]);

export const hexColorSchema = z
  .string()
  .regex(/^#[0-9a-fA-F]{6}$/, "Warna harus hex 6 digit");

export const patternIdSchema = z.enum(["dots", "grid", "diagonal", "botanical"]);

export const backgroundSchema = z.discriminatedUnion("type", [
  z.object({
    type: z.literal("solid"),
    color: hexColorSchema,
  }),
  z.object({
    type: z.literal("gradient"),
    from: hexColorSchema,
    to: hexColorSchema,
    angle: z.number().min(0).max(360),
  }),
  z.object({
    type: z.literal("pattern"),
    pattern: patternIdSchema,
    base: hexColorSchema,
    accent: hexColorSchema,
  }),
  z.object({
    type: z.literal("image"),
    imageId: z.string().min(1),
    overlay: z.number().min(0).max(0.8),
    fallback: hexColorSchema,
  }),
]);

export const sectionStyleSchema = z.object({
  visible: z.boolean(),
  background: backgroundSchema,
  textColor: hexColorSchema.nullable(),
  align: z.record(z.string(), alignSchema),
});

export const sectionLabelSchema = z.object({
  eyebrow: z.string(),
  heading: z.string(),
  note: z.string(),
});

export const invitationContentSchema = invitationSchema.omit({
  slug: true,
  status: true,
  themeId: true,
  accessCode: true,
});

export const customizerDataSchema = z.object({
  invitation: invitationContentSchema,
  labels: z.partialRecord(z.enum(SECTION_IDS), sectionLabelSchema),
});

export const customizerConfigSchema = z.object({
  version: z.literal(1),
  slug: z.string().min(1),
  themeId: z.string().min(1),
  fontId: fontIdSchema.optional(),
  data: customizerDataSchema,
  order: z.array(sectionIdSchema).min(1),
  sections: z.partialRecord(z.enum(SECTION_IDS), sectionStyleSchema),
});

export type CustomizerConfigInput = z.input<typeof customizerConfigSchema>;
