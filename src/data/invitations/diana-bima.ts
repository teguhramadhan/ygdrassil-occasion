import { parseInvitation } from "@/lib/invitation";

const mapQuery = "The Grand Ballroom Khayangan, Jl. Gatot Subroto No. 12, Jakarta";

export const dianaBima = parseInvitation({
  slug: "diana-bima",
  status: "published",
  themeId: "elegant-red",
  accessCode: "DIANA2027",
  meta: {
    title: "Diana & Bima — Undangan Pernikahan",
    description:
      "Undangan pernikahan Diana & Bima, Senin 20 Desember 2027 di Jakarta.",
  },
  envelope: {
    title: "Save the date",
    guestName: "Tamu Undangan",
    buttonLabel: "Buka Undangan",
  },
  hero: {
    eyebrow: "Save the date",
    description:
      "Dengan penuh rasa syukur, kami mengundang Anda untuk menjadi bagian dari hari istimewa kami.",
    dateLabel: "20 · 12 · 2027",
    isoDate: "2027-12-20T09:00:00+07:00",
    locationShort: "Jakarta Selatan",
  },
  couple: {
    monogram: "D & B",
    bride: {
      fullName: "Diana Larasati",
      nickname: "Diana",
      initial: "D",
      role: "Putri dari",
      parents: "Bapak Arjuna Larasati & Ibu Ratna Dewi",
    },
    groom: {
      fullName: "Bima Aryo",
      nickname: "Bima",
      initial: "B",
      role: "Putra dari",
      parents: "Bapak Suryo Aryo & Ibu Maya Kirana",
    },
  },
  quote: {
    text: "Dan di antara tanda-tanda kekuasaan-Nya ialah Dia menciptakan untukmu pasangan hidup dari jenismu sendiri, supaya kamu dapat ketenteraman dan ketenangan hati.",
    source: "Q.S. Ar-Rum : 21",
  },
  story: [
    {
      year: "2019",
      title: "Pertama Bertemu",
      text: "Sebuah pameran buku di kota tua mempertemukan dua orang yang sama-sama lupa membawa payung.",
    },
    {
      year: "2023",
      title: "Lamaran",
      text: "Di bawah langit senja yang sama, sebuah pertanyaan sederhana diucapkan dan dijawab dengan air mata bahagia.",
    },
    {
      year: "2027",
      title: "Menikah",
      text: "Dengan doa dan restu keluarga, kami memilih untuk melangkah bersama seumur hidup.",
    },
  ],
  events: [
    {
      label: "Akad Nikah",
      date: "Senin, 20 Desember 2027",
      time: "09.00 WIB",
      place: "The Grand Ballroom — Khayangan",
      address: "Jl. Gatot Subroto No. 12, Jakarta",
    },
    {
      label: "Resepsi",
      date: "Senin, 20 Desember 2027",
      time: "18.00 — 21.00 WIB",
      place: "The Grand Ballroom — Khayangan",
      address: "Jl. Gatot Subroto No. 12, Jakarta",
    },
  ],
  venue: {
    label: "Resepsi",
    place: "The Grand Ballroom — Khayangan",
    address: "Jl. Gatot Subroto No. 12, Jakarta Selatan",
    mapsUrl: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(mapQuery)}`,
  },
  gallery: [
    { label: "The First Look", from: "#5b1a1a", to: "#2b0b0b" },
    { label: "Golden Hour", from: "#8a5a2b", to: "#3a1c0b" },
    { label: "By the Window", from: "#6b2a2a", to: "#1c0606" },
    { label: "Forever", from: "#7a4a2a", to: "#2b0b0b" },
  ],
  video: {
    url: "https://www.youtube.com/watch?v=aqz-KE-bpKQ",
    title: "Diana & Bima — The Wedding Film",
    subtitle: "A story in motion",
  },
  dresscode: {
    note: "Kami mengundang Anda untuk hadir dengan nuansa warna berikut. Pakaian formal atau semi-formal akan melengkapi suasana malam itu.",
    colors: [
      { name: "Deep Maroon", hex: "#2b0b0b" },
      { name: "Antique Gold", hex: "#c6a15b" },
      { name: "Ivory", hex: "#f5efe6" },
    ],
  },
  gift: {
    note: "Kehadiran Anda adalah hadiah terbesar. Bagi yang ingin memberi tanda kasih, kami sediakan rekening berikut.",
    accounts: [
      { bank: "Bank BCA", number: "4567890123", holder: "Diana Larasati" },
      { bank: "Bank Mandiri", number: "137-00-9876543-2", holder: "Bima Aryo" },
    ],
  },
  rsvp: {
    deadlineLabel: "1 Desember 2027",
    note: "Mohon konfirmasi kehadiran Anda sebelum 1 Desember 2027.",
  },
  closing: {
    message:
      "Merupakan suatu kehormatan bagi kami apabila Anda berkenan hadir dan menjadi bagian dari momen istimewa ini.",
  },
});
