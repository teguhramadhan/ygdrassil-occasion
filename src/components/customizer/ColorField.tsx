"use client";

type ColorFieldProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
};

export default function ColorField({
  label,
  value,
  onChange,
}: ColorFieldProps) {
  return (
    <label className="flex flex-col gap-2 text-[10px] uppercase tracking-[0.2em] text-[#8a8375]">
      {label}
      <span className="flex items-center gap-2">
        <input
          type="color"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className="h-9 w-10 cursor-pointer rounded-lg border border-[#1b1a17]/15 bg-white p-1"
        />
        <input
          type="text"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className="w-full rounded-lg border border-[#1b1a17]/15 px-3 py-2 font-mono text-xs tracking-normal text-[#1b1a17] outline-none focus:border-[#1b1a17]"
        />
      </span>
    </label>
  );
}
