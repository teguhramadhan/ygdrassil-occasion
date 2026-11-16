"use client";

import { useState } from "react";

type CopyButtonProps = {
  value: string;
  className?: string;
  label?: string;
  copiedLabel?: string;
};

export default function CopyButton({
  value,
  className = "",
  label = "Salin",
  copiedLabel = "Tersalin",
}: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }

  return (
    <button type="button" onClick={copy} className={className}>
      {copied ? copiedLabel : label}
    </button>
  );
}
