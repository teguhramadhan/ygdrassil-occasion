# Plan — Section Customizer Undangan

## Tujuan
Membangun editor undangan berbasis section untuk user, dengan:
- urutan section bebas (drag & drop),
- edit data undangan,
- align per elemen,
- warna teks per section,
- background per section (solid, gradient, pattern, gambar),
- preview live tanpa reload,
- penyimpanan lokal (localStorage + IndexedDB),
- ekspor config JSON.

Ini adalah **customizer demo**: halaman publik `/[slug]` dan 3 tema lama **tidak diubah**.

## Non-goals (MVP)
- Menyimpan hasil edit ke server/DB.
- Menampilkan hasil edit di halaman publik.
- Auth aman (kode akses masih client-side).
- Impor JSON atau share link.
- Undo/redo.
- Freeform canvas / drag blok di dalam section.
- Ganti tema atau font dari editor.
- Upload video; video tetap URL.

## Prasyarat
- Baca `context/section-customizer.md` dan `spec/section-customizer.md`.
- Ikuti konvensi Next.js 16 di proyek ini (`src/proxy.ts`, `PageProps`, `"use client"`).
- Jangan mengubah komponen tema publik kecuali benar-benar perlu.

## Urutan Implementasi

### Fase 1 — Fondasi data & preset
Dependency: tidak ada.
1. Tambah `envelope` dan `accessCode` ke `src/lib/invitation.ts`.
2. Isi `accessCode` di 3 file data undangan.
3. Buat tipe & schema customizer (`src/lib/customizer/`).
4. Buat registry section (14 section) + metadata field/elemen.
5. Buat theme preset (font, warna default, default align, default background).

Output: data model + schema valid, belum ada UI.

### Fase 2 — Storage
Dependency: Fase 1.
1. Wrapper localStorage: load/save/reset config per slug.
2. Wrapper IndexedDB: simpan/hapus/ambil blob gambar.
3. Fungsi normalisasi config (urutan, section hilang, validasi Zod).
4. Fungsi default config dari `Invitation` + theme preset.

Output: config bisa dimuat/dibuat/disimpan tanpa UI.

### Fase 3 — Renderer generik
Dependency: Fase 1.
1. `PreviewShell` + font preset.
2. `Alignable` + helper CSS align.
3. 14 komponen section generik (envelope, hero, quote, couple, countdown, story, events, venue, gallery, video, dresscode, gift, rsvp, closing).
4. Fungsi auto-kontras warna teks.
5. Renderer yang membaca `order` + `visible` + style per section.

Output: preview statis dari sebuah config.

### Fase 4 — Route & auth gate
Dependency: Fase 1, 2, 3.
1. Tambah `/studio` ke `reservedPaths` di `src/proxy.ts`.
2. Halaman `/studio` (daftar undangan).
3. Halaman `/studio/[slug]` (server shell + client editor).
4. `AccessGate` dengan kode akses + sessionStorage.

Output: editor bisa dibuka setelah kode benar.

### Fase 5 — Editor shell & state
Dependency: Fase 2, 4.
1. State reducer/context untuk config.
2. Autosave debounce ke localStorage.
3. Layout desktop: sidebar section, preview, inspector.
4. Layout mobile: tab Section / Preview / Inspector.
5. Skeleton saat hidrasi storage.

Output: editor bisa load, edit state, dan simpan.

### Fase 6 — Drag & drop urutan section
Dependency: Fase 5.
1. Pasang `@dnd-kit/core`, `@dnd-kit/sortable`, `@dnd-kit/utilities`.
2. Sortable list di sidebar.
3. Kunci envelope di awal dan closing di akhir.
4. Sensor pointer + keyboard + touch.
5. Normalisasi setelah drop.

Output: urutan bisa diubah dan tersimpan.

### Fase 7 — Inspector data & tampilan
Dependency: Fase 5.
1. Tab Data: form field sesuai section terpilih, termasuk array dinamis.
2. Tab Tampilan: background picker, text color, align per elemen.
3. Upload gambar + kompresi + simpan IndexedDB.
4. Validasi input (hex, required, URL).
5. Visibility toggle (envelope & closing terkunci).

Output: semua kustomisasi bisa dilakukan.

### Fase 8 — Envelope, reset, ekspor
Dependency: Fase 6, 7.
1. Perilaku envelope open di preview.
2. Tombol reset ke default.
3. Tombol ekspor JSON (tanpa gambar) + peringatan.
4. Toast/error state untuk storage penuh, config korup, upload gagal.

Output: fitur MVP lengkap.

### Fase 9 — Verifikasi
Dependency: semua fase.
1. Jalankan `npm run lint`, `npx tsc --noEmit`, `npm run build`.
2. Uji manual checklist di spec.
3. Pastikan halaman publik `/[slug]` dan `/` tidak berubah.
4. Cek hydration, mobile, keyboard DnD.

## Dependency Graph
```
Fase 1 ──┬─> Fase 2 ──┐
         └─> Fase 3 ──┼─> Fase 4 ──> Fase 5 ──┬─> Fase 6 ──┐
                      │                        └─> Fase 7 ──┼─> Fase 8 ──> Fase 9
                      └──────────────────────────────────────┘
```

## Risiko
- **Refactor besar**: 14 section generik harus meniru nuansa 3 tema. Mitigasi: mulai dari struktur sederhana, prioritaskan fungsi.
- **localStorage/IndexedDB**: bisa diblokir atau penuh. Mitigasi: fallback in-memory + pesan jelas.
- **Auth tidak aman**: kode ada di bundle client. Mitigasi: dokumentasikan sebagai demo.
- **Preview ≠ tema publik**: diterima karena halaman publik tidak diubah.
- **Hydration**: jangan baca storage saat render server. Mitigasi: baca di `useEffect`, tampilkan skeleton.
- **DnD mobile**: butuh sensor touch dan area drag yang jelas. Mitigasi: handle khusus + keyboard support.
