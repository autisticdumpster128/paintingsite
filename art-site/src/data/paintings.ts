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
  date?: string; // повна дата, якщо відома — показується в попапі замість року
  priceUAH?: number;
  priceEUR?: number; // пишемо вручну, заокруглено
  available: boolean; // false = продана або не продається
  images: string[];
  // співвідношення сторін фото (ширина / висота), якщо розміру немає
  photoRatio?: number;
};

export const paintingList: PaintingType[] = [
  { id: 1, title: "OBHOHOCHISHSYA", width: 90, height: 80, year: 2023, date: "29.10.2023", priceUAH: 18000, priceEUR: 380, available: true, images: ["/paintings/full/a.jpg", "/paintings/full/a-live.jpg"] },
  { id: 2, title: "ROOM 217", width: 70, height: 80, year: 2024, date: "02.09.2024", priceUAH: 18000, priceEUR: 380, available: true, images: ["/paintings/full/b.jpg"] },
  { id: 3, title: "SYKHIV CHRONICLES", width: 80, height: 100, priceUAH: 25000, priceEUR: 520, available: true, images: ["/paintings/full/c.jpg"] },
  { id: 4, title: "GOBLIN", width: 40, height: 50, year: 2026, date: "11.10.2026", priceUAH: 8000, priceEUR: 170, available: true, images: ["/paintings/full/d.jpg"] },
  { id: 5, title: "MAYDANCHIK", width: 40, height: 60, year: 2025, date: "12.04.2025", priceUAH: 8500, priceEUR: 180, available: true, images: ["/paintings/full/e.jpg"] },
  { id: 6, title: "THE HOST", width: 30, height: 40, year: 2023, date: "21.06.2023", priceUAH: 5000, priceEUR: 100, available: true, images: ["/paintings/full/f2.jpg"] },
  { id: 7, title: "SILENT HEAVEN", width: 60, height: 85, year: 2025, date: "26.04.2025", priceUAH: 18000, priceEUR: 380, available: true, images: ["/paintings/full/g.jpg"] },
  { id: 8, title: "HOMECOMING", width: 90, height: 70, priceUAH: 16000, priceEUR: 330, available: true, images: ["/paintings/8.jpg"] },

  { id: 9, title: "TRAKTOR", width: 30, height: 40, year: 2023, date: "29.08.2023", priceUAH: 5000, priceEUR: 100, available: true, images: ["/paintings/full/i.jpg"] },
  { id: 10, title: "KALYAKI-MALYAKI", width: 40, height: 50, year: 2023, date: "29.08.2023", priceUAH: 2500, priceEUR: 45, available: true, images: ["/paintings/full/o2.jpg"] },

  // Роботи з Instagram, які не продаються

  { id: 11, title: "BLUE", width: 0, height: 0, available: false, images: ["/paintings/11.jpg"], photoRatio: 0.693 },
  { id: 12, title: "APARTMENT", width: 0, height: 0, year: 2024, available: false, images: ["/paintings/12.jpg"], photoRatio: 0.71 },
  { id: 13, title: "TINY GARDEN", width: 0, height: 0, available: false, images: ["/paintings/full/m2.jpg"], photoRatio: 0.992 },
  { id: 14, title: "PODARUNOK", width: 0, height: 0, available: false, images: ["/paintings/full/n.jpg"], photoRatio: 0.994 },
  { id: 15, title: "RYABZIK", width: 0, height: 0, year: 2023, available: false, images: ["/paintings/full/j2.jpg"], photoRatio: 0.8 },
  { id: 16, title: "SHTUKA", width: 0, height: 0, year: 2023, available: false, images: ["/paintings/full/p.jpg"], photoRatio: 0.789 },
  { id: 17, title: "ZNAYOME OBLICHYA", width: 0, height: 0, year: 2023, available: false, images: ["/paintings/full/q.jpg", "/paintings/full/q-live.jpg"], photoRatio: 0.801 },
  { id: 18, title: "HTO", width: 0, height: 0, available: false, images: ["/paintings/full/w.jpg"], photoRatio: 0.806 },
  { id: 19, title: "BROTHER", width: 0, height: 0, available: false, images: ["/paintings/full/s.jpg"], photoRatio: 0.996 },
  { id: 20, title: "BIBLIOTEKA", width: 0, height: 0, available: false, images: ["/paintings/full/t2.jpg"], photoRatio: 0.976 },
  { id: 21, title: "PRIVET", width: 0, height: 0, available: false, images: ["/paintings/full/u.jpg"], photoRatio: 0.961 },
  { id: 22, title: "FINALE", width: 0, height: 0, available: false, images: ["/paintings/full/v.jpg"], photoRatio: 1.122 },
  { id: 23, title: "?", width: 0, height: 0, available: false, images: ["/paintings/full/r.jpg"], photoRatio: 0.998 },
];

// Маленька версія фото для галереї: /paintings/full/a.jpg → /paintings/thumb/a.jpg
// (у попапі показуємо велику full-версію, а в галереї — легку thumb, щоб сайт швидко вантажився)
export function thumbOf(src: string): string {
  return src.replace("/paintings/full/", "/paintings/thumb/");
}

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
