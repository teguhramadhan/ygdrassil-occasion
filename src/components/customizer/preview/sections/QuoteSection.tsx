import Alignable, { SectionFrame } from "../Alignable";
import { alignFor, type SectionComponentProps } from "../types";

export default function QuoteSection({
  invitation,
  label,
  style,
  preset,
  images,
}: SectionComponentProps) {
  return (
    <SectionFrame id="quote" style={style} images={images}>
      <div className="mx-auto flex max-w-2xl flex-col gap-5">
        {label.eyebrow && (
          <Alignable align={alignFor(style, preset, "eyebrow")}>
            <p className="text-[10px] uppercase tracking-[0.4em] opacity-60">
              {label.eyebrow}
            </p>
          </Alignable>
        )}

        <Alignable align={alignFor(style, preset, "text")}>
          <p
            className="text-2xl italic leading-relaxed sm:text-3xl"
            style={{ fontFamily: preset.fonts.display }}
          >
            “{invitation.quote.text}”
          </p>
        </Alignable>

        <Alignable align={alignFor(style, preset, "source")}>
          <p className="text-[10px] uppercase tracking-[0.3em] opacity-60">
            {invitation.quote.source}
          </p>
        </Alignable>
      </div>
    </SectionFrame>
  );
}
