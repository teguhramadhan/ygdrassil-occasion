import Alignable, { SectionFrame } from "../Alignable";
import { alignFor, type SectionComponentProps } from "../types";

export default function StorySection({
  invitation,
  label,
  style,
  preset,
  images,
}: SectionComponentProps) {
  return (
    <SectionFrame id="story" style={style} images={images}>
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

        <div className="mt-12 flex flex-col gap-8">
          {invitation.story.map((item, index) => (
            <Alignable
              key={`${item.year}-${index}`}
              align={alignFor(style, preset, "items")}
              className="gap-2 border-l-2 pl-6"
            >
              <p className="text-[10px] uppercase tracking-[0.3em] opacity-60">
                {item.year}
              </p>
              <h3
                className="text-2xl"
                style={{ fontFamily: preset.fonts.display }}
              >
                {item.title}
              </h3>
              <p className="max-w-2xl text-sm leading-relaxed opacity-70">
                {item.text}
              </p>
            </Alignable>
          ))}
        </div>
      </div>
    </SectionFrame>
  );
}
