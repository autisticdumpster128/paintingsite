import { PiInstagramLogo, PiTelegramLogo, PiEnvelopeSimple } from "react-icons/pi";
import { useSettings } from "../Settings";
import { links } from "../data/texts";

function Header(props: { onContactClick: () => void }) {
  const { t, lang, setLang } = useSettings();

  return (
    <header className="header">
      <div className="header-side">
        {/* Лого-аватарка (той самий малюнок, що й іконка у вкладці браузера) */}
        <img className="logo" src="/logo.svg" alt="Ostap Kucherenko" />
        <a href={links.instagram} target="_blank" rel="noreferrer" aria-label="Instagram" className="icon-link">
          <PiInstagramLogo />
        </a>
        <a href={links.telegram} target="_blank" rel="noreferrer" aria-label="Telegram" className="icon-link">
          <PiTelegramLogo />
        </a>
      </div>

      <h1 className="site-title">kucherenkoart</h1>

      <div className="header-side header-side--right">
        {/* Одна кнопка: показує поточну мову, клік — перемикає на іншу */}
        <button
          className="nav-link"
          onClick={() => setLang(lang === "uk" ? "en" : "uk")}
          aria-label={lang === "uk" ? "Switch to English" : "Перемкнути на українську"}
        >
          {lang === "uk" ? "UA" : "EN"}
        </button>
        <button className="icon-link" onClick={props.onContactClick} aria-label={t.contact} title={t.contact}>
          <PiEnvelopeSimple />
        </button>
      </div>
    </header>
  );
}

export default Header;
