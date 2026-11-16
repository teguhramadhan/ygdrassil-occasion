import Alignable, { SectionFrame } from "../Alignable";
import { alignFor, type SectionComponentProps } from "../types";

export default function EventsSection({
  invitation,
  label,
  style,
  preset,
  images,
}: SectionComponentProps) {
  return (
    <SectionFrame id="events" style={style} images={images}>
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

        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {invitation.events.map((event, index) => (
            <Alignable
              key={`${event.label}-${index}`}
              align={alignFor(style, preset, "cards")}
              className="gap-3 rounded-3xl border px-8 py-10"
            >
              <p className="text-[10px] uppercase tracking-[0.35em] opacity-60">
                {event.label}
              </p>
              <p
                className="text-2xl"
                style={{ fontFamily: preset.fonts.display }}
              >
                {event.date}
              </p>
              <p className="text-sm opacity-70">{event.time}</p>
              <span className="my-2 h-px w-10 bg-current opacity-30" />
              <p
                className="text-lg"
                style={{ fontFamily: preset.fonts.display }}
              >
                {event.place}
              </p>
              <p className="text-sm leading-relaxed opacity-70">
                {event.address}
              </p>
            </Alignable>
          ))}
        </div>
      </div>
    </SectionFrame>
  );
}
