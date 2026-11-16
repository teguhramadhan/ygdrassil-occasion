import { Cinzel, Cormorant_Garamond, Jost } from "next/font/google";
import Countdown from "@/components/shared/Countdown";
import CopyButton from "@/components/shared/CopyButton";
import VideoThumbnail from "@/components/shared/VideoThumbnail";
import type { Invitation } from "@/lib/invitation";

const display = Cinzel({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-red-display",
});

const serif = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-red-serif",
});

const body = Jost({
  subsets: ["latin"],
  variable: "--font-red-body",
});

export default function ElegantRed({
  invitation,
}: {
  invitation: Invitation;
}) {
  const { bride, groom, monogram } = invitation.couple;
  const coupleNames = `${bride.nickname} & ${groom.nickname}`;

  return (
    <div
      className={`${display.variable} ${serif.variable} ${body.variable} font-red-body overflow-x-hidden bg-[#f5efe6] text-[#1c1210]`}
    >
      <section className="relative grid min-h-screen overflow-hidden md:grid-cols-[1.05fr_0.95fr]">
        <div className="relative flex flex-col justify-between bg-[#2b0b0b] px-8 py-10 text-[#f5efe6] sm:px-14 sm:py-14">
          <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.35em] text-[#c6a15b]">
            <span>{monogram}</span>
            <span>{invitation.hero.dateLabel}</span>
          </div>

          <div className="flex flex-1 flex-col justify-center py-16">
            <div className="flex animate-[fadeUp_0.8s_ease-out_both] items-center gap-4">
              <span className="h-px w-12 bg-[#c6a15b]" />
              <span className="text-[10px] uppercase tracking-[0.4em] text-[#c6a15b]">
                {invitation.hero.eyebrow}
              </span>
            </div>
            <h1 className="mt-8 animate-[fadeUp_1s_ease-out_both] font-red-serif text-6xl leading-[0.95] sm:text-7xl lg:text-8xl">
              {bride.nickname}
              <span className="mt-1 block italic text-[#c6a15b]">&</span>
              {groom.nickname}
            </h1>
            {invitation.hero.description && (
              <p className="mt-8 max-w-sm animate-[fadeUp_1.2s_ease-out_both] text-sm leading-relaxed tracking-wide text-[#e3d3bd]">
                {invitation.hero.description}
              </p>
            )}

            <div className="mt-12 animate-[fadeUp_1.4s_ease-out_both]">
              <p className="mb-4 text-[9px] uppercase tracking-[0.4em] text-[#c6a15b]">
                Menuju hari bahagia
              </p>
              <Countdown
                target={invitation.hero.isoDate}
                className="flex gap-6"
                itemClassName="flex flex-col"
                numberClassName="font-red-display text-3xl text-[#f5efe6] sm:text-4xl"
                labelClassName="mt-1 text-[8px] uppercase tracking-[0.3em] text-[#c6a15b]"
              />
            </div>
          </div>

          <div className="flex items-center gap-3 text-[9px] uppercase tracking-[0.35em] text-[#c6a15b]/70">
            <span className="h-px w-8 bg-[#c6a15b]/40" />
            Scroll to explore
          </div>
        </div>

        <div className="relative flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#3a1010] via-[#2b0b0b] to-[#140404] px-8 py-20">
          <div className="absolute inset-0 opacity-[0.07] [background-image:repeating-linear-gradient(45deg,#c6a15b_0,#c6a15b_1px,transparent_1px,transparent_18px)]" />
          <div className="absolute left-6 top-6 h-16 w-16 border-l border-t border-[#c6a15b]/50" />
          <div className="absolute bottom-6 right-6 h-16 w-16 border-b border-r border-[#c6a15b]/50" />
          <div className="relative flex flex-col items-center">
            <div className="absolute -inset-10 rounded-full border border-[#c6a15b]/20" />
            <div className="absolute -inset-20 rounded-full border border-[#c6a15b]/10" />
            <div className="relative flex h-56 w-56 flex-col items-center justify-center rounded-full border border-[#c6a15b]/60 bg-[#2b0b0b]/80 backdrop-blur sm:h-64 sm:w-64">
              <span className="text-[9px] uppercase tracking-[0.4em] text-[#c6a15b]">
                The Wedding
              </span>
              <span className="my-3 font-red-serif text-5xl italic text-[#f5efe6]">
                {monogram}
              </span>
              <span className="h-px w-12 bg-[#c6a15b]" />
              <span className="mt-3 text-[10px] uppercase tracking-[0.3em] text-[#c6a15b]">
                {invitation.hero.locationShort}
              </span>
            </div>
          </div>
        </div>
      </section>

      <div className="bg-[#c6a15b] px-6 py-3">
        <p className="text-center text-[10px] uppercase tracking-[0.45em] text-[#2b0b0b]">
          {coupleNames} · {invitation.hero.dateLabel} ·{" "}
          {invitation.hero.locationShort}
        </p>
      </div>

      <section className="px-6 py-20 sm:py-24">
        <div className="mx-auto max-w-4xl text-center">
          <span className="font-red-display text-5xl text-[#c6a15b]">“</span>
          <p className="font-red-serif text-2xl italic leading-relaxed text-[#3a2018] sm:text-3xl">
            {invitation.quote.text}
          </p>
          <p className="mt-6 text-[10px] uppercase tracking-[0.4em] text-[#a07a3e]">
            {invitation.quote.source}
          </p>
        </div>
      </section>

      {invitation.story.length > 0 && (
        <section className="border-y border-[#2b0b0b]/10 bg-[#efe6d8] px-6 py-20">
          <div className="mx-auto max-w-5xl">
            <div className="text-center">
              <p className="text-[10px] uppercase tracking-[0.4em] text-[#a07a3e]">
                Our journey
              </p>
              <h2 className="mt-4 font-red-display text-3xl tracking-[0.15em] text-[#2b0b0b] sm:text-4xl">
                Kisah Kami
              </h2>
            </div>

            <div className="relative mt-16 grid gap-10 sm:grid-cols-3">
              <div className="absolute left-0 right-0 top-6 hidden h-px bg-[#2b0b0b]/15 sm:block" />
              {invitation.story.map((item) => (
                <div
                  key={item.year}
                  className="relative flex flex-col items-center text-center"
                >
                  <span className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full border border-[#c6a15b] bg-[#f5efe6] font-red-display text-sm text-[#2b0b0b]">
                    {item.year}
                  </span>
                  <h3 className="mt-6 font-red-serif text-xl text-[#2b0b0b]">
                    {item.title}
                  </h3>
                  <p className="mt-3 max-w-xs text-sm leading-relaxed text-[#6b5546]">
                    {item.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="px-6 py-20 sm:py-24">
        <div className="mx-auto max-w-4xl">
          <div className="text-center">
            <p className="text-[10px] uppercase tracking-[0.4em] text-[#a07a3e]">
              The celebration
            </p>
            <h2 className="mt-4 font-red-display text-3xl tracking-[0.15em] text-[#2b0b0b] sm:text-4xl">
              Rangkaian Acara
            </h2>
          </div>

          <div className="mt-14 divide-y divide-[#2b0b0b]/10 border-y border-[#2b0b0b]/10">
            {invitation.events.map((event, index) => (
              <div
                key={event.label}
                className="grid gap-4 py-8 sm:grid-cols-[auto_1fr_1fr] sm:items-center sm:gap-10"
              >
                <span className="font-red-display text-3xl text-[#c6a15b]">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div>
                  <p className="text-[10px] uppercase tracking-[0.3em] text-[#a07a3e]">
                    {event.label}
                  </p>
                  <p className="mt-2 font-red-serif text-xl text-[#2b0b0b]">
                    {event.place}
                  </p>
                  <p className="mt-1 text-sm text-[#6b5546]">{event.address}</p>
                </div>
                <div className="sm:text-right">
                  <p className="font-red-display text-sm tracking-[0.15em] text-[#2b0b0b]">
                    {event.date}
                  </p>
                  <p className="mt-1 text-sm text-[#6b5546]">{event.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-[#2b0b0b]/10 bg-[#efe6d8] px-6 py-20 sm:py-24">
        <div className="mx-auto max-w-5xl">
          <div className="text-center">
            <p className="text-[10px] uppercase tracking-[0.4em] text-[#a07a3e]">
              Location
            </p>
            <h2 className="mt-4 font-red-display text-3xl tracking-[0.15em] text-[#2b0b0b] sm:text-4xl">
              Alamat Acara
            </h2>
          </div>
          <div className="mt-12 grid gap-4 sm:grid-cols-[1.15fr_1fr]">
            <div className="relative min-h-64 overflow-hidden rounded-sm border border-[#c6a15b]/40">
              <svg
                viewBox="0 0 400 300"
                aria-hidden
                className="h-full w-full"
                preserveAspectRatio="xMidYMid slice"
              >
                <rect width="400" height="300" fill="#1c0606" />
                <path
                  d="M-30 80C70 40 150 130 260 100S380 30 440 90"
                  stroke="#3a1010"
                  strokeWidth="20"
                  fill="none"
                />
                <path
                  d="M60-20C90 80 40 160 110 240S200 330 240 350"
                  stroke="#3a1010"
                  strokeWidth="14"
                  fill="none"
                />
                <path
                  d="M-30 80C70 40 150 130 260 100S380 30 440 90"
                  stroke="#c6a15b"
                  strokeOpacity="0.35"
                  strokeWidth="1.5"
                  fill="none"
                />
                <path
                  d="M60-20C90 80 40 160 110 240S200 330 240 350"
                  stroke="#c6a15b"
                  strokeOpacity="0.35"
                  strokeWidth="1.5"
                  fill="none"
                />
                <path
                  d="M300-20C280 70 340 140 300 220S260 300 280 350"
                  stroke="#c6a15b"
                  strokeOpacity="0.18"
                  strokeWidth="1.2"
                  fill="none"
                />
                <circle cx="205" cy="150" r="42" fill="#c6a15b" opacity="0.12" />
                <circle cx="205" cy="150" r="26" fill="#2b0b0b" />
                <path
                  d="M205 130c-7.7 0-14 6.3-14 14 0 10.5 14 24 14 24s14-13.5 14-24c0-7.7-6.3-14-14-14Z"
                  fill="#c6a15b"
                />
                <circle cx="205" cy="144" r="5" fill="#1c0606" />
              </svg>
              <div className="absolute inset-x-4 bottom-4 border border-[#c6a15b]/30 bg-[#1c0606]/80 px-4 py-3 backdrop-blur">
                <p className="text-[9px] uppercase tracking-[0.3em] text-[#c6a15b]">
                  {invitation.hero.locationShort}
                </p>
                <p className="mt-1 font-red-serif text-lg italic text-[#f5efe6]">
                  {invitation.venue.place}
                </p>
              </div>
            </div>
            <div className="flex flex-col justify-center border border-[#2b0b0b]/15 bg-[#f5efe6] p-8">
              <p className="text-[10px] uppercase tracking-[0.35em] text-[#a07a3e]">
                {invitation.venue.label}
              </p>
              <h3 className="mt-3 font-red-serif text-2xl text-[#2b0b0b]">
                {invitation.venue.place}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-[#6b5546]">
                {invitation.venue.address}
              </p>
              <span className="my-6 h-px w-10 bg-[#c6a15b]" />
              <a
                href={invitation.venue.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 self-start border border-[#2b0b0b]/25 px-5 py-2.5 text-[10px] uppercase tracking-[0.25em] text-[#2b0b0b] transition hover:border-[#c6a15b] hover:bg-[#2b0b0b] hover:text-[#c6a15b]"
              >
                Buka Google Maps
                <span aria-hidden>↗</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#2b0b0b] px-6 py-20 sm:py-24">
        <div className="mx-auto max-w-5xl">
          <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="text-[10px] uppercase tracking-[0.4em] text-[#c6a15b]">
                Gallery
              </p>
              <h2 className="mt-4 font-red-serif text-4xl italic text-[#f5efe6]">
                Momen dalam bingkai
              </h2>
            </div>
            <p className="max-w-xs text-sm leading-relaxed text-[#c9b8a5]">
              Potret-potret kecil yang menyimpan cerita panjang di baliknya.
            </p>
          </div>

          <div className="mt-12 grid gap-4 sm:grid-cols-2">
            {invitation.gallery.map((item, index) => (
              <div
                key={item.label}
                className={`group relative overflow-hidden rounded-sm ${
                  index % 3 === 0 ? "aspect-[4/3]" : "aspect-[16/10]"
                }`}
                style={{
                  backgroundImage: `linear-gradient(135deg, ${item.from}, ${item.to})`,
                }}
              >
                <div className="absolute inset-3 border border-[#c6a15b]/30" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,rgba(198,161,91,0.25),transparent_55%)]" />
                <div className="absolute bottom-5 left-5">
                  <p className="text-[9px] uppercase tracking-[0.35em] text-[#c6a15b]">
                    {String(index + 1).padStart(2, "0")}
                  </p>
                  <p className="mt-1 font-red-serif text-xl italic text-[#f5efe6]">
                    {item.label}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {invitation.video && (
        <section className="bg-[#efe6d8] px-6 py-20 sm:py-24">
          <div className="mx-auto max-w-4xl">
            <div className="text-center">
              <p className="text-[10px] uppercase tracking-[0.4em] text-[#a07a3e]">
                Video
              </p>
              <h2 className="mt-4 font-red-serif text-4xl italic text-[#2b0b0b]">
                Our Film
              </h2>
            </div>
            <VideoThumbnail
              variant="classic"
              videoUrl={invitation.video.url}
              thumbnailUrl={invitation.video.thumbnailUrl}
              title={invitation.video.title}
              subtitle={invitation.video.subtitle}
              className="mt-12"
            />
            <p className="mt-4 text-center text-[10px] uppercase tracking-[0.25em] text-[#a07a3e]">
              Klik thumbnail untuk menonton di YouTube
            </p>
          </div>
        </section>
      )}

      <section className="px-6 py-20 sm:py-24">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-[10px] uppercase tracking-[0.4em] text-[#a07a3e]">
            Dress Code
          </p>
          <h2 className="mt-4 font-red-display text-3xl tracking-[0.15em] text-[#2b0b0b] sm:text-4xl">
            Palette
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-sm leading-relaxed text-[#6b5546]">
            {invitation.dresscode.note}
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-10">
            {invitation.dresscode.colors.map((color) => (
              <div key={color.name} className="flex flex-col items-center gap-3">
                <span
                  className="h-20 w-20 rounded-full border border-[#c6a15b]/40 shadow-inner"
                  style={{ backgroundColor: color.hex }}
                />
                <span className="text-[9px] uppercase tracking-[0.3em] text-[#a07a3e]">
                  {color.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#2b0b0b] px-6 py-20 sm:py-24">
        <div className="absolute inset-0 opacity-[0.05] [background-image:repeating-linear-gradient(45deg,#c6a15b_0,#c6a15b_1px,transparent_1px,transparent_20px)]" />
        <div className="relative mx-auto max-w-4xl">
          <div className="text-center">
            <p className="text-[10px] uppercase tracking-[0.4em] text-[#c6a15b]">
              Wedding Gift
            </p>
            <h2 className="mt-4 font-red-serif text-4xl italic text-[#f5efe6]">
              Hadiah & Tanda Kasih
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-sm leading-relaxed text-[#c9b8a5]">
              {invitation.gift.note}
            </p>
          </div>
          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {invitation.gift.accounts.map((account) => (
              <div
                key={account.bank}
                className="border border-[#c6a15b]/25 bg-white/[0.03] p-8 text-center"
              >
                <p className="text-[10px] uppercase tracking-[0.3em] text-[#c6a15b]">
                  {account.bank}
                </p>
                <p className="mt-4 font-red-serif text-2xl tracking-wider text-[#f5efe6]">
                  {account.number}
                </p>
                <p className="mt-1 text-sm text-[#c9b8a5]">
                  a.n. {account.holder}
                </p>
                <CopyButton
                  value={account.number}
                  className="mt-6 border border-[#c6a15b]/40 px-5 py-2 text-[10px] uppercase tracking-[0.25em] text-[#c6a15b] transition hover:bg-[#c6a15b] hover:text-[#2b0b0b]"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-20 sm:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-[10px] uppercase tracking-[0.4em] text-[#a07a3e]">
            RSVP
          </p>
          <h2 className="mt-4 font-red-display text-3xl tracking-[0.15em] text-[#2b0b0b] sm:text-4xl">
            Konfirmasi Kehadiran
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-[#6b5546]">
            {invitation.rsvp.note}
          </p>
          <p className="mt-2 text-[10px] uppercase tracking-[0.25em] text-[#a07a3e]">
            Batas konfirmasi {invitation.rsvp.deadlineLabel}
          </p>

          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            <input
              type="text"
              placeholder="Nama lengkap"
              className="border border-[#2b0b0b]/20 bg-transparent px-4 py-3 text-sm text-[#2b0b0b] outline-none transition placeholder:text-[#a08a78] focus:border-[#c6a15b]"
            />
            <select
              defaultValue="hadir"
              className="border border-[#2b0b0b]/20 bg-transparent px-4 py-3 text-sm text-[#2b0b0b] outline-none transition focus:border-[#c6a15b]"
            >
              <option value="hadir">Hadir</option>
              <option value="ragu">Masih ragu</option>
              <option value="tidak">Tidak hadir</option>
            </select>
            <textarea
              rows={4}
              placeholder="Ucapan dan doa..."
              className="resize-none border border-[#2b0b0b]/20 bg-transparent px-4 py-3 text-sm text-[#2b0b0b] outline-none transition placeholder:text-[#a08a78] focus:border-[#c6a15b] sm:col-span-2"
            />
            <button
              type="button"
              className="bg-[#2b0b0b] px-6 py-3 text-[10px] uppercase tracking-[0.35em] text-[#c6a15b] transition hover:bg-[#3a1010] sm:col-span-2"
            >
              Kirim Konfirmasi
            </button>
          </div>
        </div>
      </section>

      <footer className="relative overflow-hidden bg-[#2b0b0b] px-6 py-20 text-center text-[#f5efe6]">
        <div className="absolute inset-0 opacity-[0.06] [background-image:repeating-linear-gradient(-45deg,#c6a15b_0,#c6a15b_1px,transparent_1px,transparent_20px)]" />
        <p className="relative text-[10px] uppercase tracking-[0.4em] text-[#c6a15b]">
          With love
        </p>
        <p className="relative mx-auto mt-6 max-w-lg text-sm leading-relaxed text-[#c9b8a5]">
          {invitation.closing.message}
        </p>
        <p className="relative mt-8 font-red-serif text-5xl italic sm:text-6xl">
          {coupleNames}
        </p>
        <span className="relative mx-auto mt-6 block h-px w-16 bg-[#c6a15b]" />
        <p className="relative mt-6 text-[10px] uppercase tracking-[0.35em] text-[#c9b8a5]">
          {invitation.hero.dateLabel} · {invitation.hero.locationShort}
        </p>
      </footer>
    </div>
  );
}
