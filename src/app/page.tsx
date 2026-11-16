import Link from "next/link";
import { Fraunces } from "next/font/google";
import TemplatePreview from "@/components/TemplatePreview";
import { getAllInvitations } from "@/lib/invitations";
import { getThemeMeta } from "@/lib/themes";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  axes: ["SOFT", "WONK"],
});

export default function Home() {
  const invitations = getAllInvitations();

  return (
    <div
      className={`${fraunces.variable} min-h-screen bg-[#f7f3ec] font-sans text-[#1b1a17]`}
    >
      <header className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-6">
        <div className="flex items-center gap-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#1b1a17] text-sm font-semibold text-[#f7f3ec]">
            Y
          </span>
          <div className="leading-tight">
            <p className="text-sm font-semibold tracking-tight">
              Ygdrassil Occasion
            </p>
            <p className="text-[11px] uppercase tracking-[0.22em] text-[#8a8375]">
              SaaS Digital Invitation Builder
            </p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Link
            href="/login"
            className="rounded-full border border-[#1b1a17]/15 px-5 py-2 text-xs font-semibold uppercase tracking-wider text-[#1b1a17] transition hover:bg-[#1b1a17] hover:text-[#f7f3ec]"
          >
            Masuk
          </Link>
          <Link
            href="/login"
            className="rounded-full bg-[#1b1a17] px-5 py-2 text-xs font-semibold uppercase tracking-wider text-[#f7f3ec] transition hover:opacity-85"
          >
            Mulai Gratis
          </Link>
        </div>
      </header>

      <main className="mx-auto w-full max-w-6xl px-6 pb-24">
        {/* Hero Section */}
        <section className="grid items-center gap-12 border-b border-[#1b1a17]/10 pb-16 pt-14 lg:grid-cols-2">
          <div>
            <p className="mb-5 inline-flex items-center gap-2 rounded-full bg-white px-4 py-1.5 text-[11px] font-medium uppercase tracking-[0.22em] text-[#8a8375] shadow-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-[#c98b93]" />
              Platform CMS Undangan Digital
            </p>
            <h1
              className="text-5xl leading-[1.05] tracking-tight sm:text-6xl"
              style={{ fontFamily: "var(--font-fraunces)" }}
            >
              Buat undangan impian,
              <span className="italic text-[#8a6b4a]"> susun sesuka hati.</span>
            </h1>
            <p className="mt-6 max-w-lg text-base leading-relaxed text-[#5f5a50]">
              Platform SaaS undangan digital modern dengan fitur <strong>Drag & Drop Section</strong>. Edit konten, sesuaikan warna, atur urutan section, dan publikasikan undangan spesial Anda dalam hitungan menit.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                href="/login"
                className="rounded-full bg-[#1b1a17] px-8 py-4 text-xs font-semibold uppercase tracking-[0.2em] text-[#f7f3ec] transition hover:opacity-85 shadow-lg"
              >
                Buat Undangan Sekarang →
              </Link>
              <Link
                href="#templates"
                className="rounded-full border border-[#1b1a17]/20 px-8 py-4 text-xs font-semibold uppercase tracking-[0.2em] text-[#1b1a17] transition hover:bg-white"
              >
                Lihat Tema
              </Link>
            </div>
          </div>
          <div className="relative rounded-3xl border border-[#1b1a17]/10 bg-white p-6 shadow-2xl">
            <div className="absolute -top-4 -right-4 rounded-full bg-[#c98b93] px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest text-white shadow">
              Drag & Drop Live
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between rounded-xl bg-[#f7f3ec] p-4 text-xs font-medium text-[#1b1a17]">
                <span>✨ 01. Cover / Envelope</span>
                <span className="text-[#8a8375]">Locked First</span>
              </div>
              <div className="flex items-center justify-between rounded-xl border border-[#1b1a17]/10 bg-white p-4 text-xs font-medium text-[#1b1a17] shadow-sm">
                <span>≡ 02. Header & Mempelai</span>
                <span className="text-xs text-[#8a8375]">Draggable</span>
              </div>
              <div className="flex items-center justify-between rounded-xl border border-[#1b1a17]/10 bg-white p-4 text-xs font-medium text-[#1b1a17] shadow-sm">
                <span>≡ 03. Acara & Lokasi (Maps)</span>
                <span className="text-xs text-[#8a8375]">Draggable</span>
              </div>
              <div className="flex items-center justify-between rounded-xl border border-[#1b1a17]/10 bg-white p-4 text-xs font-medium text-[#1b1a17] shadow-sm">
                <span>≡ 04. Galeri Foto & Video</span>
                <span className="text-xs text-[#8a8375]">Draggable</span>
              </div>
              <div className="flex items-center justify-between rounded-xl bg-[#f7f3ec] p-4 text-xs font-medium text-[#1b1a17]">
                <span>💌 05. RSVP & Penutup</span>
                <span className="text-[#8a8375]">Locked Last</span>
              </div>
            </div>
          </div>
        </section>

        {/* Templates Showcase */}
        <section id="templates" className="pt-20">
          <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="text-[10px] uppercase tracking-[0.3em] text-[#8a8375]">
                Pilihan Tema Eksklusif
              </p>
              <h2
                className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl"
                style={{ fontFamily: "var(--font-fraunces)" }}
              >
                Template Siap Kustomisasi
              </h2>
            </div>
            <Link
              href="/login"
              className="text-xs font-semibold uppercase tracking-wider text-[#1b1a17] underline underline-offset-4 hover:opacity-75"
            >
              Mulai Kustomisasi Semua Tema →
            </Link>
          </div>

          <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {invitations.map((invitation) => {
              const theme = getThemeMeta(invitation.themeId);

              if (!theme) return null;

              return (
                <div
                  key={invitation.slug}
                  className="group flex flex-col overflow-hidden rounded-3xl border border-[#1b1a17]/10 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
                >
                  <div className="relative aspect-4/3 overflow-hidden border-b border-[#1b1a17]/10">
                    <TemplatePreview themeId={theme.id} />
                  </div>
                  <div className="flex flex-1 flex-col gap-4 p-6">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h3 className="text-lg font-semibold tracking-tight">
                          {theme.name}
                        </h3>
                        <p className="text-xs text-[#8a8375]">
                          {invitation.couple.bride.nickname} &{" "}
                          {invitation.couple.groom.nickname} · {theme.mood}
                        </p>
                      </div>
                      <span className="flex gap-1 pt-1">
                        {theme.palette.map((color) => (
                          <span
                            key={color}
                            className="h-4 w-4 rounded-full border border-black/10"
                            style={{ backgroundColor: color }}
                          />
                        ))}
                      </span>
                    </div>
                    <p className="text-sm leading-relaxed text-[#5f5a50]">
                      {theme.description}
                    </p>
                    <div className="mt-auto pt-2 flex items-center justify-between">
                      <Link
                        href={`/${invitation.slug}`}
                        className="text-xs font-semibold text-[#1b1a17] underline underline-offset-4 hover:opacity-75"
                      >
                        Preview Publik ↗
                      </Link>
                      <Link
                        href="/login"
                        className="rounded-full bg-[#1b1a17] px-4 py-2 text-[11px] font-semibold text-[#f7f3ec] transition hover:opacity-85"
                      >
                        Edit di Studio
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* CTA Banner */}
        <section className="mt-20 rounded-3xl bg-[#1b1a17] px-8 py-12 text-[#f7f3ec] sm:px-16 text-center">
          <h2
            className="text-3xl tracking-tight sm:text-4xl"
            style={{ fontFamily: "var(--font-fraunces)" }}
          >
            Siap membuat undangan digital Anda sendiri?
          </h2>
          <p className="mt-3 mx-auto max-w-xl text-sm text-[#cfc8ba] leading-relaxed">
            Bergabunglah dengan Ygdrassil Occasion Studio. Susun section, unggah foto, dan bagikan momen spesial ke tamu undangan dengan mudah.
          </p>
          <div className="mt-8">
            <Link
              href="/login"
              className="inline-block rounded-full bg-[#f7f3ec] px-8 py-4 text-xs font-semibold uppercase tracking-[0.2em] text-[#1b1a17] transition hover:bg-white shadow-lg"
            >
              Masuk & Buat Undangan Sekarang
            </Link>
          </div>
        </section>
      </main>

      <footer className="border-t border-[#1b1a17]/10 bg-white/50">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-4 px-6 py-8 text-xs text-[#8a8375] sm:flex-row">
          <span>© 2026 Ygdrassil Occasion. All rights reserved.</span>
          <div className="flex items-center gap-6">
            <Link href="/" className="hover:text-[#1b1a17]">Beranda</Link>
            <Link href="/login" className="hover:text-[#1b1a17]">Studio Login</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
