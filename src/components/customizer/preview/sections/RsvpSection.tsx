import Alignable, { SectionFrame } from "../Alignable";
import { alignFor, type SectionComponentProps } from "../types";

export default function RsvpSection({
  invitation,
  label,
  style,
  preset,
  images,
}: SectionComponentProps) {
  return (
    <SectionFrame id="rsvp" style={style} images={images}>
      <div className="mx-auto max-w-xl">
        <Alignable align={alignFor(style, preset, "heading")}>
          <p className="text-[10px] uppercase tracking-[0.4em] opacity-60">
            {label.eyebrow}
          </p>
          <h2
            className="mt-3 text-4xl sm:text-5xl"
            style={{ fontFamily: preset.fonts.accent ?? preset.fonts.display }}
          >
            {label.heading}
          </h2>
        </Alignable>

        <Alignable align={alignFor(style, preset, "note")} className="mt-4">
          <p className="text-sm leading-relaxed opacity-70">
            {invitation.rsvp.note}
          </p>
          <p className="mt-2 text-[10px] uppercase tracking-[0.25em] opacity-60">
            Konfirmasi sebelum {invitation.rsvp.deadlineLabel}
          </p>
        </Alignable>

        <Alignable align={alignFor(style, preset, "form")} className="mt-8 gap-4">
          <label className="flex w-full flex-col gap-2 text-[10px] uppercase tracking-[0.25em] opacity-70">
            Nama
            <input
              type="text"
              placeholder="Nama lengkap"
              className="rounded-xl border bg-transparent px-4 py-3 text-sm tracking-normal outline-none placeholder:opacity-40"
              style={{ borderColor: `${preset.colors.border}66` }}
            />
          </label>
          <label className="flex w-full flex-col gap-2 text-[10px] uppercase tracking-[0.25em] opacity-70">
            Kehadiran
            <select
              defaultValue="hadir"
              className="rounded-xl border bg-transparent px-4 py-3 text-sm tracking-normal outline-none"
              style={{ borderColor: `${preset.colors.border}66` }}
            >
              <option value="hadir">Hadir</option>
              <option value="ragu">Masih ragu</option>
              <option value="tidak">Tidak hadir</option>
            </select>
          </label>
          <label className="flex w-full flex-col gap-2 text-[10px] uppercase tracking-[0.25em] opacity-70">
            Ucapan
            <textarea
              rows={4}
              placeholder="Tulis doa dan ucapan..."
              className="resize-none rounded-xl border bg-transparent px-4 py-3 text-sm tracking-normal outline-none placeholder:opacity-40"
              style={{ borderColor: `${preset.colors.border}66` }}
            />
          </label>
          <button
            type="button"
            className="mt-2 rounded-full border px-6 py-3 text-[10px] uppercase tracking-[0.3em] transition hover:opacity-70"
            style={{ borderColor: "currentColor" }}
          >
            Kirim Ucapan
          </button>
        </Alignable>
      </div>
    </SectionFrame>
  );
}
