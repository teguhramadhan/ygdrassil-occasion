import type { Invitation } from "@/lib/invitation";
import type {
  Align,
  FieldDefinition,
  FieldKind,
  SectionDefinition,
  SectionId,
  SectionLabel,
} from "./types";

const center = (elements: string[]): Record<string, Align> =>
  Object.fromEntries(elements.map((element) => [element, "center"]));

const field = (
  path: string,
  label: string,
  kind: FieldKind = "text",
  placeholder?: string,
): FieldDefinition => ({ path, label, kind, placeholder });

const label = (
  eyebrow: string,
  heading: string,
  note = "",
): SectionLabel => ({ eyebrow, heading, note });

const definitions: SectionDefinition[] = [
  {
    id: "envelope",
    label: "Envelope",
    defaultLabel: label("", "The Wedding Of"),
    alignElements: ["title", "guestName", "button"],
    defaultAlign: center(["title", "guestName", "button"]),
    lockedPosition: "first",
    hideable: false,
    defaultVisible: () => true,
    fields: [
      field("envelope.title", "Judul"),
      field("envelope.guestName", "Nama tamu"),
      field("envelope.buttonLabel", "Label tombol"),
    ],
  },
  {
    id: "hero",
    label: "Header",
    defaultLabel: label("The Wedding Of", ""),
    alignElements: ["eyebrow", "names", "description", "date", "location"],
    defaultAlign: center([
      "eyebrow",
      "names",
      "description",
      "date",
      "location",
    ]),
    lockedPosition: null,
    hideable: true,
    defaultVisible: () => true,
    fields: [
      field("meta.title", "Judul halaman"),
      field("meta.description", "Deskripsi halaman", "textarea"),
      field("hero.eyebrow", "Eyebrow"),
      field("hero.description", "Deskripsi", "textarea"),
      field("hero.locationShort", "Lokasi singkat"),
    ],
  },
  {
    id: "quote",
    label: "Quote",
    defaultLabel: label("", ""),
    alignElements: ["eyebrow", "text", "source"],
    defaultAlign: center(["eyebrow", "text", "source"]),
    lockedPosition: null,
    hideable: true,
    defaultVisible: () => true,
    fields: [
      field("quote.eyebrow", "Eyebrow"),
      field("quote.text", "Kutipan", "textarea"),
      field("quote.source", "Sumber"),
    ],
  },
  {
    id: "couple",
    label: "Mempelai",
    defaultLabel: label("", "Mempelai"),
    alignElements: ["heading", "bride", "groom"],
    defaultAlign: center(["heading", "bride", "groom"]),
    lockedPosition: null,
    hideable: true,
    defaultVisible: () => true,
    fields: [
      field("couple.monogram", "Monogram"),
      field("couple.bride.fullName", "Nama lengkap mempelai wanita"),
      field("couple.bride.nickname", "Nama panggilan mempelai wanita"),
      field("couple.bride.initial", "Inisial mempelai wanita"),
      field("couple.bride.role", "Peran mempelai wanita"),
      field("couple.bride.parents", "Orang tua mempelai wanita", "textarea"),
      field("couple.groom.fullName", "Nama lengkap mempelai pria"),
      field("couple.groom.nickname", "Nama panggilan mempelai pria"),
      field("couple.groom.initial", "Inisial mempelai pria"),
      field("couple.groom.role", "Peran mempelai pria"),
      field("couple.groom.parents", "Orang tua mempelai pria", "textarea"),
    ],
  },
  {
    id: "countdown",
    label: "Tanggal",
    defaultLabel: label("Menghitung Hari", "Menuju Bahagia"),
    alignElements: ["heading", "timer"],
    defaultAlign: center(["heading", "timer"]),
    lockedPosition: null,
    hideable: true,
    defaultVisible: () => true,
    fields: [
      field("hero.dateLabel", "Label tanggal"),
      field("hero.isoDate", "Tanggal & waktu", "datetime"),
    ],
  },
  {
    id: "story",
    label: "Kisah",
    defaultLabel: label("Our Story", "Kisah Kami"),
    alignElements: ["heading", "items"],
    defaultAlign: center(["heading", "items"]),
    lockedPosition: null,
    hideable: true,
    defaultVisible: (invitation) => invitation.story.length > 0,
    fields: [],
  },
  {
    id: "events",
    label: "Acara",
    defaultLabel: label("Save the Date", "Rangkaian Acara"),
    alignElements: ["heading", "cards"],
    defaultAlign: center(["heading", "cards"]),
    lockedPosition: null,
    hideable: true,
    defaultVisible: () => true,
    fields: [],
  },
  {
    id: "venue",
    label: "Lokasi",
    defaultLabel: label("Location", "Alamat Acara"),
    alignElements: ["heading", "place", "address", "button"],
    defaultAlign: center(["heading", "place", "address", "button"]),
    lockedPosition: null,
    hideable: true,
    defaultVisible: () => true,
    fields: [
      field("venue.label", "Label"),
      field("venue.place", "Nama tempat"),
      field("venue.address", "Alamat", "textarea"),
      field("venue.mapsUrl", "URL Google Maps", "url"),
    ],
  },
  {
    id: "gallery",
    label: "Galeri",
    defaultLabel: label("Our Moments", "Cerita Kami"),
    alignElements: ["heading", "items"],
    defaultAlign: center(["heading", "items"]),
    lockedPosition: null,
    hideable: true,
    defaultVisible: (invitation) => invitation.gallery.length > 0,
    fields: [],
  },
  {
    id: "video",
    label: "Video",
    defaultLabel: label("Video", "Prewedding Film"),
    alignElements: ["heading", "thumbnail", "caption"],
    defaultAlign: center(["heading", "thumbnail", "caption"]),
    lockedPosition: null,
    hideable: true,
    defaultVisible: (invitation) => Boolean(invitation.video),
    fields: [
      field("video.url", "URL YouTube", "url"),
      field("video.thumbnailUrl", "URL thumbnail", "url"),
      field("video.title", "Judul video"),
      field("video.subtitle", "Subtitle"),
    ],
  },
  {
    id: "dresscode",
    label: "Dress Code",
    defaultLabel: label("Dress Code", "Nuansa Warna"),
    alignElements: ["heading", "note", "colors"],
    defaultAlign: center(["heading", "note", "colors"]),
    lockedPosition: null,
    hideable: true,
    defaultVisible: () => true,
    fields: [field("dresscode.note", "Catatan", "textarea")],
  },
  {
    id: "gift",
    label: "Hadiah",
    defaultLabel: label("Wedding Gift", "Hadiah & Tanda Kasih"),
    alignElements: ["heading", "note", "accounts"],
    defaultAlign: center(["heading", "note", "accounts"]),
    lockedPosition: null,
    hideable: true,
    defaultVisible: () => true,
    fields: [field("gift.note", "Catatan", "textarea")],
  },
  {
    id: "rsvp",
    label: "RSVP",
    defaultLabel: label("RSVP", "Konfirmasi Hadir"),
    alignElements: ["heading", "note", "form"],
    defaultAlign: center(["heading", "note", "form"]),
    lockedPosition: null,
    hideable: true,
    defaultVisible: () => true,
    fields: [
      field("rsvp.deadlineLabel", "Batas konfirmasi"),
      field("rsvp.note", "Catatan", "textarea"),
    ],
  },
  {
    id: "closing",
    label: "Penutup",
    defaultLabel: label("Terima Kasih", ""),
    alignElements: ["message", "names", "date"],
    defaultAlign: center(["message", "names", "date"]),
    lockedPosition: "last",
    hideable: false,
    defaultVisible: () => true,
    fields: [field("closing.message", "Pesan penutup", "textarea")],
  },
];

export const sectionDefinitions = definitions;

export const sectionDefinitionMap = Object.fromEntries(
  definitions.map((definition) => [definition.id, definition]),
) as Record<SectionId, SectionDefinition>;

export const defaultOrder: SectionId[] = definitions.map(
  (definition) => definition.id,
);

export const hideableSectionIds = definitions
  .filter((definition) => definition.hideable)
  .map((definition) => definition.id);

export function getSectionDefinition(id: SectionId): SectionDefinition {
  return sectionDefinitionMap[id];
}

export function getDefaultLabels(
  invitation: Invitation,
): Record<SectionId, SectionLabel> {
  const labels = Object.fromEntries(
    definitions.map((definition) => [definition.id, { ...definition.defaultLabel }]),
  ) as Record<SectionId, SectionLabel>;

  if (invitation.envelope) {
    labels.envelope.heading = invitation.envelope.title;
  } else if (invitation.hero.eyebrow) {
    labels.envelope.heading = invitation.hero.eyebrow;
  }

  return labels;
}
