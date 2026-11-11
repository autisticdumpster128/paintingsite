import { useEffect, useState } from "react";
import { PiCaretLeft, PiCaretRight } from "react-icons/pi";
import { type PaintingType, formatPrice, formatSize, hasSize, thumbOf } from "../data/paintings";
import { useSettings } from "../Settings";
import Modal from "./Modal";

function PaintingModal(props: {
  painting: PaintingType;
  onClose: () => void;
  onInquire: (painting: PaintingType) => void;
}) {
  const { t, currency, setCurrency } = useSettings();
  const images = props.painting.images;

  // Номер фото, яке зараз показуємо (0 = перше)
  const [index, setIndex] = useState(0);
  // Де палець торкнувся екрана (для свайпу на телефоні)
  const [touchX, setTouchX] = useState<number | null>(null);

  // % — остача від ділення: після останнього фото знову перше, і навпаки
  function next() {
    setIndex((i) => (i + 1) % images.length);
  }
  function prev() {
    setIndex((i) => (i - 1 + images.length) % images.length);
  }

  
  // Спершу показуємо маленьку версію з галереї (вона вже завантажена — з'являється миттєво),
  // а щойно велика готова — тихо підміняємо її
  const [shown, setShown] = useState(thumbOf(images[0]));

  // Як тільки попап відкрився — завантажуємо всі фото цієї картини наперед
  useEffect(() => {
    images.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, [images]);

  useEffect(() => {
    const src = images[index];
    const img = new Image();
    img.src = src;
    let cancelled = false;
    img.decode().catch(() => {}).then(() => {
      if (!cancelled) setShown(src);
    });
    return () => {
      cancelled = true;
    };
  }, [index, images]);

  // Стрілки на клавіатурі ← →
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "ArrowRight") setIndex((i) => (i + 1) % images.length);
      if (e.key === "ArrowLeft") setIndex((i) => (i - 1 + images.length) % images.length);
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [images.length]);

  // Свайп: запам'ятали X на початку, порівняли з X в кінці
  function onTouchEnd(e: React.TouchEvent) {
    if (touchX === null) return;
    const diff = e.changedTouches[0].clientX - touchX;
    if (diff < -40) next();
    if (diff > 40) prev();
    setTouchX(null);
  }

  const many = images.length > 1;
  const p = props.painting;

  // Рядок з деталями: розмір · техніка · рік (тільки ті, що є)
  const details = [hasSize(p) ? formatSize(p) : null, t.technique, p.date ?? p.year ?? null]
    .filter((x) => x !== null)
    .join(" · ");

  return (
    <Modal onClose={props.onClose} className="modal--painting">
      <div
        className="viewer"
        onTouchStart={(e) => setTouchX(e.touches[0].clientX)}
        onTouchEnd={onTouchEnd}
      >
        <img className="viewer-image" src={shown} alt={p.title} />

        {many && (
          <>
            <button className="viewer-arrow viewer-arrow--left" onClick={prev} aria-label={t.prev}>
              <PiCaretLeft />
            </button>
            <button className="viewer-arrow viewer-arrow--right" onClick={next} aria-label={t.next}>
              <PiCaretRight />
            </button>
          </>
        )}
      </div>

      {/* Крапки знизу — показують, яке фото зараз, і по них можна клікати */}
      {many && (
        <div className="dots">
          {images.map((src, i) => (
            <button
              key={src}
              className={i === index ? "dot is-active" : "dot"}
              onClick={() => setIndex(i)}
              aria-label={`${i + 1} / ${images.length}`}
            />
          ))}
        </div>
      )}

      <div className="modal-info">
        <h2 className="modal-title">{p.title}</h2>
        <p className="modal-meta">{details}</p>

        {p.available ? (
          <>
            <p className="modal-price">{formatPrice(p, currency)}</p>
            {/* Вибір валюти: просто два слова, активне — чорне */}
            <div className="currency">
              <button className={currency === "UAH" ? "is-active" : ""} onClick={() => setCurrency("UAH")}>UAH</button>
              <span>/</span>
              <button className={currency === "EUR" ? "is-active" : ""} onClick={() => setCurrency("EUR")}>EUR</button>
            </div>
            <button className="pill pill--dark" onClick={() => props.onInquire(p)}>
              {t.inquire}
            </button>
          </>
        ) : (
          <p className="modal-status">{t.unavailable}</p>
        )}
      </div>
    </Modal>
  );
}

export default PaintingModal;
