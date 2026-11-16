export type ThemeMeta = {
  id: string;
  name: string;
  tagline: string;
  description: string;
  palette: string[];
  mood: string;
  accents: string[];
};

export const themes: ThemeMeta[] = [
  {
    id: "floral",
    name: "Floral Wedding",
    tagline: "Lembut, romantis, dan penuh bunga.",
    description:
      "Layout tengah dengan ornamen botani, tipografi script, dan palet blush yang hangat. Cocok untuk pernikahan taman dan akad intim.",
    palette: ["#f3d9dc", "#c98b93", "#8a9a7b", "#fbf6ef"],
    mood: "Romantis",
    accents: ["Ornamen bunga", "Countdown", "Dress code", "Hadiah", "Video YouTube"],
  },
  {
    id: "elegant-red",
    name: "Elegant Red",
    tagline: "Marun dramatis dengan aksen emas.",
    description:
      "Komposisi split dengan panel marun, garis emas, dan tipografi serif kapital. Memberi kesan mewah untuk resepsi malam.",
    palette: ["#2b0b0b", "#5b1a1a", "#c6a15b", "#f5efe6"],
    mood: "Mewah",
    accents: ["Split hero", "Timeline kisah", "Aksen emas", "Hadiah", "Video YouTube"],
  },
  {
    id: "modern-minimal",
    name: "Modern Minimal",
    tagline: "Bersih, lapang, dan editorial.",
    description:
      "Tipografi besar, garis tipis, dan banyak ruang kosong. Tampilan kontemporer untuk pasangan yang menyukai kesederhanaan.",
    palette: ["#ffffff", "#111111", "#8b9585", "#ecece7"],
    mood: "Kontemporer",
    accents: ["Grid editorial", "Tipografi besar", "Dress code", "Hadiah", "Video YouTube"],
  },
];

export function getThemeMeta(id: string): ThemeMeta | undefined {
  return themes.find((theme) => theme.id === id);
}
