import Alignable, { SectionFrame } from "../Alignable";
import { alignFor, type SectionComponentProps } from "../types";

export default function CoupleSection({
  invitation,
  label,
  style,
  preset,
  images,
}: SectionComponentProps) {
  const people = [
    { key: "bride" as const, person: invitation.couple.bride },
    { key: "groom" as const, person: invitation.couple.groom },
  ];

  return (
    <SectionFrame id="couple" style={style} images={images}>
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
          {people.map(({ key, person }) => (
            <Alignable
              key={key}
              align={alignFor(style, preset, key)}
              className="gap-4 rounded-3xl border px-8 py-10"
            >
              <span
                className="flex h-16 w-16 items-center justify-center rounded-full border text-2xl"
                style={{
                  borderColor: `${preset.colors.border}66`,
                  fontFamily: preset.fonts.display,
                }}
              >
                {person.initial}
              </span>
              <h3
                className="text-2xl sm:text-3xl"
                style={{ fontFamily: preset.fonts.display }}
              >
                {person.fullName}
              </h3>
              <p className="text-[10px] uppercase tracking-[0.3em] opacity-60">
                {person.role}
              </p>
              <p className="text-sm leading-relaxed opacity-70">
                {person.parents}
              </p>
            </Alignable>
          ))}
        </div>
      </div>
    </SectionFrame>
  );
}
