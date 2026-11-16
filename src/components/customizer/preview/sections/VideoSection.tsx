import VideoThumbnail from "@/components/shared/VideoThumbnail";
import Alignable, { SectionFrame } from "../Alignable";
import { alignFor, type SectionComponentProps } from "../types";

const variants: Record<string, "floral" | "classic" | "minimal"> = {
  floral: "floral",
  "elegant-red": "classic",
  "modern-minimal": "minimal",
};

export default function VideoSection({
  invitation,
  label,
  style,
  preset,
  images,
}: SectionComponentProps) {
  if (!invitation.video) return null;

  return (
    <SectionFrame id="video" style={style} images={images}>
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

        <Alignable align={alignFor(style, preset, "thumbnail")} className="mt-12">
          <VideoThumbnail
            variant={variants[preset.id] ?? "minimal"}
            videoUrl={invitation.video.url}
            thumbnailUrl={invitation.video.thumbnailUrl}
            title={invitation.video.title}
            subtitle={invitation.video.subtitle}
            className="w-full"
          />
        </Alignable>

        <Alignable align={alignFor(style, preset, "caption")}>
          <p className="mt-4 text-[10px] uppercase tracking-[0.3em] opacity-60">
            Klik thumbnail untuk menonton di YouTube.
          </p>
        </Alignable>
      </div>
    </SectionFrame>
  );
}
