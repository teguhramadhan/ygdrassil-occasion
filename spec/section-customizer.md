# Spec — Section Customizer Undangan

## 1. Ruang Lingkup
Editor lokal untuk mengkustomisasi undangan:
- urutan 14 section (drag & drop),
- edit data undangan,
- align per elemen,
- warna teks per section (auto/manual),
- background per section,
- preview live,
- simpan lokal + ekspor JSON.

Tidak mengubah halaman publik dan tidak menyimpan ke server.

## 2. Data Model

### 2.1 Perubahan `src/lib/invitation.ts`
```ts
const envelopeSchema = z.object({
  title: z.string().min(1),
  guestName: z.string().optional(),
  buttonLabel: z.string().min(1),
});

// di invitationSchema
accessCode: z.string().min(4).optional(),
envelope: envelopeSchema.optional(),
```
- `accessCode` wajib diisi di 3 data undangan untuk membuka editor.
- `envelope` opsional; jika kosong, editor memakai default turunan.
- Tipe `Invitation` tetap dipakai halaman publik; field baru tidak memengaruhi render.

### 2.2 Section ID
```ts
export const SECTION_IDS = [
  "envelope", "hero", "quote", "couple", "countdown", "story",
  "events", "venue", "gallery", "video", "dresscode", "gift",
  "rsvp", "closing",
] as const;

export type SectionId = (typeof SECTION_IDS)[number];
```

### 2.3 Background
```ts
export type PatternId = "dots" | "grid" | "diagonal" | "botanical";

export type BackgroundConfig =
  | { type: "solid"; color: string }
  | { type: "gradient"; from: string; to: string; angle: number }
  | { type: "pattern"; pattern: PatternId; base: string; accent: string }
  | { type: "image"; imageId: string; overlay: number; fallback: string };
```
- Semua warna harus `#rrggbb`.
- `angle` 0–360.
- `overlay` 0–0.8 (opasitas lapisan gelap/terang di atas gambar).
- `fallback` dipakai jika gambar tidak ditemukan.

### 2.4 Style Section
```ts
export type Align = "left" | "center" | "right";

export type SectionStyle = {
  visible: boolean;
  background: BackgroundConfig;
  textColor: string | null; // null = auto kontras
  align: Record<string, Align>;
};
```

### 2.5 Config
```ts
export type SectionLabel = {
  eyebrow: string;
  heading: string;
  note: string;
};

export type CustomizerData = {
  invitation: Omit<Invitation, "slug" | "status" | "themeId" | "accessCode">;
  labels: Record<SectionId, SectionLabel>;
};

export type CustomizerConfig = {
  version: 1;
  slug: string;
  themeId: string;
  data: CustomizerData;
  order: SectionId[];             // termasuk section yang hidden
  sections: Record<SectionId, SectionStyle>;
};
```

### 2.6 Schema Zod
- `sectionIdSchema = z.enum(SECTION_IDS)`.
- `hexSchema = z.string().regex(/^#[0-9a-fA-F]{6}$/)`.
- `backgroundSchema` = discriminated union `type`.
- `sectionStyleSchema` = object di atas.
- `customizerConfigSchema` = object di atas dengan `version: z.literal(1)`.
- `z.record(z.enum(SECTION_IDS), sectionStyleSchema)` untuk `sections` (Zod v4 mewajibkan semua 14 key; normalisasi mengisi yang hilang).
- `align` memakai `z.record(z.string(), alignSchema)` (partial, key bebas).
- Validasi config dengan `safeParse`; jika gagal → fallback default + banner error.

## 3. Section Registry
Single source of truth: `src/lib/customizer/sections.ts`.

| id | Label | Locked order | Bisa hide | Field data | Elemen align |
|---|---|---|---|---|---|
| envelope | Envelope | first | tidak | `envelope.title`, `envelope.guestName`, `envelope.buttonLabel` | title, guestName, button |
| hero | Header | – | ya | `hero.*`, `couple.*` | eyebrow, names, description, date, location |
| quote | Quote | – | ya | `quote.*` | eyebrow, text, source |
| couple | Mempelai | – | ya | `couple.*` | heading, bride, groom |
| countdown | Tanggal | – | ya | `hero.isoDate`, label | heading, timer |
| story | Kisah | – | ya | `story[]` | heading, items |
| events | Acara | – | ya | `events[]` | heading, cards |
| venue | Lokasi | – | ya | `venue.*` | heading, place, address, button |
| gallery | Galeri | – | ya | `gallery[]` | heading, items |
| video | Video | – | ya | `video.*` | heading, thumbnail, caption |
| dresscode | Dress Code | – | ya | `dresscode.*` | heading, note, colors |
| gift | Hadiah | – | ya | `gift.*` | heading, note, accounts |
| rsvp | RSVP | – | ya | `rsvp.*` | heading, note, form |
| closing | Penutup | last | tidak | `closing.message`, `couple.*`, `hero.dateLabel` | message, names, date |

