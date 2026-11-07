// ============================================================
//  КАРТИНИ
//  Щоб додати картину — скопіюй один об'єкт і зміни поля.
//  Фото кладеш у public/paintings/ і пишеш шлях у images.
//  Перше фото в images — головне (воно в галереї),
//  решта (живе фото, деталь) гортаються в попапі.
// ============================================================

export type PaintingType = {
  id: number;
  title: string;
  width: number; // см (ширина) — 0, якщо невідомо
  height: number; // см (висота) — 0, якщо невідомо
  year?: number; // знак ? означає «поле можна не писати»
  priceUAH?: number;
  priceEUR?: number; // пишемо вручну, заокруглено
  available: boolean; // false = продана або не продається
  images: string[];
  // співвідношення сторін фото (ширина / висота), якщо розміру немає
  photoRatio?: number;
};

export const paintingList: PaintingType[] = [
  { id: 1, title: "A", width: 90, height: 80, year: 2023, priceUAH: 18000, priceEUR: 380, available: true, images: ["/paintings/1.jpg"] },
  { id: 2, title: "B", width: 70, height: 80, year: 2024, priceUAH: 18000, priceEUR: 380, available: true, images: ["/paintings/2.jpg"] },
  { id: 3, title: "C", width: 80, height: 100, priceUAH: 25000, priceEUR: 520, available: true, images: ["/paintings/3.jpg"] },
  { id: 4, title: "D", width: 40, height: 50, year: 2026, priceUAH: 9000, priceEUR: 190, available: true, images: ["/paintings/4.jpg"] },
  { id: 5, title: "E", width: 40, height: 60, year: 2025, priceUAH: 9000, priceEUR: 190, available: true, images: ["/paintings/5.jpg"] },
  { id: 6, title: "F", width: 30, height: 40, year: 2023, priceUAH: 5000, priceEUR: 100, available: true, images: ["/paintings/6.jpg"] },
  { id: 7, title: "G", width: 60, height: 85, year: 2025, priceUAH: 18000, priceEUR: 380, available: true, images: ["/paintings/7.jpg"] },
  { id: 8, title: "H", width: 90, height: 70, priceUAH: 16000, priceEUR: 330, available: true, images: ["/paintings/8.jpg"] },

  { id: 9, title: "I", width: 30, height: 40, year: 2023, priceUAH: 5000, priceEUR: 100, available: true, images: ["/paintings/9.jpg"] },
  { id: 10, title: "J", width: 40, height: 50, year: 2023, priceUAH: 3500, priceEUR: 70, available: true, images: ["/paintings/10.jpg"] },

  // Роботи з Instagram, які не продаються. Розміру немає —
  // тому пишемо width: 0, height: 0 і photoRatio (ширина фото / висота фото).
  { id: 11, title: "K", width: 0, height: 0, available: false, images: ["/paintings/11.jpg"], photoRatio: 0.693 },
  { id: 12, title: "L", width: 0, height: 0, year: 2024, available: false, images: ["/paintings/12.jpg"], photoRatio: 0.71 },
  { id: 13, title: "M", width: 0, height: 0, available: false, images: ["/paintings/13.jpg"], photoRatio: 1.013 },
  { id: 14, title: "N", width: 0, height: 0, available: false, images: ["/paintings/14.jpg"], photoRatio: 0.978 },
  { id: 15, title: "O", width: 0, height: 0, year: 2023, available: false, images: ["/paintings/15.jpg"], photoRatio: 0.795 },
  { id: 16, title: "P", width: 0, height: 0, year: 2023, available: false, images: ["/paintings/16.jpg"], photoRatio: 0.789 },
  { id: 17, title: "Q", width: 0, height: 0, year: 2023, available: false, images: ["/paintings/17.jpg"], photoRatio: 0.807 },
];

// Співвідношення сторін: беремо розмір полотна, а якщо його нема — фото
export function getRatio(painting: PaintingType): number {
  if (painting.width > 0 && painting.height > 0) {
    return painting.width / painting.height;
  }
  return painting.photoRatio ?? 0.8; // ?? = «якщо зліва нічого нема, візьми справа»
}

export function hasSize(painting: PaintingType): boolean {
  return painting.width > 0 && painting.height > 0;
}

export function formatSize(painting: PaintingType): string {
  return `${painting.width} × ${painting.height} cm`;
}

export type Currency = "UAH" | "EUR";

// 18000 → "18 000 ₴",  380 → "€380"
export function formatPrice(painting: PaintingType, currency: Currency): string {
  if (currency === "UAH" && painting.priceUAH) {
    return painting.priceUAH.toLocaleString("uk-UA") + " ₴";
  }
  if (currency === "EUR" && painting.priceEUR) {
    return "€" + painting.priceEUR;
  }
  return "";
}
