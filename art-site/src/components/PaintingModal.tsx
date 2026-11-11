import { useEffect, useRef, useState } from "react";
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

  // Стрічка з усіма фото поруч. На телефоні її гортають пальцем —
  // браузер сам робить плавну прокрутку і «доводить» до найближчого фото (scroll-snap)
  const trackRef = useRef<HTMLDivElement>(null);

  // Прокрутити стрічку до фото номер i (з плавною анімацією).
  function goTo(i: number) {
    const track = trackRef.current;
    if (!track) return;
    const n = images.length;
    const target = ((i % n) + n) % n;
    track.scrollTo({ left: target * track.clientWidth, behavior: "smooth" });
  }

 
  function onScroll() {
    const track = trackRef.current;
    if (!track) return;
    setIndex(Math.round(track.scrollLeft / track.clientWidth));
  }

  // Перше фото: спершу маленька версія з галереї (вона вже завантажена — з'являється миттєво),
  const [firstSrc, setFirstSrc] = useState(thumbOf(images[0]));
  useEffect(() => {
    const img = new Image();
    img.src = images[0];
    let cancelled = false;
    img.decode().catch(() => {}).then(() => {
      if (!cancelled) setFirstSrc(images[0]);
    });
    return () => {
      cancelled = true;
    };
  }, [images]);

  // Стрілки на клавіатурі ← →
  
  const indexRef = useRef(0);
  indexRef.current = index;
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "ArrowRight") goTo(indexRef.current + 1);
      if (e.key === "ArrowLeft") goTo(indexRef.current - 1);
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [images.length]);

  const many = images.length > 1;
  const p = props.painting;

  // Рядок з деталями: розмір · техніка · рік (тільки ті, що є)
  const details = [hasSize(p) ? formatSize(p) : null, t.technique, p.date ?? p.year ?? null]
    .filter((x) => x !== null)
    .join(" · ");

  return (
    <Modal onClose={props.onClose} className="modal--painting">
      <div className="viewer">
        <div className="viewer-track" ref={trackRef} onScroll={onScroll}>
          {images.map((src, i) => (
            <div className="viewer-slide" key={src}>
              <img className="viewer-image" src={i === 0 ? firstSrc : src} alt={p.title} />
            </div>
          ))}
        </div>

        {many && (
          <>
            <button className="viewer-arrow viewer-arrow--left" onClick={() => goTo(index - 1)} aria-label={t.prev}>
              <PiCaretLeft />
            </button>
            <button className="viewer-arrow viewer-arrow--right" onClick={() => goTo(index + 1)} aria-label={t.next}>
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
              onClick={() => goTo(i)}
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
