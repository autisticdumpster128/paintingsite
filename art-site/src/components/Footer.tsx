import { type PageKey } from "../data/texts";
import { useSettings } from "../Settings";

const YEAR = new Date().getFullYear();

function Footer(props: { onOpen: (page: PageKey) => void; onContact: () => void }) {
  const { t } = useSettings();

  return (
    <footer className="footer">
      <nav className="footer-links">
        <button className="nav-link" onClick={() => props.onOpen("about")}>{t.footerAbout}</button>
        <button className="nav-link" onClick={() => props.onOpen("info")}>{t.footerInfo}</button>
        <button className="nav-link" onClick={props.onContact}>{t.contact}</button>
        <button className="nav-link" onClick={() => props.onOpen("privacy")}>{t.footerPrivacy}</button>
      </nav>
      <p className="copyright">© {YEAR} Ostap Kucherenko</p>
    </footer>
  );
}

export default Footer;
