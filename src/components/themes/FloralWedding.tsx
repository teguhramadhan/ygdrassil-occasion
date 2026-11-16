import { Cormorant_Garamond, Great_Vibes, Jost } from "next/font/google";
import Countdown from "@/components/shared/Countdown";
import CopyButton from "@/components/shared/CopyButton";
import VideoThumbnail from "@/components/shared/VideoThumbnail";
import type { Invitation } from "@/lib/invitation";

const serif = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-floral-serif",
});

const script = Great_Vibes({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-floral-script",
});

const sans = Jost({
  subsets: ["latin"],
  variable: "--font-floral-sans",
});

function Sprig({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 120" fill="none" aria-hidden className={className}>
      <path
        d="M60 112c0-28 6-52 22-72"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
      <path
        d="M60 94c-10-2-17-9-20-20 11-1 18 5 20 20Z"
        stroke="currentColor"
        strokeWidth="1.2"
      />
      <path
        d="M64 78c10-4 15-11 16-22-11 0-17 7-16 22Z"
        stroke="currentColor"
        strokeWidth="1.2"
      />
      <path
        d="M70 58c-9-3-14-10-15-20 10 0 16 7 15 20Z"
        stroke="currentColor"
        strokeWidth="1.2"
      />
      <circle cx="82" cy="34" r="5.5" stroke="currentColor" strokeWidth="1.2" />
      <circle cx="82" cy="34" r="1.6" fill="currentColor" />
    </svg>
  );
}

