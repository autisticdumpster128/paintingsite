import { useEffect, type ReactNode } from "react";
import { PiX } from "react-icons/pi";
import { useSettings } from "../Settings";

// className — щоб різні попапи могли мати різну ширину (картина ширша, текст вужчий)
function Modal(props: { onClose: () => void; children: ReactNode; className?: string }) {
  const { t } = useSettings();
  const onClose = props.onClose;

  // useEffect — «зроби щось ПІСЛЯ того, як компонент з'явився на екрані».
  // Тут: слухаємо клавіатуру (Esc закриває) і забороняємо прокрутку сторінки під попапом.
  // return () => {...} — «прибирання»: виконується, коли попап зникає.
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]); // [ ] — коли перезапускати ефект: тільки якщо змінилась onClose

  return (
    <div className="modal-backdrop" onClick={props.onClose}>
      <div
        className={"modal " + (props.className ?? "")}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        <button className="modal-close" onClick={props.onClose} aria-label={t.close}>
          <PiX />
        </button>
        {props.children}
      </div>
    </div>
  );
}

export default Modal;
