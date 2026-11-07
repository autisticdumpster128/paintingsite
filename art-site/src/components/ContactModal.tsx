import { useState } from "react";
import { PiInstagramLogo, PiTelegramLogo, PiEnvelopeSimple } from "react-icons/pi";
import { type PaintingType } from "../data/paintings";
import { links } from "../data/texts";
import { useSettings } from "../Settings";
import Modal from "./Modal";

const FORM_URL = "https://formspree.io/f/mdeejrya";

// painting — необов'язковий: якщо відкрили з кнопки «Запитати про картину»,
// то знаємо, про яку картину мова, і підставляємо її в повідомлення.
function ContactModal(props: { painting: PaintingType | null; onClose: () => void }) {
  const { t } = useSettings();

  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState(
    props.painting ? `${t.inquireDefault} «${props.painting.title}».` : ""
  );
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");

    // Пастка для ботів: приховане поле, людина його не бачить і не заповнює
    const gotcha = new FormData(e.currentTarget).get("_gotcha");

    try {
      const response = await fetch(FORM_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          name,
          contact,
          email,
          message,
          painting: props.painting ? props.painting.title : "—",
          _gotcha: gotcha,
        }),
      });
      setStatus(response.ok ? "sent" : "error");
    } catch {
      // сюди потрапляємо, якщо, наприклад, нема інтернету
      setStatus("error");
    }
  }

  return (
    <Modal onClose={props.onClose} className="modal--narrow">
      <div className="modal-info">
        <h2 className="modal-title">{t.contactTitle}</h2>
        <p className="modal-text">{t.contactIntro}</p>
      </div>

      <div className="contact-links">
        <a href={links.telegram} target="_blank" rel="noreferrer">
          <PiTelegramLogo /> @Ostap_Kucherenko
        </a>
        <a href={links.instagram} target="_blank" rel="noreferrer">
          <PiInstagramLogo /> Instagram
        </a>
        <a href={"mailto:" + links.email}>
          <PiEnvelopeSimple /> {links.email}
        </a>
      </div>

      {status === "sent" ? (
        <p className="form-note">{t.sent}</p>
      ) : (
        <form className="order-form" onSubmit={handleSubmit}>
          {props.painting && (
            <p className="form-painting">
              {t.aboutPainting}: <b>{props.painting.title}</b>
            </p>
          )}
          <input placeholder={t.name} value={name} onChange={(e) => setName(e.target.value)} required />
          <input placeholder={t.phoneOrTg} value={contact} onChange={(e) => setContact(e.target.value)} required />
          <input type="email" placeholder={t.email} value={email} onChange={(e) => setEmail(e.target.value)} />
          <textarea placeholder={t.message} value={message} onChange={(e) => setMessage(e.target.value)} />
          <input type="text" name="_gotcha" className="gotcha" tabIndex={-1} autoComplete="off" />

          {status === "error" && <p className="form-note form-note--error">{t.error}</p>}

          <button className="pill pill--dark" type="submit" disabled={status === "sending"}>
            {status === "sending" ? t.sending : t.send}
          </button>
        </form>
      )}
    </Modal>
  );
}

export default ContactModal;
