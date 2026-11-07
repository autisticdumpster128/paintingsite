import { type PageKey, pages } from "../data/texts";
import { useSettings } from "../Settings";
import Modal from "./Modal";

// Попап для «Про мене», «Інфо», «Приватність»
function PageModal(props: { page: PageKey; onClose: () => void }) {
  const { lang } = useSettings();
  const page = pages[props.page][lang];

  return (
    <Modal onClose={props.onClose} className="modal--narrow">
      {/* Фото тільки для «Про мене» */}
      {/* onError: якщо файлу public/about.jpg ще нема — просто ховаємо картинку */}
      {props.page === "about" && (
        <img
          className="about-photo"
          src="/about.jpg"
          alt="Ostap Kucherenko"
          onError={(e) => (e.currentTarget.style.display = "none")}
        />
      )}

      <div className="modal-info">
        <h2 className="modal-title">{page.title}</h2>
      </div>

      <div className="page-text">
        {page.paragraphs.map((text) => (
          <p key={text}>{text}</p>
        ))}
      </div>
    </Modal>
  );
}

export default PageModal;
