import Alignable, { SectionFrame } from "../Alignable";
import { alignFor, type SectionComponentProps } from "../types";

export default function DresscodeSection({
  invitation,
  label,
  style,
  preset,
  images,
}: SectionComponentProps) {
  return (
    <SectionFrame id="dresscode" style={style} images={images}>
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

        <Alignable align={alignFor(style, preset, "note")} className="mt-4">
          <p className="max-w-xl text-sm leading-relaxed opacity-70">
            {invitation.dresscode.note}
          </p>
        </Alignable>

        <Alignable
          align={alignFor(style, preset, "colors")}
          className="alignable-row mt-10 justify-center gap-8"
        >
          {invitation.dresscode.colors.map((color) => (
            <div
              key={color.name}
              className="flex flex-col items-center gap-3"
            >
              <span
                className="h-16 w-16 rounded-full border border-black/5 shadow-inner"
                style={{ backgroundColor: color.hex }}
              />
              <span className="text-[9px] uppercase tracking-[0.3em] opacity-60">
                {color.name}
              </span>
            </div>
          ))}
        </Alignable>
      </div>
    </SectionFrame>
  );
}
