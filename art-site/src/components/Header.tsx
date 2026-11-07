import { PiInstagramLogo, PiTelegramLogo, PiEnvelopeSimple } from "react-icons/pi";
import { useSettings } from "../Settings";
import { links } from "../data/texts";

function Header(props: { onContactClick: () => void }) {
  const { t, lang, setLang } = useSettings();

  return (
    <header className="header">
      <div className="header-side">
        <a href={links.instagram} target="_blank" rel="noreferrer" aria-label="Instagram" className="circle-btn">
          <PiInstagramLogo />
        </a>
        <a href={links.telegram} target="_blank" rel="noreferrer" aria-label="Telegram" className="circle-btn">
          <PiTelegramLogo />
        </a>
      </div>

      <h1 className="site-title">kucherenkoart</h1>

      <div className="header-side header-side--right">
        {/* Одна кнопка: показує поточну мову, клік — перемикає на іншу */}
        <button
          className="circle-btn circle-btn--text"
          onClick={() => setLang(lang === "uk" ? "en" : "uk")}
          aria-label={lang === "uk" ? "Switch to English" : "Перемкнути на українську"}
        >
          {lang === "uk" ? "UA" : "EN"}
        </button>
        <button className="circle-btn" onClick={props.onContactClick} aria-label={t.contact} title={t.contact}>
          <PiEnvelopeSimple />
        </button>
      </div>
    </header>
  );
}

export default Header;
