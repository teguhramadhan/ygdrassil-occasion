type TemplatePreviewProps = {
  themeId: string;
};

export default function TemplatePreview({ themeId }: TemplatePreviewProps) {
  if (themeId === "floral") {
    return (
      <div className="relative h-full w-full overflow-hidden bg-[#fbf6ef]">
        <div className="absolute -left-10 -top-10 h-40 w-40 rounded-full bg-[#f3d9dc] blur-2xl" />
        <div className="absolute -bottom-12 -right-8 h-44 w-44 rounded-full bg-[#dfe7d8] blur-2xl" />
        <div className="absolute left-5 top-5 text-2xl text-[#c98b93]">✿</div>
        <div className="absolute right-6 top-10 text-xl text-[#8a9a7b]">❀</div>
        <div className="absolute bottom-6 left-8 text-lg text-[#c98b93]">✽</div>
        <div className="relative flex h-full flex-col items-center justify-center gap-2 px-6 text-center">
          <span className="text-[8px] uppercase tracking-[0.35em] text-[#8a9a7b]">
            The Wedding Of
          </span>
          <span className="font-serif text-2xl italic leading-none text-[#7a4a50]">
            Alya
          </span>
          <span className="text-[10px] text-[#c98b93]">&</span>
          <span className="font-serif text-2xl italic leading-none text-[#7a4a50]">
            Rizky
          </span>
          <span className="mt-1 text-[8px] tracking-[0.25em] text-[#8a9a7b]">
            14 · 02 · 2027
          </span>
        </div>
      </div>
    );
  }

  if (themeId === "elegant-red") {
    return (
      <div className="relative grid h-full w-full grid-cols-[1.1fr_0.9fr] overflow-hidden bg-[#f5efe6]">
        <div className="relative flex flex-col justify-center gap-2 bg-[#2b0b0b] px-4 py-6 text-[#f5efe6]">
          <span className="h-px w-8 bg-[#c6a15b]" />
          <span className="text-[7px] uppercase tracking-[0.3em] text-[#c6a15b]">
            Save the date
          </span>
          <span className="font-serif text-xl leading-none">Diana</span>
          <span className="font-serif text-xl leading-none">& Bima</span>
          <span className="mt-1 text-[7px] tracking-[0.25em] text-[#c6a15b]">
            20 · 12 · 2027
          </span>
        </div>
        <div className="relative flex items-center justify-center bg-[#3a1010]">
          <div className="absolute inset-2 border border-[#c6a15b]/40" />
          <div className="flex h-14 w-14 items-center justify-center rounded-full border border-[#c6a15b]/60">
            <span className="font-serif text-lg text-[#c6a15b]">D</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative flex h-full w-full flex-col justify-between bg-white px-5 py-5">
      <div className="flex items-center justify-between text-[8px] uppercase tracking-[0.25em] text-neutral-500">
        <span>N + A</span>
        <span>05.09.27</span>
      </div>
      <div className="flex flex-col gap-1">
        <div className="h-px w-full bg-neutral-200" />
        <span className="text-[26px] font-semibold leading-[0.95] tracking-tight text-neutral-900">
          Nadia
        </span>
        <span className="text-[26px] font-semibold leading-[0.95] tracking-tight text-neutral-900">
          & Arif
        </span>
        <div className="mt-1 h-px w-8 bg-[#8b9585]" />
      </div>
      <div className="flex items-end justify-between">
        <span className="max-w-20 text-[7px] leading-tight text-neutral-500">
          Undangan pernikahan editorial yang lapang.
        </span>
        <span className="text-[7px] uppercase tracking-[0.25em] text-[#8b9585]">
          RSVP
        </span>
      </div>
    </div>
  );
}
