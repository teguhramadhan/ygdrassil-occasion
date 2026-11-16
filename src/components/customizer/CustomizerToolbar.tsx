"use client";

import Link from "next/link";

type ToolbarProps = {
  slug: string;
  themeName: string;
  opened: boolean;
  saved: boolean;
  onToggleOpened: () => void;
  onReset: () => void;
  onExport: () => void;
  onLock: () => void;
};

export default function CustomizerToolbar({
  slug,
  themeName,
  opened,
  saved,
  onToggleOpened,
  onReset,
  onExport,
  onLock,
}: ToolbarProps) {
  return (
    <header className="sticky top-0 z-40 flex flex-wrap items-center justify-between gap-3 border-b border-[#1b1a17]/10 bg-[#f4f1ea]/95 px-4 py-3 backdrop-blur">
      <div className="flex items-center gap-3">
        <Link
          href="/studio"
          className="flex h-9 items-center gap-1.5 rounded-full border border-[#1b1a17]/15 bg-white px-3 text-xs font-semibold text-[#1b1a17] transition hover:bg-[#1b1a17] hover:text-[#f7f3ec]"
          title="Kembali ke Dashboard Studio"
        >
          <span>←</span>
          <span className="hidden sm:inline">Dashboard</span>
        </Link>
        <div className="leading-tight">
          <p className="text-sm font-semibold tracking-tight">
            Studio Undangan
          </p>
          <p className="text-[10px] uppercase tracking-[0.2em] text-[#8a8375]">
            /{slug} · {themeName}
          </p>
        </div>
        <span
          className={`ml-2 rounded-full px-2.5 py-1 text-[9px] uppercase tracking-[0.2em] ${
            saved
              ? "bg-[#e4efe4] text-[#3f6b3f]"
              : "bg-[#f6e8cf] text-[#8a6b2a]"
          }`}
        >
          {saved ? "Tersimpan" : "Menyimpan..."}
        </span>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <Link
          href={`/${slug}`}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-full bg-[#8a6b4a] px-4 py-2 text-[10px] uppercase tracking-[0.2em] text-white transition hover:opacity-85"
        >
          Lihat Undangan ↗
        </Link>
        <button
          type="button"
          onClick={onToggleOpened}
          className="rounded-full border border-[#1b1a17]/15 px-4 py-2 text-[10px] uppercase tracking-[0.2em] transition hover:bg-white"
        >
          {opened ? "Lihat cover" : "Lihat isi"}
        </button>
        <button
          type="button"
          onClick={onExport}
          className="rounded-full bg-[#1b1a17] px-4 py-2 text-[10px] uppercase tracking-[0.2em] text-[#f7f3ec] transition hover:opacity-85"
        >
          Ekspor JSON
        </button>
        <button
          type="button"
          onClick={onReset}
          className="rounded-full border border-[#1b1a17]/15 px-4 py-2 text-[10px] uppercase tracking-[0.2em] transition hover:bg-white"
        >
          Reset
        </button>
        <button
          type="button"
          onClick={onLock}
          className="rounded-full border border-[#1b1a17]/15 px-4 py-2 text-[10px] uppercase tracking-[0.2em] transition hover:bg-white"
        >
          Keluar
        </button>
      </div>
    </header>
  );
}
