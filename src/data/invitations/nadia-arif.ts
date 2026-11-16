import { parseInvitation } from "@/lib/invitation";

const mapQuery = "Taman Kusuma, Jl. Setiabudi No. 45, Bandung";

export const nadiaArif = parseInvitation({
  slug: "nadia-arif",
  status: "published",
  themeId: "modern-minimal",
  accessCode: "NADIA2027",
  meta: {
    title: "Nadia & Arif — Undangan Pernikahan",
    description:
      "Undangan pernikahan Nadia & Arif, Sabtu 5 September 2027 di Bandung.",
  },
  envelope: {
    title: "The wedding of",
    guestName: "Tamu Undangan",
    buttonLabel: "Buka Undangan",
  },
  hero: {
    eyebrow: "The wedding of",
    description:
      "Dua orang, satu cerita yang baru saja dimulai. Kami mengundang Anda untuk merayakan hari pertama dari selamanya.",
    dateLabel: "05 · 09 · 2027",
    isoDate: "2027-09-05T09:00:00+07:00",
    locationShort: "Bandung, ID",
  },
  couple: {
    monogram: "N + A",
    bride: {
      fullName: "Nadia Putri",
      nickname: "Nadia",
      initial: "N",
      role: "Putri dari",
      parents: "Bapak Hendra & Ibu Lestari",
    },
    groom: {
      fullName: "Arif Hidayat",
      nickname: "Arif",
      initial: "A",
      role: "Putra dari",
      parents: "Bapak Sutrisno & Ibu Wulan",
    },
  },
  quote: {
    text: "Dua orang, satu cerita yang baru saja dimulai.",
    source: "Nadia & Arif",
  },
  about: {
    text: "Kami percaya bahwa hal-hal paling indah lahir dari kesederhanaan: pagi yang tenang, tawa yang jujur, dan seseorang yang memilih untuk tinggal.",
  },
  events: [
    {
      label: "Akad Nikah",
      date: "05 September 2027",
      time: "09.00 — 10.30 WIB",
      place: "Taman Kusuma",
      address: "Jl. Setiabudi No. 45, Bandung",
    },
    {
      label: "Resepsi",
      date: "05 September 2027",
      time: "16.00 — 20.00 WIB",
      place: "Taman Kusuma",
      address: "Jl. Setiabudi No. 45, Bandung",
    },
  ],
  venue: {
    label: "Resepsi",
    place: "Taman Kusuma",
    address: "Jl. Setiabudi No. 45, Bandung",
    mapsUrl: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(mapQuery)}`,
  },
  gallery: [
    { label: "Morning light", from: "#e7e7e2", to: "#b9b9b1" },
    { label: "The two of us", from: "#d9dcd4", to: "#a7ada0" },
    { label: "Quiet hours", from: "#eceae4", to: "#c2bdb2" },
    { label: "A promise", from: "#dcded8", to: "#8f958a" },
  ],
  video: {
    url: "https://www.youtube.com/watch?v=aqz-KE-bpKQ",
    title: "Nadia & Arif — A Short Film",
    subtitle: "Prewedding",
  },
  dresscode: {
    note: "Kami mengundang Anda untuk hadir dengan nuansa warna berikut.",
    colors: [
      { name: "Black", hex: "#111111" },
      { name: "White", hex: "#ffffff" },
      { name: "Sage", hex: "#8b9585" },
      { name: "Stone", hex: "#d6d6cf" },
    ],
  },
  gift: {
    note: "Kehadiran Anda sudah lebih dari cukup. Bila ingin memberi tanda kasih, berikut rekening yang kami sediakan.",
    accounts: [
      { bank: "Bank BCA", number: "0987654321", holder: "Nadia Putri" },
      { bank: "Bank Mandiri", number: "137-00-5551234-5", holder: "Arif Hidayat" },
    ],
  },
  rsvp: {
    deadlineLabel: "20 Agustus 2027",
    note: "Konfirmasi kehadiran Anda sebelum 20 Agustus 2027 agar kami dapat mempersiapkan segalanya dengan baik.",
  },
  closing: {
    message:
      "Terima kasih telah menjadi bagian dari cerita kami. Sampai jumpa di hari yang paling berarti.",
  },
});