Registry entry:
```ts
export type SectionDefinition = {
  id: SectionId;
  label: string;
  defaultLabel: SectionLabel;
  defaultAlign: Record<string, Align>;
  lockedPosition: "first" | "last" | null;
  hideable: boolean;
  defaultVisible: (invitation: Invitation) => boolean;
  fields: FieldDefinition[];
  alignElements: string[];
};
```
`FieldDefinition` menentukan tipe input: `text`, `textarea`, `url`, `date-time`, `hex`, `list`, `image`.

Default visible:
- `story`: `invitation.story.length > 0`
- `video`: `invitation.video != null`
- `gallery`: `invitation.gallery.length > 0`
- `envelope`: `true`
- `closing`: `true`
- lainnya: `true`

Default order:
```ts
["envelope","hero","quote","couple","countdown","story","events","venue",
 "gallery","video","dresscode","gift","rsvp","closing"]
```

## 4. Theme Preset
`src/lib/customizer/theme-presets.ts`:
```ts
export type ThemePreset = {
  id: string;
  fonts: { display: string; body: string; accent?: string }; // CSS variable class
  colors: { text: string; muted: string; accent: string; surface: string };
  defaultAlign: Align;
  backgrounds: BackgroundConfig[]; // dipakai bergiliran per section
};
```
- `floral`: Cormorant Garamond, Great Vibes, Jost; align center; surface `#fbf6ef`.
- `elegant-red`: Cinzel, Cormorant Garamond, Jost; align left; surface `#f5efe6`.
- `modern-minimal`: Inter, DM Serif Display; align left; surface `#ffffff`.
- `themeId` tidak dikenal → fallback `floral`.
- Font diimpor statis via `next/font/google` di module `fonts.ts`, diekspor sebagai className/variable.

## 5. Default Config
`createDefaultConfig(invitation, preset)`:
1. `data.invitation` = salin field konten dari `Invitation`.
2. `data.labels` = default label registry, dengan penyesuaian:
   - `envelope.title` = `invitation.envelope?.title ?? invitation.hero.eyebrow`
   - `envelope.guestName` = `invitation.envelope?.guestName ?? ""`
   - `envelope.buttonLabel` = `invitation.envelope?.buttonLabel ?? "Buka Undangan"`
3. `order` = default order.
4. `sections[id]`:
   - `visible` = `defaultVisible(invitation)`
   - `background` = `preset.backgrounds[index % length]`
   - `textColor` = `null`
   - `align` = semua `alignElements` diisi `preset.defaultAlign`
5. `envelope.visible = true`, `closing.visible = true`.

## 6. Normalisasi
`normalizeConfig(config, invitation, preset)` wajib idempoten:
1. Validasi schema; jika gagal → `createDefaultConfig`.
2. `order`:
   - buang id tidak dikenal & duplikat,
   - tambahkan section yang hilang di akhir sesuai default order,
   - pindahkan `envelope` ke indeks 0,
   - pindahkan `closing` ke indeks terakhir.
3. `sections`: pastikan semua `SectionId` ada; isi field style yang hilang dari default.
4. `envelope.visible = true`, `closing.visible = true`.
5. `align`: isi elemen yang hilang dengan `preset.defaultAlign`.
6. Warna invalid → ganti default preset.
7. `data.labels`: isi label yang hilang dari registry.

## 7. Storage

### 7.1 localStorage
- Key: `ygdrassil:customizer:v1:<slug>`
- Value: JSON `CustomizerConfig`.
- Simpan dengan debounce 500ms setelah perubahan.
- `loadConfig(slug)` → parse + validasi; return `null` jika tidak ada/korup.
- `saveConfig(config)` → try/catch; jika quota error, tampilkan toast dan fallback in-memory.
- `clearConfig(slug)`.

