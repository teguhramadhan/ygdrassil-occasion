import { parseInvitation } from "@/lib/invitation";

const mapQuery = "Gedung Serbaguna Dago, Jl. Ir. H. Juanda No. 88, Bandung";

export const alyaRizky = parseInvitation({
  slug: "alya-rizky",
  status: "published",
  themeId: "floral",
  accessCode: "ALYA2027",
  meta: {
    title: "Alya & Rizky — Undangan Pernikahan",
    description:
      "Undangan pernikahan Alya & Rizky, Sabtu 14 Februari 2027 di Bandung.",
  },
  envelope: {
    title: "The Wedding Of",
    guestName: "Tamu Undangan",
    buttonLabel: "Buka Undangan",
  },
  hero: {
    eyebrow: "The Wedding Of",
    dateLabel: "14 . 02 . 2027",
    isoDate: "2027-02-14T08:00:00+07:00",
    locationShort: "Bandung, Jawa Barat",
  },
  couple: {
    monogram: "A & R",
    bride: {
      fullName: "Alya Rahmadani",
      nickname: "Alya",
      initial: "A",
      role: "Putri dari",
      parents: "Bapak H. Ahmad Fauzi & Ibu Hj. Siti Nurhaliza",
    },
    groom: {
      fullName: "Rizky Pratama",
      nickname: "Rizky",
      initial: "R",
      role: "Putra dari",
      parents: "Bapak Pratama Wijaya & Ibu Ratna Sari",
    },
  },
  quote: {
    eyebrow: "Bismillahirrahmanirrahim",
    text: "Dan di antara tanda-tanda kekuasaan-Nya, Dia menciptakan untukmu pasangan dari jenismu sendiri, agar kamu merasa tenteram.",
    source: "Q.S. Ar-Rum: 21",
  },
  events: [
    {
      label: "Akad Nikah",
      date: "Sabtu, 14 Februari 2027",
      time: "08.00 — 10.00 WIB",
      place: "Masjid Al-Hikmah",
      address: "Jl. Dago Atas No. 21, Bandung",
    },
    {
      label: "Resepsi",
      date: "Sabtu, 14 Februari 2027",
      time: "11.00 — 14.00 WIB",
      place: "Gedung Serbaguna Dago",
      address: "Jl. Ir. H. Juanda No. 88, Bandung",
    },
  ],
  venue: {
    label: "Resepsi",
    place: "Gedung Serbaguna Dago",
    address: "Jl. Ir. H. Juanda No. 88, Bandung",
    mapsUrl: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(mapQuery)}`,
  },
  gallery: [
    { label: "Pagi di kebun", from: "#e7d3d5", to: "#c9a3a7" },
    { label: "Tangan yang sama", from: "#dfe7d8", to: "#a9b79b" },
    { label: "Senja berdua", from: "#f2e3cc", to: "#d8b98f" },
  ],
  video: {
    url: "https://www.youtube.com/watch?v=aqz-KE-bpKQ",
    title: "Alya & Rizky — Prewedding",
    subtitle: "Chapter One",
  },
  dresscode: {
    note: "Kami mengundang Anda untuk hadir dengan pakaian senada palet warna berikut agar momen kita terasa selaras.",
    colors: [
      { name: "Dusty Rose", hex: "#c98b93" },
      { name: "Sage", hex: "#8a9a7b" },
      { name: "Cream", hex: "#fbf6ef" },
      { name: "Terracotta", hex: "#c08457" },
    ],
  },
  gift: {
    note: "Doa restu Anda adalah hadiah terindah. Namun jika ingin memberi tanda kasih, kami sediakan rekening berikut.",
    accounts: [
      { bank: "Bank Mandiri", number: "137-00-1234567-8", holder: "Alya Rahmadani" },
      { bank: "Bank BCA", number: "1234567890", holder: "Rizky Pratama" },
    ],
  },
  rsvp: {
    deadlineLabel: "1 Februari 2027",
    note: "Kehadiran dan doa restu Anda berarti bagi kami.",
  },
  closing: {
    message:
      "Merupakan suatu kebahagiaan bagi kami apabila Bapak/Ibu/Saudara berkenan hadir dan memberikan doa restu.",
  },
});
