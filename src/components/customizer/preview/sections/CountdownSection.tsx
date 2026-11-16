import Countdown from "@/components/shared/Countdown";
import Alignable, { SectionFrame } from "../Alignable";
import { alignFor, type SectionComponentProps } from "../types";

export default function CountdownSection({
  invitation,
  label,
  style,
  preset,
  images,
}: SectionComponentProps) {
  return (
    <SectionFrame id="countdown" style={style} images={images}>
      <div className="mx-auto max-w-3xl">
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

        <Alignable
          align={alignFor(style, preset, "timer")}
          className="mt-10 gap-4"
        >
          <Countdown
            target={invitation.hero.isoDate}
            className="flex items-start justify-center gap-4 sm:gap-8"
            itemClassName="flex min-w-16 flex-col items-center"
            numberClassName="text-4xl sm:text-5xl"
            labelClassName="mt-2 text-[9px] uppercase tracking-[0.3em] opacity-60"
          />
          <p className="text-[10px] uppercase tracking-[0.3em] opacity-60">
            {invitation.hero.dateLabel}
          </p>
        </Alignable>
      </div>
    </SectionFrame>
  );
}