### 7.2 IndexedDB
- DB: `ygdrassil-customizer`, version 1.
- Object store: `images`, keyPath `id`.
- Index: `slug`.
- Record:
```ts
type StoredImage = {
  id: string;
  slug: string;
  blob: Blob;
  mime: string;
  width: number;
  height: number;
  name: string;
  createdAt: number;
};
```
- API: `putImage`, `getImage`, `deleteImage`, `listImages(slug)`, `deleteImagesBySlug(slug)`.
- Jika IndexedDB tidak tersedia → fallback object URL di memori + banner "gambar tidak tersimpan permanen".

### 7.3 sessionStorage
- Key: `ygdrassil:customizer:unlocked:<slug>` = `"1"`.
- Dipakai `AccessGate`.

## 8. Auth Gate
- Halaman `/studio/[slug]` server component:
  - `getInvitationBySlug(slug)`; jika tidak ada → `notFound()`.
  - Jika `accessCode` kosong → render pesan "Editor belum aktif untuk undangan ini".
  - Render `<AccessGate slug={slug} accessCode={accessCode} invitation={invitation} />`.
- `AccessGate` (client):
  - Cek sessionStorage saat mount.
  - Jika belum unlock, tampilkan form kode akses.
  - Bandingkan input dengan `accessCode` (trim, case-sensitive).
  - Salah → pesan error, tidak ada rate limit (demo).
  - Benar → set sessionStorage, render `<CustomizerApp />`.
- Catatan keamanan: kode ada di bundle client; ini bukan proteksi nyata.

## 9. Routes
- `src/app/studio/page.tsx` — daftar undangan (server), link ke `/studio/[slug]`.
- `src/app/studio/[slug]/page.tsx` — shell editor.
  - `generateStaticParams()` dari `getAllInvitations()`.
  - `generateMetadata`.
- `src/proxy.ts`: tambah `"/studio"` ke `reservedPaths`.

## 10. Komponen & Struktur
```
src/app/studio/page.tsx
src/app/studio/[slug]/page.tsx

src/components/customizer/
  AccessGate.tsx
  CustomizerApp.tsx          // "use client", state + autosave
  CustomizerToolbar.tsx      // reset, export, toggle cover/isi
  SectionList.tsx            // dnd-kit sortable
  SectionInspector.tsx
  DataPanel.tsx
  StylePanel.tsx
  BackgroundPicker.tsx
  AlignControl.tsx
  ColorField.tsx
  ImageUpload.tsx
  Toast.tsx
  preview/
    Preview.tsx
    PreviewShell.tsx
    Alignable.tsx
    SectionRenderer.tsx
    sections/
      EnvelopeSection.tsx
      HeroSection.tsx
      QuoteSection.tsx
      CoupleSection.tsx
      CountdownSection.tsx
      StorySection.tsx
      EventsSection.tsx
      VenueSection.tsx
      GallerySection.tsx
      VideoSection.tsx
      DresscodeSection.tsx
      GiftSection.tsx
      RsvpSection.tsx
      ClosingSection.tsx
```

### 10.1 State
`CustomizerApp` memakai `useReducer`:
```ts
type Action =
  | { type: "reorder"; order: SectionId[] }
  | { type: "toggleVisible"; id: SectionId }
  | { type: "updateData"; patch: DeepPartial<CustomizerData> }
  | { type: "updateStyle"; id: SectionId; patch: Partial<SectionStyle> }
  | { type: "setAlign"; id: SectionId; element: string; align: Align }
  | { type: "setBackground"; id: SectionId; background: BackgroundConfig }
  | { type: "replace"; config: CustomizerConfig };
```
- Setiap action menghasilkan config ternormalisasi.
- `useEffect` autosave.
- `selectedSectionId` disimpan di state UI.

### 10.2 Layout
- Desktop: grid 3 kolom `[280px_1fr_360px]`.
- Tablet: 2 kolom (list + preview), inspector sebagai drawer.
- Mobile: tab `Section | Preview | Inspector`.
- Preview sticky dan scrollable sendiri.

