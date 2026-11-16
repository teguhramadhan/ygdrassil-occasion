# Context — Section Customizer Undangan

## Ringkasan
Fitur ini adalah **editor kustomisasi undangan** untuk user. Section undangan bertipe tetap, tetapi urutannya bisa diubah bebas (kecuali envelope di awal dan closing di akhir). Di dalam section, struktur layout tetap; user hanya bisa mengedit data, memilih align per elemen, warna teks, dan background.

Hasil edit **hanya untuk demo lokal**: disimpan di browser, bisa diekspor sebagai JSON, dan **tidak** mengubah halaman publik `/[slug]`.

## Keputusan Final (dari sesi grill)
| Topik | Keputusan |
|---|---|
| Pengguna | User, dengan kode akses per undangan |
| Auth | Kode akses sederhana, dicek client-side |
| Persistensi | localStorage untuk config, IndexedDB untuk gambar |
| Halaman publik | Tidak berubah; fitur ini customizer demo |
| Ekspor | JSON saja, **tanpa gambar** |
| Impor/share link | Tidak termasuk MVP |
| Section | 14 section, semua bisa dikustomisasi |
| Urutan | Bebas, kecuali envelope selalu awal dan closing selalu akhir |
| Hide | Semua bisa disembunyikan kecuali envelope & closing |
| Drag | Hanya section; blok di dalam section tidak bisa di-drag |
| Layout internal | Fixed; hanya align per elemen |
| Align | Per elemen teks |
| Warna teks | Per section, dengan opsi auto-kontras |
| Background | Solid, gradient, pattern preset, gambar upload |
| Tema | Tetap dari `themeId`; tidak bisa diganti di editor |
| Envelope | Section baru: judul + nama tamu + tombol buka + background |
| Preview | Live tanpa reload, renderer generik baru |
| Foto | Upload, disimpan di IndexedDB |
| Reset | Ada; undo/redo tidak ada |
| Mobile | Didukung, termasuk drag touch |

## Kondisi Codebase
- Next.js `16.4.3`, React `19.3.0`, Tailwind v4, Zod v4.
- Route publik: `/` dan `/[slug]`.
- `src/proxy.ts` memblokir path satu segmen yang bukan slug undangan. `/studio` harus ditambahkan ke `reservedPaths`.
- `/[slug]` memakai `generateStaticParams` dan server component.
- Tema publik masih monolitik:
  - `src/components/themes/FloralWedding.tsx`
  - `src/components/themes/ElegantRed.tsx`
  - `src/components/themes/ModernMinimal.tsx`
- Schema undangan: `src/lib/invitation.ts`.
- Registry undangan: `src/lib/invitations.ts` (3 data: `alya-rizky`, `diana-bima`, `nadia-arif`).
- Shared components: `Countdown`, `CopyButton`, `VideoThumbnail`.
- Belum ada test framework, DB, atau auth.

## Pemetaan Istilah User
| Istilah user | Section id |
|---|---|
| header | `hero` |
| envelope open | `envelope` (baru) |
| date | `countdown` |
| location | `venue` |

## 14 Section Final
1. `envelope` — locked first, tidak bisa hide
2. `hero`
3. `quote`
4. `couple`
5. `countdown`
6. `story`
7. `events`
8. `venue`
9. `gallery`
10. `video`
11. `dresscode`
12. `gift`
13. `rsvp`
14. `closing` — locked last, tidak bisa hide

## Keputusan Arsitektur
- **Renderer generik baru** di `src/components/customizer/preview/`, tidak memakai tema publik.
- **Theme preset** menyediakan font, warna default, default align, dan default background. Tema tidak bisa diganti user.
- **Section registry** adalah single source of truth untuk label, field yang bisa diedit, elemen yang bisa di-align, dan aturan lock/visibility.
- **Config** adalah objek tunggal `CustomizerConfig` yang berisi `data.invitation`, `data.labels` (judul/eyebrow/note per section), urutan, dan style per section.
- **Normalisasi** dijalankan setiap load dan setelah reorder untuk menjaga invariant.
- **Envelope** adalah section biasa di urutan pertama; tombol buka mengubah state `opened` di preview.
- **Auth gate** memakai `sessionStorage` agar tidak perlu memasukkan kode berulang dalam satu sesi tab.
- **Gambar** disimpan sebagai Blob di IndexedDB; preview memakai object URL. Config hanya menyimpan `imageId`.

## Asumsi
- Kode akses boleh ada di data undangan dan ikut ke bundle client; ini bukan proteksi keamanan nyata.
- Semua field undangan boleh diedit kecuali `slug`, `status`, `themeId`, dan `accessCode`.
- Data undangan awal diambil dari file data; config lokal menimpa data saat editor dibuka.
- `accessCode` akan ditambahkan manual ke 3 data undangan (contoh: `ALYA2027`, `DIANA2027`, `NADIA2027`).
- Envelope default diturunkan dari data yang ada jika field envelope belum diisi.
- Ekspor JSON tidak menyertakan gambar; `imageId` tetap ada dan akan menjadi referensi yang tidak resolve di perangkat lain.
- Preview tidak harus identik pixel-perfect dengan tema publik; cukup merepresentasikan struktur dan style.
- Video tetap memakai URL YouTube, bukan upload.
- RSVP form hanya UI, tidak mengirim data.

## Batasan Teknis
- localStorage umumnya ~5MB; jangan simpan base64 gambar di sana.
- IndexedDB bisa tidak tersedia (mode privat tertentu); sediakan fallback.
- `next/font` harus diimpor statis di module, bukan dinamis.
- Komponen yang memakai storage harus `"use client"`.
- Jangan membaca localStorage/IndexedDB saat render awal untuk menghindari hydration mismatch.
- `proxy.ts` hanya boleh berisi logika ringan; jangan menambah dependency berat.
- Tailwind v4: pattern background sebaiknya via CSS helper di `globals.css`, bukan plugin baru.

## Referensi Next.js 16
- `node_modules/next/dist/docs/01-app/03-api-reference/03-file-conventions/proxy.md`
- `node_modules/next/dist/docs/01-app/01-getting-started/05-server-and-client-components.md`
- `node_modules/next/dist/docs/01-app/03-api-reference/01-directives/use-client.md`

## File yang Akan Disentuh
Baru:
- `src/lib/customizer/*`
- `src/components/customizer/*`
- `src/app/studio/page.tsx`
- `src/app/studio/[slug]/page.tsx`

Diubah:
- `src/lib/invitation.ts` (envelope + accessCode)
- `src/data/invitations/*.ts` (accessCode)
- `src/proxy.ts` (reserved path)
- `src/app/globals.css` (helper align + pattern)
- `package.json` (dnd-kit)
