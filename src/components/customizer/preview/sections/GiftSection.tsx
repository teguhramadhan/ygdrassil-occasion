import CopyButton from "@/components/shared/CopyButton";
import Alignable, { SectionFrame } from "../Alignable";
import { alignFor, type SectionComponentProps } from "../types";

export default function GiftSection({
  invitation,
  label,
  style,
  preset,
  images,
}: SectionComponentProps) {
  return (
    <SectionFrame id="gift" style={style} images={images}>
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

        <Alignable align={alignFor(style, preset, "note")} className="mt-4">
          <p className="max-w-xl text-sm leading-relaxed opacity-70">
            {invitation.gift.note}
          </p>
        </Alignable>

        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          {invitation.gift.accounts.map((account) => (
            <Alignable
              key={account.bank}
              align={alignFor(style, preset, "accounts")}
              className="gap-2 rounded-3xl border px-8 py-8"
            >
              <p className="text-[10px] uppercase tracking-[0.3em] opacity-60">
                {account.bank}
              </p>
              <p
                className="text-2xl tracking-wider"
                style={{ fontFamily: preset.fonts.display }}
              >
                {account.number}
              </p>
              <p className="text-sm opacity-70">a.n. {account.holder}</p>
              <CopyButton
                value={account.number}
                className="mt-4 rounded-full border px-5 py-2 text-[10px] uppercase tracking-[0.25em] transition hover:opacity-70"
              />
            </Alignable>
          ))}
        </div>
      </div>
    </SectionFrame>
  );
}
