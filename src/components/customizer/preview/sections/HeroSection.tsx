import Alignable, { SectionFrame } from "../Alignable";
import { alignFor, type SectionComponentProps } from "../types";

export default function HeroSection({
  invitation,
  label,
  style,
  preset,
  images,
}: SectionComponentProps) {
  const { bride, groom } = invitation.couple;

  return (
    <SectionFrame
      id="hero"
      style={style}
      images={images}
      className="flex min-h-[80vh] items-center"
    >
      <div className="mx-auto flex w-full max-w-4xl flex-col gap-6">
        <Alignable align={alignFor(style, preset, "eyebrow")}>
          <p className="text-[10px] uppercase tracking-[0.5em] opacity-70">
            {label.eyebrow || "The Wedding Of"}
          </p>
        </Alignable>

        <Alignable align={alignFor(style, preset, "names")}>
          <h1
            className="text-5xl leading-[0.95] sm:text-8xl"
            style={{ fontFamily: preset.fonts.accent ?? preset.fonts.display }}
          >
            {bride.nickname}
            <span className="mx-3 opacity-50">&</span>
            {groom.nickname}
          </h1>
        </Alignable>

        {invitation.hero.description && (
          <Alignable align={alignFor(style, preset, "description")}>
            <p className="max-w-xl text-sm leading-relaxed opacity-70">
              {invitation.hero.description}
            </p>
          </Alignable>
        )}

        <Alignable align={alignFor(style, preset, "date")}>
          <div className="flex items-center gap-4">
            <span className="h-px w-10 bg-current opacity-30" />
            <span className="text-[11px] uppercase tracking-[0.35em] opacity-80">
              {invitation.hero.dateLabel}
            </span>
            <span className="h-px w-10 bg-current opacity-30" />
          </div>
        </Alignable>

        <Alignable align={alignFor(style, preset, "location")}>
          <p className="text-[10px] uppercase tracking-[0.3em] opacity-60">
            {invitation.hero.locationShort}
          </p>
        </Alignable>
      </div>
    </SectionFrame>
  );
}
