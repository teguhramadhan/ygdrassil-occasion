"use client";

import { useRef, useState } from "react";
import {
  deleteImage,
  listImages,
  putImage,
} from "@/lib/customizer/image-store";

const ACCEPTED_TYPES = ["image/jpeg", "image/png", "image/webp"];
const MAX_BYTES = 5 * 1024 * 1024;
const MAX_IMAGES = 20;
const MAX_DIMENSION = 1600;

type ImageUploadProps = {
  slug: string;
  value?: string;
  previewUrl?: string;
  onChange: (imageId: string | undefined) => void;
  onUploaded: (id: string, url: string) => void;
  onRemoved: (id: string) => void;
  onError: (message: string) => void;
};

async function compressImage(
  file: File,
): Promise<{ blob: Blob; width: number; height: number }> {
  const bitmap = await createImageBitmap(file);
  const scale = Math.min(
    1,
    MAX_DIMENSION / Math.max(bitmap.width, bitmap.height),
  );
  const width = Math.round(bitmap.width * scale);
  const height = Math.round(bitmap.height * scale);

  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;

  const context = canvas.getContext("2d");
  if (!context) {
    bitmap.close();
    throw new Error("Canvas tidak tersedia");
  }

  context.drawImage(bitmap, 0, 0, width, height);
  bitmap.close();

  const blob = await new Promise<Blob | null>((resolve) => {
    canvas.toBlob(resolve, "image/webp", 0.82);
  });

  if (!blob) {
    throw new Error("Gagal mengompres gambar");
  }

  return { blob, width, height };
}

export default function ImageUpload({
  slug,
  value,
  previewUrl,
  onChange,
  onUploaded,
  onRemoved,
  onError,
}: ImageUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);

  async function handleFile(file: File | undefined) {
    if (!file) return;

    if (!ACCEPTED_TYPES.includes(file.type)) {
      onError("Format gambar harus JPG, PNG, atau WebP.");
      return;
    }

    if (file.size > MAX_BYTES) {
      onError("Ukuran gambar maksimal 5MB.");
      return;
    }

    setBusy(true);

    try {
      if (!value) {
        const existing = await listImages(slug);
        if (existing.length >= MAX_IMAGES) {
          onError(`Maksimal ${MAX_IMAGES} gambar per undangan.`);
          return;
        }
      }

      const { blob, width, height } = await compressImage(file);
      const id =
        typeof crypto !== "undefined" && "randomUUID" in crypto
          ? crypto.randomUUID()
          : `img-${Date.now()}`;

      await putImage({
        id,
        slug,
        blob,
        mime: blob.type || "image/webp",
        width,
        height,
        name: file.name,
        createdAt: Date.now(),
      });

      if (value) {
        try {
          await deleteImage(value);
        } catch {
          // ignore storage errors; replace in UI anyway
        }
        onRemoved(value);
      }

      const url = URL.createObjectURL(blob);
      onUploaded(id, url);
      onChange(id);
    } catch {
      onError(
        "Gagal menyimpan gambar. Pastikan browser mendukung IndexedDB.",
      );
    } finally {
      setBusy(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  }

  async function handleRemove() {
    if (!value) return;

    try {
      await deleteImage(value);
    } catch {
      // ignore storage errors; still remove from UI
    }

    onRemoved(value);
    onChange(undefined);
  }

  return (
    <div className="flex flex-col gap-2">
      {value ? (
        <div className="flex items-center gap-3 rounded-xl border border-[#1b1a17]/10 bg-white/60 p-2">
          {previewUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={previewUrl}
              alt="Gambar terunggah"
              className="h-12 w-12 rounded-lg object-cover"
            />
          ) : (
            <span className="flex h-12 w-12 items-center justify-center rounded-lg bg-[#f4f1ea] text-[9px] uppercase text-[#8a8375]">
              Gambar
            </span>
          )}
          <div className="flex flex-1 flex-col">
            <span className="text-[10px] uppercase tracking-[0.2em] text-[#8a8375]">
              Tersimpan
            </span>
            <div className="mt-1 flex gap-2">
              <button
                type="button"
                onClick={() => inputRef.current?.click()}
                className="rounded-full border border-[#1b1a17]/15 px-3 py-1 text-[10px] transition hover:bg-[#f4f1ea]"
              >
                Ganti
              </button>
              <button
                type="button"
                onClick={handleRemove}
                className="rounded-full border border-[#a33a3a]/30 px-3 py-1 text-[10px] text-[#a33a3a] transition hover:bg-[#f9ecec]"
              >
                Hapus
              </button>
            </div>
          </div>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={busy}
          className="rounded-xl border border-dashed border-[#1b1a17]/20 px-4 py-3 text-[10px] uppercase tracking-[0.2em] text-[#5f5a50] transition hover:bg-white disabled:opacity-50"
        >
          {busy ? "Memproses..." : "Upload gambar"}
        </button>
      )}

      <input
        ref={inputRef}
        type="file"
        accept={ACCEPTED_TYPES.join(",")}
        onChange={(event) => handleFile(event.target.files?.[0])}
        className="hidden"
      />
      <p className="text-[10px] text-[#8a8375]">
        JPG/PNG/WebP, maksimal 5MB. Disimpan lokal di browser.
      </p>
    </div>
  );
}
