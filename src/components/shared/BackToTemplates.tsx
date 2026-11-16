import Link from "next/link";

export default function BackToTemplates() {
  return (
    <Link
      href="/"
      className="fixed left-4 top-4 z-50 inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/80 px-4 py-2 text-xs font-medium tracking-wide text-black/70 shadow-sm backdrop-blur transition hover:bg-white hover:text-black"
    >
      <span aria-hidden>←</span>
      Semua Template
    </Link>
  );
}