export default function FloralWedding({
  invitation,
}: {
  invitation: Invitation;
}) {
  const { bride, groom } = invitation.couple;
  const coupleNames = `${bride.nickname} & ${groom.nickname}`;

  return (
    <div
      className={`${serif.variable} ${script.variable} ${sans.variable} font-floral-sans overflow-x-hidden bg-[#fbf6ef] text-[#5c4044]`}
    >
      <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 py-24 text-center">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -left-24 -top-24 h-96 w-96 rounded-full bg-[#f3d9dc]/70 blur-3xl" />
          <div className="absolute -bottom-32 -right-20 h-[28rem] w-[28rem] rounded-full bg-[#dfe7d8]/70 blur-3xl" />
        </div>

        <Sprig className="absolute left-6 top-16 w-24 animate-[floaty_9s_ease-in-out_infinite] text-[#a9b79b] sm:left-16 sm:w-32" />
        <Sprig className="absolute right-4 top-28 w-20 rotate-[25deg] animate-[floaty_11s_ease-in-out_infinite] text-[#c98b93] sm:right-16 sm:w-28" />
        <Sprig className="absolute bottom-20 left-10 w-20 -scale-x-100 rotate-12 animate-[floaty_10s_ease-in-out_infinite] text-[#c98b93] sm:left-24" />
        <Sprig className="absolute bottom-28 right-10 w-24 -rotate-12 animate-[floaty_12s_ease-in-out_infinite] text-[#a9b79b] sm:right-24 sm:w-32" />

        <div className="relative flex flex-col items-center">
          <p className="animate-[fadeUp_0.9s_ease-out_both] text-[10px] uppercase tracking-[0.5em] text-[#8a9a7b]">
            {invitation.hero.eyebrow}
          </p>
          <div className="mt-8 flex flex-col items-center">
            <h1 className="animate-[fadeUp_1s_ease-out_both] font-floral-script text-6xl leading-[0.9] text-[#7a4a50] sm:text-8xl">
              {bride.nickname}
            </h1>
            <span className="my-2 animate-[fadeUp_1.1s_ease-out_both] font-floral-serif text-2xl italic text-[#c98b93]">
              &
            </span>
            <h1 className="animate-[fadeUp_1.2s_ease-out_both] font-floral-script text-6xl leading-[0.9] text-[#7a4a50] sm:text-8xl">
              {groom.nickname}
            </h1>
          </div>
          <div className="mt-10 flex animate-[fadeUp_1.4s_ease-out_both] items-center gap-4 text-[#8a9a7b]">
            <span className="h-px w-10 bg-[#8a9a7b]/50" />
            <span className="text-xs uppercase tracking-[0.4em]">
              {invitation.hero.dateLabel}
            </span>
            <span className="h-px w-10 bg-[#8a9a7b]/50" />
          </div>
        </div>

        <div className="absolute bottom-8 flex animate-[softPulse_3s_ease-in-out_infinite] flex-col items-center gap-2 text-[#8a9a7b]">
          <span className="text-[9px] uppercase tracking-[0.35em]">Gulir</span>
          <span className="h-10 w-px bg-[#8a9a7b]/50" />
        </div>
      </section>

      <section className="relative bg-white/60 px-6 py-20">
        <div className="mx-auto max-w-xl text-center">
          {invitation.quote.eyebrow && (
            <p className="text-[10px] uppercase tracking-[0.4em] text-[#8a9a7b]">
              {invitation.quote.eyebrow}
            </p>
          )}
          <p className="mt-6 font-floral-serif text-2xl italic leading-relaxed text-[#7a4a50] sm:text-3xl">
            “{invitation.quote.text}”
          </p>
          <p className="mt-5 text-[11px] uppercase tracking-[0.3em] text-[#8a9a7b]">
            {invitation.quote.source}
          </p>
        </div>
      </section>

      <section className="px-6 py-20">
        <div className="mx-auto grid max-w-4xl gap-6 sm:grid-cols-2">
          {[bride, groom].map((person) => (
            <div
              key={person.initial}
              className="flex flex-col items-center rounded-[2rem] border border-[#c98b93]/25 bg-white/70 px-8 py-12 text-center shadow-[0_18px_50px_-30px_rgba(122,74,80,0.6)]"
            >
              <span className="flex h-20 w-20 items-center justify-center rounded-full border border-[#c98b93]/40 font-floral-serif text-3xl italic text-[#7a4a50]">
                {person.initial}
              </span>
              <h3 className="mt-6 font-floral-script text-4xl text-[#7a4a50]">
                {person.fullName}
              </h3>
              <p className="mt-4 text-[10px] uppercase tracking-[0.3em] text-[#8a9a7b]">
                {person.role}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-[#7a6a60]">
                {person.parents}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#f3d9dc]/50 px-6 py-20">
        <Sprig className="absolute -left-6 top-1/2 w-28 -translate-y-1/2 text-[#c98b93]/50" />
        <Sprig className="absolute -right-6 top-1/2 w-28 -translate-y-1/2 -scale-x-100 text-[#c98b93]/50" />
        <div className="relative mx-auto max-w-3xl text-center">
          <p className="text-[10px] uppercase tracking-[0.4em] text-[#8a9a7b]">
            Menghitung hari
          </p>
          <h2 className="mt-3 font-floral-script text-5xl text-[#7a4a50]">
            Menuju Bahagia
          </h2>
          <Countdown
            target={invitation.hero.isoDate}
            className="mt-10 flex items-start justify-center gap-4 sm:gap-8"
            itemClassName="flex min-w-16 flex-col items-center"
            numberClassName="font-floral-serif text-4xl text-[#7a4a50] sm:text-5xl"
            labelClassName="mt-2 text-[9px] uppercase tracking-[0.3em] text-[#8a9a7b]"
          />
        </div>
      </section>

      <section className="px-6 py-20">
        <div className="mx-auto max-w-4xl">
          <div className="text-center">
            <p className="text-[10px] uppercase tracking-[0.4em] text-[#8a9a7b]">
              Save the date
            </p>
            <h2 className="mt-3 font-floral-script text-5xl text-[#7a4a50]">
              Rangkaian Acara
            </h2>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2">
            {invitation.events.map((event) => (
              <div
                key={event.label}
                className="relative overflow-hidden rounded-[2rem] border border-[#c98b93]/25 bg-white/70 p-8 text-center"
              >
                <span className="absolute left-1/2 top-0 h-px w-16 -translate-x-1/2 bg-[#c98b93]/50" />
                <p className="text-[10px] uppercase tracking-[0.35em] text-[#8a9a7b]">
                  {event.label}
                </p>
                <p className="mt-4 font-floral-serif text-2xl text-[#5c4044]">
                  {event.date}
                </p>
                <p className="mt-1 text-sm text-[#7a6a60]">{event.time}</p>
                <div className="mx-auto my-6 h-px w-10 bg-[#c98b93]/40" />
                <p className="font-floral-serif text-xl font-medium text-[#7a4a50]">
                  {event.place}
                </p>
                <p className="mt-1 text-sm leading-relaxed text-[#7a6a60]">
                  {event.address}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#f3d9dc]/30 px-6 py-20">
        <div className="mx-auto max-w-4xl">
          <div className="text-center">
            <p className="text-[10px] uppercase tracking-[0.4em] text-[#8a9a7b]">
              Location
            </p>
            <h2 className="mt-3 font-floral-script text-5xl text-[#7a4a50]">
              Alamat Acara
            </h2>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-[1.15fr_1fr]">
            <div className="relative min-h-64 overflow-hidden rounded-[2rem] border border-[#c98b93]/25">
              <svg
                viewBox="0 0 400 300"
                aria-hidden
                className="h-full w-full"
                preserveAspectRatio="xMidYMid slice"
              >
                <rect width="400" height="300" fill="#e7ede0" />
                <path
                  d="M-30 80C70 40 150 130 260 100S380 30 440 90"
                  stroke="#fbf6ef"
                  strokeWidth="18"
                  fill="none"
                />
                <path
                  d="M60-20C90 80 40 160 110 240S200 330 240 350"
                  stroke="#fbf6ef"
                  strokeWidth="13"
                  fill="none"
                />
                <path
                  d="M300-20C280 70 340 140 300 220S260 300 280 350"
                  stroke="#d4ddca"
                  strokeWidth="7"
                  fill="none"
                />
                <path
                  d="M-20 210C80 190 140 240 230 220S360 190 420 210"
                  stroke="#d4ddca"
                  strokeWidth="7"
                  fill="none"
                />
                <circle cx="205" cy="150" r="42" fill="#c98b93" opacity="0.18" />
                <circle cx="205" cy="150" r="26" fill="#fbf6ef" opacity="0.95" />
                <path
                  d="M205 130c-7.7 0-14 6.3-14 14 0 10.5 14 24 14 24s14-13.5 14-24c0-7.7-6.3-14-14-14Z"
                  fill="#7a4a50"
                />
                <circle cx="205" cy="144" r="5" fill="#fbf6ef" />
              </svg>
              <div className="absolute inset-x-4 bottom-4 rounded-2xl bg-white/80 px-4 py-3 backdrop-blur">
                <p className="text-[9px] uppercase tracking-[0.3em] text-[#8a9a7b]">
                  {invitation.hero.locationShort}
                </p>
                <p className="font-floral-serif text-lg italic text-[#7a4a50]">
                  {invitation.venue.place}
                </p>
              </div>
            </div>
            <div className="flex flex-col justify-center rounded-[2rem] border border-[#c98b93]/25 bg-white/70 p-8">
              <p className="text-[10px] uppercase tracking-[0.35em] text-[#8a9a7b]">
                {invitation.venue.label}
              </p>
              <h3 className="mt-3 font-floral-serif text-2xl text-[#7a4a50]">
                {invitation.venue.place}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-[#7a6a60]">
                {invitation.venue.address}
              </p>
              <div className="my-6 h-px w-10 bg-[#c98b93]/40" />
              <a
                href={invitation.venue.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 self-start rounded-full border border-[#c98b93]/40 px-5 py-2.5 text-[10px] uppercase tracking-[0.25em] text-[#7a4a50] transition hover:bg-[#7a4a50] hover:text-[#fbf6ef]"
              >
                Buka Google Maps
                <span aria-hidden>↗</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white/60 px-6 py-20">
        <div className="mx-auto max-w-5xl">
          <div className="text-center">
            <p className="text-[10px] uppercase tracking-[0.4em] text-[#8a9a7b]">
              Our moments
            </p>
            <h2 className="mt-3 font-floral-script text-5xl text-[#7a4a50]">
              Cerita Kami
            </h2>
          </div>
          <div className="mt-12 grid gap-4 sm:grid-cols-3">
            {invitation.gallery.map((item, index) => (
              <div
                key={item.label}
                className={`group relative aspect-[3/4] overflow-hidden rounded-[1.75rem] ${
                  index === 1 ? "sm:mt-10" : ""
                }`}
                style={{
                  backgroundImage: `linear-gradient(135deg, ${item.from}, ${item.to})`,
                }}
              >
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.55),transparent_60%)]" />
                <Sprig className="absolute right-3 top-3 w-14 text-white/60" />
                <div className="absolute inset-x-4 bottom-4 rounded-2xl bg-white/70 px-4 py-3 backdrop-blur">
                  <p className="font-floral-serif text-lg italic text-[#7a4a50]">
                    {item.label}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {invitation.video && (
        <section className="px-6 py-20">
          <div className="mx-auto max-w-4xl">
            <div className="text-center">
              <p className="text-[10px] uppercase tracking-[0.4em] text-[#8a9a7b]">
                Video
              </p>
              <h2 className="mt-3 font-floral-script text-5xl text-[#7a4a50]">
                Prewedding Film
              </h2>
            </div>
            <VideoThumbnail
              variant="floral"
              videoUrl={invitation.video.url}
              thumbnailUrl={invitation.video.thumbnailUrl}
              title={invitation.video.title}
              subtitle={invitation.video.subtitle}
              className="mt-12"
            />
            <p className="mt-4 text-center text-xs text-[#8a9a7b]">
              Klik thumbnail untuk menonton di YouTube.
            </p>
          </div>
        </section>
      )}

      <section className="bg-white/60 px-6 py-20">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-[10px] uppercase tracking-[0.4em] text-[#8a9a7b]">
            Dress Code
          </p>
          <h2 className="mt-3 font-floral-script text-5xl text-[#7a4a50]">
            Nuansa Warna
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-sm leading-relaxed text-[#7a6a60]">
            {invitation.dresscode.note}
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-8">
            {invitation.dresscode.colors.map((color) => (
              <div key={color.name} className="flex flex-col items-center gap-3">
                <span
                  className="h-16 w-16 rounded-full border border-black/5 shadow-inner"
                  style={{ backgroundColor: color.hex }}
                />
                <span className="text-[9px] uppercase tracking-[0.3em] text-[#8a9a7b]">
                  {color.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-20">
        <div className="mx-auto max-w-4xl">
          <div className="text-center">
            <p className="text-[10px] uppercase tracking-[0.4em] text-[#8a9a7b]">
              Wedding Gift
            </p>
            <h2 className="mt-3 font-floral-script text-5xl text-[#7a4a50]">
              Hadiah & Tanda Kasih
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-sm leading-relaxed text-[#7a6a60]">
              {invitation.gift.note}
            </p>
          </div>
          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {invitation.gift.accounts.map((account) => (
              <div
                key={account.bank}
                className="rounded-[2rem] border border-[#c98b93]/25 bg-white/70 p-8 text-center"
              >
                <p className="text-[10px] uppercase tracking-[0.3em] text-[#8a9a7b]">
                  {account.bank}
                </p>
                <p className="mt-3 font-floral-serif text-2xl tracking-wider text-[#7a4a50]">
                  {account.number}
                </p>
                <p className="mt-1 text-sm text-[#7a6a60]">
                  a.n. {account.holder}
                </p>
                <CopyButton
                  value={account.number}
                  className="mt-5 rounded-full border border-[#c98b93]/40 px-5 py-2 text-[10px] uppercase tracking-[0.25em] text-[#7a4a50] transition hover:bg-[#7a4a50] hover:text-[#fbf6ef]"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-20">
        <div className="mx-auto max-w-xl rounded-[2.5rem] border border-[#c98b93]/30 bg-white/80 px-8 py-12 shadow-[0_30px_80px_-50px_rgba(122,74,80,0.8)] sm:px-12">
          <div className="text-center">
            <p className="text-[10px] uppercase tracking-[0.4em] text-[#8a9a7b]">
              RSVP
            </p>
            <h2 className="mt-3 font-floral-script text-5xl text-[#7a4a50]">
              Konfirmasi Hadir
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-[#7a6a60]">
              {invitation.rsvp.note}
            </p>
            <p className="mt-2 text-[10px] uppercase tracking-[0.25em] text-[#8a9a7b]">
              Konfirmasi sebelum {invitation.rsvp.deadlineLabel}
            </p>
          </div>
          <div className="mt-8 flex flex-col gap-4">
            <label className="flex flex-col gap-2 text-[10px] uppercase tracking-[0.25em] text-[#8a9a7b]">
              Nama
              <input
                type="text"
                placeholder="Nama lengkap"
                className="rounded-xl border border-[#c98b93]/30 bg-white px-4 py-3 font-floral-sans text-sm tracking-normal text-[#5c4044] outline-none transition placeholder:text-[#b9a8a4] focus:border-[#c98b93]"
              />
            </label>
            <label className="flex flex-col gap-2 text-[10px] uppercase tracking-[0.25em] text-[#8a9a7b]">
              Kehadiran
              <select
                className="rounded-xl border border-[#c98b93]/30 bg-white px-4 py-3 font-floral-sans text-sm tracking-normal text-[#5c4044] outline-none transition focus:border-[#c98b93]"
                defaultValue="hadir"
              >
                <option value="hadir">Hadir</option>
                <option value="ragu">Masih ragu</option>
                <option value="tidak">Tidak hadir</option>
              </select>
            </label>
            <label className="flex flex-col gap-2 text-[10px] uppercase tracking-[0.25em] text-[#8a9a7b]">
              Ucapan
              <textarea
                rows={4}
                placeholder="Tulis doa dan ucapan..."
                className="resize-none rounded-xl border border-[#c98b93]/30 bg-white px-4 py-3 font-floral-sans text-sm tracking-normal text-[#5c4044] outline-none transition placeholder:text-[#b9a8a4] focus:border-[#c98b93]"
              />
            </label>
            <button
              type="button"
              className="mt-2 rounded-full bg-[#7a4a50] px-6 py-3 text-xs font-medium uppercase tracking-[0.3em] text-[#fbf6ef] transition hover:bg-[#63393e]"
            >
              Kirim Ucapan
            </button>
          </div>
        </div>
      </section>

      <footer className="relative overflow-hidden bg-[#7a4a50] px-6 py-20 text-center text-[#fbf6ef]">
        <div className="absolute -left-16 -top-16 h-64 w-64 rounded-full bg-white/5" />
        <div className="absolute -bottom-20 -right-10 h-72 w-72 rounded-full bg-white/5" />
        <p className="relative text-[10px] uppercase tracking-[0.4em] text-[#f3d9dc]">
          Terima kasih
        </p>
        <p className="relative mx-auto mt-6 max-w-lg text-sm leading-relaxed text-[#f3d9dc]">
          {invitation.closing.message}
        </p>
        <p className="relative mt-8 font-floral-script text-6xl">
          {coupleNames}
        </p>
        <p className="relative mt-4 text-[10px] uppercase tracking-[0.3em] text-[#f3d9dc]/70">
          {invitation.hero.dateLabel}
        </p>
      </footer>
    </div>
  );
}