## 11. Drag & Drop
- Dependency: `@dnd-kit/core`, `@dnd-kit/sortable`, `@dnd-kit/utilities`.
- Sensors:
  - `PointerSensor` dengan `activationConstraint: { distance: 6 }`.
  - `KeyboardSensor` dengan `sortableKeyboardCoordinates`.
  - `TouchSensor` dengan `{ delay: 150, tolerance: 8 }`.
- `SortableContext` vertikal.
- Item `envelope` dan `closing`: `disabled`, tampilkan ikon lock.
- Item hidden: tetap bisa di-drag, tampil redup + ikon eye-off.
- Setelah `arrayMove`, panggil normalisasi (envelope first, closing last).
- `DragOverlay` menampilkan label section.
- Announcement untuk screen reader.

## 12. Preview & Envelope
- `Preview` merender `order.filter(id => sections[id].visible)`.
- Setiap section dibungkus:
  - `id={`preview-${id}`}`
  - background style dari `SectionStyle.background`
  - `color` dari `textColor` atau auto-kontras
- `Alignable`:
```tsx
<div
  className={`alignable align-${align}`}
  style={{ textAlign: align }}
  data-align={align}
>
  {children}
</div>
```
CSS helper di `globals.css`:
```css
.alignable { display: flex; flex-direction: column; }
.align-left { align-items: flex-start; text-align: left; }
.align-center { align-items: center; text-align: center; }
.align-right { align-items: flex-end; text-align: right; }
```
- `EnvelopeSection`:
  - render judul, nama tamu, tombol.
  - klik tombol → `onOpen()`.
  - `Preview` menyimpan `opened` state.
  - Jika `opened = false`, hanya envelope yang dirender.
  - Toolbar punya toggle "Cover / Isi".
  - Memilih section selain envelope di sidebar otomatis `opened = true`.
  - Setelah open, scroll ke section berikutnya.
- `guestName` di preview memakai `data.invitation.envelope.guestName`; jika kosong dan ada `?to=` di URL, pakai query tersebut.

## 13. Auto Kontras
`src/lib/customizer/contrast.ts`:
```ts
function relativeLuminance(hex: string): number; // WCAG
function autoTextColor(bg: BackgroundConfig): string {
  const base =
    bg.type === "solid" ? bg.color :
    bg.type === "gradient" ? mixHex(bg.from, bg.to) :
    bg.type === "pattern" ? bg.base :
    bg.fallback;
  return relativeLuminance(base) > 0.5 ? "#1b1a17" : "#f7f3ec";
}
```
- `textColor` null → `autoTextColor(background)`.
- Untuk background gambar, gunakan `fallback` sebagai perkiraan.

## 14. Image Upload
- Input `accept="image/jpeg,image/png,image/webp"`.
- Validasi:
  - tipe file termasuk 3 di atas,
  - ukuran ≤ 5MB,
  - maksimal 20 gambar per slug.
- Kompresi via `canvas`:
  - maksimal dimensi 1600px (proporsional),
  - output `image/webp`, quality `0.82`.
- Simpan `StoredImage` ke IndexedDB.
- Preview memakai `URL.createObjectURL(blob)`; revoke saat gambar dihapus/unmount.
- Jika IndexedDB gagal:
  - simpan Blob di memori,
  - tampilkan banner bahwa gambar hilang setelah reload.
- `imageId` disimpan di:
  - `gallery[i].imageId` (perlu tambah field opsional di `galleryItemSchema`),
  - `background.type === "image".imageId`.
- `galleryItemSchema` tambah `imageId: z.string().optional()`.

## 15. Data Editing
- Semua field konten undangan bisa diedit:
  - `meta`, `hero`, `couple`, `quote`, `about`, `story`, `events`, `venue`, `gallery`, `video`, `dresscode`, `gift`, `rsvp`, `closing`, `envelope`.
- Field yang tidak diedit: `slug`, `status`, `themeId`, `accessCode`.
- Array dinamis:
  - story: tambah/hapus item, minimal 0.
  - events: minimal 1.
  - gallery: minimal 0.
  - dresscode.colors: minimal 1.
  - gift.accounts: minimal 1.
- Input divalidasi dengan schema yang sama (`invitationSchema` minus field terkunci).
- Error ditampilkan inline; perubahan tetap disimpan di state, tapi tombol export diblokir jika invalid.
- Label section (`eyebrow/heading/note`) diedit di tab Data pada bagian atas.

