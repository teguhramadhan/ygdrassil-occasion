import Alignable, { SectionFrame } from "../Alignable";
import { alignFor, type SectionComponentProps } from "../types";

type EnvelopeSectionProps = SectionComponentProps & {
  onOpen: () => void;
};

export default function EnvelopeSection({
  invitation,
  label,
  style,
  preset,
  images,
  onOpen,
}: EnvelopeSectionProps) {
  const envelope = invitation.envelope;
  const title = envelope?.title ?? label.heading;
  const guestName = envelope?.guestName || "Tamu Undangan";
  const buttonLabel = envelope?.buttonLabel || "Buka Undangan";

  return (
    <SectionFrame
      id="envelope"
      style={style}
      images={images}
      className="flex min-h-screen items-center"
    >
      <div className="mx-auto flex w-full max-w-2xl flex-col gap-10">
        <Alignable align={alignFor(style, preset, "title")} className="gap-4">
          <p className="text-[11px] uppercase tracking-[0.5em] opacity-70">
            {label.eyebrow || "The Wedding Of"}
          </p>
          <h1
            className="text-5xl leading-tight sm:text-7xl"
            style={{ fontFamily: preset.fonts.accent ?? preset.fonts.display }}
          >
            {title}
          </h1>
        </Alignable>

        <Alignable align={alignFor(style, preset, "guestName")} className="gap-2">
          <p className="text-[10px] uppercase tracking-[0.35em] opacity-60">
            Kepada
          </p>
          <p
            className="text-2xl sm:text-3xl"
            style={{ fontFamily: preset.fonts.display }}
          >
            {guestName}
          </p>
        </Alignable>

        <Alignable align={alignFor(style, preset, "button")}>
          <button
            type="button"
            onClick={onOpen}
            className="rounded-full border px-8 py-3 text-[10px] uppercase tracking-[0.3em] transition hover:opacity-70"
            style={{ borderColor: "currentColor" }}
          >
            {buttonLabel}
          </button>
        </Alignable>
      </div>
    </SectionFrame>
  );
}
