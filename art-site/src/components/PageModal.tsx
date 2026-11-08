import { type PageKey, pages } from "../data/texts";
import { useSettings } from "../Settings";
import Modal from "./Modal";

// Попап для «Про мене», «Інфо», «Приватність»
function PageModal(props: { page: PageKey; onClose: () => void }) {
  const { lang } = useSettings();
  const page = pages[props.page][lang];
  const isAbout = props.page === "about";

  const text = (
    <div className="page-text">
      <h2 className="modal-title">{page.title}</h2>
      {page.paragraphs.map((p) => (
        <p key={p}>{p}</p>
      ))}
    </div>
  );

  return (
    <Modal onClose={props.onClose} className="modal--narrow">
      {/* Фото тільки для «Про мене» */}
      {isAbout && (
        <figure className="about-photo">
          <img src="/about.jpg" alt="Ostap Kucherenko" />
        </figure>
      )}
      {text}
    </Modal>
  );
}

export default PageModal;
