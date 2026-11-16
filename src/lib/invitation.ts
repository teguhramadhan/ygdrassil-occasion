import { z } from "zod";

export const invitationStatusSchema = z.enum(["draft", "published"]);

const hexColorSchema = z.string().regex(/^#[0-9a-fA-F]{6}$/, "Warna harus hex 6 digit");

const personSchema = z.object({
  fullName: z.string().min(1),
  nickname: z.string().min(1),
  initial: z.string().min(1).max(2),
  role: z.string().min(1),
  parents: z.string().min(1),
});

const coupleSchema = z.object({
  monogram: z.string().min(1).max(8),
  bride: personSchema,
  groom: personSchema,
});

const heroSchema = z.object({
  eyebrow: z.string().min(1),
  description: z.string().optional(),
  dateLabel: z.string().min(1),
  isoDate: z.string().min(1),
  locationShort: z.string().min(1),
});

const envelopeSchema = z.object({
  title: z.string().min(1),
  guestName: z.string().optional(),
  buttonLabel: z.string().min(1),
});

const quoteSchema = z.object({
  eyebrow: z.string().optional(),
  text: z.string().min(1),
  source: z.string().min(1),
});

const aboutSchema = z.object({
  text: z.string().min(1),
});

const storyItemSchema = z.object({
  year: z.string().min(1),
  title: z.string().min(1),
  text: z.string().min(1),
});

const eventSchema = z.object({
  label: z.string().min(1),
  date: z.string().min(1),
  time: z.string().min(1),
  place: z.string().min(1),
  address: z.string().min(1),
});

const venueSchema = z.object({
  label: z.string().min(1),
  place: z.string().min(1),
  address: z.string().min(1),
  mapsUrl: z.url(),
});

const galleryItemSchema = z.object({
  label: z.string().min(1),
  imageUrl: z.url().optional(),
  imageId: z.string().optional(),
  from: hexColorSchema,
  to: hexColorSchema,
});

const dresscodeSchema = z.object({
  note: z.string().min(1),
  colors: z
    .array(
      z.object({
        name: z.string().min(1),
        hex: hexColorSchema,
      }),
    )
    .min(1),
});

const giftSchema = z.object({
  note: z.string().min(1),
  accounts: z
    .array(
      z.object({
        bank: z.string().min(1),
        number: z.string().min(1),
        holder: z.string().min(1),
      }),
    )
    .min(1),
});

const videoSchema = z.object({
  url: z.url(),
  thumbnailUrl: z.url().optional(),
  title: z.string().min(1),
  subtitle: z.string().optional(),
});

const rsvpSchema = z.object({
  deadlineLabel: z.string().min(1),
  note: z.string().min(1),
});

const closingSchema = z.object({
  message: z.string().min(1),
});

const metaSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
});

export const invitationSchema = z.object({
  slug: z
    .string()
    .min(1)
    .regex(/^[a-z0-9-]+$/, "Slug hanya boleh huruf kecil, angka, dan tanda hubung"),
  status: invitationStatusSchema,
  themeId: z.string().min(1),
  accessCode: z.string().min(4).optional(),
  meta: metaSchema,
  envelope: envelopeSchema.optional(),
  hero: heroSchema,
  couple: coupleSchema,
  quote: quoteSchema,
  about: aboutSchema.optional(),
  story: z.array(storyItemSchema).default([]),
  events: z.array(eventSchema).min(1),
  venue: venueSchema,
  gallery: z.array(galleryItemSchema).default([]),
  video: videoSchema.optional(),
  dresscode: dresscodeSchema,
  gift: giftSchema,
  rsvp: rsvpSchema,
  closing: closingSchema,
});

export type Invitation = z.infer<typeof invitationSchema>;
export type InvitationStatus = z.infer<typeof invitationStatusSchema>;
export type Person = z.infer<typeof personSchema>;
export type Envelope = z.infer<typeof envelopeSchema>;
export type InvitationEvent = z.infer<typeof eventSchema>;
export type StoryItem = z.infer<typeof storyItemSchema>;
export type GalleryItem = z.infer<typeof galleryItemSchema>;

export function parseInvitation(input: unknown): Invitation {
  return invitationSchema.parse(input);
}
