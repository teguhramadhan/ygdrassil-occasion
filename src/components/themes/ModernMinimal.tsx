import { Inter, DM_Serif_Display } from "next/font/google";
import Countdown from "@/components/shared/Countdown";
import CopyButton from "@/components/shared/CopyButton";
import VideoThumbnail from "@/components/shared/VideoThumbnail";
import type { Invitation } from "@/lib/invitation";

const sans = Inter({
  subsets: ["latin"],
  variable: "--font-min-sans",
});

const serif = DM_Serif_Display({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-min-serif",
});

export default function ModernMinimal({
  invitation,
}: {
  invitation: Invitation;
}) {
  const { bride, groom, monogram } = invitation.couple;
  const aboutText = invitation.about?.text ?? invitation.quote.text;

  return (
    <div
      className={`${sans.variable} ${serif.variable} font-min-sans overflow-x-hidden bg-white text-[#111111]`}
    >
      <section className="relative mx-auto flex min-h-screen w-full max-w-7xl flex-col px-6 py-8 sm:px-10">
        <header className="flex items-center justify-between border-b border-[#111111]/10 pb-5 text-[10px] uppercase tracking-[0.28em] text-[#6b6b66]">
          <span className="font-medium text-[#111111]">{monogram}</span>
          <span className="hidden sm:inline">{invitation.hero.dateLabel}</span>
          <span>{invitation.hero.locationShort}</span>
        </header>

        <div className="flex flex-1 flex-col justify-center py-16">
          <p className="animate-[fadeUp_0.7s_ease-out_both] text-[10px] uppercase tracking-[0.4em] text-[#8b9585]">
            {invitation.hero.eyebrow}
          </p>

          <div className="mt-8 grid items-end gap-10 lg:grid-cols-[1.6fr_1fr]">
            <div>
              <h1 className="animate-[fadeUp_0.9s_ease-out_both] text-[19vw] font-semibold leading-[0.82] tracking-[-0.05em] text-[#111111] sm:text-[15vw] lg:text-[10rem]">
                {bride.nickname}
              </h1>
              <div className="flex items-center gap-6">
                <h1 className="animate-[fadeUp_1.05s_ease-out_both] text-[19vw] font-semibold leading-[0.82] tracking-[-0.05em] text-[#111111] sm:text-[15vw] lg:text-[10rem]">
                  {groom.nickname}
                </h1>
                <span className="animate-[fadeUp_1.15s_ease-out_both] font-min-serif text-6xl italic text-[#8b9585] sm:text-8xl">
                  &
                </span>
              </div>
            </div>

            <div className="animate-[fadeUp_1.25s_ease-out_both] max-w-xs space-y-6 border-t border-[#111111]/10 pt-6 lg:border-l lg:border-t-0 lg:pl-10 lg:pt-0">
              {invitation.hero.description && (
                <p className="text-sm leading-relaxed text-[#5f5f58]">
                  {invitation.hero.description}
                </p>
              )}
              <div className="flex items-center gap-3 text-[10px] uppercase tracking-[0.3em] text-[#8b9585]">
                <span className="h-px w-10 bg-[#8b9585]" />
                {invitation.events[0]?.date}
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-end justify-between gap-6 border-t border-[#111111]/10 pt-5">
          <div className="flex items-center gap-3 text-[10px] uppercase tracking-[0.3em] text-[#6b6b66]">
            <span className="h-2 w-2 animate-[softPulse_2.4s_ease-in-out_infinite] rounded-full bg-[#8b9585]" />
            Scroll
          </div>
          <Countdown
            target={invitation.hero.isoDate}
            className="flex gap-4 text-right sm:gap-8"
            itemClassName="flex flex-col items-end"
            numberClassName="text-lg font-semibold tracking-tight text-[#111111] sm:text-2xl"
            labelClassName="mt-1 text-[8px] uppercase tracking-[0.3em] text-[#a3a39b]"
          />
        </div>
      </section>

      <section className="border-y border-[#111111]/10">
        <div className="mx-auto grid w-full max-w-7xl gap-10 px-6 py-20 sm:px-10 lg:grid-cols-[0.5fr_1.5fr]">
          <p className="text-[10px] uppercase tracking-[0.4em] text-[#8b9585]">
            (01) — Tentang
          </p>
          <div>
            <p className="max-w-3xl text-2xl leading-snug tracking-tight text-[#111111] sm:text-3xl lg:text-4xl">
              {aboutText}
            </p>
            <div className="mt-10 grid gap-6 border-t border-[#111111]/10 pt-8 sm:grid-cols-2">
              <div>
                <p className="text-[10px] uppercase tracking-[0.3em] text-[#a3a39b]">
                  Mempelai Wanita
                </p>
                <p className="mt-2 text-lg font-medium">{bride.fullName}</p>
                <p className="mt-1 text-sm text-[#6b6b66]">{bride.parents}</p>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-[0.3em] text-[#a3a39b]">
                  Mempelai Pria
                </p>
                <p className="mt-2 text-lg font-medium">{groom.fullName}</p>
                <p className="mt-1 text-sm text-[#6b6b66]">{groom.parents}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-6 py-20 sm:px-10">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <p className="text-[10px] uppercase tracking-[0.4em] text-[#8b9585]">
            (02) — Acara
          </p>
          <p className="max-w-sm text-sm leading-relaxed text-[#6b6b66]">
            Kami menantikan kehadiran Anda di kedua rangkaian acara berikut.
          </p>
        </div>

        <div className="mt-10 grid border-t border-[#111111]/10 sm:grid-cols-2">
          {invitation.events.map((detail, index) => (
            <div
              key={detail.label}
              className={`flex flex-col gap-6 py-10 ${
                index === 0
                  ? "sm:border-r sm:border-[#111111]/10 sm:pr-10"
                  : "sm:pl-10"
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <h2 className="font-min-serif text-3xl text-[#111111]">
                  {detail.label}
                </h2>
                <span className="text-[10px] uppercase tracking-[0.3em] text-[#a3a39b]">
                  0{index + 1}
                </span>
              </div>
              <div className="grid gap-4 text-sm sm:grid-cols-2">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.25em] text-[#a3a39b]">
                    Tanggal
                  </p>
                  <p className="mt-1 text-[#111111]">{detail.date}</p>
                  <p className="text-[#6b6b66]">{detail.time}</p>
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-[0.25em] text-[#a3a39b]">
                    Lokasi
                  </p>
                  <p className="mt-1 text-[#111111]">{detail.place}</p>
                  <p className="text-[#6b6b66]">{detail.address}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-6 py-20 sm:px-10">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="text-[10px] uppercase tracking-[0.4em] text-[#8b9585]">
              (03) — Lokasi
            </p>
            <h2 className="mt-4 font-min-serif text-4xl text-[#111111] sm:text-5xl">
              Alamat Acara
            </h2>
          </div>
          <a
            href={invitation.venue.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 border-b border-[#111111]/30 pb-1 text-[10px] uppercase tracking-[0.28em] text-[#111111] transition hover:border-[#8b9585] hover:text-[#8b9585]"
          >
            Buka Google Maps
            <span aria-hidden>↗</span>
          </a>
        </div>

        <div className="mt-10 grid gap-4 lg:grid-cols-[1.4fr_1fr]">
          <div className="relative min-h-72 overflow-hidden border border-[#111111]/10 bg-[#eceae4]">
            <svg
              viewBox="0 0 500 320"
              aria-hidden
              className="h-full w-full"
              preserveAspectRatio="xMidYMid slice"
            >
              <rect width="500" height="320" fill="#eceae4" />
              <path
                d="M-40 90C90 50 180 150 300 115S470 40 540 100"
                stroke="#ffffff"
                strokeWidth="22"
                fill="none"
              />
              <path
                d="M80-30C110 90 50 180 130 260S230 340 270 380"
                stroke="#ffffff"
                strokeWidth="16"
                fill="none"
              />
              <path
                d="M370-30C350 80 420 160 370 250S330 320 350 380"
                stroke="#d6d6cf"
                strokeWidth="8"
                fill="none"
              />
              <path
                d="M-30 240C90 215 160 270 260 245S400 215 470 240"
                stroke="#d6d6cf"
                strokeWidth="8"
                fill="none"
              />
              <circle cx="250" cy="160" r="44" fill="#8b9585" opacity="0.18" />
              <circle cx="250" cy="160" r="27" fill="#ffffff" />
              <path
                d="M250 139c-8 0-14.5 6.5-14.5 14.5 0 10.9 14.5 24.5 14.5 24.5s14.5-13.6 14.5-24.5c0-8-6.5-14.5-14.5-14.5Z"
                fill="#111111"
              />
              <circle cx="250" cy="153.5" r="5" fill="#ffffff" />
            </svg>
            <div className="absolute inset-x-4 bottom-4 flex items-center justify-between border-t border-[#111111]/20 bg-white/70 px-4 py-3 backdrop-blur">
              <span className="text-[9px] uppercase tracking-[0.3em] text-[#6b6b66]">
                {invitation.hero.locationShort}
              </span>
              <span className="text-[9px] uppercase tracking-[0.3em] text-[#8b9585]">
                {invitation.venue.place}
              </span>
            </div>
          </div>

          <div className="flex flex-col justify-between border border-[#111111]/10 p-8">
            <div>
              <p className="text-[10px] uppercase tracking-[0.3em] text-[#a3a39b]">
                {invitation.venue.label}
              </p>
              <h3 className="mt-3 font-min-serif text-3xl text-[#111111]">
                {invitation.venue.place}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-[#6b6b66]">
                {invitation.venue.address}
              </p>
            </div>
            <div className="mt-8 border-t border-[#111111]/10 pt-4">
              <p className="text-[10px] uppercase tracking-[0.28em] text-[#a3a39b]">
                {invitation.events[0]?.date}
              </p>
              <p className="mt-1 text-sm text-[#111111]">
                {invitation.events[0]?.time}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-[#111111]/10 bg-[#f7f7f4]">
        <div className="mx-auto w-full max-w-7xl px-6 py-20 sm:px-10">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="text-[10px] uppercase tracking-[0.4em] text-[#8b9585]">
                (04) — Momen
              </p>
              <h2 className="mt-4 font-min-serif text-4xl text-[#111111] sm:text-5xl">
                Sebelum hari itu
              </h2>
            </div>
            <span className="text-[10px] uppercase tracking-[0.3em] text-[#a3a39b]">
              {invitation.hero.locationShort} · 2026 — 2027
            </span>
          </div>

          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {invitation.gallery.map((moment, index) => (
              <div
                key={moment.label}
                className={`group relative overflow-hidden ${
                  index % 2 === 0 ? "aspect-[3/4]" : "aspect-[3/4] sm:mt-10"
                }`}
                style={{
                  backgroundImage: `linear-gradient(160deg, ${moment.from}, ${moment.to})`,
                }}
              >
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_60%_30%,rgba(255,255,255,0.5),transparent_60%)]" />
                <div className="absolute inset-x-4 bottom-4 flex items-center justify-between border-t border-white/50 pt-3">
                  <span className="text-[9px] uppercase tracking-[0.28em] text-white/90">
                    {moment.label}
                  </span>
                  <span className="text-[9px] text-white/80">
                    0{index + 1}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {invitation.video && (
        <section className="mx-auto w-full max-w-7xl px-6 py-20 sm:px-10">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="text-[10px] uppercase tracking-[0.4em] text-[#8b9585]">
                (05) — Video
              </p>
              <h2 className="mt-4 font-min-serif text-4xl text-[#111111] sm:text-5xl">
                Dalam gerak
              </h2>
            </div>
            <p className="max-w-xs text-sm leading-relaxed text-[#6b6b66]">
              Sepotong film pendek tentang kami, sebelum hari besar itu tiba.
            </p>
          </div>
          <VideoThumbnail
            variant="minimal"
            videoUrl={invitation.video.url}
            thumbnailUrl={invitation.video.thumbnailUrl}
            title={invitation.video.title}
            subtitle={invitation.video.subtitle}
            className="mt-10"
          />
        </section>
      )}

      <section className="border-y border-[#111111]/10 bg-[#f7f7f4]">
        <div className="mx-auto w-full max-w-7xl px-6 py-20 sm:px-10">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="text-[10px] uppercase tracking-[0.4em] text-[#8b9585]">
                (06) — Dresscode
              </p>
              <h2 className="mt-4 font-min-serif text-4xl text-[#111111] sm:text-5xl">
                Palet warna
              </h2>
            </div>
            <p className="max-w-xs text-sm leading-relaxed text-[#6b6b66]">
              {invitation.dresscode.note}
            </p>
          </div>
          <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {invitation.dresscode.colors.map((color) => (
              <div key={color.name} className="flex flex-col gap-3">
                <span
                  className="aspect-square w-full border border-[#111111]/10"
                  style={{ backgroundColor: color.hex }}
                />
                <span className="text-[10px] uppercase tracking-[0.28em] text-[#6b6b66]">
                  {color.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-6 py-20 sm:px-10">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="text-[10px] uppercase tracking-[0.4em] text-[#8b9585]">
              (07) — Hadiah
            </p>
            <h2 className="mt-4 font-min-serif text-4xl text-[#111111] sm:text-5xl">
              Tanda kasih
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-[#6b6b66]">
            {invitation.gift.note}
          </p>
        </div>
        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          {invitation.gift.accounts.map((account) => (
            <div
              key={account.bank}
              className="flex flex-col justify-between gap-6 border border-[#111111]/10 p-8"
            >
              <div>
                <p className="text-[10px] uppercase tracking-[0.28em] text-[#a3a39b]">
                  {account.bank}
                </p>
                <p className="mt-3 text-2xl font-medium tracking-wide text-[#111111]">
                  {account.number}
                </p>
                <p className="mt-1 text-sm text-[#6b6b66]">
                  a.n. {account.holder}
                </p>
              </div>
              <CopyButton
                value={account.number}
                className="self-start border-b border-[#111111]/30 pb-1 text-[10px] uppercase tracking-[0.28em] text-[#111111] transition hover:border-[#8b9585] hover:text-[#8b9585]"
              />
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-6 py-20 sm:px-10">
        <div className="grid gap-10 lg:grid-cols-[1fr_1fr]">
          <div>
            <p className="text-[10px] uppercase tracking-[0.4em] text-[#8b9585]">
              (08) — RSVP
            </p>
            <h2 className="mt-4 font-min-serif text-4xl leading-tight text-[#111111] sm:text-5xl">
              Kami ingin
              <br />
              <span className="italic text-[#8b9585]">bertemu Anda.</span>
            </h2>
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-[#6b6b66]">
              {invitation.rsvp.note}
            </p>
            <p className="mt-2 text-[10px] uppercase tracking-[0.28em] text-[#a3a39b]">
              Konfirmasi sebelum {invitation.rsvp.deadlineLabel}
            </p>
          </div>

          <div className="flex flex-col gap-5 border-t border-[#111111]/10 pt-8 lg:border-l lg:border-t-0 lg:pl-10 lg:pt-0">
            <label className="flex flex-col gap-2">
              <span className="text-[10px] uppercase tracking-[0.28em] text-[#a3a39b]">
                Nama
              </span>
              <input
                type="text"
                placeholder="Nama lengkap Anda"
                className="border-b border-[#111111]/20 bg-transparent py-3 text-sm text-[#111111] outline-none transition placeholder:text-[#b3b3ab] focus:border-[#8b9585]"
              />
            </label>
            <label className="flex flex-col gap-2">
              <span className="text-[10px] uppercase tracking-[0.28em] text-[#a3a39b]">
                Kehadiran
              </span>
              <select
                defaultValue="hadir"
                className="border-b border-[#111111]/20 bg-transparent py-3 text-sm text-[#111111] outline-none transition focus:border-[#8b9585]"
              >
                <option value="hadir">Hadir</option>
                <option value="ragu">Masih ragu</option>
                <option value="tidak">Tidak hadir</option>
              </select>
            </label>
            <label className="flex flex-col gap-2">
              <span className="text-[10px] uppercase tracking-[0.28em] text-[#a3a39b]">
                Pesan
              </span>
              <textarea
                rows={3}
                placeholder="Tulis sesuatu untuk kami..."
                className="resize-none border-b border-[#111111]/20 bg-transparent py-3 text-sm text-[#111111] outline-none transition placeholder:text-[#b3b3ab] focus:border-[#8b9585]"
              />
            </label>
            <button
              type="button"
              className="mt-2 self-start rounded-full bg-[#111111] px-7 py-3 text-[10px] uppercase tracking-[0.3em] text-white transition hover:bg-[#8b9585]"
            >
              Kirim
            </button>
          </div>
        </div>
      </section>

      <footer className="mx-auto w-full max-w-7xl border-t border-[#111111]/10 px-6 py-10 sm:px-10">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <p className="text-[10px] uppercase tracking-[0.3em] text-[#a3a39b]">
              Dengan cinta
            </p>
            <p className="mt-2 font-min-serif text-4xl text-[#111111] sm:text-5xl">
              {bride.nickname}{" "}
              <span className="italic text-[#8b9585]">&</span>{" "}
              {groom.nickname}
            </p>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-[#6b6b66]">
              {invitation.closing.message}
            </p>
          </div>
          <div className="text-right text-[10px] uppercase tracking-[0.28em] text-[#a3a39b]">
            <p>{invitation.hero.dateLabel}</p>
            <p className="mt-1">
              {invitation.venue.place} · {invitation.hero.locationShort}
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
