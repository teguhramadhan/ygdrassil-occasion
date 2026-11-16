import Alignable, { SectionFrame } from "../Alignable";
import { alignFor, type SectionComponentProps } from "../types";

export default function VenueSection({
  invitation,
  label,
  style,
  preset,
  images,
}: SectionComponentProps) {
  return (
    <SectionFrame id="venue" style={style} images={images}>
      <div className="mx-auto max-w-4xl">
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

        <div className="mt-12 grid gap-6 sm:grid-cols-[1.1fr_1fr]">
          <div
            className="relative min-h-64 overflow-hidden rounded-3xl border"
            style={{ borderColor: `${preset.colors.border}66` }}
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(255,255,255,0.5),transparent_55%)]" />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="flex h-16 w-16 items-center justify-center rounded-full bg-white/80 text-2xl">
                📍
              </span>
            </div>
            <div className="absolute inset-x-4 bottom-4 rounded-2xl bg-white/80 px-4 py-3 text-[#1b1a17] backdrop-blur">
              <p className="text-[9px] uppercase tracking-[0.3em] opacity-60">
                {invitation.hero.locationShort}
              </p>
              <p
                className="text-lg"
                style={{ fontFamily: preset.fonts.display }}
              >
                {invitation.venue.place}
              </p>
            </div>
          </div>

          <Alignable
            align={alignFor(style, preset, "place")}
            className="gap-3 rounded-3xl border px-8 py-10"
          >
            <p className="text-[10px] uppercase tracking-[0.35em] opacity-60">
              {invitation.venue.label}
            </p>
            <h3
              className="text-2xl"
              style={{ fontFamily: preset.fonts.display }}
            >
              {invitation.venue.place}
            </h3>
            <Alignable
              align={alignFor(style, preset, "address")}
              className="w-full"
            >
              <p className="text-sm leading-relaxed opacity-70">
                {invitation.venue.address}
              </p>
            </Alignable>
            <Alignable align={alignFor(style, preset, "button")} className="w-full">
              <a
                href={invitation.venue.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border px-5 py-2.5 text-[10px] uppercase tracking-[0.25em] transition hover:opacity-70"
                style={{ borderColor: "currentColor" }}
              >
                Buka Google Maps
                <span aria-hidden>↗</span>
              </a>
            </Alignable>
          </Alignable>
        </div>
      </div>
    </SectionFrame>
  );
}
