import Alignable, { SectionFrame } from "../Alignable";
import { alignFor, type SectionComponentProps } from "../types";

export default function ClosingSection({
  invitation,
  label,
  style,
  preset,
  images,
}: SectionComponentProps) {
  const { bride, groom } = invitation.couple;

  return (
    <SectionFrame id="closing" style={style} images={images}>
      <div className="mx-auto flex max-w-2xl flex-col gap-6">
        <Alignable align={alignFor(style, preset, "message")} className="gap-4">
          <p className="text-[10px] uppercase tracking-[0.4em] opacity-60">
            {label.eyebrow}
          </p>
          <p className="text-sm leading-relaxed opacity-70">
            {invitation.closing.message}
          </p>
        </Alignable>

        <Alignable align={alignFor(style, preset, "names")}>
          <p
            className="text-5xl sm:text-6xl"
            style={{ fontFamily: preset.fonts.accent ?? preset.fonts.display }}
          >
            {bride.nickname} & {groom.nickname}
          </p>
        </Alignable>

        <Alignable align={alignFor(style, preset, "date")}>
          <p className="text-[10px] uppercase tracking-[0.3em] opacity-60">
            {invitation.hero.dateLabel}
          </p>
        </Alignable>
      </div>
    </SectionFrame>
  );
}
