// ============================================================
//  НАЛАШТУВАННЯ: мова і валюта для всього сайту.
//
//  Проблема: мова потрібна майже кожному компоненту. Передавати її
//  через props у кожен компонент і далі вглиб — довго і незручно.
//
//  Рішення — Context («спільна коробка»):
//   1) createContext   — створюємо коробку
//   2) <Provider>      — кладемо в неї значення (обгортаємо весь App)
//   3) useContext      — будь-який компонент всередині дістає значення
// ============================================================

import { createContext, useContext, useState, type ReactNode } from "react";
import { texts, type Lang } from "./data/texts";
import type { Currency } from "./data/paintings";

type SettingsType = {
  lang: Lang;
  currency: Currency;
  setLang: (lang: Lang) => void;
  setCurrency: (currency: Currency) => void;
  t: (typeof texts)["uk"]; // t = тексти поточною мовою
};

// 1) коробка (null — поки в ній нічого нема)
const SettingsContext = createContext<SettingsType | null>(null);

// localStorage — маленьке сховище в браузері, яке не зникає після
// перезавантаження сторінки. Зберігає тільки рядки.
// try/catch — на випадок, якщо браузер заборонив сховище (приватний режим).
function load(key: string): string | null {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
}

function save(key: string, value: string) {
  try {
    localStorage.setItem(key, value);
  } catch {
    
  }
}

// 2) Provider — обгортка, яка тримає стан і кладе його в коробку
export function SettingsProvider(props: { children: ReactNode }) {
  // Початкове значення: те, що збережено, або за замовчуванням.
  // Якщо мова браузера українська — показуємо uk, інакше en.
  const [lang, setLangState] = useState<Lang>(() => {
    const saved = load("lang");
    if (saved === "uk" || saved === "en") return saved;
    return navigator.language.startsWith("uk") ? "uk" : "en";
  });

  const [currency, setCurrencyState] = useState<Currency>(() => {
    const saved = load("currency");
    if (saved === "UAH" || saved === "EUR") return saved;
    return "EUR"; // за замовчуванням — євро
  });

  function setLang(newLang: Lang) {
    setLangState(newLang);
    save("lang", newLang);
  }

  function setCurrency(newCurrency: Currency) {
    setCurrencyState(newCurrency);
    save("currency", newCurrency);
  }

  const value = { lang, currency, setLang, setCurrency, t: texts[lang] };

  return <SettingsContext.Provider value={value}>{props.children}</SettingsContext.Provider>;
}

// 3) Свій хук — щоб у компонентах писати просто: const { t, lang } = useSettings();
export function useSettings(): SettingsType {
  const settings = useContext(SettingsContext);
  if (!settings) {
    throw new Error("useSettings працює тільки всередині <SettingsProvider>");
  }
  return settings;
}