## 16. Visibility
- Toggle di setiap item sidebar.
- `envelope` dan `closing`: toggle disabled + tooltip "Section ini wajib tampil".
- Section hidden tidak dirender di preview, tetap ada di urutan.
- Default visible mengikuti registry.

## 17. Reset & Export
### Reset
- Tombol "Reset ke default".
- Konfirmasi dialog.
- Aksi:
  - `createDefaultConfig(invitation, preset)`,
  - hapus localStorage config,
  - hapus gambar dengan index `slug` di IndexedDB,
  - reset state.
- Tidak ada undo.

### Export
- Tombol "Ekspor JSON".
- Blokir jika config invalid; tampilkan daftar error.
- File: `customizer-<slug>.json`.
- Isi: `CustomizerConfig` tanpa blob gambar.
- Tampilkan peringatan: "Gambar tidak disertakan. Referensi gambar hanya berlaku di perangkat ini."
- Format stabil `version: 1`.

## 18. Edge Cases
| Kasus | Perilaku |
|---|---|
| localStorage kosong | Pakai default config |
| localStorage korup | Fallback default + banner |
| Quota localStorage penuh | Simpan in-memory + toast |
| IndexedDB tidak tersedia | Gambar in-memory + banner |
| `imageId` tidak ditemukan | Tampilkan `fallback`/placeholder |
| `themeId` tidak dikenal | Fallback preset `floral` |
| `accessCode` kosong | Halaman editor menampilkan pesan tidak aktif |
| Slug tidak ada | `notFound()` |
| Config version tidak dikenal | Fallback default + banner |
| Section id tidak dikenal di config | Dibuang saat normalisasi |
| Section hilang dari config | Ditambahkan dari default order |
| Envelope/closing di tengah | Dinormalisasi ke awal/akhir |
| Hide envelope/closing | Ditolak, toggle disabled |
| Upload >5MB / tipe salah | Ditolak + error |
| Upload gambar ke-21 | Ditolak + error |
| Teks mengandung HTML | Dirender sebagai teks (tanpa `dangerouslySetInnerHTML`) |
| Reload saat autosave | Perubahan terakhir yang sudah tersimpan dipakai |
| Dua tab | Last write wins (tidak ada sinkronisasi) |
| SSR | Storage dibaca di `useEffect`; skeleton sebelum siap |
| Object URL bocor | Revoke saat unmount/ganti gambar |

## 19. Definition of Done
1. `/studio` dan `/studio/[slug]` dapat diakses; `proxy.ts` tidak memblokir.
2. Kode akses benar membuka editor; salah menampilkan error; unlock bertahan di sesi tab.
3. Config default muncul jika belum ada; config tersimpan dimuat setelah reload.
4. Drag & drop mengubah urutan; envelope selalu awal, closing selalu akhir; tersimpan.
5. Visibility toggle bekerja; envelope & closing tidak bisa disembunyikan.
6. Semua field data di registry bisa diedit; preview berubah live tanpa reload.
7. Background solid/gradient/pattern/gambar bekerja; text color auto/manual; align per elemen; semua tersimpan.
8. Upload gambar tervalidasi, dikompresi, disimpan di IndexedDB, dan tampil di preview.
9. Reset mengembalikan default; ekspor JSON mengunduh config valid tanpa gambar.
10. Layout responsif (desktop/tablet/mobile) dan DnD mendukung pointer, touch, keyboard.
11. Tidak ada hydration error; halaman publik `/` dan `/[slug]` tidak berubah.
12. `npm run lint`, `npx tsc --noEmit`, dan `npm run build` lulus.

## 20. Dependencies
Tambahkan:
- `@dnd-kit/core@^6.3.1`
- `@dnd-kit/sortable@^10.0.0`
- `@dnd-kit/utilities@^3.2.2`

Tidak menambah library IndexedDB, kompresi gambar, atau state management; gunakan API browser dan React bawaan.

## 21. Verifikasi Manual
- Buka `/studio`, pilih undangan, masukkan kode.
- Ubah urutan, hide section, edit teks, ubah background & align.
- Reload halaman; pastikan perubahan kembali.
- Upload gambar galeri & background; reload; pastikan masih tampil.
- Reset; pastikan kembali ke default.
- Ekspor; validasi JSON dengan `customizerConfigSchema`.
- Uji di viewport mobile dan dengan keyboard saja.
