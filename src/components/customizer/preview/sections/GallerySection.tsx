import Alignable, { SectionFrame } from "../Alignable";
import { alignFor, type SectionComponentProps } from "../types";

export default function GallerySection({
  invitation,
  label,
  style,
  preset,
  images,
}: SectionComponentProps) {
  return (
    <SectionFrame id="gallery" style={style} images={images}>
      <div className="mx-auto max-w-5xl">
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

        <div className="mt-12 grid gap-4 sm:grid-cols-3">
          {invitation.gallery.map((item, index) => {
            const imageUrl = item.imageId ? images[item.imageId] : item.imageUrl;

            return (
              <Alignable
                key={`${item.label}-${index}`}
                align={alignFor(style, preset, "items")}
                className="gap-3"
              >
                <div
                  className="relative aspect-[3/4] w-full overflow-hidden rounded-3xl"
                  style={
                    imageUrl
                      ? {
                          backgroundImage: `url("${imageUrl}")`,
                          backgroundSize: "cover",
                          backgroundPosition: "center",
                        }
                      : {
                          backgroundImage: `linear-gradient(135deg, ${item.from}, ${item.to})`,
                        }
                  }
                >
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.4),transparent_60%)]" />
                  <div className="absolute inset-x-4 bottom-4 rounded-2xl bg-white/80 px-4 py-3 text-[#1b1a17] backdrop-blur">
                    <p
                      className="text-base"
                      style={{ fontFamily: preset.fonts.display }}
                    >
                      {item.label}
                    </p>
                  </div>
                </div>
              </Alignable>
            );
          })}
        </div>
      </div>
    </SectionFrame>
  );
}
