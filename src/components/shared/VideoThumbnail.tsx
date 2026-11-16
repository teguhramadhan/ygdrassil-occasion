import { youtubeThumbnail } from "@/lib/video";

type Variant = "floral" | "classic" | "minimal";

type VideoThumbnailProps = {
  videoUrl: string;
  thumbnailUrl?: string;
  title: string;
  subtitle?: string;
  variant?: Variant;
  className?: string;
};

const frameStyles: Record<Variant, string> = {
  floral: "rounded-[2rem] border border-[#c98b93]/30",
  classic: "rounded-sm border border-[#c6a15b]/40",
  minimal: "border border-[#111111]/10",
};

const playStyles: Record<Variant, string> = {
  floral: "bg-white/85 text-[#7a4a50] group-hover:bg-white",
  classic: "bg-[#c6a15b] text-[#2b0b0b] group-hover:bg-[#d9b978]",
  minimal: "bg-white text-[#111111] group-hover:bg-[#8b9585] group-hover:text-white",
};

const subtitleStyles: Record<Variant, string> = {
  floral: "text-[#f3d9dc]",
  classic: "text-[#c6a15b]",
  minimal: "text-white/80",
};

export default function VideoThumbnail({
  videoUrl,
  thumbnailUrl,
  title,
  subtitle,
  variant = "minimal",
  className = "",
}: VideoThumbnailProps) {
  const thumbnail = thumbnailUrl ?? youtubeThumbnail(videoUrl);

  return (
    <a
      href={videoUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Putar video: ${title}`}
      className={`group relative block aspect-video w-full overflow-hidden ${frameStyles[variant]} ${className}`}
      style={
        thumbnail
          ? {
              backgroundImage: `url(${thumbnail})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }
          : undefined
      }
    >
      {!thumbnail && (
        <div className="absolute inset-0 bg-gradient-to-br from-[#3a2a2a] via-[#2b1d1d] to-[#111111]" />
      )}
      <div className="absolute inset-0 bg-black/25 transition group-hover:bg-black/40" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

      <span className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full shadow-lg transition group-hover:scale-110 sm:h-20 sm:w-20">
        <span
          className={`flex h-full w-full items-center justify-center rounded-full ${playStyles[variant]}`}
        >
          <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className="ml-1 h-6 w-6 sm:h-7 sm:w-7">
            <path d="M8 5.14v13.72a1 1 0 0 0 1.54.84l10.3-6.86a1 1 0 0 0 0-1.68L9.54 4.3A1 1 0 0 0 8 5.14Z" />
          </svg>
        </span>
      </span>

      <div className="absolute inset-x-0 bottom-0 p-5 sm:p-7">
        {subtitle && (
          <p className={`text-[9px] uppercase tracking-[0.35em] ${subtitleStyles[variant]}`}>
            {subtitle}
          </p>
        )}
        <p className="mt-1 text-lg font-medium text-white sm:text-2xl">{title}</p>
        <p className="mt-1 text-[10px] uppercase tracking-[0.25em] text-white/60">
          Tonton video ↗
        </p>
      </div>
    </a>
  );
}
